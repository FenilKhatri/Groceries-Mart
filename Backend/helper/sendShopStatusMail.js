import { sendMailWithLogo } from "./mailer.js";
import { htmlShell } from "./htmlShell.js";
import {
  getShopStatusConfig,
  buildShopStatusBodyHtml,
  buildShopStatusText,
} from "./shopMailTemplate.js";

const sendShopStatusMail = async ({
  type,
  to,
  title,
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
  try {
    const config = getShopStatusConfig(type);

    const finalTitle = title || config.title;

    const bodyHtml = buildShopStatusBodyHtml({
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
      status: status || config.status,
    });

    const html = htmlShell({
      title: finalTitle,
      bodyHtml,
    });

    return await sendMailWithLogo({
      to,
      subject: finalTitle,
      html,
      text: buildShopStatusText({ type, shopName }),
    });
  } catch (error) {
    console.log("Send email error:", error);
    throw error;
  }
};

export default sendShopStatusMail;
