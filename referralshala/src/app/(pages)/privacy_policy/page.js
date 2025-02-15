import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import styles from "../../styles/PrivacyPolicy.css";

export default function PrivacyPolicy() {
  return (
    <>
      <Navbar />
      <div className={styles.privacyPolicyContainer_unique}>
        <h1 className={styles.privacyPolicyHeading_unique}>
          Privacy and Policies
        </h1>
        <p className={styles.privacyPolicySubtext_unique}>
          Your privacy is important to us. This page outlines how we collect,
          use, and protect your data.
        </p>

        <section className={styles.privacyPolicySection_unique}>
          <h2 className={styles.privacyPolicySubheading_unique}>
            Information Collection
          </h2>
          <p className={styles.privacyPolicyParagraph_unique}>
            We may collect personal information such as your name, email
            address, and contact details when you use our platform.
          </p>
          <p className={styles.privacyPolicyParagraph_unique}>
            Non-personal data, such as browser type, operating system, and
            interaction with our site, may also be collected for analytics
            purposes.
          </p>
        </section>

        <section className={styles.privacyPolicySection_unique}>
          <h2 className={styles.privacyPolicySubheading_unique}>
            Use of Information
          </h2>
          <p className={styles.privacyPolicyParagraph_unique}>
            We use the information collected to:
          </p>
          <ul className={styles.privacyPolicyList_unique}>
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

        <section className={styles.privacyPolicySection_unique}>
          <h2 className={styles.privacyPolicySubheading_unique}>
            Data Protection
          </h2>
          <p className={styles.privacyPolicyParagraph_unique}>
            Your data is stored securely, and we implement robust measures to
            prevent unauthorized access. However, no online service is entirely
            risk-free. We recommend safeguarding your account credentials.
          </p>
        </section>

        <section className={styles.privacyPolicySection_unique}>
          <h2 className={styles.privacyPolicySubheading_unique}>
            Third-Party Sharing
          </h2>
          <p className={styles.privacyPolicyParagraph_unique}>
            We do not sell or share your personal data with third parties,
            except when required by law or with trusted service providers that
            assist us in operating our platform.
          </p>
        </section>

        <section className={styles.privacyPolicySection_unique}>
          <h2 className={styles.privacyPolicySubheading_unique}>Your Rights</h2>
          <p className={styles.privacyPolicyParagraph_unique}>
            You have the right to access, modify, or delete your personal
            information. For any concerns or requests, please contact us.
          </p>
        </section>

        <section className={styles.privacyPolicySection_unique}>
          <h2 className={styles.privacyPolicySubheading_unique}>
            Policy Updates
          </h2>
          <p className={styles.privacyPolicyParagraph_unique}>
            We may update this Privacy and Policies page periodically. Any
            significant changes will be communicated to you via email or
            platform notifications.
          </p>
        </section>

        <section className={styles.privacyPolicySection_unique}>
          <h2 className={styles.privacyPolicySubheading_unique}>Contact Us</h2>
          <p className={styles.privacyPolicyParagraph_unique}>
            If you have any questions or concerns about our Privacy and
            Policies, please contact us at{" "}
            <a
              href="mailto:support@referralshala.com"
              className={styles.privacyPolicyContactLink_unique}
            >
              support@referralshala.com
            </a>
            .
          </p>
        </section>
      </div>
      <Footer />
    </>
  );
}
