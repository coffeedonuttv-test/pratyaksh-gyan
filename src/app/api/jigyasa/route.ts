import { NextRequest, NextResponse } from "next/server";

// ─── TYPES ───────────────────────────────────────────────────────────────────

interface JigyasaPayload {
    name: string;
    email: string;
    question: string;
}

// ─── EMAIL HTML TEMPLATE ─────────────────────────────────────────────────────

function buildEmailHtml(name: string, email: string, question: string): string {
    return `
<!DOCTYPE html>
<html lang="hi">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Jigyasa — New Inquiry</title>
</head>
<body style="margin:0;padding:0;background-color:#070606;font-family:'Georgia',serif;color:#F4F2EB;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#070606;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#0d0c0b;border:1px solid rgba(140,74,42,0.3);">

          <!-- Header -->
          <tr>
            <td style="padding:40px 48px 24px;border-bottom:1px solid rgba(255,255,255,0.06);">
              <p style="margin:0 0 12px;font-family:'Arial',sans-serif;font-size:9px;letter-spacing:0.5em;text-transform:uppercase;color:#8C4A2A;">
                ✦ Jigyasa / जिज्ञासा — New Inquiry
              </p>
              <h1 style="margin:0;font-size:24px;font-weight:300;color:#F4F2EB;letter-spacing:0.04em;">
                A Seeker Has Offered Their Question
              </h1>
            </td>
          </tr>

          <!-- Seeker Details -->
          <tr>
            <td style="padding:32px 48px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding-bottom:24px;border-bottom:1px solid rgba(255,255,255,0.05);">
                    <p style="margin:0 0 6px;font-family:'Arial',sans-serif;font-size:9px;letter-spacing:0.45em;text-transform:uppercase;color:rgba(166,162,152,0.6);">
                      Seeker's Name / साधक का नाम
                    </p>
                    <p style="margin:0;font-size:18px;font-weight:300;color:#F4F2EB;letter-spacing:0.04em;">
                      ${name}
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:24px 0;border-bottom:1px solid rgba(255,255,255,0.05);">
                    <p style="margin:0 0 6px;font-family:'Arial',sans-serif;font-size:9px;letter-spacing:0.45em;text-transform:uppercase;color:rgba(166,162,152,0.6);">
                      Reply-To Email / ईमेल पता
                    </p>
                    <p style="margin:0;font-size:16px;font-weight:300;color:#8C4A2A;font-family:monospace;letter-spacing:0.04em;">
                      ${email}
                    </p>
                    <p style="margin:6px 0 0;font-family:'Arial',sans-serif;font-size:9px;letter-spacing:0.3em;text-transform:uppercase;color:rgba(166,162,152,0.4);">
                      ↑ Hit "Reply" in Gmail to respond directly to the seeker
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top:24px;">
                    <p style="margin:0 0 16px;font-family:'Arial',sans-serif;font-size:9px;letter-spacing:0.45em;text-transform:uppercase;color:rgba(166,162,152,0.6);">
                      Spiritual Inquiry / आंतरिक जिज्ञासा
                    </p>
                    <div style="background-color:#070606;border-left:2px solid #8C4A2A;padding:20px 24px;">
                      <p style="margin:0;font-size:16px;font-weight:300;color:#F4F2EB;line-height:1.9;white-space:pre-wrap;">
                        ${question}
                      </p>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 48px 40px;border-top:1px solid rgba(255,255,255,0.06);">
              <p style="margin:0;font-family:'Arial',sans-serif;font-size:9px;letter-spacing:0.4em;text-transform:uppercase;color:rgba(166,162,152,0.4);text-align:center;">
                ✦ Aadhyatmik Pratyaksh Gyan Satsang — Apno Ki Kutiya ✦
              </p>
              <p style="margin:8px 0 0;font-family:'Arial',sans-serif;font-size:9px;letter-spacing:0.3em;text-transform:uppercase;color:rgba(166,162,152,0.25);text-align:center;">
                pratyakshgyan.com
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`.trim();
}

// ─── POST HANDLER ─────────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
    try {
        const body = (await request.json()) as Partial<JigyasaPayload>;

        // ── Validate payload ──────────────────────────────────────────────────
        const { name, email, question } = body;

        if (!name || typeof name !== "string" || name.trim().length < 2) {
            return NextResponse.json(
                { error: "Valid name is required." },
                { status: 400 }
            );
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email.trim())) {
            return NextResponse.json(
                { error: "Valid email address is required." },
                { status: 400 }
            );
        }

        if (!question || typeof question !== "string" || question.trim().length < 10) {
            return NextResponse.json(
                { error: "Please share your question in more detail (min 10 characters)." },
                { status: 400 }
            );
        }

        const cleanName = name.trim();
        const cleanEmail = email.trim();
        const cleanQuestion = question.trim();

        // ── Check for Resend API key ──────────────────────────────────────────
        const resendApiKey = process.env.RESEND_API_KEY;

        if (!resendApiKey) {
            // ── DEV MODE: Log to terminal ─────────────────────────────────────
            console.log("\n");
            console.log("═══════════════════════════════════════════════════════");
            console.log("  ✦ JIGYASA INQUIRY RECEIVED (DEV MODE — No API Key)");
            console.log("═══════════════════════════════════════════════════════");
            console.log(`  Name    : ${cleanName}`);
            console.log(`  Email   : ${cleanEmail}`);
            console.log(`  Reply-To: ${cleanEmail}`);
            console.log(`  To      : aadhyatmikpratyakshgyan@gmail.com`);
            console.log(`  Subject : [Jigyasa] New Inquiry from ${cleanName}`);
            console.log("───────────────────────────────────────────────────────");
            console.log(`  Question:\n  ${cleanQuestion}`);
            console.log("═══════════════════════════════════════════════════════\n");

            return NextResponse.json({ success: true, mode: "dev" }, { status: 200 });
        }

        // ── PRODUCTION MODE: Send via Resend ──────────────────────────────────
        const resendResponse = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${resendApiKey}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                from: "Jigyasa Sanctuary <onboarding@resend.dev>",
                to: ["aadhyatmikpratyakshgyan@gmail.com"],
                reply_to: cleanEmail,
                subject: `[Jigyasa / जिज्ञासा] New Inquiry from ${cleanName}`,
                html: buildEmailHtml(cleanName, cleanEmail, cleanQuestion),
            }),
        });

        if (!resendResponse.ok) {
            const resendError = await resendResponse.json();
            console.error("Resend API error:", resendError);
            return NextResponse.json(
                { error: "Failed to deliver inquiry. Please try again." },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true }, { status: 200 });

    } catch (err) {
        console.error("Jigyasa API error:", err);
        return NextResponse.json(
            { error: "Internal server error." },
            { status: 500 }
        );
    }
}
