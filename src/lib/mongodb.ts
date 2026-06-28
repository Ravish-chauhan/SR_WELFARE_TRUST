import mongoose from "mongoose";

// Force IPv4 by using 127.0.0.1 instead of localhost (Node 18+ resolves localhost as ::1)
const MONGODB_URI = (process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/srwelfare").replace(
    "localhost",
    "127.0.0.1"
);

interface MongooseCache {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
}

declare global {
    // eslint-disable-next-line no-var
    var mongoose: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongoose ?? { conn: null, promise: null };
global.mongoose = cached;

export async function connectDB(): Promise<typeof mongoose> {
    if (cached.conn) return cached.conn;

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI, {
            bufferCommands: false,
            serverSelectionTimeoutMS: 5000,
        });
    }

    try {
        cached.conn = await cached.promise;
    } catch (err) {
        // Reset so next request retries fresh
        cached.promise = null;
        cached.conn = null;
        throw err;
    }

    return cached.conn;
}
