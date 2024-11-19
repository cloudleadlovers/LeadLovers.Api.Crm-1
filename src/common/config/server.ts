export default {
  environment: process.env.NODE_ENV ?? "development",
  port: Number(process.env.PORT ?? 3333),
};
