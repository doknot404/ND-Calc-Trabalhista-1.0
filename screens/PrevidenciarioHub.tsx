
import React from 'react';
import { AppView, CalculatorType } from '../types';

interface PrevidenciarioHubProps {
  navigateTo: (view: AppView, calcType?: CalculatorType) => void;
}

const PrevidenciarioHub: React.FC<PrevidenciarioHubProps> = ({ navigateTo }) => {
  const tools = [
    { id: CalculatorType.TEMPO_CONTRIBUICAO, title: 'Tempo de Contribuição', desc: 'Cálculo de períodos comuns e especiais com multiplicadores.', icon: 'history' },
    { id: CalculatorType.RMI_PREV, title: 'Renda Mensal Inicial', desc: 'Simulação do valor do benefício (Regra Pós-Reforma).', icon: 'request_quote' },
    { id: CalculatorType.ATRASADOS_PREV, title: 'Cálculo de Atrasados', desc: 'Liquidação de valores devidos e não pagos pelo INSS.', icon: 'payments' },
    { id: CalculatorType.PLANEJAMENTO_PREV, title: 'Planejamento', desc: 'Projeção de regras de transição e data de aposentadoria.', icon: 'event_repeat' },
  ];

  return (
    <main className="flex-1 px-8 py-10 overflow-y-auto">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-8">
        <div className="flex items-center gap-2 text-sm text-text-secondary">
          <button onClick={() => navigateTo(AppView.DASHBOARD)} className="hover:text-primary transition-colors flex items-center gap-1">
            <span className="material-symbols-outlined text-[18px]">home</span>
            Home
          </button>
          <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          <span className="text-white font-medium">Previdenciário</span>
        </div>
        <div>
          <h1 className="text-4xl font-black text-white tracking-tight">Área Previdenciária</h1>
          <p className="text-text-secondary mt-2 text-lg">Simulações de benefícios, regras de transição e liquidação de atrasados.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tools.map((tool, i) => (
            <div 
              key={i} 
              onClick={() => navigateTo(AppView.CALCULATION_FORM, tool.id as CalculatorType)}
              className="bg-surface-dark border border-border-dark p-6 rounded-xl hover:border-amber-500 transition-all cursor-pointer group flex flex-col h-full"
            >
              <div className="w-12 h-12 bg-amber-500/10 text-amber-500 rounded-lg flex items-center justify-center mb-4 group-hover:bg-amber-500 group-hover:text-white transition-all">
                <span className="material-symbols-outlined">{tool.icon}</span>
              </div>
              <h3 className="font-bold text-white text-lg">{tool.title}</h3>
              <p className="text-sm text-text-secondary mt-1 flex-1">{tool.desc}</p>
              <div className="mt-4 flex items-center gap-2 text-amber-500 text-xs font-bold uppercase tracking-widest">
                Acessar Calculadora
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default PrevidenciarioHub;
