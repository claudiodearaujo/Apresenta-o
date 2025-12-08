import React, { useState, useEffect, useCallback } from 'react';
import { 
  ChevronRight, 
  ChevronLeft, 
  Layers, 
  TrendingUp, 
  ShieldCheck, 
  Globe, 
  Briefcase, 
  Cpu, 
  Landmark, 
  AlertTriangle,
  Users,
  Building2,
  Wallet,
  ArrowRight
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell,
  LineChart,
  Line,
  Legend
} from 'recharts';
import { SlideLayout } from './components/SlideLayout';
import { SlideData } from './types';

// --- Chart Data Constants ---

const MARKET_SIZE_DATA = [
  { name: 'Mercado Total', value: 9000, label: 'R$ 8-10 Tri' },
  { name: 'Estoque Aberto', value: 1450, label: 'R$ 1.3-1.6 Tri' },
  { name: 'Potencial', value: 2500, label: 'R$ 2-3 Tri' },
];

const PROJECTION_DATA = [
  { year: 'Ano 1', valor: 0.4, label: 'R$ 400M' },
  { year: 'Ano 2', valor: 2.5, label: 'R$ 2.5B' },
  { year: 'Ano 3', valor: 5.0, label: 'R$ 5B' },
  { year: 'Ano 5', valor: 12.5, label: 'R$ 12.5B' },
];

const GLOBAL_PROJECTION_DATA = [
  { name: 'Dívida Tokenizada 2030', value: 1.9, fill: '#FFB81C' },
  { name: 'Títulos Tokenizados 2030', value: 4.5, fill: '#003366' },
];

// --- Slides Configuration ---

