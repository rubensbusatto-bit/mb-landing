import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronRight,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  ShieldCheck,
  MapPin,
  MessageCircle
} from 'lucide-react';

// Configurações do Brand Kit MB Consultores
const colors = {
  bordeaux: '#800020',
  richBlack: '#000000',
  darkGray: '#333333',
  lightGray: '#F8F9FA',
  white: '#FFFFFF'
};

const LOGO_URL = 'https://i.ibb.co/yncsY0Tn/Logo-1-MB.png';

// WhatsApp (Rubens)
const WHATS_NUMBER = '5541999880176';

// Endereço físico (MB Consultores)
const MB_ADDRESS = 'Rua Martin Afonso, 588 - Centro, Curitiba - PR';
const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MB_ADDRESS)}`;

const slugify = (s: string) => s.toLowerCase().trim().split(' ').filter(Boolean).join('-');

const digitsOnly = (value: string) => value.split('').filter((c) => c >= '0' && c <= '9').join('');

const buildWhatsAppLink = (message: string) => {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATS_NUMBER}?text=${encoded}`;
};

const WA_DEFAULT_MSG =
  'Oi! Sou médico(a) em Curitiba e quero um diagnóstico tributário gratuito. Meu faturamento médio é R$ ____/mês e minhas despesas são R$ ____/mês. Pode me orientar?';

const WA_SIM_MSG = (revenue?: string, expense?: string) =>
  `Oi! Sou médico(a) em Curitiba. Quero um diagnóstico tributário gratuito. Meu faturamento médio é R$ ${revenue || '____'}/mês e minhas despesas são R$ ${expense || '____'}/mês. Pode me orientar?`;

// Componente de Accordion para o FAQ
const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 lg:py-6 flex justify-between items-center text-left bg-transparent text-black hover:text-[#800020] transition-colors focus:outline-none"

      >
        <span className="font-bold text-base lg:text-lg pr-4 lg:pr-8">{question}</span>
        <ChevronDown
          className={`shrink-0 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          size={18}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-5 lg:pb-6 text-gray-500 leading-relaxed text-sm lg:text-base">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Pré-diagnóstico simples (sem IA): só coleta números e manda pro Whats
  const [simData, setSimData] = useState({ revenue: '', expense: '' });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const waLinkDefault = useMemo(() => buildWhatsAppLink(WA_DEFAULT_MSG), []);

  const openWhatsApp = (msg: string) => {
    window.open(buildWhatsAppLink(msg), '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-white font-['Montserrat'] text-black selection:bg-[#800020] selection:text-white overflow-x-hidden">
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&display=swap');`}
      </style>

      {/* NAV */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled ? 'bg-white shadow-sm py-2 lg:py-3' : 'bg-transparent py-4 lg:py-6'
        }`}
      >
        <div className="container mx-auto px-4 lg:px-6 flex justify-between items-center">
          <div className="flex items-center gap-2 lg:gap-4">
            <div className="w-10 h-10 lg:w-14 lg:h-14 flex items-center justify-center relative shrink-0">
              {!imageError ? (
                <img
                  src={LOGO_URL}
                  alt="MB Consultores"
                  className="w-full h-full object-contain"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-full h-full bg-[#800020] rounded-lg flex items-center justify-center text-white font-bold text-lg">
                  MB
                </div>
              )}
            </div>
            <div className="flex flex-col">
              <span
                className="text-base lg:text-xl font-extrabold tracking-tighter leading-none"
                style={{ color: colors.richBlack }}
              >
                MB <span style={{ color: colors.bordeaux }}>CONSULTORES</span>
              </span>
              <span className="text-[7px] lg:text-[10px] uppercase tracking-[0.3em] text-gray-400 font-bold mt-0.5">
                Desde 1985
              </span>
            </div>
          </div>

          <div className="hidden lg:flex items-center space-x-8 text-black">
            {['Como funciona', 'Pré-diagnóstico', 'Sobre', 'FAQ'].map((item) => (
              <a
                key={item}
                href={`#${slugify(item)}`}
                className="text-[10px] font-bold uppercase tracking-widest hover:text-[#800020] transition-colors relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#800020] transition-all group-hover:w-full" />
              </a>
            ))}
            <a
              href={waLinkDefault}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#800020] text-white px-7 py-3 rounded-full text-[10px] font-bold hover:bg-black transition-all shadow-lg uppercase tracking-widest"
            >
              Diagnóstico no WhatsApp
            </a>
          </div>

          <button
  className="lg:hidden p-2 bg-transparent text-black focus:outline-none"
  onClick={() => setIsMenuOpen(!isMenuOpen)}
  aria-label="Abrir menu"
