import { categoryToText } from "./htmlShell.js";

const STATUS_CONFIG = {
  approved: {
    title: "Shop is approved!",
    actorLabel: "Approved By",
    actorNameKeyLabel: "Admin name",
    actorEmailKeyLabel: "Admin email",
    actorPhoneKeyLabel: "Admin phone",
    status: "Approved",
    intro: (shopName) => `
      Hi <b>${shopName || "-"}</b> team, your shop has been <b>approved</b> by the admin.
      You can now access vendor panel features (add products, manage orders, etc).
    `,
    summary: (actorName, status) => `
      Approved by <b class="text" style="color:#111827;">${actorName || "Admin"}</b>.
      Status is now <b class="text" style="color:#111827;">${status}</b>.
    `,
    text: (shopName) => `Hi, your shop "${shopName || ""}" has been approved.`,
  },

  rejected: {
    title: "Shop is rejected!",
    actorLabel: "Rejected By",
    actorNameKeyLabel: "Admin name",
    actorEmailKeyLabel: "Admin email",
    actorPhoneKeyLabel: "Admin phone",
    status: "Rejected",
    intro: (shopName) => `
      Hi <b>${shopName || "-"}</b> team, your shop has been <b>rejected</b> by the admin.
    `,
    summary: (actorName, status) => `
      Rejected by <b class="text" style="color:#111827;">${actorName || "Admin"}</b>.
      Status is now <b class="text" style="color:#111827;">${status}</b>.
    `,
    text: (shopName) => `Hi, your shop "${shopName || ""}" has been rejected.`,
  },

  cancelled: {
    title: "Shop is cancelled!",
    actorLabel: "Cancelled By",
    actorNameKeyLabel: "Admin name",
    actorEmailKeyLabel: "Admin email",
    actorPhoneKeyLabel: "Admin phone",
    status: "Cancelled",
    intro: (shopName) => `
      Hi <b>${shopName || "-"}</b> team, your shop has been <b>cancelled</b> by the admin.
    `,
    summary: (actorName, status) => `
      Cancelled by <b class="text" style="color:#111827;">${actorName || "Admin"}</b>.
      Status is now <b class="text" style="color:#111827;">${status}</b>.
    `,
    text: (shopName) => `Hi, your shop "${shopName || ""}" has been cancelled.`,
  },

  deleted: {
    title: "Shop is deleted!",
    actorLabel: "Deleted By",
    actorNameKeyLabel: "Admin name",
    actorEmailKeyLabel: "Admin email",
    actorPhoneKeyLabel: "Admin phone",
    status: "Deleted",
    intro: (shopName) => `
      Hi <b>${shopName || "-"}</b> team, your shop has been <b>deleted</b> by the admin.
    `,
    summary: (actorName, status) => `
      Deleted by <b class="text" style="color:#111827;">${actorName || "Admin"}</b>.
      Status is now <b class="text" style="color:#111827;">${status}</b>.
    `,
    text: (shopName) => `Hi, your shop "${shopName || ""}" has been deleted.`,
  },
};

export const getShopStatusConfig = (type) => {
  const config = STATUS_CONFIG[type];
  if (!config) throw new Error(`Invalid shop mail type: ${type}`);
  return config;
};

