import { decodeJwt, jwtVerify } from "jose";

interface UserJwtPayload {
  jti: string;
  iat: number;
}

export const getJwtSecretKey = () => {
  const secret = process.env.JWT_SECRET_KEY;

  if (!secret || secret.length === 0) {
    throw new Error("The environment variable JWT_SECRET_KEY is not set.");
  }

  return secret;
};

export const verifyAuth = async (token: string) => {
  try {
    const verified = await jwtVerify(
      token,
      new TextEncoder().encode(getJwtSecretKey())
    );
    return verified.payload as UserJwtPayload;
  } catch {
    throw new Error("Your token has expired.");
  }
};

export const decodeAuth = async (token: string) => {
  try {
    const decoded = decodeJwt(token);
    return decoded as any;
  } catch {
    throw new Error("Your token has expired.");
  }
};
