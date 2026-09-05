import { FastifyReply, FastifyRequest } from "fastify";
import { CreateLinkBody, RedirectParams } from "../types/links";
import { db } from "../db";
import { links } from "../db/schema";
import { eq } from "drizzle-orm";
import generateCode from "../utils/generateCode";
import {
  CodeAlreadyInUseError,
  CodeNotFoundError,
} from "../utils/errorClasses";

export async function createShortLink(
  req: FastifyRequest<{ Body: CreateLinkBody }>,
  res: FastifyReply,
) {
  const { originalUrl, code } = req.body;

  const savedCode = await db.transaction(async (tx) => {
    const [{ id: currentId }] = await tx
      .insert(links)
      .values({ originalUrl })
      .returning({ id: links.id });

    let finalCode: string;

    if (code) {
      finalCode = code;
    } else {
      finalCode = generateCode(currentId);
    }

    const existingCode = await tx
      .select()
      .from(links)
      .where(eq(links.code, finalCode));

    if (existingCode.length > 0) {
      throw new CodeAlreadyInUseError();
    }

    const [{ code: savedCode }] = await tx
      .update(links)
      .set({ code: finalCode })
      .where(eq(links.id, currentId))
      .returning({ code: links.code });

    return savedCode;
  });

  return res.status(201).send({ code: savedCode });
}

export async function redirectToOriginalLink(
  req: FastifyRequest<{ Params: RedirectParams }>,
  res: FastifyReply,
) {
  const code = req.params.code;

  const [{ originalUrl: originalUrl }] = await db
    .select({ originalUrl: links.originalUrl })
    .from(links)
    .where(eq(links.code, code));

  if (!originalUrl) {
    throw new CodeNotFoundError();
  }

  return res.redirect(originalUrl);
}
