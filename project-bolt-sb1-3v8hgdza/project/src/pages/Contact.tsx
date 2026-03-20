import { useNavigate } from 'react-router-dom';
import { Mail } from 'lucide-react';

export default function Contact() {
  const navigate = useNavigate();

  const scrollToDonate = () => {
    navigate('/');
    setTimeout(() => {
      const donateSection = document.getElementById('donate-section');
      if (donateSection) {
        donateSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="bg-[#e8f4f8] min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-bold text-center text-[#00529b] mb-8">
          Contact Us
        </h1>

        <div className="bg-white rounded-lg p-8 shadow-md mb-8">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#00529b] to-[#f58220] flex items-center justify-center">
              <span className="text-white font-bold text-2xl">RC</span>
            </div>
          </div>

          <p className="text-lg text-slate-700 text-center mb-8">
            Have a question or want to learn more about Relief Care Foundation? We'd love to hear from you.
          </p>

          <div className="bg-[#e0f2f7] rounded-lg p-6 mb-6">
            <h2 className="text-2xl font-bold text-[#00529b] mb-4 text-center">
              General Inquiries
            </h2>
            <div className="flex flex-col items-center space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="w-6 h-6 text-[#00529b]" />
                <a
                  href="mailto:reliefcarefoundation@gmail.com"
                  className="text-lg text-[#00529b] hover:text-[#f58220] transition-colors font-medium"
                >
                  reliefcarefoundation@gmail.com
                </a>
              </div>
              <a
                href="mailto:reliefcarefoundation@gmail.com"
                className="bg-[#00529b] text-white font-bold px-8 py-3 rounded-lg hover:bg-[#003d75] transition-colors"
              >
                Email Us
              </a>
            </div>
          </div>

          <div className="text-center">
            <p className="text-slate-600 mb-6">
              Ready to support our mission to fight diabetes in Bay Area communities?
            </p>
            <button
              onClick={scrollToDonate}
              className="bg-[#f58220] text-white font-bold px-8 py-4 rounded-lg hover:bg-[#d16d15] transition-colors"
            >
              Donate Now
            </button>
          </div>
        </div>

        <div className="bg-gradient-to-r from-[#00529b] to-[#f58220] rounded-lg p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">
            Join Us in Making a Difference
          </h2>
          <p className="text-lg">
            Every question, every connection, every contribution brings us closer to our goal of accessible diabetes care for all.
          </p>
        </div>
      </div>
    </div>
  );
}
