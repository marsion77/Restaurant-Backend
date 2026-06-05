const nodemailer = require('nodemailer');

// ── Shared transporter ────────────────────────────────────────────────────────
const createTransporter = () =>
  nodemailer.createTransport({
    host:   process.env.SMTP_HOST,
    port:   parseInt(process.env.SMTP_PORT, 10),
    secure: false, // TLS via STARTTLS on port 587
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

// ── 1. OTP Email ──────────────────────────────────────────────────────────────
const sendOTPEmail = async (to, otp) => {
  const transporter = createTransporter();

  const mailOptions = {
    from:    `"Sky Bowl 🍜" <${process.env.FROM_EMAIL}>`,
    to,
    subject: 'Your Sky Bowl Verification Code',
    html: `
      <div style="font-family:'Segoe UI',sans-serif;max-width:480px;margin:0 auto;background:#0f172a;border-radius:16px;overflow:hidden;">
        <div style="background:linear-gradient(135deg,#0ea5e9,#10b981);padding:32px 24px;text-align:center;">
          <h1 style="color:#fff;margin:0;font-size:28px;letter-spacing:-0.5px;">Sky Bowl</h1>
          <p style="color:rgba(255,255,255,0.85);margin:4px 0 0;font-size:13px;">Premium Food Ordering</p>
        </div>
        <div style="padding:32px 24px;">
          <h2 style="color:#f1f5f9;font-size:20px;margin:0 0 8px;">Verification Code</h2>
          <p style="color:#94a3b8;font-size:14px;margin:0 0 24px;">Use the code below to verify your identity. It expires in 10 minutes.</p>
          <div style="background:#1e293b;border:2px solid #0ea5e9;border-radius:12px;padding:24px;text-align:center;margin-bottom:24px;">
            <span style="font-size:42px;font-weight:700;letter-spacing:10px;color:#0ea5e9;font-family:monospace;">${otp}</span>
          </div>
          <p style="color:#64748b;font-size:12px;text-align:center;">If you did not request this, please ignore this email.</p>
        </div>
      </div>
    `
  };

  const info = await transporter.sendMail(mailOptions);
  console.log(`✅ OTP email sent to ${to} [${info.messageId}]`);
  return info;
};

// ── 2. Order Confirmation Email ───────────────────────────────────────────────
const sendOrderConfirmationEmail = async (to, { orderId, items, totalAmount, address }) => {
  const transporter = createTransporter();

  const itemRows = items.map(item => `
    <tr>
      <td style="padding:10px 12px;color:#e2e8f0;border-bottom:1px solid #1e293b;">${item.name}</td>
      <td style="padding:10px 12px;color:#94a3b8;text-align:center;border-bottom:1px solid #1e293b;">${item.quantity}</td>
      <td style="padding:10px 12px;color:#94a3b8;text-align:right;border-bottom:1px solid #1e293b;">₹${item.price.toFixed(2)}</td>
      <td style="padding:10px 12px;color:#10b981;font-weight:600;text-align:right;border-bottom:1px solid #1e293b;">₹${(item.price * item.quantity).toFixed(2)}</td>
    </tr>
  `).join('');

  const mailOptions = {
    from:    `"Sky Bowl 🍜" <${process.env.FROM_EMAIL}>`,
    to,
    subject: `Order Confirmed! #${orderId} — Sky Bowl`,
    html: `
      <div style="font-family:'Segoe UI',sans-serif;max-width:600px;margin:0 auto;background:#0f172a;border-radius:16px;overflow:hidden;">

        <!-- Header -->
        <div style="background:linear-gradient(135deg,#0ea5e9,#10b981);padding:36px 24px;text-align:center;">
          <h1 style="color:#fff;margin:0;font-size:32px;letter-spacing:-0.5px;">Sky Bowl</h1>
          <p style="color:rgba(255,255,255,0.9);margin:6px 0 0;font-size:14px;">Premium Food Ordering</p>
        </div>

        <!-- Success Banner -->
        <div style="background:#064e3b;padding:20px 24px;text-align:center;border-bottom:2px solid #10b981;">
          <p style="color:#10b981;font-size:22px;font-weight:700;margin:0;">✅ Order Confirmed!</p>
          <p style="color:#6ee7b7;font-size:13px;margin:6px 0 0;">Thank you for ordering with us. We're preparing your meal!</p>
        </div>

        <!-- Order ID -->
        <div style="padding:24px;text-align:center;">
          <p style="color:#64748b;font-size:12px;margin:0;text-transform:uppercase;letter-spacing:1px;">Order ID</p>
          <p style="color:#0ea5e9;font-size:24px;font-weight:700;margin:4px 0 0;font-family:monospace;">${orderId}</p>
        </div>

        <!-- Items Table -->
        <div style="padding:0 24px 24px;">
          <table style="width:100%;border-collapse:collapse;background:#1e293b;border-radius:12px;overflow:hidden;">
            <thead>
              <tr style="background:#0ea5e9;">
                <th style="padding:12px;color:#fff;text-align:left;font-size:13px;">Item</th>
                <th style="padding:12px;color:#fff;text-align:center;font-size:13px;">Qty</th>
                <th style="padding:12px;color:#fff;text-align:right;font-size:13px;">Price</th>
                <th style="padding:12px;color:#fff;text-align:right;font-size:13px;">Subtotal</th>
              </tr>
            </thead>
            <tbody>${itemRows}</tbody>
            <tfoot>
              <tr>
                <td colspan="3" style="padding:14px 12px;color:#94a3b8;font-weight:600;text-align:right;font-size:14px;">Total:</td>
                <td style="padding:14px 12px;color:#10b981;font-weight:700;text-align:right;font-size:18px;">₹${totalAmount.toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>
        </div>

        <!-- Delivery Address -->
        <div style="padding:0 24px 24px;">
          <div style="background:#1e293b;border-radius:12px;padding:16px 20px;">
            <p style="color:#94a3b8;font-size:12px;text-transform:uppercase;letter-spacing:1px;margin:0 0 8px;">Delivery Address</p>
            <p style="color:#e2e8f0;font-size:14px;margin:0;line-height:1.6;">
              <strong>${address.name}</strong><br/>
              ${address.address1}${address.address2 ? ', ' + address.address2 : ''}<br/>
              📞 ${address.mobile}
            </p>
          </div>
        </div>

        <!-- Footer -->
        <div style="background:#0f172a;border-top:1px solid #1e293b;padding:20px 24px;text-align:center;">
          <p style="color:#475569;font-size:12px;margin:0;">© 2025 Sky Bowl. All rights reserved.</p>
          <p style="color:#475569;font-size:11px;margin:4px 0 0;">Questions? Reply to this email.</p>
        </div>
      </div>
    `
  };

  const info = await transporter.sendMail(mailOptions);
  console.log(`✅ Order confirmation email sent to ${to} [${info.messageId}]`);
  return info;
};

module.exports = { sendOTPEmail, sendOrderConfirmationEmail };
