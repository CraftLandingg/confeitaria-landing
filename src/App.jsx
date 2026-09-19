import { useState } from 'react';

// --- COMPONENTE DE ÍCONES SVG INLINE (PARA EVITAR ERROS DE IMPORT) ---
const Icons = {
  Sparkles: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/></svg>,
  Message: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/></svg>,
  Star: () => <svg className="w-4 h-4 fill-amber-400 text-amber-400" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>,
  Check: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>,
  Clock: () => <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>,
  Map: () => <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13 21.314m2.457-2.457a8.963 8.963 0 001.543-8.857M13 3.857a8.963 8.963 0 00-8.857 1.543m15.072 15.072a8.963 8.963 0 01-8.857 1.543"/></svg>,
  Mail: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>,
  Insta: () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.054 1.805.249 2.227.415.56.217.96.477 1.38.896.419.42.679.819.896 1.38.166.422.361 1.057.415 2.227.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.054 1.17-.249 1.805-.415 2.227-.217.56-.477.96-.896 1.38-.42.419-.819.679-1.38.896-.422.166-1.057.361-2.227.415-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.054-1.805-.249-2.227-.415-.56-.217-.96-.477-1.38-.896-.419-.42-.679-.819-.896-1.38-.166-.422-.361-1.057-.415-2.227-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.054-1.17.249-1.805.415-2.227.217-.56.477-.96.896-1.38.42-.419.819-.679 1.38-.896.422-.166 1.057-.361 2.227-.415 1.266-.058 1.646-.07 4.85-.07zM12 0C8.741 0 8.333.014 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.132 5.775.072 7.053.014 8.333 0 8.741 0 12s.014 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126s1.384 1.173 2.126 1.384c.766.296 1.636.499 2.913.558C8.333 23.986 8.741 24 12 24s3.667-.014 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.717 2.126-1.384s1.173-1.384 1.384-2.126c.296-.765.499-1.636.558-2.913.058-1.28.072-1.687.072-4.947s-.014-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.717-1.459-1.384-2.126C20.35 1.173 19.333.306 18.54.63c-.765.297-1.636.499-2.913.558C15.667.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z"/></svg>
};

