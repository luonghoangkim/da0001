import jwt from "jsonwebtoken";

const secretKey = process.env.JWT_SECRET || "your-secret-key";

export async function verifyToken(request: Request) {
  const authHeader = request.headers.get("Authorization");
  console.log(authHeader);
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return { error: "Authorization token missing", status: 401 };
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, secretKey!);
    // console.log(decoded);
    return decoded;
  } catch (error) {
    return { error: "Invalid or expired token", status: 403 };
  }
}
