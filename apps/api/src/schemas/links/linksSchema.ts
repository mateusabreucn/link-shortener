import { RouteShorthandOptions } from "fastify";

export const postCreateLinkSchema: RouteShorthandOptions = {
  schema: {
    body: {
      type: "object",
      properties: {
        originalUrl: { type: "string", format: "uri", pattern: "^https?://" },
        code: { type: "string", minLength: 1, maxLength: 10 },
      },
      required: ["originalUrl"],
    },
    response: {
      201: {
        type: "object",
        required: ["code"],
        properties: {
          code: { type: "string" },
        },
      },
    },
  },
};

export const getRedirectLinkSchema: RouteShorthandOptions = {
  schema: {
    params: {
      type: "object",
      required: ["code"],
      properties: {
        code: { type: "string" },
      },
    },
    response: {
      302: {
        type: "object",
      },
    },
  },
};
