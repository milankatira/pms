import jwt from "jsonwebtoken";

export const parseJwt = (token: string) => {
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET || "secret");
    return decodedToken;
  } catch (error) {
    console.error(error);
    return null;
  }
};
