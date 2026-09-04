import { FastifyInstance } from "fastify";
import {
  postCreateLinkSchema,
  getRedirectLinkSchema,
} from "../schemas/links/linksSchema";
import { createShortLink, redirectToOriginalLink } from "../services/links";
import { CreateLinkBody, RedirectParams } from "../types/links";

export default async function linksRoutes(fastify: FastifyInstance) {
  fastify.post<{ Body: CreateLinkBody }>(
    "/shorten-link",
    postCreateLinkSchema,
    createShortLink,
  );

  fastify.get<{ Params: RedirectParams }>(
    "/:code",
    getRedirectLinkSchema,
    redirectToOriginalLink,
  );
}
