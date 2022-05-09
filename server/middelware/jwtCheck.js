import jwt from "express-jwt";
import jwksRsa from "jws-rsa";
import dotenv from "dotenv";

dotenv.config();

const audience = process.env.AUTH0_AUDIENCE;
const domain = process.env.AUTH0_DOMAIN;
