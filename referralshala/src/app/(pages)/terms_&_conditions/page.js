"use client";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import "../../styles/TermsAndConditions.css";
import { useSearchParams } from "next/navigation";

export default function TermsAndConditions() {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  return (
    <>
      <Navbar userId={userId} />
      <div className="termsContainer">
        <h1 className="termsHeading">Terms & Conditions</h1>

        <p className="termsParagraph">
          Welcome to our Terms and Conditions page. These terms ensure a fair
          experience for all users of our job referral platform. By accessing
          and using our platform, you agree to abide by these terms. Please read
          them carefully.
        </p>

        <h3 className="termsSubheading">Eligibility Criteria</h3>
        <ul className="termsList">
          <li>
            All users must register on the platform with valid credentials.
          </li>
          <li>Only referrals that meet job listing requirements are valid.</li>
          <li>
            Users must be at least 18 years old or meet legal age requirements.
          </li>
          <li>Conflicting interests must not interfere with participation.</li>
        </ul>

        <h3 className="termsSubheading">Referral Program Guidelines</h3>
        <ul className="termsList">
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

        <h3 className="termsSubheading">Platform Usage Terms</h3>
        <ul className="termsList">
          <li>
            Users must engage respectfully and avoid inappropriate content.
          </li>
          <li>Activity may be reviewed for compliance with terms.</li>
          <li>Unauthorized sharing of confidential data is prohibited.</li>
          <li>Job listings must not be misused or redistributed.</li>
        </ul>

        <h3 className="termsSubheading">Reward and Payment Policies</h3>
        <ul className="termsList">
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

        <h3 className="termsSubheading">Termination of Accounts</h3>
        <ul className="termsList">
          <li>
            Fraudulent users will have accounts terminated without notice.
          </li>
          <li>
            Inactive accounts may be suspended and require reactivation
            requests.
          </li>
          <li>Users can delete their accounts by sending a formal request.</li>
        </ul>

        <h3 className="termsSubheading">Confidentiality and Privacy</h3>
        <ul className="termsList">
          <li>User data is handled in compliance with the Privacy Policy.</li>
          <li>Employers must maintain job listing confidentiality.</li>
          <li>Privacy law breaches will be addressed legally.</li>
        </ul>

        <h3 className="termsSubheading">Dispute Resolution</h3>
        <ul className="termsList">
          <li>Disputes must be reported to support for resolution.</li>
          <li>The platform reserves the right to investigate disputes.</li>
          <li>The platform's decision on disputes is final.</li>
        </ul>

        <h3 className="termsSubheading">Modification of Terms</h3>
        <p className="termsParagraph">
          These terms and conditions may be updated periodically. Continued use
          of the platform constitutes agreement to the revised terms.
        </p>

        <h3 className="termsSubheading">Contact Us</h3>
        <p className="termsParagraph">
          For questions or support, reach out to{" "}
          <a
            href="mailto:support@referralshala.com"
            className="termsContactLink"
          >
            support@referralshala.com
          </a>
          .
        </p>
      </div>
      <Footer userId={userId} />
    </>
  );
}
