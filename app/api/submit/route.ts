import { NextRequest, NextResponse } from 'next/server'
import { saveLead, findMatchingProviders } from '@/lib/airtable'
import { sendProviderLead, sendCustomerConfirmation } from '@/lib/email'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { service, zipCode, urgency, customerName, customerEmail, customerPhone, message } = body

    if (!service || !zipCode || !urgency || !customerName || !customerEmail || !customerPhone) {
      return NextResponse.json({ error: 'All required fields must be filled.' }, { status: 400 })
    }

    const lead = { service, zipCode, urgency, customerName, customerEmail, customerPhone, message }

    // Save lead first so it's never lost even if emails fail
    await saveLead(lead)

    // Match providers by service + zip code
    const providers = await findMatchingProviders(service, zipCode)

    // Fire emails — allSettled so one bad email doesn't kill the rest
    await Promise.allSettled(
      providers.map((p) => sendProviderLead(p.email, p.name, lead))
    )

    await sendCustomerConfirmation(customerEmail, customerName, service, providers.length)

    return NextResponse.json({ success: true, matched: providers.length })
  } catch (err: any) {
    console.error('[submit]', err)
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
