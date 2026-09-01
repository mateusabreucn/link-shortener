import { FastifyInstance, RouteShorthandOptions } from "fastify";
import healthCheckSchema from "../schemas/health/healthCheckSchema";

async function healthCheckRoutes(fastify: FastifyInstance) {
  fastify.get("/health-check", healthCheckSchema, async (req, res) => {
    return { health: true };
  });
}

export default healthCheckRoutes;
