import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.accessToken) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const response = await fetch("https://api.github.com/user/starred?per_page=100&sort=updated", { headers: { Authorization: `Bearer ${session.accessToken}`, Accept: "application/vnd.github+json" }, cache: "no-store" });
  if (!response.ok) return NextResponse.json({ error: "GitHub request failed" }, { status: response.status });
  const repositories = await response.json() as Array<{ id: number; full_name: string; html_url: string; private: boolean; updated_at: string }>;
  return NextResponse.json(repositories.map(({ id, full_name, html_url, private: isPrivate, updated_at }) => ({ id, full_name, html_url, private: isPrivate, updated_at })));
}
