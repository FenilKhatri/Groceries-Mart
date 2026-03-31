export const categoryToText = (category) =>
  Array.isArray(category) ? category.join(", ") : category || "";

export const htmlShell = ({ title, bodyHtml }) => `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="color-scheme" content="light dark" />
<meta name="supported-color-schemes" content="light dark" />
<title>${title}</title>
<style>
  @media (prefers-color-scheme: dark) {
    .bg { background:#0b1220 !important; }
    .card { background:#0f172a !important; border-color:#1f2a44 !important; }
    .text { color:#e5e7eb !important; }
    .muted { color:#a1a1aa !important; }
    .line { border-color:#1f2a44 !important; }
    .pill { background:#052e2b !important; border-color:#064e3b !important; color:#6ee7b7 !important; }
    .box { background:#0b1220 !important; border-color:#1f2a44 !important; }
    .logoWrap { background:#0f172a !important; border-color:#1f2a44 !important; }
  }
</style>
</head>

<body style="margin:0; padding:0; background:#f6f7fb;" class="bg">
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:#f6f7fb;" class="bg">
    <tr>
      <td align="center" style="padding:24px 12px;">
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:560px;">
          ${bodyHtml}
          <tr>
            <td style="padding:14px 8px 0 8px; text-align:center; font-family:Arial, sans-serif;">
              <p style="margin:0; font-size:11px; color:#9ca3af;" class="muted">
                © ${new Date().getFullYear()} Grocery Mart • This is an automated message.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;