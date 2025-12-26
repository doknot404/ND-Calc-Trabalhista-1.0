
import React from 'react';
import { AppView, CalculatorType } from '../types';

interface DashboardProps {
  navigateTo: (view: AppView, calcType?: CalculatorType) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ navigateTo }) => {
  return (
    <main className="flex-1 flex flex-col h-screen overflow-y-auto">
      <header className="sticky top-0 z-10 flex items-center justify-between border-b border-border-dark bg-background-dark/80 backdrop-blur-md px-8 py-4">
        <div className="flex-1 max-w-lg">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <span className="material-symbols-outlined text-text-secondary group-focus-within:text-primary transition-colors">search</span>
            </div>
            <input 
              className="block w-full p-2.5 pl-10 text-sm border border-transparent rounded-lg bg-surface-dark-alt/50 text-white focus:ring-primary focus:border-primary placeholder-text-secondary transition-all" 
              placeholder="Buscar processos ou cálculos salvos..." 
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 text-text-secondary hover:text-white rounded-lg hover:bg-surface-dark-alt transition-colors">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <div className="h-8 w-px bg-border-dark mx-2"></div>
          <button onClick={() => navigateTo(AppView.TRABALHISTA_HUB)} className="flex h-10 items-center justify-center rounded-lg bg-primary px-6 text-xs font-black uppercase tracking-widest text-white shadow-lg shadow-primary/20 hover:bg-blue-600 transition-all">
            NOVO CÁLCULO
          </button>
        </div>
      </header>

      <div className="flex-1 p-8 max-w-[1200px] mx-auto w-full flex flex-col gap-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-4xl font-black text-white tracking-tight">Painel Trabalhista</h2>
            <p className="text-text-secondary mt-1">Gestão de liquidações e verbas rescisórias.</p>
          </div>
          <div className="bg-primary/5 border border-primary/20 rounded-xl px-4 py-2">
            <span className="text-[10px] font-black uppercase text-primary tracking-widest">Acesso Rápido</span>
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <span className="material-symbols-outlined text-[18px]">verified</span>
              Tabela SELIC/IPCA-E de Agosto/2024
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-surface-dark border border-border-dark flex flex-col gap-2 group hover:border-primary/50 transition-all cursor-pointer">
            <p className="text-text-secondary font-black text-[10px] uppercase tracking-widest">Cálculos Finalizados</p>
            <div className="flex items-baseline gap-2">
              <p className="text-4xl font-black text-white">482</p>
              <span className="text-xs font-bold text-emerald-500">+8 hoje</span>
            </div>
          </div>
          <div className="p-6 rounded-2xl bg-surface-dark border border-border-dark flex flex-col gap-2 group hover:border-primary/50 transition-all cursor-pointer">
            <p className="text-text-secondary font-black text-[10px] uppercase tracking-widest">Média de Valor Apurado</p>
            <p className="text-4xl font-black text-white">R$ 24k</p>
          </div>
          <div className="p-6 rounded-2xl bg-gradient-to-br from-primary to-blue-800 flex flex-col gap-2 shadow-xl shadow-primary/10">
            <p className="text-white/70 font-black text-[10px] uppercase tracking-widest">Uso da Plataforma</p>
            <p className="text-4xl font-black text-white">Premium</p>
            <div className="w-full bg-white/20 h-1 rounded-full mt-2">
              <div className="bg-white h-full w-[85%] rounded-full"></div>
            </div>
          </div>
        </div>

        <section>
          <h3 className="text-sm font-black text-white uppercase tracking-widest mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]">flash_on</span>
            Atalhos Operacionais
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
             {[
               { id: CalculatorType.RESCISAO, label: 'Rescisão CLT', icon: 'payments', color: 'text-primary' },
               { id: CalculatorType.HORAS_EXTRAS, label: 'Horas Extras', icon: 'timer', color: 'text-emerald-500' },
               { id: CalculatorType.INSALUBRIDADE, label: 'Insalubridade', icon: 'health_and_safety', color: 'text-amber-500' },
               { id: CalculatorType.FGTS_ATRASO, label: 'FGTS / Multa', icon: 'account_balance_wallet', color: 'text-indigo-500' }
             ].map((item) => (
               <button 
                 key={item.id}
                 onClick={() => navigateTo(AppView.CALCULATION_FORM, item.id)}
                 className="p-5 rounded-2xl bg-surface-dark border border-border-dark hover:border-primary transition-all group flex flex-col gap-3 text-left"
               >
                 <div className={`w-10 h-10 rounded-xl bg-surface-dark-alt flex items-center justify-center ${item.color} group-hover:bg-primary group-hover:text-white transition-all`}>
                   <span className="material-symbols-outlined">{item.icon}</span>
                 </div>
                 <span className="font-bold text-white text-sm">{item.label}</span>
               </button>
             ))}
          </div>
        </section>

        <section className="bg-surface-dark-alt/30 border border-border-dark rounded-3xl p-8 flex flex-col md:flex-row items-center gap-8">
           <div className="size-24 rounded-2xl bg-primary flex items-center justify-center shadow-2xl shadow-primary/30 shrink-0">
             <span className="material-symbols-outlined text-white text-[48px]">auto_awesome</span>
           </div>
           <div className="flex-1 text-center md:text-left">
             <h3 className="text-2xl font-black text-white mb-2">Relatórios em Formato de Tabela</h3>
             <p className="text-text-secondary leading-relaxed">Agora você pode copiar qualquer memória de cálculo e colar diretamente no Word ou Google Docs mantendo a formatação profissional em tabelas.</p>
           </div>
           <button onClick={() => navigateTo(AppView.HELP)} className="px-8 py-3 rounded-xl bg-white text-background-dark font-black text-xs uppercase tracking-widest hover:scale-105 transition-all">
             VER TUTORIAL
           </button>
        </section>
      </div>
    </main>
  );
};

export default Dashboard;
