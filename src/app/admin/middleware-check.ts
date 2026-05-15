// Shared admin auth check used by admin API routes
export function isAdminAuthed(req: Request): boolean {
  const cookie = req.headers.get("cookie") ?? "";
  const match = cookie.match(/admin_session=([^;]+)/);
  if (!match) return false;
  return match[1] === process.env.ADMIN_SECRET;
}
