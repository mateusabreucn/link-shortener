import { RouteShorthandOptions } from "fastify";

const healthCheckSchema: RouteShorthandOptions = {
  schema: {
    summary: "Health Check",
    description: "Returns whether the AI is up and running",
    tags: ["health"],
    response: {
      200: {
        description: "API is healthy",
        type: "object",
        properties: {
          health: { type: "boolean" },
        },
      },
    },
  },
};

export default healthCheckSchema;
