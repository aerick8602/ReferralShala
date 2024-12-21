import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function Page() {
  return (
    <>
      <Navbar />
      <div className="p-6 max-w-6xl mx-auto mt-20">
        <h1 className="text-lg font-bold mb-6 text-center">Contact Us</h1>
        <p className="text-gray-700 mb-8 text-center">
          We are here to assist you! Feel free to reach out to either of us using the contact details below.
        </p>
        <div className="flex flex-wrap justify-center gap-8">
          <div className="w-full sm:w-80 bg-white shadow-lg rounded-lg p-6">
            <div className="w-[130px] h-[130px] rounded-full mx-auto mt-4 mb-4 bg-custom-red flex items-center justify-center">
              <img
                src="/user.png"
                alt="Profile"
                className="w-[120px] h-[120px] rounded-full bg-custom-red"
              />
            </div>
            <h2 className="text-xl font-semibold text-center mb-2">Ayush Katiyar</h2>
            <p className="text-gray-600 text-center mb-4">NIT Bhopal</p>
            <p className="text-gray-700 text-center mb-4 text-sm">
              Hi, I&apos;m Ayush Katiyar. Feel free to reach out for any inquiries or collaborations!
            </p>
            <div className="flex justify-center space-x-4">
              <a
                href="mailto:katiyarayush02@gmail.com.com"
                className="text-primary underline font-medium hover:text-custom-red"
              >
                Email
              </a>
              <a
                href="https://www.linkedin.com/in/ayush-katiyar-6a0935238/"
                target="_blank"
                className="text-primary underline font-medium hover:text-custom-red"
                rel="noreferrer"
              >
                LinkedIn
              </a>
            </div>
          </div>

          <div className="w-full sm:w-80 bg-white shadow-lg rounded-lg p-6">
            <div className="w-[130px] h-[130px] rounded-full mx-auto mt-4 mb-4 bg-custom-red flex items-center justify-center">
              <img
                src="/user.png"
                alt="Profile"
                className="w-[120px] h-[120px] rounded-full bg-custom-red"
              />
            </div>
            <h2 className="text-xl font-semibold text-center mb-2">Aditya Sawner</h2>
            <p className="text-gray-600 text-center mb-4">LNCT Bhopal</p>
            <p className="text-gray-700 text-center mb-4 text-sm">
              Hi, I&apos;m Aditya Sawner. Let&apos;s connect and make amazing things together!
            </p>
            <div className="flex justify-center space-x-4">
              <a
                href="mailto:adityasawner19@gmail.com"
                className="text-primary underline font-medium hover:text-custom-red"
              >
                Email
              </a>
              <a
                href="https://www.linkedin.com/in/aditya-sawner/"
                target="_blank"
                className="text-primary underline font-medium hover:text-custom-red"
                rel="noreferrer"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
