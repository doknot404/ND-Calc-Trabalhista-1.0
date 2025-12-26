
import React from 'react';
import { AppView, CalculatorType } from '../types';

interface TrabalhistaHubProps {
  navigateTo: (view: AppView, calcType?: CalculatorType) => void;
}

const TrabalhistaHub: React.FC<TrabalhistaHubProps> = ({ navigateTo }) => {
  const tools = [
    { id: CalculatorType.RESCISAO, title: 'Rescisão CLT', desc: 'Verbas contratuais, saldo, aviso e multas.', icon: 'calculate' },
    { id: CalculatorType.HORAS_EXTRAS, title: 'Horas Extras', desc: 'Média de suplementares e reflexos em DSR.', icon: 'timer' },
    { id: CalculatorType.INSALUBRIDADE, title: 'Insalubridade', desc: 'Adicionais de 10%, 20% ou 40%.', icon: 'health_and_safety' },
    { id: CalculatorType.PERICULOSIDADE, title: 'Periculosidade', desc: 'Adicional de 30% s/ salário base.', icon: 'warning' },
    { id: CalculatorType.FGTS_ATRASO, title: 'FGTS em Atraso', desc: 'Apuração de depósitos e multa rescisória.', icon: 'account_balance_wallet' },
    { id: CalculatorType.ADICIONAL_NOTURNO, title: 'Adicional Noturno', desc: 'Cálculo de jornada e reflexos contratuais.', icon: 'nights_stay' },
    { id: CalculatorType.DIFERENCA_SALARIAL, title: 'Diferença Salarial', desc: 'Ajuste de paradigma e salários devidos.', icon: 'compare_arrows' },
    { id: CalculatorType.DESVIO_FUNCAO, title: 'Desvio de Função', desc: 'Adicional por acúmulo de tarefas.', icon: 'engineering' },
  ];

  return (
    <main className="flex-1 px-8 py-10 overflow-y-auto">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-black text-white tracking-tight">Cálculos Trabalhistas</h1>
          <p className="text-text-secondary text-lg">Selecione o tipo de liquidação para iniciar a memória de cálculo.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tools.map((tool, i) => (
            <div 
              key={i} 
              onClick={() => navigateTo(AppView.CALCULATION_FORM, tool.id as CalculatorType)}
              className="bg-surface-dark border border-border-dark p-6 rounded-2xl hover:border-primary transition-all cursor-pointer group flex flex-col h-full shadow-lg"
            >
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-all shadow-inner">
                <span className="material-symbols-outlined">{tool.icon}</span>
              </div>
              <h3 className="font-bold text-white text-lg">{tool.title}</h3>
              <p className="text-xs text-text-secondary mt-2 flex-1 leading-relaxed">{tool.desc}</p>
              <div className="mt-6 pt-4 border-t border-border-dark/50 flex items-center justify-between">
                <span className="text-[10px] font-black text-primary uppercase tracking-widest">Abrir</span>
                <span className="material-symbols-outlined text-primary text-sm">arrow_forward</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default TrabalhistaHub;
