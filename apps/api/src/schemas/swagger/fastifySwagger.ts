const fastifySwaggerSchema = {
  openapi: {
    openapi: "3.0.0",
    info: {
      title: "Link Shortener",
      description: "Link Shortener from your mate",
      version: "0.1.0",
    },
  },
};

const fastifySwaggerUiSchema = {
  routePrefix: "/docs",
};

export { fastifySwaggerSchema, fastifySwaggerUiSchema };
