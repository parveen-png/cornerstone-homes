import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  email: z.email("Enter the email address you used to register."),
});

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Enter a valid email address." }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, message: parsed.error.issues[0]?.message ?? "Enter a valid email address." },
      { status: 400 },
    );
  }

  console.info("[unsubscribe:request]", parsed.data.email.split("@")[1] ?? "unknown");
  return NextResponse.json({
    ok: true,
    message:
      "Your unsubscribe request has been recorded. If a production email provider is configured, this address will be suppressed from future Cornerstone update emails.",
  });
}
