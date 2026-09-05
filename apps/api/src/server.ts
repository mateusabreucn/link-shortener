import Fastify from "fastify";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import healthCheckRoutes from "./routes/healthCheck";
import linksRoutes from "./routes/links";
import {
  fastifySwaggerSchema,
  fastifySwaggerUiSchema,
} from "./schemas/swagger/fastifySwagger";
import { fastifyErrorHandler } from "./utils/fastifyErrorHandler";

const fastify = Fastify({
  logger: true,
});

fastify.register(fastifySwagger, fastifySwaggerSchema);
fastify.register(fastifySwaggerUi, fastifySwaggerUiSchema);
fastify.register(healthCheckRoutes);
fastify.register(linksRoutes);

fastify.setErrorHandler(fastifyErrorHandler);

fastify.listen({ port: 3333 }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }

  fastify.log.info(`Server listening on ${address}`);
});
