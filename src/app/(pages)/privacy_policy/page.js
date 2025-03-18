"use client";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import "../../styles/PrivacyPolicy.css";
import { useSearchParams } from "next/navigation";

export default function PrivacyPolicy() {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  const userType = searchParams.get("userType");

  return (
    <>
      <Navbar userId={userId} userType={userType} />
      <div className="privacyPolicyContainer">
        <h1 className="privacyPolicyHeading">Privacy and Policies</h1>
        <p className="privacyPolicySubtext">
          Your privacy is important to us. This page outlines how we collect,
          use, and protect your data.
        </p>

        <section className="privacyPolicySection">
          <h3 className="privacyPolicySubheading">Information Collection</h3>
          <p className="privacyPolicyParagraph">
            We may collect personal information such as your name, email
            address, and contact details when you use our platform.
          </p>
          <p className="privacyPolicyParagraph">
            Non-personal data, such as browser type, operating system, and
            interaction with our site, may also be collected for analytics
            purposes.
          </p>
        </section>

        <section className="privacyPolicySection">
          <h3 className="privacyPolicySubheading">Use of Information</h3>
          <p className="privacyPolicyParagraph">
            We use the information collected to:
          </p>
          <ul className="privacyPolicyList">
            <li>Provide, maintain, and improve our services.</li>
            <li>
              Send updates, notifications, and promotional materials (with your
              consent).
            </li>
            <li>
              Ensure compliance with legal obligations and platform policies.
            </li>
          </ul>
        </section>

        <section className="privacyPolicySection">
          <h3 className="privacyPolicySubheading">Data Protection</h3>
          <p className="privacyPolicyParagraph">
            Your data is stored securely, and we implement robust measures to
            prevent unauthorized access. However, no online service is entirely
            risk-free. We recommend safeguarding your account credentials.
          </p>
        </section>

        <section className="privacyPolicySection">
          <h3 className="privacyPolicySubheading">Third-Party Sharing</h3>
          <p className="privacyPolicyParagraph">
            We do not sell or share your personal data with third parties,
            except when required by law or with trusted service providers that
            assist us in operating our platform.
          </p>
        </section>

        <section className="privacyPolicySection">
          <h3 className="privacyPolicySubheading">Your Rights</h3>
          <p className="privacyPolicyParagraph">
            You have the right to access, modify, or delete your personal
            information. For any concerns or requests, please contact us.
          </p>
        </section>

        <section className="privacyPolicySection">
          <h3 className="privacyPolicySubheading">Policy Updates</h3>
          <p className="privacyPolicyParagraph">
            We may update this Privacy and Policies page periodically. Any
            significant changes will be communicated to you via email or
            platform notifications.
          </p>
        </section>

        <section className="privacyPolicySection">
          <h3 className="privacyPolicySubheading">Contact Us</h3>
          <p className="privacyPolicyParagraph">
            If you have any questions or concerns about our Privacy and
            Policies, please contact us at{" "}
            <a
              href="mailto:support@referralshala.com"
              className="privacyPolicyContactLink"
            >
              support@referralshala.com
            </a>
            .
          </p>
        </section>
      </div>
      <Footer userId={userId} userType={userType} />
    </>
  );
}
