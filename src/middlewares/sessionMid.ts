import session from "express-session";
import dotenv from "dotenv";

dotenv.config();

export const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET || "",
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, httpOnly: false },
});