export const buildShopStatusBodyHtml = ({
  type,
  actorName,
  actorEmail,
  actorPhone,
  shopName,
  description,
  shopEmail,
  phone,
  category,
  address,
  city,
  pincode,
  status,
}) => {
  const config = getShopStatusConfig(type);
  const categoryText = categoryToText(category);

  return `
    <tr>
      <td style="padding:0 6px 14px 6px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td align="left" style="font-family:Arial, sans-serif;">
              <div class="logoWrap" style="display:inline-block; padding:10px 12px; border-radius:14px; background:#ffffff; border:1px solid #e6e8ef;">
                <img src="https://res.cloudinary.com/daq4ku1br/image/upload/v1772631628/a1eeb6b7-59b6-4ff2-bf52-6d59dfd4c1fc.png" alt="Website Logo" width="120" style="display:block; height:auto;" />
              </div>
            </td>
            <td align="right" style="font-family:Arial, sans-serif;">
              <span style="font-size:12px; color:#6b7280;" class="muted">
                Vendor Shop Notification
              </span>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <tr>
      <td style="background:#ffffff; border:1px solid #e6e8ef; border-radius:18px; overflow:hidden; box-shadow:0 10px 30px rgba(17,24,39,0.08);" class="card">
        <div style="height:6px; background:linear-gradient(90deg, #10b981, #14b8a6);"></div>

        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="padding:22px 20px 8px 20px; font-family:Arial, sans-serif;">
              <h1 style="margin:0; font-size:20px; line-height:1.3; color:#111827;" class="text">
                <p>${config.intro(shopName)}</p>
              </h1>

              <p style="margin:10px 0 0 0; font-size:14px; line-height:1.6; color:#4b5563;" class="muted">
                ${config.summary(actorName, status || config.status)}
              </p>

              <div class="pill" style="display:inline-block; margin-top:12px; padding:8px 12px; border-radius:999px; border:1px solid #bbf7d0; background:#ecfdf5; color:#059669; font-size:12px; font-weight:700;">
                Status: ${status || config.status}
              </div>
            </td>
          </tr>

          <tr>
            <td style="padding:14px 20px 18px 20px; font-family:Arial, sans-serif;">
              <div class="box" style="padding:14px; border-radius:14px; background:#f9fafb; border:1px solid #eef2f7; margin-bottom:14px;">
                <p style="margin:0 0 10px 0; font-size:13px; font-weight:800; color:#111827;" class="text">
                  👤 ${config.actorLabel}
                </p>

                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:13px; color:#374151;" class="muted">
                  <tr><td style="padding:6px 0;"><b class="text" style="color:#111827;">${config.actorNameKeyLabel}:</b> ${actorName || "-"}</td></tr>
                  <tr><td style="padding:6px 0;"><b class="text" style="color:#111827;">${config.actorEmailKeyLabel}:</b> ${actorEmail || "-"}</td></tr>
                  <tr><td style="padding:6px 0;"><b class="text" style="color:#111827;">${config.actorPhoneKeyLabel}:</b> ${actorPhone || "-"}</td></tr>
                </table>
              </div>

              <div class="box" style="padding:14px; border-radius:14px; background:#f9fafb; border:1px solid #eef2f7;">
                <p style="margin:0 0 10px 0; font-size:13px; font-weight:800; color:#111827;" class="text">
                  🏪 Shop Details
                </p>

                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:13px; color:#374151;" class="muted">
                  <tr><td style="padding:6px 0;"><b class="text" style="color:#111827;">Shop name:</b> ${shopName || "-"}</td></tr>
                  <tr><td style="padding:6px 0;"><b class="text" style="color:#111827;">Description:</b> ${description || "-"}</td></tr>
                  <tr><td style="padding:6px 0;"><b class="text" style="color:#111827;">Shop email:</b> ${shopEmail || "-"}</td></tr>
                  <tr><td style="padding:6px 0;"><b class="text" style="color:#111827;">Phone:</b> ${phone || "-"}</td></tr>
                  <tr><td style="padding:6px 0;"><b class="text" style="color:#111827;">Category:</b> ${categoryText || "-"}</td></tr>
                  <tr><td style="padding:6px 0;"><b class="text" style="color:#111827;">Address:</b> ${address || "-"}</td></tr>
                  <tr><td style="padding:6px 0;"><b class="text" style="color:#111827;">City:</b> ${city || "-"}</td></tr>
                  <tr><td style="padding:6px 0;"><b class="text" style="color:#111827;">Pincode:</b> ${pincode || "-"}</td></tr>
                </table>
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  `;
};

export const buildShopStatusText = ({ type, shopName }) => {
  const config = getShopStatusConfig(type);
  return config.text(shopName);
};