>
  {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
</button>

        </div>

        {/* MENU MOBILE */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="lg:hidden bg-white border-t border-gray-100"
            >
              <div className="container mx-auto px-4 py-4 flex flex-col gap-3">
                {['Como funciona', 'Pré-diagnóstico', 'Sobre', 'FAQ'].map((item) => (
                  <a
                    key={item}
                    href={`#${slugify(item)}`}
                    onClick={() => setIsMenuOpen(false)}
                    className="py-3 px-3 rounded-xl font-bold text-[12px] uppercase tracking-widest text-gray-700 hover:bg-gray-50"
                  >
                    {item}
                  </a>
                ))}
                <a
                  href={waLinkDefault}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 bg-[#800020] text-white py-4 rounded-2xl font-bold uppercase tracking-widest text-[10px] text-center"
                >
                  Diagnóstico no WhatsApp
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* HERO */}
      <section className="relative pt-24 pb-12 lg:pt-56 lg:pb-40 overflow-hidden bg-white" id="topo">
        <div className="container mx-auto px-4 lg:px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full lg:w-3/5 space-y-6 lg:space-y-8 text-center lg:text-left"
            >
              <div className="inline-flex items-center space-x-3 bg-red-50 border border-red-100 px-6 py-2 rounded-full text-[#800020] text-[8px] lg:text-[10px] font-bold tracking-[0.2em] uppercase">
                <Sparkles size={12} />
                <span>Curitiba • Desde 1985 • Atendimento humano e ágil</span>
              </div>

              <h1 className="text-3xl lg:text-6xl font-extrabold leading-[1.1] tracking-tighter text-black">
                Contabilidade para <span className="text-[#800020]">Médicos</span> em Curitiba — Diagnóstico Gratuito,
                Atendimento Direto
              </h1>

              <p className="text-base lg:text-xl text-gray-500 max-w-2xl mx-auto lg:mx-0 font-medium leading-relaxed">
                Organizamos seu PJ, notas, impostos e pró-labore com clareza e agilidade — você fala diretamente com quem
                resolve, não com intermediários.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <a
                  href={waLinkDefault}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto bg-[#800020] text-white px-10 py-5 rounded-full font-bold shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2 uppercase text-[10px] tracking-widest"
                >
                  Diagnóstico no WhatsApp <ChevronRight size={16} />
                </a>

                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto border-2 border-[#800020]/20 text-[#800020] px-10 py-5 rounded-full font-bold transition-all uppercase text-[10px] tracking-widest flex items-center justify-center gap-2"
                >
                  <MapPin size={18} /> Ver endereço
                </a>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 justify-center lg:justify-start pt-2 text-gray-400">
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="opacity-70" />
                  <span className="text-[11px] font-bold uppercase tracking-widest">Rua Martin Afonso, 588 • Centro • Curitiba</span>
                </div>
              </div>
            </motion.div>

            <div className="w-full lg:w-2/5 relative">
              <img
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200"
                className="rounded-[2rem] lg:rounded-[3rem] shadow-2xl object-cover"
                alt="MB Consultores Curitiba"
                loading="lazy"
              />
              <div className="absolute -bottom-4 -left-4 bg-white border border-gray-100 rounded-2xl shadow-xl p-4 hidden lg:flex items-center gap-3">
                <div className="bg-[#800020]/10 rounded-xl p-2">
                  <ShieldCheck className="text-[#800020]" size={18} />
                </div>
                <div>
                  <div className="text-xs font-extrabold tracking-tight">Desde 1985</div>
                  <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Curitiba • Centro</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section className="py-20 bg-white" id="como-funciona">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-5xl mx-auto text-center mb-12">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.5em] text-[#800020] mb-4">Simples e rápido</h2>
            <h3 className="text-3xl lg:text-5xl font-extrabold tracking-tighter">3 passos para resolver sua parte fiscal</h3>
          </div>

          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { n: '01', t: 'Chame no WhatsApp', d: 'Você manda o cenário (bem direto) e a equipe entende o objetivo.' },
              { n: '02', t: 'Diagnóstico', d: 'A gente aponta riscos e o caminho mais seguro para seu PJ.' },
              { n: '03', t: 'Execução', d: 'Rotina em dia: notas, pró-labore, impostos e obrigações sem dor de cabeça.' }
            ].map((c) => (
              <div key={c.n} className="bg-gray-50 border border-gray-100 rounded-[2rem] p-8 text-left shadow-sm">
                <div className="text-4xl font-serif text-black/10 italic font-bold">{c.n}</div>
                <div className="mt-2 text-xl font-extrabold tracking-tight">{c.t}</div>
                <p className="mt-2 text-sm text-gray-500 font-medium leading-relaxed">{c.d}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <a
              href={waLinkDefault}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#800020] text-white px-10 py-5 rounded-full font-bold shadow-xl hover:scale-105 transition-all inline-flex items-center justify-center gap-2 uppercase text-[10px] tracking-widest"
            >
              Quero meu diagnóstico <ChevronRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* PRÉ-DIAGNÓSTICO (SEM IA) */}
      <section className="py-24 bg-gray-50 border-y border-gray-100" id="pré-diagnóstico">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-[11px] font-bold uppercase tracking-[0.5em] text-[#800020] mb-4">Simulação Rápida</h2>
              <h3 className="text-4xl lg:text-5xl font-extrabold tracking-tighter">Leve seu cenário pronto pro WhatsApp (em 30 segundos)</h3>
              <p className="text-sm text-gray-500 font-medium mt-4 max-w-3xl mx-auto">
                Aqui você só preenche valores aproximados e a gente continua no WhatsApp para o diagnóstico gratuito e completo.
              </p>
            </div>

            <div className="bg-white rounded-[3rem] p-8 lg:p-12 shadow-2xl border border-gray-100 grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-6">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-gray-400 mb-2">Faturamento Mensal (R$)</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={simData.revenue}
                    onChange={(e) => setSimData({ ...simData, revenue: digitsOnly(e.target.value) })}
                    placeholder="Ex: 50000"
                    className="w-full bg-gray-50 border-gray-100 rounded-2xl p-5 focus:ring-2 focus:ring-[#800020] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold text-gray-400 mb-2">Despesas Mensais (R$)</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={simData.expense}
                    onChange={(e) => setSimData({ ...simData, expense: digitsOnly(e.target.value) })}
                    placeholder="Ex: 15000"
                    className="w-full bg-gray-50 border-gray-100 rounded-2xl p-5 focus:ring-2 focus:ring-[#800020] outline-none"
                  />
                </div>

                <div className="text-[11px] text-gray-400 font-medium leading-relaxed bg-gray-50 border border-gray-100 rounded-2xl p-4">
                  <span className="font-bold text-gray-500">Privacidade:</span> não pedimos nome, CPF ou email. Use valores aproximados.
                </div>

                <button
                  onClick={() => openWhatsApp(WA_SIM_MSG(simData.revenue, simData.expense))}
                  className="w-full bg-[#800020] text-white py-6 rounded-2xl font-bold uppercase tracking-[0.2em] shadow-xl flex items-center justify-center gap-3 hover:bg-black transition-all"
                >
                  <MessageCircle size={18} /> Enviar para WhatsApp
                </button>

                <a
                  href={waLinkDefault}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full border-2 border-[#800020]/20 text-[#800020] py-5 rounded-2xl font-bold uppercase tracking-[0.2em] hover:bg-white transition-all text-center block"
                >
                  Ir direto (diagnóstico)
                </a>
              </div>

              <div className="bg-gray-50 rounded-[2rem] p-8 border border-gray-200 relative min-h-[420px] flex flex-col justify-between">
                <div>
                  <div className="text-[10px] uppercase font-bold text-[#800020]">O que você vai mandar</div>
                  <div className="mt-4 text-gray-700 font-medium leading-relaxed bg-white border border-gray-100 rounded-2xl p-5">
                    <p className="font-bold">Mensagem pronta:</p>
                    <p className="mt-2 text-sm text-gray-600">{WA_SIM_MSG(simData.revenue || '____', simData.expense || '____')}</p>
                  </div>
                  <div className="mt-4 text-sm text-gray-500 font-medium">
                    A equipe responde com o caminho mais seguro e os próximos passos (sem enrolação).
                  </div>
                </div>

                <div className="pt-6">
                  <a
                    href={MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-5 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest hover:text-[#800020] hover:border-[#800020]/30 transition-all"
                  >
                    <MapPin size={16} /> Atendimento no Centro
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SOBRE */}
      <section className="py-24 bg-black text-white rounded-[4rem] mx-4 my-10 px-6" id="sobre">
        <div className="container mx-auto max-w-6xl flex flex-col lg:flex-row gap-20 items-center">
          <div className="lg:w-1/2 space-y-10">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.5em] text-[#800020]">O Diferencial MB</h2>
            <h3 className="text-4xl lg:text-6xl font-extrabold tracking-tighter">40 anos de experiência. Processos modernos. Atendimento direto e ágil.</h3>

            <div className="space-y-8">
              <div className="flex gap-8 group">
                <div className="text-5xl font-serif text-white/5 group-hover:text-[#800020] transition-all italic font-bold">01</div>
                <div>
                  <h4 className="text-xl font-bold mb-2">Atendimento direto (sem intermediários)</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Você fala direto com a equipe técnica da MB. Analisamos seu cenário, apontamos riscos e definimos o caminho mais seguro para seu PJ.
                  </p>
                </div>
              </div>

              <div className="flex gap-8 group">
                <div className="text-5xl font-serif text-white/5 group-hover:text-[#800020] transition-all italic font-bold">02</div>
                <div>
                  <h4 className="text-xl font-bold mb-2">Desde 1985, no Centro de Curitiba</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Escritório tradicional — com processos modernos. Perfeito para quem quer tranquilidade e previsibilidade fiscal.
                  </p>
                </div>
              </div>

              <div className="flex gap-8 group">
                <div className="text-5xl font-serif text-white/5 group-hover:text-[#800020] transition-all italic font-bold">03</div>
                <div>
                  <h4 className="text-xl font-bold mb-2">Rotina médica, rotina fiscal em dia</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Emissão de notas, pró-labore, impostos e obrigações — organizado para não virar dor de cabeça em plantão.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-3">
              <a
                href={waLinkDefault}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#800020] text-white px-10 py-5 rounded-full font-bold shadow-xl hover:scale-105 transition-all inline-flex items-center justify-center gap-2 uppercase text-[10px] tracking-widest"
              >
                Diagnóstico no WhatsApp <ChevronRight size={16} />
              </a>
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-white/20 text-white px-10 py-5 rounded-full font-bold transition-all uppercase text-[10px] tracking-widest inline-flex items-center justify-center gap-2 hover:border-white/40"
              >
                <MapPin size={18} /> Ver endereço
              </a>
            </div>
          </div>

          <div className="lg:w-1/2">
            <div className="bg-[#800020] p-16 rounded-[4rem] shadow-2xl text-center">
              <ShieldCheck size={64} className="mx-auto mb-8 opacity-40" />
              <div className="text-4xl lg:text-5xl font-extrabold mb-4 tracking-tighter">Tranquilidade fiscal</div>
              <p className="text-white/70 font-medium leading-relaxed">
                Você não perde tempo, não paga multa e não tem surpresa fiscal — tudo organizado, previsível e com atendimento ágil.
              </p>
              <div className="mt-8 text-white/80 text-sm font-semibold flex items-center justify-center gap-2">
                <MapPin size={16} className="opacity-90" /> Rua Martin Afonso, 588 • Centro • Curitiba
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-white" id="faq">
        <div className="container mx-auto px-6 max-w-4xl">
          <h3 className="text-3xl lg:text-5xl font-extrabold tracking-tighter text-center mb-16 uppercase">Perguntas Frequentes</h3>
          <div className="space-y-2">
            <FAQItem
              question="Por que médico precisa de contabilidade especializada?"
              answer="Porque médico tem regras específicas (pró-labore, notas, INSS). Sem especialização, você paga mais imposto do que deveria e aumenta risco de erro. Especialização = menos imposto + mais tranquilidade."
            />
            <FAQItem
              question="Como funciona o diagnóstico gratuito?"
              answer="Você chama no WhatsApp, manda um resumo do cenário e a equipe técnica devolve um caminho claro e os próximos passos para deixar tudo em dia."
            />
            <FAQItem
              question="Atendem presencialmente?"
              answer="Sim. Estamos no Centro de Curitiba (Rua Martin Afonso, 588). Se preferir, dá para resolver tudo pelo WhatsApp também."
            />
            <FAQItem
              question="Quais serviços normalmente entram para médico PJ?"
              answer="Abertura/regularização de PJ, emissão de notas, pró-labore, apuração de impostos e obrigações acessórias (conforme seu caso)."
            />
          </div>

          <div className="text-center mt-12">
            <a
              href={waLinkDefault}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#800020] text-white px-10 py-5 rounded-full font-bold shadow-xl hover:scale-105 transition-all inline-flex items-center justify-center gap-2 uppercase text-[10px] tracking-widest"
            >
              Quero o diagnóstico gratuito <ChevronRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white pt-20 pb-10 border-t border-gray-100">
        <div className="container mx-auto px-6 flex flex-col items-center gap-10">
          <div className="flex flex-col items-center gap-2">
            <img src={LOGO_URL} alt="Logo MB Consultores" className="w-12 h-12" />
            <span className="font-extrabold text-xl tracking-tighter uppercase">
              MB <span className="text-[#800020]">CONSULTORES</span>
            </span>
            <span className="text-[10px] uppercase font-bold text-gray-400">© 2026 | MB Consultores — Curitiba</span>
            <div className="flex items-center gap-2 text-[11px] text-gray-400 font-semibold">
              <MapPin size={14} className="opacity-70" /> Rua Martin Afonso, 588 • Centro • Curitiba
            </div>
          </div>

          <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest text-gray-400">
            <a href={waLinkDefault} target="_blank" rel="noopener noreferrer" className="hover:text-[#800020]">
              WhatsApp
            </a>
            <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="hover:text-[#800020]">
              Endereço
            </a>
          </div>
        </div>
      </footer>

      {/* CTA FIXO NO MOBILE: WhatsApp */}
      <div className="fixed bottom-0 left-0 right-0 z-[80] lg:hidden bg-white border-t border-gray-100 p-3">
        <a
          href={waLinkDefault}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-[#800020] text-white py-4 rounded-2xl font-bold uppercase tracking-widest text-[10px] flex items-center justify-center gap-2"
        >
          <MessageCircle size={18} /> Diagnóstico no WhatsApp
        </a>
      </div>
    </div>
  );
};

export default App;

// Sanity checks
try {
  const t1 = buildWhatsAppLink('teste 123');
  console.assert(t1.includes(`https://wa.me/${WHATS_NUMBER}?text=`), 'WhatsApp link deve usar wa.me com número correto');
  console.assert(t1.includes('teste%20123'), 'WhatsApp link deve codificar espaços');
  console.assert(MAPS_URL.includes('google.com/maps/search/?api=1&query='), 'MAPS_URL deve ser do Google Maps');
} catch {}
