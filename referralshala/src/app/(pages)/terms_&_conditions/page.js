import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import "../../styles/Term&Conditions.css";
export default function Page() {
  return (
    <>
      <Navbar />
      <div className="container">
        <h1>Terms & Conditions</h1>

        <h2>Items and Conditions</h2>
        <p>
          Welcome to our Items and Conditions page. These terms and conditions
          are designed to ensure a seamless and fair experience for all users of
          our job referral platform. By accessing and using our platform, you
          agree to abide by these terms. Please read them carefully.
        </p>

        <h2>Eligibility Criteria</h2>
        <ul>
          <li>
            All users must register on the platform with valid credentials.
          </li>
          <li>Only referrals that meet job listing requirements are valid.</li>
          <li>
            Users must be at least 18 years old or meet legal age requirements.
          </li>
          <li>Conflicting interests must not interfere with participation.</li>
        </ul>

        <h2>Referral Program Guidelines</h2>
        <ul>
          <li>Referrals must be submitted using the unique referral link.</li>
          <li>
            A referral is successful when the candidate completes all hiring
            steps.
          </li>
          <li>Rewards are processed only after employment confirmation.</li>
          <li>
            Fraudulent activities will result in permanent disqualification.
          </li>
          <li>Users must ensure candidates are genuinely interested.</li>
        </ul>

        <h2>Platform Usage Terms</h2>
        <ul>
          <li>
            Users must engage respectfully and avoid inappropriate content.
          </li>
          <li>Activity may be reviewed for compliance with terms.</li>
          <li>Unauthorized sharing of confidential data is prohibited.</li>
          <li>Job listings must not be misused or redistributed.</li>
        </ul>

        <h2>Reward and Payment Policies</h2>
        <ul>
          <li>
            Rewards are credited within 15–30 business days after validation.
          </li>
          <li>Payments are issued via the selected payment method.</li>
          <li>Users must comply with local tax regulations.</li>
          <li>
            The platform reserves the right to withhold rewards under
            investigation.
          </li>
        </ul>

        <h2>Termination of Accounts</h2>
        <ul>
          <li>
            Fraudulent users will have accounts terminated without notice.
          </li>
          <li>
            Inactive accounts may be suspended and require reactivation
            requests.
          </li>
          <li>Users can delete their accounts by sending a formal request.</li>
        </ul>

        <h2>Confidentiality and Privacy</h2>
        <ul>
          <li>User data is handled in compliance with the Privacy Policy.</li>
          <li>Employers must maintain job listing confidentiality.</li>
          <li>Privacy law breaches will be addressed legally.</li>
        </ul>

        <h2>Dispute Resolution</h2>
        <ul>
          <li>Disputes must be reported to support for resolution.</li>
          <li>The platform reserves the right to investigate disputes.</li>
          <li>The platform's decision on disputes is final.</li>
        </ul>

        <h2>Modification of Terms</h2>
        <p>
          These terms and conditions may be updated periodically. Continued use
          of the platform constitutes agreement to the revised terms.
        </p>

        <h2>Contact Us</h2>
        <p>
          For questions or support, reach out to{" "}
          <a href="mailto:support@referralshala.com">
            support@referralshala.com
          </a>
          .
        </p>
      </div>
      <Footer />
    </>
  );
}
