import { CorsOptions } from "cors";

const allowed_domains =
  process.env.ALLOWED_DOMAINS && process.env.ALLOWED_DOMAINS !== "*"
    ? process.env.ALLOWED_DOMAINS.split(",")
    : "*";

export default {
  origin:
    process.env.NODE_ENV === "production" || process.env.NODE_ENV === "staging"
      ? allowed_domains
      : "*",
} as CorsOptions;
