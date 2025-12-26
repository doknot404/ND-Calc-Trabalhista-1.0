
import React from 'react';
import { AppView, CalculatorType } from '../types';

interface CivilHubProps {
  navigateTo: (view: AppView, calcType?: CalculatorType) => void;
}

const CivilHub: React.FC<CivilHubProps> = ({ navigateTo }) => {
  const tools = [
    { id: CalculatorType.ATUALIZACAO_CIVIL, title: 'Atualização Cível', desc: 'Correção monetária e juros de mora.', icon: 'trending_up', active: true },
    { id: 'revisional_aluguel', title: 'Revisão de Aluguel', desc: 'Atualização por IGPM ou IPCA.', icon: 'house', active: false },
    { id: 'execucao', title: 'Execução de Títulos', desc: 'Planilha de débitos para execuções.', icon: 'contract', active: false },
    { id: 'revisional', title: 'Revisional Bancária', desc: 'Análise de juros abusivos.', icon: 'account_balance', active: false },
  ];

  return (
    <main className="flex-1 px-8 py-10 overflow-y-auto">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-8">
        <div>
          <h1 className="text-4xl font-black text-white">Direito Cível</h1>
          <p className="text-text-secondary mt-2">Ferramentas de atualização monetária e liquidação de sentenças cíveis.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tools.map((tool, i) => (
            <div 
              key={i} 
              onClick={() => tool.active && navigateTo(AppView.CALCULATION_FORM, tool.id as CalculatorType)}
              className={`relative overflow-hidden bg-surface-dark border p-6 rounded-xl transition-all group ${
                tool.active 
                ? 'border-border-dark hover:border-emerald-500 cursor-pointer' 
                : 'border-border-dark/50 cursor-not-allowed grayscale'
              }`}
            >
              {!tool.active && (
                <div className="absolute inset-0 z-20 flex items-center justify-center bg-background-dark/80 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="bg-amber-500 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full">Em Breve</span>
                </div>
              )}
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-all ${
                tool.active ? 'bg-emerald-500/10 text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white' : 'bg-border-dark text-text-secondary'
              }`}>
                <span className="material-symbols-outlined">{tool.icon}</span>
              </div>
              <h3 className="font-bold text-white text-lg">{tool.title}</h3>
              <p className="text-sm text-text-secondary mt-1">{tool.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default CivilHub;
