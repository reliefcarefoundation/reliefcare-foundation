import { useNavigate } from 'react-router-dom';
import { Heart, Droplets, GraduationCap, Building2 } from 'lucide-react';
import DonateSection from '../components/DonateSection';

export default function Home() {
  const navigate = useNavigate();

  const scrollToDonate = () => {
    const donateSection = document.getElementById('donate-section');
    if (donateSection) {
      donateSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLearnMore = () => {
    navigate('/our-values');
    window.scrollTo(0, 0);
  };

  return (
    <div>
      <section className="bg-gradient-to-br from-[#e0f2f7] to-[#fff5e0] pt-12 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-32 h-32 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-[#00529b] to-[#f58220] flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-4xl">RC</span>
            </div>
          </div>

          <h1 className="text-5xl sm:text-6xl font-extrabold mb-4">
            <span className="text-[#00529b]">Relief Care </span>
            <span className="text-[#f58220]">Foundation</span>
          </h1>

          <p className="text-2xl sm:text-3xl font-extrabold text-[#00529b] mb-8">
            Fighting Diabetes, One Community at a Time
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <button
              onClick={scrollToDonate}
              className="bg-[#00529b] text-white font-bold px-8 py-4 rounded-lg hover:bg-[#003d75] transition-colors text-lg w-full sm:w-auto"
            >
              Donate Now
            </button>
            <button
              onClick={handleLearnMore}
              className="bg-white text-[#00529b] font-bold px-8 py-4 rounded-lg hover:bg-gray-50 border-2 border-[#00529b] transition-colors text-lg w-full sm:w-auto"
            >
              Learn More
            </button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-[#00529b] mb-12">
            Your Support in Action
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#e0f2f7] rounded-lg p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-[#00529b] rounded-full flex items-center justify-center">
                <Droplets className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#00529b] mb-3">Insulin & Supplies</h3>
              <p className="text-slate-600">
                Donations help fund essential diabetes supplies including insulin, glucose monitors, test strips, and other critical medical equipment for patients who cannot afford them.
              </p>
            </div>

            <div className="bg-[#fff5e0] rounded-lg p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-[#f58220] rounded-full flex items-center justify-center">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#f58220] mb-3">Education</h3>
              <p className="text-slate-600">
                Funding provides crucial education programs on health insurance, controlling diabetes, and self-management for patients and families.
              </p>
            </div>

            <div className="bg-[#e0f2f7] rounded-lg p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-[#00529b] rounded-full flex items-center justify-center">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#00529b] mb-3">Hospital Support</h3>
              <p className="text-slate-600">
                We work directly with community hospitals in the Bay Area to identify gaps in diabetes care funding and deliver targeted support where it is needed most.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-[#e0f2f7] to-[#fff5e0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-[#00529b] mb-6">
                Our Mission to Combat Diabetes
              </h2>
              <div className="space-y-4 text-slate-700">
                <p>
                  Diabetes is one of the most prevalent and expensive chronic conditions in the United States, affecting millions of people and their families. Managing this disease requires consistent access to medication, supplies, and education.
                </p>
                <p>
                  Many community hospitals that serve lower-income populations lack sufficient funding to provide comprehensive diabetes care. These hospitals do vital work in their communities but often receive less government and public funding than larger health systems.
                </p>
                <p>
                  Relief Care Foundation bridges this gap by connecting donors and sponsors with hospitals that need support — specifically for insulin, supplies, and education programs focused on health insurance navigation, diabetes management, and self-care.
                </p>
                <p>
                  We partner with community hospitals, primarily in the San Francisco Bay Area, to monitor needs and match funding accordingly, ensuring every contribution makes a real difference in the lives of diabetes patients.
                </p>
              </div>
              <button
                onClick={handleLearnMore}
                className="mt-6 bg-[#00529b] text-white font-bold px-6 py-3 rounded-lg hover:bg-[#003d75] transition-colors"
              >
                Learn More About Our Values
              </button>
            </div>

            <div className="flex justify-center">
              <img
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80"
                alt="Healthcare support"
                className="rounded-lg shadow-xl w-full max-w-md"
              />
            </div>
          </div>
        </div>
      </section>

      <DonateSection />
    </div>
  );
}
