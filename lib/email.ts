import { createTransport } from 'nodemailer'
import type { Lead } from './airtable'

const transporter = createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
})

export async function sendProviderLead(
  providerEmail: string,
  providerName: string,
  lead: Lead
): Promise<void> {
  await transporter.sendMail({
    from: `LinkLeader <${process.env.GMAIL_USER}>`,
    to: providerEmail,
    subject: `New Lead: ${lead.service} in ${lead.zipCode}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#111;">
        <h2 style="color:#2563eb;margin-bottom:4px;">New Lead — Act Fast</h2>
        <p style="color:#555;margin-top:0;">Hi ${providerName}, a customer is looking for <strong>${lead.service}</strong> in <strong>${lead.zipCode}</strong>.</p>

        <div style="background:#f3f4f6;padding:20px;border-radius:8px;margin:20px 0;">
          <h3 style="margin-top:0;">Request Details</h3>
          <p><strong>Service:</strong> ${lead.service}</p>
          <p><strong>Zip Code:</strong> ${lead.zipCode}</p>
          <p><strong>Urgency:</strong> ${lead.urgency}</p>
          ${lead.message ? `<p><strong>Notes:</strong> ${lead.message}</p>` : ''}
        </div>

        <div style="background:#dbeafe;padding:20px;border-radius:8px;margin:20px 0;">
          <h3 style="margin-top:0;">Customer Contact</h3>
          <p><strong>Name:</strong> ${lead.customerName}</p>
          <p><strong>Email:</strong> <a href="mailto:${lead.customerEmail}">${lead.customerEmail}</a></p>
          <p><strong>Phone:</strong> <a href="tel:${lead.customerPhone}">${lead.customerPhone}</a></p>
        </div>

        <p style="color:#6b7280;font-size:13px;">
          Reach out within 24 hours — customers who get fast responses convert at 3x the rate.
        </p>
      </div>
    `,
  })
}

export async function sendCustomerConfirmation(
  customerEmail: string,
  customerName: string,
  service: string,
  matchCount: number
): Promise<void> {
  const matched =
    matchCount > 0
      ? `We've notified <strong>${matchCount} local provider${matchCount !== 1 ? 's' : ''}</strong> who match your request. Expect to hear back within a few hours.`
      : `We're actively looking for providers in your area. We'll reach out as soon as we find a match.`

  await transporter.sendMail({
    from: `LinkLeader <${process.env.GMAIL_USER}>`,
    to: customerEmail,
    subject: `Your ${service} request has been received`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#111;">
        <h2 style="color:#2563eb;">Request Received!</h2>
        <p>Hi ${customerName},</p>
        <p>${matched}</p>
        <p>If you don't receive a response within 24 hours, reply to this email and we'll follow up directly.</p>
        <p style="color:#6b7280;font-size:13px;">— The LinkLeader Team</p>
      </div>
    `,
  })
}
