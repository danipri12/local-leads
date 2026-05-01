import LeadForm from '@/components/LeadForm'

const SERVICES_PREVIEW = [
  'House Cleaning', 'Lawn Care', 'Moving', 'Plumbing',
  'Electrical', 'Painting', 'Handyman', 'HVAC',
]

export default function HomePage() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-blue-600 text-white py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Local Service Quotes<br className="hidden md:block" /> in Minutes
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-xl mx-auto">
            Submit one request. Get matched with trusted local providers. No spam, no middlemen.
          </p>
          <a
            href="#request"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            Get Free Quotes →
          </a>
        </div>
      </section>

      {/* Services strip */}
      <section className="bg-blue-700 py-3 px-4">
        <div className="max-w-3xl mx-auto flex flex-wrap justify-center gap-x-6 gap-y-1">
          {SERVICES_PREVIEW.map((s) => (
            <span key={s} className="text-blue-200 text-sm">{s}</span>
          ))}
          <span className="text-blue-200 text-sm">& more</span>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-10">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: 'Submit Your Request',
                desc: 'Tell us what service you need, your zip code, and how soon.',
              },
              {
                step: '2',
                title: 'Get Matched',
                desc: 'We instantly route your request to qualified providers in your area.',
              },
              {
                step: '3',
                title: 'Receive Quotes',
                desc: 'Providers contact you directly. You pick the best fit.',
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Request form */}
      <section id="request" className="py-16 px-4 bg-gray-50">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-bold mb-1">Request a Service</h2>
            <p className="text-gray-500 text-sm mb-6">
              Free to submit. Providers compete for your business.
            </p>
            <LeadForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 px-4 bg-gray-800 text-gray-400 text-sm text-center">
        <p>© {new Date().getFullYear()} LinkLeader</p>
      </footer>
    </main>
  )
}
