'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const SERVICES = [
  'House Cleaning',
  'Lawn Care',
  'Moving',
  'Plumbing',
  'Electrical',
  'Painting',
  'Handyman',
  'HVAC',
  'Pest Control',
  'Pressure Washing',
]

const URGENCY_OPTIONS = [
  { value: 'ASAP', label: 'ASAP (within 24 hours)' },
  { value: 'This Week', label: 'This Week' },
  { value: 'This Month', label: 'This Month' },
  { value: 'Flexible', label: 'Flexible' },
]

const inputClass =
  'w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
const labelClass = 'block text-sm font-medium text-gray-700 mb-1'

export default function LeadForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    service: '',
    zipCode: '',
    urgency: '',
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    message: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Submission failed.')
      router.push('/thank-you')
    } catch (err: any) {
      setError(err.message)
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Service Type *</label>
          <select name="service" value={form.service} onChange={handleChange} required className={inputClass}>
            <option value="">Select a service</option>
            {SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        <div>
          <label className={labelClass}>Zip Code *</label>
          <input
            type="text"
            name="zipCode"
            value={form.zipCode}
            onChange={handleChange}
            required
            placeholder="e.g. 94105"
            pattern="[0-9]{5}"
            title="5-digit zip code"
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>How soon do you need this? *</label>
          <select name="urgency" value={form.urgency} onChange={handleChange} required className={inputClass}>
            <option value="">Select urgency</option>
            {URGENCY_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>

        <div>
          <label className={labelClass}>Your Name *</label>
          <input
            type="text"
            name="customerName"
            value={form.customerName}
            onChange={handleChange}
            required
            placeholder="Jane Smith"
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Email *</label>
          <input
            type="email"
            name="customerEmail"
            value={form.customerEmail}
            onChange={handleChange}
            required
            placeholder="jane@example.com"
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Phone *</label>
          <input
            type="tel"
            name="customerPhone"
            value={form.customerPhone}
            onChange={handleChange}
            required
            placeholder="(555) 123-4567"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>Additional Details (optional)</label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          rows={3}
          placeholder="Describe your needs, access instructions, any specific requirements..."
          className={inputClass}
        />
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {loading ? 'Submitting...' : 'Get Free Quotes →'}
      </button>

      <p className="text-xs text-gray-400 text-center">
        No spam. We only share your info with matched providers in your area.
      </p>
    </form>
  )
}
