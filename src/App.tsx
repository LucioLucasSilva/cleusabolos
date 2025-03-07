import { useEffect, useState } from 'react';
import { Star, Heart, Award, Menu, X } from 'lucide-react';
import Carousel from './components/Carousel';
import SocialLinks from './components/SocialLinks';
import { parseContactXML } from './utils/parseXML';
import logo from './images/logo.jpg';
interface ContactData {
  address: string;
  whatsapp: string;
  instagram: string;
  facebook: string;
}

function App() {
  const [contactData, setContactData] = useState<ContactData | null>(null);
  const [activeSection, setActiveSection] = useState('inicio');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const loadContactData = async () => {
      const data = await parseContactXML();
      setContactData(data);
    };
    loadContactData();

    // Intersection Observer for sections
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-50% 0px -50% 0px',
      }
    );

    // Observe all sections
    document.querySelectorAll('section[id]').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-purple-800 text-white py-4 fixed w-full z-50">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img 
              src={logo} 
              alt="Cleusa Bolos Logo" 
              className="w-12 h-12 rounded-full"
            />
            <h1 className="text-2xl font-script text-yellow-400">Cleusa Bolos</h1>
          </div>
          <nav className="hidden md:flex gap-6">
            <a 
              href="#inicio" 
              className={`nav-link hover:text-yellow-400 transition-colors ${
                activeSection === 'inicio' ? 'active' : ''
              }`}
            >
              Início
            </a>
            <a 
              href="#sobre" 
              className={`nav-link hover:text-yellow-400 transition-colors ${
                activeSection === 'sobre' ? 'active' : ''
              }`}
            >
              Sobre
            </a>
            <a 
              href="#contato" 
              className={`nav-link hover:text-yellow-400 transition-colors ${
                activeSection === 'contato' ? 'active' : ''
              }`}
            >
              Contato
            </a>
          </nav>
          <button 
            className="md:hidden text-white"
            onClick={toggleMobileMenu}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <div 
        className={`fixed top-0 left-0 h-full w-64 bg-purple-800 z-50 mobile-menu ${
          isMobileMenuOpen ? 'open' : ''
        }`}
      >
        <div className="p-4">
          <button 
            className="text-white mb-4"
            onClick={closeMobileMenu}
          >
            <X className="w-6 h-6" />
          </button>
          <nav className="flex flex-col gap-4">
            <a 
              href="#inicio" 
              className={`nav-link text-white hover:text-yellow-400 transition-colors ${
                activeSection === 'inicio' ? 'active' : ''
              }`}
              onClick={closeMobileMenu}
            >
              Início
            </a>
            <a 
              href="#sobre" 
              className={`nav-link text-white hover:text-yellow-400 transition-colors ${
                activeSection === 'sobre' ? 'active' : ''
              }`}
              onClick={closeMobileMenu}
            >
              Sobre
            </a>
            <a 
              href="#contato" 
              className={`nav-link text-white hover:text-yellow-400 transition-colors ${
                activeSection === 'contato' ? 'active' : ''
              }`}
              onClick={closeMobileMenu}
            >
              Contato
            </a>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section id="inicio" className="pt-24">
        <Carousel />
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-b from-purple-50 to-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg hover-scale">
              <Star className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-purple-800 text-center mb-2">Qualidade Premium</h3>
              <p className="text-gray-600 text-center">Ingredientes selecionados para o melhor sabor</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg hover-scale">
              <Heart className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-purple-800 text-center mb-2">Feito com Amor</h3>
              <p className="text-gray-600 text-center">Cada bolo é preparado com dedicação especial</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg hover-scale">
              <Award className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-purple-800 text-center mb-2">20 Anos de Experiência</h3>
              <p className="text-gray-600 text-center">Tradição em fazer momentos especiais</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section with Parallax */}
      <section id="sobre" className="parallax py-32 text-white relative"
        style={{
          backgroundImage: 'linear-gradient(rgba(91, 27, 104, 0.8), rgba(91, 27, 104, 0.8)), url("/images/BackgroundBolo.jpg")'
        }}>
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-5xl font-script text-center mb-8 text-shadow">Bem-vindo(a) ao mundo dos sabores irresistíveis!
          </h2>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg mb-6 text-shadow">
              Sou Cleusa Dalmas, apaixonada pela arte da confeitaria e especialista em bolos de aniversário. Cada bolo que faço é preparado com muito carinho, utilizando ingredientes de alta qualidade para tornar seus momentos ainda mais especiais.
            </p>
            <p className="text-lg text-shadow">
              Seja um bolo clássico ou uma criação personalizada, meu objetivo é transformar cada festa em uma experiência inesquecível, com sabores únicos e decorações encantadoras.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contato" className="py-20 bg-gradient-to-b from-white to-purple-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-script text-purple-800 text-center mb-12">
            Entre em Contato
          </h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg hover-scale">
              <h3 className="text-2xl text-purple-800 mb-4">Localização</h3>
              <p className="text-gray-700 mb-4">{contactData?.address}</p>
              <iframe
                src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3661.802284770791!2d-45.91046492374868!3d-23.388673577663837!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94cdcb071b2f2c91%3A0x1b8081de09dd2842!2sR.%20Uiramirins%2C%2070%20-%20Jardim%20Uir%C3%A1%2C%20S%C3%A3o%20Jos%C3%A9%20dos%20Campos%20-%20SP%2C%2012227-660!5e0!3m2!1spt-BR!2sbr!4v1709669844913!5m2!1spt-BR!2sbr`}
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-lg"
              ></iframe>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg hover-scale">
              <h3 className="text-2xl text-purple-800 mb-4">Redes Sociais</h3>
              {contactData && (
                <>
                  <p className="text-gray-700 mb-6">
                    Siga-nos nas redes sociais e fique por dentro das novidades!
                  </p>
                  <SocialLinks
                    instagram={contactData.instagram}
                    facebook={contactData.facebook}
                    whatsapp={contactData.whatsapp}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-purple-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <img 
              src={logo}
              alt="Cleusa Bolos Logo" 
              className="w-8 h-8 rounded-full"
            />
            <span className="font-script text-xl text-yellow-400">Cleusa Bolos</span>
          </div>
          <p>&copy; 2025 Cleusa Bolos. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;