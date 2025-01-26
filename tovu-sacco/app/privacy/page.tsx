export default function PrivacyPage() {
  return (
    <div className="container py-8">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
      <div className="prose prose-slate max-w-none">
        <h2>Information We Collect</h2>
        <p>
          We collect personal information necessary for providing our services, including but not limited to name,
          contact information, identification numbers, and financial information.
        </p>

        <h2>How We Use Your Information</h2>
        <p>Your information is used to:</p>
        <ul>
          <li>Process your membership application</li>
          <li>Manage your account</li>
          <li>Process transactions</li>
          <li>Communicate important updates</li>
          <li>Comply with legal requirements</li>
        </ul>

        <h2>Information Security</h2>
        <p>
          We implement appropriate technical and organizational measures to protect your personal information against
          unauthorized access, alteration, disclosure, or destruction.
        </p>

        <h2>Third-Party Sharing</h2>
        <p>
          We may share your information with third parties only as necessary to provide our services or as required by
          law. We do not sell your personal information to third parties.
        </p>

        <h2>Your Rights</h2>
        <p>You have the right to:</p>
        <ul>
          <li>Access your personal information</li>
          <li>Request corrections to your information</li>
          <li>Request deletion of your information</li>
          <li>Object to processing of your information</li>
          <li>Request data portability</li>
        </ul>
      </div>
    </div>
  )
}

