import crypto from "crypto";

export const generateID = (n: number): string => crypto.randomBytes(n).toString('hex');