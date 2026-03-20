import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const navigate = useNavigate();

  const scrollToDonate = () => {
    navigate('/');
    setTimeout(() => {
      const donateSection = document.getElementById('donate-section');
      if (donateSection) {
        donateSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
    setMobileMenuOpen(false);
  };

  const handleNavClick = (path: string) => {
    navigate(path);
    window.scrollTo(0, 0);
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  const navigationItems = {
    'About Us': [
      { label: 'Our Core Values', path: '/our-values' },
      { label: 'Our Partners', path: '/our-partners' }
    ],
    'Our Impact': [
      { label: 'How We Make An Impact On Diabetes', path: '/how-it-works' },
      { label: 'Where Your Support Goes', path: '/where-support-goes' },
      { label: 'Your Contribution Matters', path: '/your-contribution' }
    ],
    'Resources': [
      { label: 'Additional Support Resources', path: '/additional-support' },
      { label: 'Diabetes Information', path: '/diabetes-info' }
    ],
    'Podcast': [
      { label: 'The Diabetes Roundtable', path: '/podcast' }
    ],
    'Get Involved': [
      { label: 'Contact Us', path: '/contact' }
    ]
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-md sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-3" onClick={() => window.scrollTo(0, 0)}>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00529b] to-[#f58220] flex items-center justify-center">
                <span className="text-white font-bold text-sm">RC</span>
              </div>
              <span className="font-bold text-lg bg-gradient-to-r from-[#00529b] to-[#f58220] bg-clip-text text-transparent">
                Relief Care Foundation
              </span>
            </Link>

            <div className="hidden lg:flex items-center space-x-6">
              {Object.entries(navigationItems).map(([category, items]) => (
                <div
                  key={category}
                  className="relative group"
                  onMouseEnter={() => setActiveDropdown(category)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button className="flex items-center space-x-1 text-[#00529b] font-medium hover:text-[#f58220] transition-colors">
                    <span>{category}</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  {activeDropdown === category && (
                    <div className="absolute left-0 mt-2 w-64 bg-white rounded-lg shadow-lg py-2 border border-gray-100">
                      {items.map((item) => (
                        <button
                          key={item.path}
                          onClick={() => handleNavClick(item.path)}
                          className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-[#e0f2f7] transition-colors"
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <button
                onClick={scrollToDonate}
                className="bg-[#00529b] text-white font-bold px-6 py-2 rounded-lg hover:bg-[#003d75] transition-colors"
              >
                Donate
              </button>
            </div>

            <button
              className="lg:hidden text-[#00529b]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="lg:hidden py-4 border-t border-gray-100">
              {Object.entries(navigationItems).map(([category, items]) => (
                <div key={category} className="mb-4">
                  <div className="font-bold text-[#00529b] px-4 py-2">{category}</div>
                  {items.map((item) => (
                    <button
                      key={item.path}
                      onClick={() => handleNavClick(item.path)}
                      className="w-full text-left px-6 py-2 text-sm text-slate-600 hover:bg-[#e0f2f7] transition-colors"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              ))}
              <button
                onClick={scrollToDonate}
                className="w-full bg-[#00529b] text-white font-bold px-6 py-3 rounded-lg hover:bg-[#003d75] transition-colors mt-4 mx-4"
                style={{ width: 'calc(100% - 2rem)' }}
              >
                Donate
              </button>
            </div>
          )}
        </nav>
      </header>

      <main className="flex-grow">{children}</main>

      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#00529b] to-[#f58220] flex items-center justify-center">
              <span className="text-white font-bold text-xl">RC</span>
            </div>
            <h3 className="text-xl font-bold text-[#00529b]">Relief Care Foundation</h3>
            <a
              href="mailto:reliefcarefoundation@gmail.com"
              className="text-slate-600 hover:text-[#f58220] transition-colors"
            >
              reliefcarefoundation@gmail.com
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
