import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function Page() {
  return (
    <>
      <Navbar />
      <div className="px-8 py-16 max-w-5xl mx-auto mt-10">
      <h1 className="text-lg font-bold mb-6 text-center">About Us</h1>
        <div className="text-center bg-white shadow-md rounded-xl p-8 mb-10">
          <h1 className="text-4xl font-bold text-primary  mb-8">The Bridge to New Opportunities</h1>
          <p className="text-base text-gray-700 mb-6">
            Welcome to <strong>Referral Shala</strong>, your gateway to endless career opportunities! At Referral Shala, we aim to
            connect talented individuals with the right opportunities through trusted referrals. Our platform is designed to simplify
            the referral process, making it easier for professionals to discover their next big role.
          </p>
        </div>

        <div className="bg-white shadow-md rounded-xl p-8 mb-10">
          <h2 className="text-2xl text-center font-semibold text-primary mb-6">Our Mission</h2>
          <p className="text-base text-center text-gray-700 mb-6">
            Our mission is to foster a community of skilled candidates and forward-thinking recruiters who share the same goal:
            growth. By using the power of referrals, we create a dynamic ecosystem where professionals can thrive, grow, and connect.
          </p>
          <p className="text-base text-center text-gray-700 mb-6">
            Whether you're looking to land your dream job, expand your professional network, or help someone else succeed, Referral Shala
            makes it possible. We believe that the right connections can transform careers and build successful futures.
          </p>
        </div>

        <div className="bg-white shadow-md rounded-xl p-8 mb-10">
          <h2 className="text-2xl text-center font-semibold text-primary mb-6">Our Core Values</h2>
          <ul className="list-disc list-inside text-base text-gray-700">
            <li>🌟 <strong>Empowerment</strong> - Providing a platform where users can access exclusive opportunities and career resources.</li>
            <li>🤝 <strong>Collaboration</strong> - Building a network of professionals who can share and benefit from referrals.</li>
            <li>🎯 <strong>Success</strong> - Rewarding individuals who contribute to the growth of others by referring talented candidates.</li>
          </ul>
        </div>

        <div className="bg-white shadow-md rounded-xl p-8 mb-10">
          <h2 className="text-2xl text-center font-semibold text-primary mb-6">What We Offer</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div className="shadow-md rounded-xl p-6">
              <h3 className="text-base font-semibold text-primary mb-4">Exclusive Job Opportunities</h3>
              <p className="text-gray-700">
                Discover roles that match your skills and experience, and get access to job openings that are available through referrals.
              </p>
            </div>
            <div className="shadow-md rounded-xl p-6">
              <h3 className="text-base font-semibold text-primary mb-4">Network Growth</h3>
              <p className="text-gray-700">
                Build valuable connections with professionals in your industry and grow your network with the help of trusted referrals.
              </p>
            </div>
            <div className="shadow-md rounded-xl p-6">
              <h3 className="text-base font-semibold text-primary mb-4">Referral Rewards</h3>
              <p className="text-gray-700">
                Receive recognition and rewards for referring top candidates to the right roles, making your network work for you.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-xl p-8">
          <h2 className="text-2xl text-center font-semibold text-primary mb-6">Join Our Community</h2>
          <p className="text-base text-gray-700 mb-6 text-center">
            Ready to take your career to the next level? Join Referral Shala today and begin exploring the vast opportunities available to you
            through referrals. Whether you're a candidate seeking new challenges or a professional eager to make a difference in someone’s
            career, we’re here to help you succeed.
          </p>
          <p className="text-base text-gray-700 text-center">
            Together, we can reshape the way professional connections are made. Let’s grow, connect, and succeed together.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
