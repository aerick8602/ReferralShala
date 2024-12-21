import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function Page() {
  return (
    <>
      <Navbar />
      <div className="p-6 max-w-6xl mx-auto mt-20">
      <h1 className="text-lg font-bold mb-6 text-center">Terms & Conditions</h1>
        <h1 className="text-base font-bold text-gray-800 mb-3">Items and Conditions</h1>
        <p className="text-gray-700 mb-3 text-sm">
          Welcome to our Items and Conditions page. These terms and conditions are designed to ensure a seamless and fair experience for all users of our job referral platform. By accessing and using our platform, you agree to abide by these terms. Please read them carefully.
        </p>

        <h2 className="text-base font-semibold mb-2">Eligibility Criteria</h2>
        <ul className="list-decimal list-inside text-gray-800 mb-3">
          <li className="text-sm">
            All users must register on the platform with valid credentials, including accurate personal and professional details.
          </li>
          <li className="text-sm">
            Only referrals that meet the requirements specified in job listings or company criteria will be considered valid.
          </li>
          <li className="text-sm">
            Users must be at least 18 years old or meet the legal age requirement of their country to participate in the referral program.
          </li>
          <li className="text-sm">
            Individuals must not have any conflicting interests or existing employment terms that prevent them from participating.
          </li>
        </ul>

        <h2 className="text-base font-semibold mb-2">Referral Program Guidelines</h2>
        <ul className="list-decimal list-inside text-gray-800 mb-3">
          <li className="text-sm">
            Referrals must be submitted through the platform using the unique referral link, code, or other provided methods.
          </li>
          <li className="text-sm">
            A referral is considered successful when the referred candidate completes all hiring steps, including interviews and verification processes.
          </li>
          <li className="text-sm">
            Rewards are processed only after the hiring company confirms the candidate's employment and completion of the required probationary period, if applicable.
          </li>
          <li className="text-sm">
            Fraudulent activities, such as creating fake profiles or submitting false referrals, are strictly prohibited and will result in permanent disqualification.
          </li>
          <li className="text-sm">
            Users are encouraged to ensure that referred candidates are genuinely interested in the position to maintain the platform’s integrity.
          </li>
        </ul>

        <h2 className="text-base font-semibold mb-2">Platform Usage Terms</h2>
        <ul className="list-decimal list-inside text-gray-800 mb-3">
          <li className="text-sm">
            Users must engage respectfully with others on the platform and avoid posting inappropriate, offensive, or misleading content.
          </li>
          <li className="text-sm">
            The platform may periodically review user activities to ensure compliance with the terms and conditions.
          </li>
          <li className="text-sm">
            The sharing of proprietary or confidential information obtained through the platform without authorization is prohibited.
          </li>
          <li className="text-sm">
            Job listings and related information must not be replicated, distributed, or used for unauthorized purposes outside the platform.
          </li>
        </ul>

        <h2 className="text-base font-semibold mb-2">Reward and Payment Policies</h2>
        <ul className="list-decimal list-inside text-gray-800 mb-3">
          <li className="text-sm">
            Rewards for successful referrals will be credited within 15–30 business days of validation by the hiring company.
          </li>
          <li className="text-sm">
            Payments will be issued via the payment method selected by the user during account setup. It is the user’s responsibility to ensure payment details are accurate.
          </li>
          <li className="text-sm">
            Taxes or deductions applicable to rewards must be borne by the user, in compliance with their local regulations.
          </li>
          <li className="text-sm">
            The platform reserves the right to withhold rewards for referrals under investigation or in violation of the terms.
          </li>
        </ul>

        <h2 className="text-base font-semibold mb-2">Termination of Accounts</h2>
        <ul className="list-decimal list-inside text-gray-800 mb-3">
          <li className="text-sm">
            Accounts found engaging in fraudulent activities, spamming, or violating the terms will be terminated without prior notice.
          </li>
          <li className="text-sm">
            Users who have been inactive for an extended period may have their accounts suspended. Reactivation requests can be sent to support.
          </li>
          <li className="text-sm">
            If a user wishes to delete their account, they must send a formal request to the support team.
          </li>
        </ul>

        <h2 className="text-base font-semibold mb-2">Confidentiality and Privacy</h2>
        <ul className="list-decimal list-inside text-gray-800 mb-3">
          <li className="text-sm">
            User data, including referral details and payment information, will be handled in compliance with our Privacy Policy.
          </li>
          <li className="text-sm">
            Employers and users are expected to maintain confidentiality regarding job openings and referrals submitted on the platform.
          </li>
          <li className="text-sm">
            Any breach of privacy laws by users or hiring companies will be dealt with as per applicable legal standards.
          </li>
        </ul>

        <h2 className="text-base font-semibold mb-2">Dispute Resolution</h2>
        <ul className="list-decimal list-inside text-gray-800 mb-3">
          <li className="text-sm">
            Any disputes arising from referrals, rewards, or platform usage must be reported to the support team for resolution.
          </li>
          <li className="text-sm">
            The platform reserves the right to investigate disputes thoroughly and may require additional documentation from users.
          </li>
          <li className="text-sm">
            The decision of the platform regarding disputes will be final and binding.
          </li>
        </ul>

        <h2 className="text-base font-semibold mb-2">Modification of Terms</h2>
        <p className="text-gray-700 mb-3 text-sm">
          These terms and conditions may be updated periodically to reflect changes in policies or regulations. Significant updates will be communicated through email or platform notifications. Continued use of the platform after updates constitutes agreement to the revised terms.
        </p>

        <h2 className="text-base font-semibold mb-2">Contact Us</h2>
        <p className="text-gray-700 text-sm ">
          For further questions, clarifications, or support, please reach out to our team at{" "}
          <a href="mailto:support@referralshala.com" className="text-primary font-medium underline">
            support@referralshala.com
          </a>
          . We are here to assist and ensure your experience with ReferralShala is rewarding and seamless.
        </p>
      </div>
      <Footer />
    </>
  );
}
