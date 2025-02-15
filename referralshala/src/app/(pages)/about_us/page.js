import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import "../../styles/AboutPage.css"; // Import the CSS file

export default function Page() {
  return (
    <>
      <Navbar />
      <div className="about-page-container">
        <h1 className="about-page-title">About Referral Shala</h1>
        <div className="about-page-card">
          <h1 className="about-page-heading">Your Gateway to Career Success</h1>
          <p className="about-page-text">
            At <strong>Referral Shala</strong>, we believe that the right
            connection can transform your career. Our platform is designed to
            bridge the gap between talented professionals and top-tier companies
            through the power of trusted referrals. Whether you're seeking your
            dream job or looking to expand your professional network, Referral
            Shala is here to help you every step of the way.
          </p>
          <p className="about-page-text">
            We understand that finding the right opportunity can be challenging.
            That's why we've created a seamless, referral-based ecosystem that
            connects you with exclusive job openings and industry leaders. Join
            us and take the first step toward a brighter future.
          </p>
        </div>

        <div className="about-page-card">
          <h2 className="about-page-subheading">Our Mission</h2>
          <p className="about-page-text">
            Our mission is simple: to empower professionals by creating
            meaningful connections that drive growth. We aim to build a
            community where talent meets opportunity, and where every referral
            can lead to a life-changing career move.
          </p>
          <p className="about-page-text">
            By leveraging the power of referrals, we ensure that candidates are
            matched with roles that align with their skills, passions, and
            career goals. At the same time, we help companies discover top
            talent through trusted recommendations.
          </p>
        </div>

        <div className="about-page-card">
          <h2 className="about-page-subheading">Our Core Values</h2>
          <ul className="about-page-list">
            <li>
              🌟 <strong>Empowerment:</strong> We provide the tools and
              resources you need to take control of your career.
            </li>
            <li>
              🤝 <strong>Collaboration:</strong> We believe in the power of
              community and working together to achieve success.
            </li>
            <li>
              🎯 <strong>Excellence:</strong> We strive to deliver the best
              experience for both candidates and employers.
            </li>
            <li>
              💡 <strong>Innovation:</strong> We continuously evolve to meet the
              changing needs of the job market.
            </li>
          </ul>
        </div>

        <div className="about-page-card">
          <h2 className="about-page-subheading">What We Offer</h2>
          <div className="about-page-grid">
            <div className="about-page-grid-item">
              <h3 className="about-page-grid-title">
                Exclusive Job Opportunities
              </h3>
              <p className="about-page-grid-text">
                Gain access to hidden job openings that are only available
                through referrals. We connect you with roles that match your
                skills and aspirations.
              </p>
            </div>
            <div className="about-page-grid-item">
              <h3 className="about-page-grid-title">Professional Networking</h3>
              <p className="about-page-grid-text">
                Build meaningful connections with industry leaders and
                like-minded professionals. Expand your network and unlock new
                opportunities.
              </p>
            </div>
            <div className="about-page-grid-item">
              <h3 className="about-page-grid-title">Career Guidance</h3>
              <p className="about-page-grid-text">
                Get personalized advice and resources to help you navigate your
                career path. From resume reviews to interview tips, we've got
                you covered.
              </p>
            </div>
          </div>
        </div>

        <div className="about-page-card">
          <h2 className="about-page-subheading">Join Our Community</h2>
          <p className="about-page-text">
            Ready to take the next step in your career? Join Referral Shala
            today and become part of a thriving community of professionals who
            are shaping the future of work. Whether you're a job seeker, a
            recruiter, or someone looking to make a difference, we welcome you
            to our platform.
          </p>
          <p className="about-page-text">
            Together, we can redefine the way careers are built. Let's connect,
            grow, and succeed together.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
