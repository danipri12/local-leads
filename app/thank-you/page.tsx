import Link from 'next/link'

export default function ThankYouPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-10 max-w-md w-full text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
          <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold mb-2">Request Submitted!</h1>
        <p className="text-gray-500 mb-6 leading-relaxed">
          We've matched your request with local providers. Check your email — you should hear back within a few hours.
        </p>
        <p className="text-sm text-gray-400 mb-6">
          Didn't get an email? Check your spam folder or{' '}
          <a href="mailto:hello@localleads.com" className="text-blue-600 hover:underline">
            contact us
          </a>
          .
        </p>
        <Link href="/" className="text-blue-600 hover:underline text-sm">
          ← Submit another request
        </Link>
      </div>
    </main>
  )
}
