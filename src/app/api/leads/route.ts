import { captureLead } from "@/lib/leads/capture";
import { NextRequest, NextResponse } from "next/server";

function clientIp(request: NextRequest) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: "We couldn't submit your request. Please try again or contact us directly." },
      { status: 400 },
    );
  }

  const result = await captureLead(body, { ip: clientIp(request) });
  if (!result.ok) {
    return NextResponse.json(
      {
        ok: false,
        message: result.message,
        fieldErrors: result.fieldErrors,
      },
      { status: result.status },
    );
  }

  return NextResponse.json({
    ok: true,
    duplicate: result.duplicate,
    leadId: result.leadId,
    message:
      "You're registered for Cornerstone updates. We'll share new project information as it becomes available.",
  });
}
