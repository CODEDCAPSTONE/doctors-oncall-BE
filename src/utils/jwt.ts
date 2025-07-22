import jwt from "jsonwebtoken"
  
  export const generateToken = async (payload: { providerId: string; role: string }) => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error('JWT_SECRET is not defined');
  }

  const encodedSecret = new TextEncoder().encode(secret);

  const token = jwt.sign(payload, secret, {expiresIn:"1h"})

  return token;
};
