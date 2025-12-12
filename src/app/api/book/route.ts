import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { join } from "path";

const AUTHORIZATION_TOKEN = "Bearer SPENCER_IS_KING_2026";

export async function GET(request: NextRequest) {
  try {
    // Check for Authorization header
    const authHeader = request.headers.get("Authorization");
    
    if (!authHeader || authHeader !== AUTHORIZATION_TOKEN) {
      return new NextResponse("Unauthorized", {
        status: 401,
        headers: {
          "WWW-Authenticate": "Bearer",
        },
      });
    }

    // Read the book file from the public directory
    const filePath = join(process.cwd(), "public", "docs", "tdccodefulltext.txt");
    const fileContent = await readFile(filePath, "utf-8");

    // Return with headers that prevent indexing and caching
    return new NextResponse(fileContent, {
      status: 200,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "X-Robots-Tag": "noindex, nofollow, noarchive, nosnippet",
        "Cache-Control": "no-store, no-cache, must-revalidate, private",
        "Pragma": "no-cache",
        "Expires": "0",
        // Prevent iframe embedding
        "X-Frame-Options": "DENY",
        // Additional security headers
        "X-Content-Type-Options": "nosniff",
        "Referrer-Policy": "no-referrer",
      },
    });
  } catch (error) {
    console.error("Error reading book file:", error);
    
    // Check if it's a file not found error
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return new NextResponse("File not found", { status: 404 });
    }
    
    return new NextResponse("Internal server error", { status: 500 });
  }
}

