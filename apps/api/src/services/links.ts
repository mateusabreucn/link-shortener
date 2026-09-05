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
    const [{ id: currentId }] = await db
      .insert(links)
      .values({ originalUrl })
      .returning({ id: links.id });

    let finalCode: string;

    if (code) {
      finalCode = code;
    } else {
      finalCode = generateCode(currentId);
    }

    const existingCode = await db
      .select()
      .from(links)
      .where(eq(links.code, finalCode));

    if (existingCode.length > 0) {
      await db.delete(links).where(eq(links.id, currentId));
      return res.status(409).send({ message: "Code already in use" });
    }

    const [{ code: savedCode }] = await db
      .update(links)
      .set({ code: finalCode })
      .where(eq(links.id, currentId))
      .returning({ code: links.code });

    return res.status(201).send({ code: savedCode });
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
