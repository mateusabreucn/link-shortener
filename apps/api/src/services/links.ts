import { FastifyReply, FastifyRequest } from "fastify";
import { CreateLinkBody, RedirectParams } from "../types/links";
import { db } from "../db";
import { links } from "../db/schema";
import { desc, eq } from "drizzle-orm";
import generateCode from "../utils/generateCode";
import { isUniqueViolation } from "../utils/errors";
import { Error } from "postgres";

export async function createShortLink(
  req: FastifyRequest<{ Body: CreateLinkBody }>,
  res: FastifyReply,
) {
  const { originalUrl, code } = req.body;

  try {
    const nextId =
      (
        await db
          .select({ id: links.id })
          .from(links)
          .orderBy(desc(links.id))
          .limit(1)
      )[0].id + 1;

    let finalCode: string;

    if (code) {
      finalCode = code;
    } else {
      finalCode = generateCode(nextId);
    }

    const existingCode = await db
      .select()
      .from(links)
      .where(eq(links.code, finalCode));

    if (existingCode.length > 0) {
      return res.status(409).send({ message: "Code already in use" });
    }

    const [newLink] = await db
      .insert(links)
      .values({ originalUrl, code: finalCode })
      .returning();

    return res.status(201).send({ code: newLink.code });
  } catch (error) {
    console.error(error);

    if (isUniqueViolation(error as Error)) {
      return res.status(409).send({ message: "Code already in use" });
    }

    return res.status(500).send({ message: "Erro interno do servidor!" });
  }
}

export async function redirectToOriginalLink(
  req: FastifyRequest<{ Params: RedirectParams }>,
  res: FastifyReply,
) {
  const code = req.params.code;

  const originalUrl: string = (
    await db
      .select({ originalUrl: links.originalUrl })
      .from(links)
      .where(eq(links.code, code))
  )[0].originalUrl;

  return res.redirect(originalUrl);
}
