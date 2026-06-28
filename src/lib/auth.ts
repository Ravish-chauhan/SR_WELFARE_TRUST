import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET || "srwelfare_secret_key_change_in_prod";
const COOKIE_NAME = "srwelfare_token";

export interface JWTPayload {
    userId: string;
    email: string;
    role: "user" | "admin";
    name: string;
}

// Sign a JWT and return it
export function signToken(payload: JWTPayload): string {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

// Verify a JWT string
export function verifyToken(token: string): JWTPayload | null {
    try {
        return jwt.verify(token, JWT_SECRET) as JWTPayload;
    } catch {
        return null;
    }
}

// Get the current user from the cookie (server-side in API routes or Server Components)
export async function getCurrentUser(): Promise<JWTPayload | null> {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) return null;
    return verifyToken(token);
}

// Cookie options for setting/clearing
export function getAuthCookieOptions(maxAge = 60 * 60 * 24 * 7) {
    return {
        name: COOKIE_NAME,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax" as const,
        path: "/",
        maxAge,
    };
}
