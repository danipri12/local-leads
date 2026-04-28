const BASE_URL = `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}`

const headers = {
  Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
  'Content-Type': 'application/json',
}

export interface Lead {
  service: string
  zipCode: string
  urgency: string
  customerName: string
  customerEmail: string
  customerPhone: string
  message?: string
}

export interface Provider {
  id: string
  name: string
  email: string
  services: string[]
  zipCodes: string[]
}

export async function saveLead(lead: Lead): Promise<void> {
  const res = await fetch(`${BASE_URL}/Leads`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      fields: {
        Service: lead.service,
        ZipCode: lead.zipCode,
        Urgency: lead.urgency,
        CustomerName: lead.customerName,
        CustomerEmail: lead.customerEmail,
        CustomerPhone: lead.customerPhone,
        Message: lead.message ?? '',
        Status: 'New',
      },
    }),
  })
  if (!res.ok) {
    const err = await res.json()
    throw new Error(`Airtable save failed: ${JSON.stringify(err)}`)
  }
}

export async function findMatchingProviders(service: string, zipCode: string): Promise<Provider[]> {
  const params = new URLSearchParams({
    filterByFormula: `{Active}=1`,
    'fields[]': 'Name',
  })
  // Fetch all active providers then filter in-memory (fine for <500 providers)
  const res = await fetch(`${BASE_URL}/Providers?filterByFormula=${encodeURIComponent('{Active}=1')}`, {
    headers,
  })
  if (!res.ok) {
    const err = await res.json()
    throw new Error(`Airtable query failed: ${JSON.stringify(err)}`)
  }

  const data = await res.json()
  const records: Provider[] = (data.records ?? []).map((r: any) => ({
    id: r.id,
    name: r.fields.Name ?? '',
    email: r.fields.Email ?? '',
    services: r.fields.Services ?? [],
    zipCodes: ((r.fields.ZipCodes as string) ?? '')
      .split(',')
      .map((z: string) => z.trim())
      .filter(Boolean),
  }))

  return records.filter(
    (p) => p.services.includes(service) && p.zipCodes.includes(zipCode)
  )
}
