import { NextResponse } from "next/server";
import { githubConfigured } from "@/lib/auth";

export function GET() { return NextResponse.json({ configured: githubConfigured }); }
