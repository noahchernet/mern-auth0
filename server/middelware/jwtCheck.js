import jwt from "express-jwt";
import jwksRsa from "jws-rsa";
import dotenv from "dotenv";

dotenv.config();

const audience = process.env.AUTH0_AUDIENCE;
const domain = process.env.AUTH0_DOMAIN;

// Create middleware for checking the JWT

export default jwt({
  // Dynamically provide a signing key based on the kid in the header
  // and the signing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${domain}/.well-known/jwks.json`,
  }),
  // Validate the audience and the issuer.
  aud: audience,
  issuer: `https://${domain}/`,
  algorithms: ["RS256"],
});
