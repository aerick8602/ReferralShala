import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function PrivacyPolicy() {
  return (
    <>
      <Navbar />
      <div className="p-4 max-w-6xl mx-auto mt-20">
        <h1 className="text-lg font-bold mb-4 text-center">Privacy and Policies</h1>
        <p className="text-gray-700 mb-8 text-center">
          Your privacy is important to us. This page outlines how we collect, use, and protect your data.
        </p>

        <section className="mb-4">
          <h2 className="text-base font-semibold mb-1">Information Collection</h2>
          <p className="text-gray-700 mb-2 text-sm">
            We may collect personal information such as your name, email address, and contact details when you use our platform.
          </p>
          <p className="text-gray-700 text-sm">
            Non-personal data, such as browser type, operating system, and interaction with our site, may also be collected for analytics purposes.
          </p>
        </section>

        <section className="mb-4">
          <h2 className="text-base font-semibold mb-1">Use of Information</h2>
          <p className="text-gray-700 mb-2">
            We use the information collected to:
          </p>
          <ul className="list-disc list-inside text-gray-800 text-sm">
            <li>Provide, maintain, and improve our services.</li>
            <li>Send updates, notifications, and promotional materials (with your consent).</li>
            <li>Ensure compliance with legal obligations and platform policies.</li>
          </ul>
        </section>

        <section className="mb-4">
          <h2 className="text-base font-semibold mb-1">Data Protection</h2>
          <p className="text-gray-700 text-sm">
            Your data is stored securely, and we implement robust measures to prevent unauthorized access. However, no online service is entirely risk-free. We recommend safeguarding your account credentials.
          </p>
        </section>

        <section className="mb-4">
          <h2 className="text-base font-semibold mb-1">Third-Party Sharing</h2>
          <p className="text-gray-700 text-sm">
            We do not sell or share your personal data with third parties, except when required by law or with trusted service providers that assist us in operating our platform.
          </p>
        </section>

        <section className="mb-4">
          <h2 className="text-base font-semibold mb-1">Your Rights</h2>
          <p className="text-gray-700 text-sm">
            You have the right to access, modify, or delete your personal information. For any concerns or requests, please contact us.
          </p>
        </section>

        <section className="mb-4">
          <h2 className="text-base font-semibold mb-1">Policy Updates</h2>
          <p className="text-gray-700 text-sm">
            We may update this Privacy and Policies page periodically. Any significant changes will be communicated to you via email or platform notifications.
          </p>
        </section>

        <section className="mb-4">
          <h2 className="text-base font-semibold mb-1">Contact Us</h2>
          <p className="text-gray-700 text-sm">
            If you have any questions or concerns about our Privacy and Policies, please contact us at{" "}
            <a href="mailto:support@referralshala.com" className="text-primary underline font-medium">
              support@referralshala.com
            </a>.
          </p>
        </section>
      </div>
      <Footer />
    </>
  );
}
