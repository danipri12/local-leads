import { NextResponse } from 'next/server'

export async function GET() {
  const results: Record<string, any> = {}

  // 1. Check env vars are present
  results.env = {
    AIRTABLE_API_KEY: !!process.env.AIRTABLE_API_KEY,
    AIRTABLE_BASE_ID: !!process.env.AIRTABLE_BASE_ID,
    GMAIL_USER: !!process.env.GMAIL_USER,
    GMAIL_APP_PASSWORD: !!process.env.GMAIL_APP_PASSWORD,
    BASE_ID_VALUE: process.env.AIRTABLE_BASE_ID ?? '(not set)',
  }

  // 2. Try listing tables in the base
  try {
    const metaRes = await fetch(
      `https://api.airtable.com/v0/meta/bases/${process.env.AIRTABLE_BASE_ID}/tables`,
      { headers: { Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}` } }
    )
    const meta = await metaRes.json()
    results.airtable_meta = {
      status: metaRes.status,
      tables: meta.tables?.map((t: any) => ({
        name: t.name,
        fields: t.fields?.map((f: any) => `${f.name} (${f.type})`),
      })) ?? meta,
    }
  } catch (e: any) {
    results.airtable_meta = { error: e.message }
  }

  // 3. Try reading Providers table
  try {
    const provRes = await fetch(
      `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/Providers?maxRecords=3`,
      { headers: { Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}` } }
    )
    const provData = await provRes.json()
    results.providers_table = { status: provRes.status, body: provData }
  } catch (e: any) {
    results.providers_table = { error: e.message }
  }

  // 4. Try reading Leads table
  try {
    const leadsRes = await fetch(
      `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/Leads?maxRecords=1`,
      { headers: { Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}` } }
    )
    const leadsData = await leadsRes.json()
    results.leads_table = { status: leadsRes.status, body: leadsData }
  } catch (e: any) {
    results.leads_table = { error: e.message }
  }

  return NextResponse.json(results, { status: 200 })
}