export default function App() {
  const [activeTab, setActiveTab] = useState('all');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    product: '',
    guests: '10 a 15 pessoas',
    date: '',
    notes: ''
  });

 const products = [
    {
      id: 1,
      name: "Tarte Pistácio e Framboesa Selvagem",
      category: "tartes",
      price: "42€",
      tag: "Mais Pedido",
      tagColor: "bg-rose-100 text-rose-700",
      desc: "Base crocante de amêndoas, ganache aveludada de pistácio siciliano e framboesas frescas do Alentejo.",
      img: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      name: "Bolo Nuvem de Baunilha Bourbon",
      category: "bolos",
      price: "55€",
      tag: "Festas e Aniversários",
      tagColor: "bg-amber-100 text-amber-800",
      desc: "Pão de ló leve como seda embebido em baunilha natural, recheio de curd de limão e flores comestíveis.",
      // LINK NOVO E FUNCIONAL:
      img: "https://images.unsplash.com/photo-1542826438-bd32f43d626f?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      name: "Coffret Degustação Macarons Franceses",
      category: "boxes",
      price: "28€",
      tag: "Edição Presente",
      tagColor: "bg-emerald-100 text-emerald-800",
      desc: "Caixa presenteável com 12 macarons artesanais: caramelo salgado, maracujá, pistácio e chocolate rubi.",
      img: "https://images.unsplash.com/photo-1558326567-98ae2405596b?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 4,
      name: "Pavlova Tropical de Maracujá e Manga",
      category: "tartes",
      price: "38€",
      tag: "Zero Glúten",
      tagColor: "bg-orange-100 text-orange-800",
      desc: "Merengue crocante por fora e marshmallow por dentro, coberto com natas frescas batidas e redução tropical.",
      // LINK NOVO E FUNCIONAL:
      img: "https://images.unsplash.com/photo-1506459225024-1428097a7e18?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 5,
      name: "Bolo Velvet e Frutos Silvestres",
      category: "bolos",
      price: "58€",
      tag: "Casamentos e Batizados",
      tagColor: "bg-rose-100 text-rose-700",
      desc: "Massa aveludada de cacau leve com compota caseira de amoras e cobertura sedosa de mascarpone.",
      img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 6,
      name: "Mini-Choux Craquelin Praliné",
      category: "boxes",
      price: "32€",
      tag: "Ideal para Eventos",
      tagColor: "bg-amber-100 text-amber-800",
      desc: "16 unidades crocantes com crosta amanteigada recheadas de creme pasteleiro de avelãs tostadas.",
      img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80"
    }
  ];

  const faqs = [
    {
      q: "Com que antecedência devo fazer a minha encomenda?",
      a: "Recomendamos encomendar com pelo menos 48 horas a 72 horas de antecedência. Para bolos de casamento ou eventos com mais de 30 convidados, sugerimos uma reserva de 2 a 3 semanas para garantir disponibilidade na agenda."
    },
    {
      q: "Fazem entregas em Lisboa e arredores?",
      a: "Sim! Entregamos em carrinha própria climatizada em toda a Grande Lisboa (Lisboa centro, Cascais, Sintra, Oeiras) e Margem Sul (Almada, Seixal, Setúbal). Também pode levantar gratuitamente no nosso atelier."
    },
    {
      q: "Como funciona o pagamento da encomenda?",
      a: "Para validação da encomenda solicitamos um sinal de 50% por MB WAY ou Transferência Bancária. O restante valor é liquidado no momento da entrega ou levantamento."
    },
    {
      q: "Têm opções sem glúten, vegan ou com redução de açúcar?",
      a: "Sim. A nossa Pavlova Tropical é naturalmente isenta de glúten e todas as nossas massas utilizam até 40% menos açúcar do que a doçaria convencional, priorizando o sabor natural dos ingredientes."
    },
    {
      q: "É possível personalizar as mensagens e as decorações dos bolos?",
      a: "Com certeza. Podemos adicionar placas de chocolate temperado com mensagem caligrafada à mão, velas artesanais ou paletas de flores comestíveis de acordo com o tom da sua festa."
    }
  ];

  const filteredProducts = activeTab === 'all' 
    ? products 
    : products.filter(p => p.category === activeTab);

  const handleSelectProduct = (name) => {
    setFormData(prev => ({ ...prev, product: name }));
    const formElement = document.getElementById('encomenda');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

 const handleSubmit = (e) => {
    e.preventDefault();
    
    const phoneTarget = "351925566577"; // Substitui pelo teu telemóvel

    const textMessage = 
      `*Nova Encomenda - Atelier Douceur*\n\n` +
      `• *Nome:* ${formData.name}\n` +
      `• *Contacto:* ${formData.phone}\n` +
      `• *Criação Pretendida:* ${formData.product || "Ainda a escolher"}\n` +
      `• *N.º de Convidados:* ${formData.guests}\n` +
      `• *Data Desejada:* ${formData.date || "A definir"}\n` +
      `• *Observações/Alergias:* ${formData.notes || "Nenhuma observação"}`;

    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneTarget}&text=${encodeURIComponent(textMessage)}`;
    
    setIsSubmitted(true);
    window.open(whatsappUrl, '_blank');
  };

  const handleResetForm = () => {
    setIsSubmitted(false);
    setFormData({
      name: '',
      phone: '',
      product: '',
      guests: '10 a 15 pessoas',
      date: '',
      notes: ''
    });
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2D2A26] font-sans antialiased selection:bg-rose-200">
      
      {/* BARRA SUPERIOR DE AVISO */}
      <div className="bg-gradient-to-r from-rose-500 via-amber-500 to-rose-600 text-white text-xs font-semibold py-2 px-4 text-center tracking-wide">
        🍰 Vagas limitadas para o próximo fim de semana • Encomendas com 48h de antecedência mínima
      </div>

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#E8E1D5]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-full bg-rose-500 text-white flex items-center justify-center font-serif text-xl font-bold shadow-md shadow-rose-200">
              D
            </span>
            <div>
              <span className="font-serif font-bold text-xl tracking-tight block text-[#1E1B18]">Douceur</span>
              <span className="text-[10px] tracking-widest text-rose-600 font-bold uppercase block">Haute Pâtisserie Lisboa</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-[#5A524A]">
            <a href="#menu" className="hover:text-rose-600 transition">A Ementa</a>
            <a href="#sobre" className="hover:text-rose-600 transition">Sobre Nós</a>
            <a href="#diferenciais" className="hover:text-rose-600 transition">O Atelier</a>
            <a href="#faq" className="hover:text-rose-600 transition">Dúvidas</a>
          </div>

          <div className="hidden md:block">
            <a 
              href="#encomenda" 
              className="inline-flex items-center gap-2 bg-rose-500 hover:bg-rose-600 text-white text-sm font-bold px-5 py-2.5 rounded-full shadow-lg shadow-rose-200 transition transform hover:-translate-y-0.5"
            >
              Encomendar Bolo
            </a>
          </div>

          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#2D2A26]"
            aria-label="Abrir Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-[#FAF7F2] border-b border-[#E8E1D5] px-6 py-5 flex flex-col gap-4 text-sm font-semibold">
            <a href="#menu" onClick={() => setMobileMenuOpen(false)}>A Ementa</a>
            <a href="#sobre" onClick={() => setMobileMenuOpen(false)}>Sobre Nós</a>
            <a href="#diferenciais" onClick={() => setMobileMenuOpen(false)}>O Atelier</a>
            <a href="#faq" onClick={() => setMobileMenuOpen(false)}>Dúvidas Frequentes</a>
            <a href="#encomenda" onClick={() => setMobileMenuOpen(false)} className="text-rose-600 font-bold">Pedir pelo WhatsApp</a>
          </div>
        )}
      </nav>

      {/* HERO SECTION */}
      <section className="pt-12 pb-20 px-4 sm:px-6 relative overflow-hidden">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-rose-100 border border-rose-200 px-4 py-1.5 rounded-full text-rose-700 text-xs font-bold uppercase tracking-wider">
              <Icons.Sparkles /> Confeitaria Artesanal de Luxo em Lisboa
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#1E1B18] leading-[1.15]">
              Doces que transformam celebrações em <span className="italic text-rose-600">memórias inesquecíveis.</span>
            </h1>

            <p className="text-lg text-[#6B635B] max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Manteiga pura dos Açores, chocolates de origem e frutos silvestres frescos. Criamos bolos de autor e tartes finas desenhadas para surpreender à mesa.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <a 
                href="#encomenda" 
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-rose-500 hover:bg-rose-600 text-white font-bold text-base px-8 py-4 rounded-2xl shadow-xl shadow-rose-200 transition transform hover:-translate-y-0.5"
              >
                <Icons.Message /> Pedir Encomenda no WhatsApp
              </a>
              <a 
                href="#menu" 
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-stone-50 border border-[#E8E1D5] text-[#2D2A26] font-bold text-base px-7 py-4 rounded-2xl transition"
              >
                Explorar Ementa →
              </a>
            </div>

            <div className="pt-6 flex items-center justify-center lg:justify-start gap-8 border-t border-[#E8E1D5]">
              <div>
                <div className="flex items-center text-amber-500 gap-1 text-sm font-bold">
                  <Icons.Star />
                  <span>4.9 / 5.0</span>
                </div>
                <span className="text-xs text-[#827970]">Mais de 800 celebrações</span>
              </div>
              <div className="h-8 w-[1px] bg-[#E8E1D5]" />
              <div>
                <span className="text-sm font-bold text-[#1E1B18] block">Frescura Diária</span>
                <span className="text-xs text-[#827970]">Produção sob encomenda</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <img 
                  src="https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=900&q=80" 
                  alt="Tarte fina com framboesas e pistácio" 
                  className="w-full h-[460px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="bg-rose-50 text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-2 inline-block">
                    Criação Exclusiva
                  </span>
                  <h3 className="font-serif text-2xl font-bold">Tarte de Framboesa &amp; Pistácio</h3>
                  <p className="text-xs text-stone-200 mt-1">Ingredientes 100% naturais e acabamento artesanal.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* DIFERENCIAIS */}
      <section id="diferenciais" className="py-16 bg-[#FAF7F2]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-[#E8E1D5] shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center text-2xl mb-5">
                🌾
              </div>
              <h3 className="font-serif font-bold text-xl mb-2 text-[#1E1B18]">Ingredientes Nobres</h3>
              <p className="text-sm text-[#6B635B] leading-relaxed">
                Farinhas selecionadas, manteiga açoriana com denominação protegida e favas de baunilha Bourbon de Madagáscar.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-[#E8E1D5] shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-2xl mb-5">
                <Icons.Check />
              </div>
              <h3 className="font-serif font-bold text-xl mb-2 text-[#1E1B18]">Zero Congelação</h3>
              <p className="text-sm text-[#6B635B] leading-relaxed">
                Todas as montagens são executadas no próprio dia do seu evento, assegurando que o pão de ló e os cremes mantêm a textura perfeita.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-[#E8E1D5] shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-2xl mb-5">
                🎨
              </div>
              <h3 className="font-serif font-bold text-xl mb-2 text-[#1E1B18]">Design Personalizado</h3>
              <p className="text-sm text-[#6B635B] leading-relaxed">
                Flores naturais comestíveis, placas personalizadas e paletas de cores que combinam perfeitamente com a decoração do seu evento.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SOBRE NÓS */}
      <section id="sobre" className="py-20 bg-white border-y border-[#E8E1D5]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-[#FAF7F2]">
                <img 
                  src="https://images.unsplash.com/photo-1556911073-38141963c9e0?auto=format&fit=crop&w=800&q=80" 
                  alt="Chefe pasteleira a preparar bolo artesanal" 
                  className="w-full h-[480px] object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-rose-500 text-white p-6 rounded-2xl shadow-xl hidden sm:block">
                <span className="block font-serif text-3xl font-bold">100%</span>
                <span className="text-xs uppercase tracking-wider font-semibold">Artesanal em Lisboa</span>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-rose-600 block">
                A Nossa História &amp; Filosofia
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1E1B18] leading-tight">
                Acreditamos que a confeitaria deve emocionar antes da primeira garfada.
              </h2>
              
              <p className="text-base text-[#6B635B] leading-relaxed">
                Fundado em Lisboa, o <strong>Atelier Douceur</strong> nasceu da recusa aos bolos industriais ultraprocessados e excessivamente açucarados. A nossa missão é resgatar a precisão da alta pastelaria francesa, combinando-a com os melhores produtores e ingredientes de Portugal.
              </p>

              <p className="text-base text-[#6B635B] leading-relaxed">
                Cada bolo que sai do nosso atelier é único: desenhado sob medida para aniversários, batizados, noivados ou momentos íntimos onde a mesa de sobremesas é o centro das atenções.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 pt-4">
                <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E8E1D5]">
                  <span className="font-serif font-bold text-[#1E1B18] block text-base">Origem Pura</span>
                  <span className="text-xs text-[#6B635B]">Frutas da estação, ovos biológicos e cacau sustentável certificado.</span>
                </div>
                <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E8E1D5]">
                  <span className="font-serif font-bold text-[#1E1B18] block text-base">Feito à Mão</span>
                  <span className="text-xs text-[#6B635B]">Cada flor é colocada à mão, cada ganache emulsionada com rigor.</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* EMENTA */}
      <section id="menu" className="py-20 bg-[#FAF7F2]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-rose-600 block mb-2">Coleção de Criações</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1E1B18]">Escolha o doce ideal para a sua ocasião</h2>
            <p className="text-sm text-[#6B635B] mt-2">Clique em "Pedir Esta Criação" para carregar automaticamente a sua preferência no formulário.</p>

            <div className="inline-flex p-1.5 bg-white rounded-2xl border border-[#E8E1D5] mt-8 gap-2">
              <button 
                onClick={() => setActiveTab('all')}
                className={`px-5 py-2 text-xs font-bold rounded-xl transition ${activeTab === 'all' ? 'bg-rose-500 text-white shadow-sm' : 'text-[#6B635B] hover:text-[#1E1B18]'}`}
              >
                Todos
              </button>
              <button 
                onClick={() => setActiveTab('bolos')}
                className={`px-5 py-2 text-xs font-bold rounded-xl transition ${activeTab === 'bolos' ? 'bg-rose-500 text-white shadow-sm' : 'text-[#6B635B] hover:text-[#1E1B18]'}`}
              >
                Bolos de Festa
              </button>
              <button 
                onClick={() => setActiveTab('tartes')}
                className={`px-5 py-2 text-xs font-bold rounded-xl transition ${activeTab === 'tartes' ? 'bg-rose-500 text-white shadow-sm' : 'text-[#6B635B] hover:text-[#1E1B18]'}`}
              >
                Tartes Finas
              </button>
              <button 
                onClick={() => setActiveTab('boxes')}
                className={`px-5 py-2 text-xs font-bold rounded-xl transition ${activeTab === 'boxes' ? 'bg-rose-500 text-white shadow-sm' : 'text-[#6B635B] hover:text-[#1E1B18]'}`}
              >
                Boxes e Presentes
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((item) => (
              <div 
                key={item.id}
                className="bg-white rounded-3xl overflow-hidden border border-[#E8E1D5] hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-56 overflow-hidden">
                    <img 
                      src={item.img} 
                      alt={item.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
                    />
                    <span className={`absolute top-4 left-4 text-[11px] font-bold px-3 py-1 rounded-full shadow-sm ${item.tagColor}`}>
                      {item.tag}
                    </span>
                    <span className="absolute bottom-4 right-4 bg-white/95 text-[#1E1B18] font-bold text-sm px-3.5 py-1 rounded-xl shadow-md">
                      A partir de {item.price}
                    </span>
                  </div>

                  <div className="p-6">
                    <h3 className="font-serif font-bold text-xl text-[#1E1B18] mb-2">{item.name}</h3>
                    <p className="text-xs text-[#6B635B] leading-relaxed mb-4">{item.desc}</p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <button 
                    onClick={() => handleSelectProduct(item.name)}
                    className="w-full py-3 bg-[#FAF7F2] hover:bg-rose-50 border border-rose-200 hover:border-rose-400 text-rose-600 text-xs font-bold rounded-xl transition flex items-center justify-center gap-2"
                  >
                    Pedir Esta Criação →
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="py-20 bg-white border-y border-[#E8E1D5]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-rose-600 block mb-2">Esclareça as suas Dúvidas</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1E1B18]">Perguntas Frequentes</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className="border border-[#E8E1D5] rounded-2xl overflow-hidden bg-[#FAF7F2] transition"
              >
                <button 
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-6 text-left flex justify-between items-center gap-4 font-serif font-bold text-base text-[#1E1B18]"
                >
                  <span>{faq.q}</span>
                  <span className="text-rose-500 text-xl font-bold">{openFaq === idx ? "−" : "+"}</span>
                </button>
                {openFaq === idx && (
                  <div className="px-6 pb-6 text-sm text-[#6B635B] leading-relaxed border-t border-[#E8E1D5]/60 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

     {/* FORMULÁRIO DE ENCOMENDA COM ECRÃ DE CONFIRMAÇÃO */}
      <section id="encomenda" className="py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-[#E8E1D5] shadow-2xl p-8 sm:p-12 relative overflow-hidden transition-all">
          
          {isSubmitted ? (
            /* ECRÃ DE SUCESSO / ENVIADO */
            <div className="text-center py-8 space-y-6 animate-fadeIn">
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-4xl shadow-inner animate-bounce">
                ✓
              </div>

              <div className="space-y-2">
                <span className="bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full inline-block">
                  Pedido Encaminhado
                </span>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1E1B18]">
                  Obrigado, {formData.name || 'estimado(a) cliente'}!
                </h2>
                <p className="text-sm text-[#6B635B] max-w-lg mx-auto leading-relaxed">
                  A janela do WhatsApp foi iniciada com os dados da tua criação. Se não abriu automaticamente, utiliza o botão abaixo para confirmar os detalhes com a nossa equipa.
                </p>
              </div>

              {/* Cartão de Resumo da Encomenda */}
              <div className="bg-[#FAF7F2] border border-[#E8E1D5] rounded-2xl p-6 text-left max-w-md mx-auto text-xs space-y-2.5">
                <div className="flex justify-between pb-2 border-b border-[#E8E1D5]">
                  <span className="text-stone-500 font-semibold">Criação:</span>
                  <span className="font-bold text-[#1E1B18]">{formData.product || "A combinar no WhatsApp"}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-[#E8E1D5]">
                  <span className="text-stone-500 font-semibold">Estimativa:</span>
                  <span className="font-bold text-[#1E1B18]">{formData.guests}</span>
                </div>
                {formData.date && (
                  <div className="flex justify-between pb-2 border-b border-[#E8E1D5]">
                    <span className="text-stone-500 font-semibold">Data Prevista:</span>
                    <span className="font-bold text-[#1E1B18]">{formData.date}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-stone-500 font-semibold">Contacto:</span>
                  <span className="font-bold text-[#1E1B18]">{formData.phone}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm px-8 py-3.5 rounded-xl shadow-lg shadow-emerald-200 transition"
                >
                  <Icons.Message /> Reabrir WhatsApp
                </button>
                <button
                  type="button"
                  onClick={handleResetForm}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-stone-100 hover:bg-stone-200 text-[#5A524A] font-bold text-sm px-6 py-3.5 rounded-xl transition"
                >
                  Fazer Novo Pedido
                </button>
              </div>
            </div>
          ) : (
            /* FORMULÁRIO ATIVO */
            <>
              <div className="text-center max-w-xl mx-auto mb-10">
                <span className="bg-rose-100 text-rose-700 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full inline-block mb-3">
                  Atendimento Personalizado
                </span>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1E1B18]">Faça o seu pedido de encomenda</h2>
                <p className="text-sm text-[#6B635B] mt-2">
                  Preencha os detalhes abaixo para enviarmos a confirmação com o orçamento e opções diretamente no WhatsApp.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  
                  <div>
                    <label className="block text-xs font-bold text-[#2D2A26] uppercase tracking-wider mb-2">O Seu Nome</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Ex: Carolina Mendes" 
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl border border-[#D5CCC0] focus:outline-none focus:ring-2 focus:ring-rose-500 bg-[#FAF7F2] text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#2D2A26] uppercase tracking-wider mb-2">Contacto Telemóvel</label>
                    <input 
                      type="tel" 
                      required
                      placeholder="Ex: +351 912 345 678" 
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl border border-[#D5CCC0] focus:outline-none focus:ring-2 focus:ring-rose-500 bg-[#FAF7F2] text-sm"
                    />
                  </div>

                </div>

                <div className="grid sm:grid-cols-3 gap-6">
                  
                  <div>
                    <label className="block text-xs font-bold text-[#2D2A26] uppercase tracking-wider mb-2">Criação Pretendida</label>
                    <input 
                      type="text" 
                      placeholder="Ex: Tarte Pistácio ou Bolo Nuvem"
                      value={formData.product}
                      onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl border border-[#D5CCC0] focus:outline-none focus:ring-2 focus:ring-rose-500 bg-[#FAF7F2] text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#2D2A26] uppercase tracking-wider mb-2">Estimativa de Pessoas</label>
                    <select 
                      value={formData.guests}
                      onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl border border-[#D5CCC0] focus:outline-none focus:ring-2 focus:ring-rose-500 bg-[#FAF7F2] text-sm"
                    >
                      <option value="6 a 8 pessoas">6 a 8 pessoas</option>
                      <option value="10 a 15 pessoas">10 a 15 pessoas</option>
                      <option value="20 a 30 pessoas">20 a 30 pessoas</option>
                      <option value="Mais de 30 convidados (Evento)">Mais de 30 convidados (Evento)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#2D2A26] uppercase tracking-wider mb-2">Data Desejada</label>
                    <input 
                      type="date" 
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl border border-[#D5CCC0] focus:outline-none focus:ring-2 focus:ring-rose-500 bg-[#FAF7F2] text-sm"
                    />
                  </div>

                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2D2A26] uppercase tracking-wider mb-2">Observações ou Alergias</label>
                  <textarea 
                    rows="3"
                    placeholder="Ex: Mensagem na placa de chocolate, restrições alimentares..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-[#D5CCC0] focus:outline-none focus:ring-2 focus:ring-rose-500 bg-[#FAF7F2] text-sm"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full py-4 bg-rose-500 hover:bg-rose-600 text-white font-bold text-base rounded-2xl shadow-xl shadow-rose-200 transition transform hover:-translate-y-0.5 flex items-center justify-center gap-3"
                >
                  <Icons.Message />
                  Enviar Pedido e Abrir Conversa no WhatsApp
                </button>

                <p className="text-center text-xs text-[#827970]">
                  Sem pagamentos online. Validamos consigo a disponibilidade da data no WhatsApp em menos de 2 horas.
                </p>
              </form>
            </>
          )}

        </div>
      </section>

      {/* FOOTER DETALHADO E PROFISSIONAL */}
      <footer className="bg-[#141210] text-[#E8E1D5] pt-16 pb-12 border-t border-[#2D2824]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#2D2824]">
            
            {/* Coluna 1: Marca & Manifesto */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-rose-500 text-white flex items-center justify-center font-serif text-xl font-bold shadow-md shadow-rose-900/50">
                  D
                </span>
                <div>
                  <span className="font-serif font-bold text-xl tracking-tight text-white block">Douceur</span>
                  <span className="text-[10px] tracking-widest text-rose-400 font-bold uppercase block">Haute Pâtisserie</span>
                </div>
              </div>
              <p className="text-xs text-stone-400 leading-relaxed">
                Confeitaria artesanal de luxo criada para momentos inesquecíveis. Bolos de autor e sobremesas finas produzidas sob encomenda na Grande Lisboa.
              </p>
              <div className="flex items-center gap-3 pt-2">
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-9 h-9 rounded-full bg-[#201D1A] hover:bg-rose-500 text-stone-300 hover:text-white flex items-center justify-center transition text-sm"
                  aria-label="Instagram"
                >
                  <Icons.Insta />
                </a>
                <a 
                  href="https://api.whatsapp.com/send?phone=351912884900" 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-9 h-9 rounded-full bg-[#201D1A] hover:bg-emerald-600 text-stone-300 hover:text-white flex items-center justify-center transition text-sm"
                  aria-label="WhatsApp"
                >
                  <Icons.Message />
                </a>
              </div>
            </div>

            {/* Coluna 2: Navegação Rápida */}
            <div className="space-y-4">
              <h4 className="font-serif text-base font-bold text-white tracking-wide">Navegação</h4>
              <ul className="space-y-2.5 text-xs text-stone-400">
                <li>
                  <a href="#menu" className="hover:text-rose-400 transition flex items-center gap-2">
                    <span className="text-rose-600">›</span> Catálogo de Bolos &amp; Tartes
                  </a>
                </li>
                <li>
            <a href="#sobre" className="hover:text-rose-400 transition flex items-center gap-2">
                    <span className="text-rose-600">›</span> Sobre Nós
                  </a>
                </li>
                <li>
                  <a href="#diferenciais" className="hover:text-rose-400 transition flex items-center gap-2">
                    <span className="text-rose-600">›</span> O Atelier
                  </a>
                </li>
                <li>
                  <a href="#faq" className="hover:text-rose-400 transition flex items-center gap-2">
                    <span className="text-rose-600">›</span> Dúvidas Frequentes
                  </a>
                </li>
                <li>
                  <a href="#encomenda" className="hover:text-rose-400 transition flex items-center gap-2">
                    <span className="text-rose-600">›</span> Pedir no WhatsApp
                  </a>
                </li>
              </ul>
            </div>

            {/* Coluna 3: Horários & Entregas */}
            <div className="space-y-4">
              <h4 className="font-serif text-base font-bold text-white tracking-wide">Atelier &amp; Entregas</h4>
              <div className="space-y-3 text-xs text-stone-400 leading-relaxed">
                <div>
                  <span className="text-stone-200 font-semibold block">Horário de Produção:</span>
                  <span>Terça a Sábado: 08h30 – 18h30</span>
                </div>
                <div>
                  <span className="text-stone-200 font-semibold block">Levantamento de Encomendas:</span>
                  <span>Sextas e Sábados até às 19h00</span>
                </div>
                <div>
                  <span className="text-stone-200 font-semibold block">Zona de Entrega Climatizada:</span>
                  <span>Lisboa Centro, Cascais, Sintra, Oeiras, Almada e Seixal.</span>
                </div>
              </div>
            </div>

            {/* Coluna 4: Localização & Contactos */}
            <div className="space-y-4">
              <h4 className="font-serif text-base font-bold text-white tracking-wide">Contactos Oficiais</h4>
              <div className="space-y-3 text-xs text-stone-400">
                <p className="flex items-start gap-2.5">
                  <span className="text-rose-400 mt-0.5 text-sm">📍</span>
                  <span>Avenida da Liberdade / Almada Centro, Portugal</span>
                </p>
                <p className="flex items-center gap-2.5">
                  <span className="text-rose-400 text-sm">📞</span>
                  <span>+351 912 884 900</span>
                </p>
                <p className="flex items-center gap-2.5">
                  <span className="text-rose-400 text-sm">✉️</span>
                  <span className="break-all">encomendas@atelier-douceur.pt</span>
                </p>
                <div className="pt-2">
                  <a 
                    href="#encomenda"
                    className="inline-block bg-rose-500/15 text-rose-300 hover:bg-rose-500 hover:text-white border border-rose-500/30 px-3.5 py-1.5 rounded-lg text-[11px] font-bold transition"
                  >
                    Fazer Pedido Online
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* Sub-rodapé com Créditos */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
            <p>
              © {new Date().getFullYear()} Atelier Douceur Lisboa. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-1.5">
              <span>Desenvolvido com excelência por</span>
              <a 
                href="https://instagram.com/craftlandingg" 
                target="_blank" 
                rel="noreferrer"
                className="text-rose-400 hover:text-rose-300 font-bold transition underline decoration-rose-500/40"
              >
                Craft Landing
              </a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}