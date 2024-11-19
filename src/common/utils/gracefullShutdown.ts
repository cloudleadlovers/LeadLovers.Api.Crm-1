import { logger } from "infa/logger/pinoLogger";

function gracefullShutdown(event: string, server: any) {
  return () => {
    logger.info(`${event} received, code: 0`);
    server.close(() => {
      logger.info("http server closed");
      process.exit(0);
    });
  };
}

export function doGracefullShutdown(server: any) {
  process.on("SIGINT", gracefullShutdown("SIGINT", server));
  process.on("SIGTERM", gracefullShutdown("SIGTERM", server));
  process.on("exit", (code) => {
    logger.info(`exit sigint received, code: ${code}`);
  });
}
