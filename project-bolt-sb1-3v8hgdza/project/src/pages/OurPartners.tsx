import { useNavigate } from 'react-router-dom';

export default function OurPartners() {
  const navigate = useNavigate();

  const handleContact = () => {
    navigate('/contact');
    window.scrollTo(0, 0);
  };

  return (
    <div className="bg-[#e8f4f8] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-bold text-center text-[#00529b] mb-12">
          Our Partners
        </h1>

        <div className="bg-white rounded-lg p-8 shadow-md mb-12">
          <div className="flex justify-center mb-6">
            <div className="w-32 h-32 bg-[#e0f2f7] rounded-full flex items-center justify-center">
              <span className="text-4xl font-bold text-[#00529b]">BACH</span>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-[#00529b] mb-4 text-center">
            Bay Area Community Health
          </h2>

          <div className="max-w-3xl mx-auto space-y-4 text-slate-700 leading-relaxed">
            <p>
              Bay Area Community Health (BACH) is a federally qualified health center that provides comprehensive, affordable healthcare services to underserved communities across the Bay Area. BACH operates multiple clinic locations serving patients regardless of their ability to pay, with a strong focus on chronic disease management including diabetes.
            </p>
            <p>
              Their commitment to accessible care aligns directly with Relief Care Foundation's mission to support community-level diabetes treatment and education. Through our partnership with BACH, we help ensure that diabetes patients have access to the supplies, medication, and education they need to manage their condition effectively.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-[#00529b] to-[#f58220] rounded-lg p-8 text-center text-white mb-12">
          <h2 className="text-3xl font-bold mb-4">Interested in Partnering?</h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            We're always looking to expand our network of community hospital partners across the Bay Area. If your organization is interested in partnering with Relief Care Foundation, please reach out to us.
          </p>
          <button
            onClick={handleContact}
            className="bg-white text-[#00529b] font-bold px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Contact Us
          </button>
        </div>

        <div className="bg-white rounded-lg p-8 shadow-md text-center">
          <h3 className="text-2xl font-bold text-[#00529b] mb-4">
            More Partners Coming Soon
          </h3>
          <p className="text-slate-700">
            We are actively building relationships with community hospitals and healthcare organizations across the Bay Area to expand our impact and reach more diabetes patients in need.
          </p>
        </div>
      </div>
    </div>
  );
}
