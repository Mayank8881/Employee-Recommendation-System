import rateLimit from "express-rate-limit";

export const authRateLimiter = rateLimit({
  windowMs: 2 * 60 * 1000, //2 min
  max: 3,
  message: "Too many requests, please try again later"
});