const SLIDES: SlideData[] = [
  {
    id: 1,
    type: 'cover',
    title: 'DAYCOVAL TOKENIZA',
    subtitle: 'Marketplace de Recebíveis Tokenizados de PMEs',
    bullets: [
      'Infraestrutura de liquidez para PMEs via tokenização regulada',
      'Conectando recebíveis de qualidade com investidores em busca de yield'
    ]
  },
  {
    id: 2,
    type: 'standard',
    title: 'A tese do Daycoval Tokeniza',
    section: 'Visão Geral',
    bullets: [
      'PMEs brasileiras concentram trilhões em recebíveis a prazo, mas continuam com caixa pressionado.',
      'Investidores buscam retornos em dois dígitos com lastro real.',
      'Tokenização permite transformar recebíveis em ativos digitais negociáveis, com governança bancária.',
      'Daycoval como infraestrutura de liquidez entre PMEs e investidores, em modelo asset-light e baseado em fees.'
    ]
  },
  {
    id: 3,
    type: 'comparison',
    title: 'PMEs: ricas no papel, pobres no caixa',
    section: 'O Problema',
    bullets: [
      'Vendem hoje, entregam hoje, mas recebem em 60–90 dias (ou mais).',
      'Enquanto esperam o recebimento, precisam pagar: Folha, fornecedores, aluguel, impostos.',
      'Resultado: Recebíveis sólidos, mas sem liquidez e ciclo de caixa estruturalmente ineficiente.'
    ]
  },
  {
    id: 4,
    type: 'chart',
    title: 'Trilhões de reais parados no tempo',
    subtitle: 'Estimativa de Volume de Recebíveis',
    section: 'Mercado',
    bullets: [
      'Mercado de duplicatas e vendas a prazo: R$ 8–10 trilhões/ano.',
      'Prazos médios de 60–70 dias → estoque de R$ 1,3–1,6 trilhão em aberto.',
      'Incluindo empresas médias e outros recebíveis → R$ 2–3 trilhões é uma ordem de grandeza plausível.'
    ]
  },
  {
    id: 5,
    type: 'standard',
    title: 'Crédito caro, concentrado e burocrático',
    section: 'O Gargalo',
    bullets: [
      '21–22 milhões de empresas ativas; maioria são micro, pequenas e médias.',
      'Pesquisas Sebrae: 60–80% das PMEs têm dificuldade relevante de acesso ao crédito.',
      'Crédito para PMEs: apenas 9–20% do crédito corporativo total.',
      'Estruturas tradicionais exigem: Análise pesada, Garantias físicas, Tickets mínimos altos.'
    ]
  },
  {
    id: 6,
    type: 'grid',
    title: 'As quatro travas do sistema atual',
    section: 'Travas',
    content: null // Rendered specifically in switch
  },
  {
    id: 7,
    type: 'quote',
    title: 'A história da padaria que você já conhece',
    section: 'Narrativa',
    bullets: [
      'A padaria vende hoje para a escola e só recebe em 90 dias.',
      'No papel: R$ 10 mil a receber. No caixa: R$ 0 hoje.',
      'Solução: vender o direito de receber e antecipar R$ 9.500 hoje.',
      'O investidor recebe os R$ 10 mil no vencimento → retorno melhor que aplicações conservadoras.'
    ]
  },
  {
    id: 8,
    type: 'standard',
    title: 'O que é o Daycoval Tokeniza?',
    section: 'Proposta',
    bullets: [
      'Marketplace regulado de recebíveis tokenizados de PMEs.',
      'PMEs tokenizam seus recebíveis validados pelo Daycoval.',
      'Investidores compram tokens que representam esses direitos de crédito.',
      'Liquidação e pagamentos automatizados por smart contracts.',
      'Daycoval como originador, estruturador, validador de crédito e operador de infraestrutura.'
    ]
  },
  {
    id: 9,
    type: 'process',
    title: 'Jornada de ponta a ponta',
    section: 'Como Funciona',
    content: null
  },
  {
    id: 10,
    type: 'standard',
    title: 'Arquitetura de Referência',
    section: 'Tecnologia',
    content: null // Custom Render
  },
  {
    id: 11,
    type: 'standard',
    title: 'Regulação: o terreno é favorável',
    section: 'Contexto',
    bullets: [
      'Sandbox CVM: já testou e aprovou modelos de tokenização (ex.: BEE4).',
      'Duplicata escritural (Lei 13.775/2018): Agenda de obrigatoriedade escalonada.',
      'Marco Legal de Garantias (Lei 14.711/2023): Execução extrajudicial simplificada.',
      'Drex (CBDC): Fase piloto avançada, integração futura possível para liquidação.'
    ]
  },
  {
    id: 12,
    type: 'standard',
    title: 'Brasil: Liderança Regional',
    section: 'Mercado',
    bullets: [
      'A afirmação “Brasil tem zero market share” é falsa. O país é líder regional.',
      'Principais players (MB Tokens, Vórtx, Liqi) já movimentam bilhões.',
      'Daycoval entra como banco de referência, com brand e governança.'
    ]
  },
  {
    id: 13,
    type: 'chart',
    title: 'Tokenização lá fora: trilhões à vista',
    section: 'Mercado Global',
    bullets: [
      'BCG estima tokenização de ativos em US$ 9–19 trilhões até 2030.',
      'Citi projeta US$ 4–5 trilhões em títulos tokenizados em 2030.',
      'Não é tese teórica – é uma agenda global em execução.'
    ]
  },
  {
    id: 14,
    type: 'chart',
    title: 'Modelo de negócio e escala projetada',
    section: 'Projeções',
    bullets: [
      'Receita baseada em fees: Estruturação, Distribuição e Servicing.',
      'Ano 1: R$ 300–500M (MVP).',
      'Ano 2–3: R$ 2–5B/ano.',
      'Ano 5: R$ 10–15B/ano com potencial de spin-off.'
    ]
  },
  {
    id: 15,
    type: 'grid',
    title: 'Riscos e Mitigações',
    section: 'Riscos',
    content: null
  },
  {
    id: 16,
    type: 'standard',
    title: 'Mensagem certa para cada público',
    section: 'Público',
    bullets: [
      'PMEs: "Antecipe suas vendas sem burocracia."',
      'Investidores: "Renda fixa com lastro real e proteção."',
      'Conselho/C-Level: "Resolver a maior ineficiência de capital das PMEs com infraestrutura própria."'
    ]
  },
  {
    id: 17,
    type: 'cover',
    title: 'Por que começar agora?',
    subtitle: 'Próximos Passos',
    bullets: [
      'O problema é real e gigantesco.',
      'O Brasil já é referência em tokenização.',
      'O Daycoval tem reputação, expertise e capacidade de orquestrar.',
      'Meta: Aprovar MVP, escolher pilotos, medir e escalar.'
    ]
  }
];

// --- Main App Component ---

export default function App() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => Math.min(prev + 1, SLIDES.length - 1));
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  const currentSlide = SLIDES[currentSlideIndex];

  // --- Rendering Helpers ---

  const renderBullets = (bullets: string[]) => (
    <ul className="space-y-4 md:space-y-6">
      {bullets.map((bullet, idx) => (
        <li key={idx} className="flex items-start space-x-3 text-lg md:text-2xl text-slate-700 animate-[fadeIn_0.5s_ease-out_forwards]" style={{animationDelay: `${idx * 0.1}s`}}>
          <span className="text-daycoval-gold mt-1.5 flex-shrink-0">
            <ChevronRight size={24} strokeWidth={3} />
          </span>
          <span>{bullet}</span>
        </li>
      ))}
    </ul>
  );

  const renderContent = () => {
    // Custom Slide Logic based on ID or Type
    if (currentSlide.id === 6) { // As quatro travas
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {[
            { title: "Prazos Longos", icon: <Briefcase />, desc: "B2B: 60-90 dias. Governo: 120-180 dias." },
            { title: "Crédito Desalinhado", icon: <AlertTriangle />, desc: "Bancos pedem imóvel e histórico formal que a PME não tem." },
            { title: "Antecipação Cara", icon: <TrendingUp />, desc: "Factoring a 3.8% a.m. consome a margem." },
            { title: "Baixa Liquidez", icon: <Layers />, desc: "Recebíveis não circulam em mercado secundário." }
          ].map((item, idx) => (
            <div key={idx} className="bg-slate-50 p-6 rounded-xl border-l-4 border-daycoval-gold shadow-sm hover:shadow-md transition-shadow">
              <div className="text-daycoval-blue mb-4">{React.cloneElement(item.icon, { size: 32 })}</div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">{item.title}</h3>
              <p className="text-slate-600">{item.desc}</p>
            </div>
          ))}
        </div>
      );
    }

    if (currentSlide.id === 9) { // Jornada
      return (
        <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:items-start md:justify-between mt-12 gap-4">
            {[
                { title: "1. Originação", desc: "PME + Sacados de bom risco validada.", icon: <Users /> },
                { title: "2. Tokenização", desc: "Emissão de tokens (1 token = R$ 1). Smart Contract define regras.", icon: <Cpu /> },
                { title: "3. Marketplace", desc: "Investidores compram tokens. Ticket baixo.", icon: <Globe /> },
                { title: "4. Liquidação", desc: "Sacado paga no vencimento. Proteção first-loss.", icon: <Wallet /> }
            ].map((step, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center text-center group">
                    <div className="w-16 h-16 rounded-full bg-daycoval-blue text-white flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform">
                        {step.icon}
                    </div>
                    <h3 className="font-bold text-lg mb-2 text-daycoval-blue">{step.title}</h3>
                    <p className="text-sm text-slate-600">{step.desc}</p>
                    {idx < 3 && <div className="hidden md:block absolute transform translate-x-32 translate-y-8 text-daycoval-gold opacity-50"><ArrowRight /></div>}
                </div>
            ))}
        </div>
      );
    }

    if (currentSlide.id === 10) { // Stack Tecnológica
      return (
        <div className="space-y-4 mt-8 max-w-4xl mx-auto">
          <div className="bg-slate-800 text-white p-4 rounded-lg text-center">
            <h4 className="font-bold text-daycoval-gold mb-1">Blockchain</h4>
            <p className="text-sm opacity-80">Rede Pública (Polygon) ou Permissionada (Hyperledger)</p>
          </div>
          <div className="bg-daycoval-blue text-white p-4 rounded-lg text-center mx-4">
            <h4 className="font-bold text-daycoval-gold mb-1">Smart Contracts</h4>
            <p className="text-sm opacity-80">Regras de fluxo, elegibilidade, pagamentos</p>
          </div>
          <div className="bg-daycoval-lightBlue text-white p-4 rounded-lg text-center mx-8">
            <h4 className="font-bold text-daycoval-gold mb-1">Plataforma (App & API)</h4>
            <p className="text-sm opacity-80">Frontend (Angular), Backend (Node), Custódia</p>
          </div>
          <div className="flex justify-between gap-4 text-xs text-slate-500 px-12">
            <div className="border-t border-slate-300 pt-2 w-full text-center">B3 / Registradoras</div>
            <div className="border-t border-slate-300 pt-2 w-full text-center">Bacen / CVM</div>
            <div className="border-t border-slate-300 pt-2 w-full text-center">Core Bancário</div>
          </div>
        </div>
      );
    }

    if (currentSlide.id === 15) { // Riscos
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
                <h3 className="flex items-center font-bold text-red-600 mb-2"><AlertTriangle className="mr-2" size={20}/> Regulatório</h3>
                <p className="text-slate-600 text-sm">Mitigação: Estruturas reconhecidas (FIDC, SPE), Sandbox CVM.</p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
                <h3 className="flex items-center font-bold text-orange-600 mb-2"><ShieldCheck className="mr-2" size={20}/> Crédito</h3>
                <p className="text-slate-600 text-sm">Mitigação: Seleção rigorosa, First-loss Daycoval, Seguro de crédito.</p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
                <h3 className="flex items-center font-bold text-blue-600 mb-2"><Cpu className="mr-2" size={20}/> Tecnológico</h3>
                <p className="text-slate-600 text-sm">Mitigação: Auditoria de contratos, infraestrutura modular white-label.</p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
                <h3 className="flex items-center font-bold text-green-600 mb-2"><TrendingUp className="mr-2" size={20}/> Liquidez</h3>
                <p className="text-slate-600 text-sm">Mitigação: Market maker inicial, prazos casados.</p>
            </div>
        </div>
      );
    }

    if (currentSlide.type === 'chart') {
      if (currentSlide.id === 4) { // Market Size
        return (
          <div className="h-[400px] w-full mt-8">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MARKET_SIZE_DATA} layout="vertical" margin={{ left: 50, right: 50 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" width={120} tick={{fill: '#334155', fontWeight: 600}} />
                <Tooltip 
                    cursor={{fill: 'transparent'}}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="value" fill="#003366" radius={[0, 4, 4, 0]} barSize={40}>
                    {MARKET_SIZE_DATA.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index === 2 ? '#FFB81C' : '#003366'} />
                    ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div className="text-center text-sm text-slate-500 mt-4">* Valores em Bilhões de Reais (Estimativa)</div>
            {currentSlide.bullets && <div className="mt-8">{renderBullets(currentSlide.bullets)}</div>}
          </div>
        );
      }
      if (currentSlide.id === 13) { // Global
        return (
          <div className="flex flex-col md:flex-row items-center gap-8 mt-8">
              <div className="h-[300px] w-full md:w-1/2">
                <h4 className="text-center font-bold text-slate-700 mb-4">Projeção Global 2030 (US$ Tri)</h4>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={GLOBAL_PROJECTION_DATA}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={100}
                            paddingAngle={5}
                            dataKey="value"
                        >
                             {GLOBAL_PROJECTION_DATA.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="w-full md:w-1/2">
                {currentSlide.bullets && renderBullets(currentSlide.bullets)}
              </div>
          </div>
        );
      }
      if (currentSlide.id === 14) { // Projections
         return (
             <div className="h-[400px] w-full mt-8">
                 <ResponsiveContainer width="100%" height="100%">
                     <LineChart data={PROJECTION_DATA}>
                         <CartesianGrid strokeDasharray="3 3" vertical={false} />
                         <XAxis dataKey="year" />
                         <YAxis />
                         <Tooltip 
                            formatter={(value) => [`R$ ${value} Bi`, 'Volume']}
                            contentStyle={{ borderRadius: '8px' }}
                         />
                         <Line type="monotone" dataKey="valor" stroke="#003366" strokeWidth={4} activeDot={{ r: 8 }} />
                     </LineChart>
                 </ResponsiveContainer>
                 <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                     {PROJECTION_DATA.map((d, i) => (
                         <div key={i} className="text-center p-3 bg-slate-100 rounded-lg">
                             <div className="text-sm text-slate-500">{d.year}</div>
                             <div className="font-bold text-daycoval-blue">{d.label}</div>
                         </div>
                     ))}
                 </div>
             </div>
         )
      }
    }

    if (currentSlide.type === 'quote') {
        return (
            <div className="flex flex-col h-full justify-center">
                 <div className="border-l-8 border-daycoval-gold pl-8 py-4 bg-slate-50 rounded-r-xl">
                    {currentSlide.bullets && renderBullets(currentSlide.bullets)}
                 </div>
                 <div className="mt-8 flex items-center justify-center space-x-2 text-daycoval-blue opacity-80">
                    <Building2 />
                    <span className="font-semibold">Exemplo Prático</span>
                 </div>
            </div>
        )
    }

    // Default Render
    return (
      <div className="mt-8">
        {currentSlide.bullets && renderBullets(currentSlide.bullets)}
      </div>
    );
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-slate-100 text-slate-900 font-sans overflow-hidden">
      
      {/* Top Bar / Progress */}
      <div className="h-1.5 w-full bg-slate-200 flex">
        {SLIDES.map((slide, idx) => (
          <div 
            key={slide.id}
            className={`h-full flex-1 transition-all duration-300 ${idx <= currentSlideIndex ? 'bg-daycoval-gold' : 'bg-transparent'}`}
          />
        ))}
      </div>

      {/* Slide Area */}
      <div className="flex-1 relative overflow-hidden">
        <SlideLayout isCover={currentSlide.type === 'cover'}>
            
            {/* Header Content (Except Cover) */}
            {currentSlide.type !== 'cover' && (
                <div className="mb-6 border-b border-slate-200 pb-4 flex justify-between items-end">
                    <div>
                        {currentSlide.section && (
                            <span className="text-daycoval-gold font-bold text-xs uppercase tracking-widest mb-1 block">
                                {currentSlide.section}
                            </span>
                        )}
                        <h1 className="text-3xl md:text-4xl font-extrabold text-daycoval-blue tracking-tight">
                            {currentSlide.title}
                        </h1>
                    </div>
                    {currentSlide.subtitle && (
                         <h2 className="text-slate-400 font-medium text-lg hidden md:block">{currentSlide.subtitle}</h2>
                    )}
                </div>
            )}

            {/* Cover Content */}
            {currentSlide.type === 'cover' && (
                <div className="flex flex-col items-center justify-center h-full space-y-8 animate-[fadeIn_0.8s_ease-out]">
                    <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mb-6 backdrop-blur-sm">
                        <Landmark size={48} className="text-daycoval-gold" />
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight drop-shadow-lg">
                        {currentSlide.title}
                    </h1>
                    <div className="h-1 w-32 bg-daycoval-gold"></div>
                    <h2 className="text-xl md:text-2xl font-light text-slate-200 max-w-2xl text-center leading-relaxed">
                        {currentSlide.subtitle}
                    </h2>
                    
                    {currentSlide.bullets && (
                         <div className="mt-12 text-sm md:text-base opacity-80 max-w-xl text-center space-y-2">
                             {currentSlide.bullets.map((b, i) => <p key={i}>{b}</p>)}
                         </div>
                    )}

                    <button 
                        onClick={nextSlide}
                        className="mt-16 bg-daycoval-gold hover:bg-daycoval-darkGold text-daycoval-blue font-bold py-3 px-8 rounded-full transition-all shadow-lg hover:scale-105 flex items-center"
                    >
                        Iniciar Apresentação <ChevronRight className="ml-2" />
                    </button>
                </div>
            )}

            {/* Main Content Body */}
            {currentSlide.type !== 'cover' && (
                <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                    {renderContent()}
                </div>
            )}

            {/* Footer Logo/Context (Except Cover) */}
            {currentSlide.type !== 'cover' && (
                <div className="mt-auto pt-8 flex justify-between items-center text-slate-300 text-xs uppercase tracking-wider">
                     <span>Daycoval Tokeniza &bull; 2025</span>
                     <span>{currentSlideIndex + 1} / {SLIDES.length}</span>
                </div>
            )}
        </SlideLayout>
      </div>

      {/* Navigation Controls */}
      <div className="h-16 bg-white border-t border-slate-200 flex items-center justify-between px-6 z-10">
        <button 
            onClick={prevSlide} 
            disabled={currentSlideIndex === 0}
            className={`p-2 rounded-full hover:bg-slate-100 transition-colors ${currentSlideIndex === 0 ? 'text-slate-300' : 'text-daycoval-blue'}`}
        >
            <ChevronLeft size={28} />
        </button>

        <div className="text-xs font-semibold text-slate-400">
            Use as setas do teclado para navegar
        </div>

        <button 
            onClick={nextSlide} 
            disabled={currentSlideIndex === SLIDES.length - 1}
            className={`p-2 rounded-full hover:bg-slate-100 transition-colors ${currentSlideIndex === SLIDES.length - 1 ? 'text-slate-300' : 'text-daycoval-blue'}`}
        >
            <ChevronRight size={28} />
        </button>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #cbd5e1;
          border-radius: 20px;
        }
      `}</style>
    </div>
  );
}