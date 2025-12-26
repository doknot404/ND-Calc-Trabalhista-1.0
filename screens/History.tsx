
import React from 'react';
import { AppView, CalculationEntry } from '../types';

interface HistoryProps {
  navigateTo: (view: AppView) => void;
}

const History: React.FC<HistoryProps> = ({ navigateTo }) => {
  const calculations: CalculationEntry[] = [
    { id: '1', name: 'Rescisão - João Silva', client: 'Empresa Tech Solutions', processNumber: '0012345-88.2023.5.01.0000', area: 'Trabalhista', date: '12/10/2023', value: 45200.00, status: 'Completo', tags: ['Urgente', 'Revisar'] },
    { id: '2', name: 'Danos Morais - Maria Oliveira', client: 'Maria Oliveira', processNumber: '102030-22.2023.8.26.0000', area: 'Civil', date: '05/10/2023', value: 12500.00, status: 'Finalizado', tags: ['Acordo'] },
    { id: '3', name: 'Ação Previdenciária', client: 'Pedro Santos', processNumber: '2200-55.2023.4.01', area: 'Previdenciário', date: '28/09/2023', value: 128950.45, status: 'Completo', tags: [] },
    { id: '4', name: 'Horas Extras - Pedro Alves', client: 'Restaurante ABC', processNumber: 'Aguardando Distribuição', area: 'Trabalhista', date: '20/09/2023', value: 8450.20, status: 'Rascunho', tags: [] },
  ];

  return (
    <main className="flex-1 flex flex-col h-screen overflow-hidden">
      <header className="flex-none flex items-center justify-between border-b border-border-dark bg-surface-dark px-8 py-4">
        <h2 className="text-lg font-bold text-white">Meus Cálculos</h2>
        <button onClick={() => navigateTo(AppView.TRABALHISTA_HUB)} className="h-10 px-4 bg-primary rounded-lg text-sm font-bold text-white">
          + Novo Cálculo
        </button>
      </header>

      <div className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-[1400px] mx-auto flex flex-col gap-6">
           <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-black text-white tracking-tight">Gerenciar Cálculos</h1>
                <p className="text-text-secondary">Visualize e organize todos os seus cálculos jurídicos salvos.</p>
              </div>
              <div className="flex gap-4">
                <div className="px-4 py-2 rounded-lg bg-surface-dark border border-border-dark">
                  <p className="text-xs text-text-secondary font-bold uppercase">Total</p>
                  <p className="text-xl font-bold text-white">142</p>
                </div>
                <div className="px-4 py-2 rounded-lg bg-surface-dark border border-border-dark">
                  <p className="text-xs text-text-secondary font-bold uppercase">Este Mês</p>
                  <p className="text-xl font-bold text-primary">+12</p>
                </div>
              </div>
           </div>

           <div className="flex flex-col gap-4 bg-surface-dark p-4 rounded-xl border border-border-dark shadow-sm">
             <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary material-symbols-outlined">search</span>
                <input className="w-full pl-10 h-11 rounded-lg border border-border-dark bg-background-dark text-white placeholder-text-secondary outline-none focus:ring-1 focus:ring-primary" placeholder="Buscar por nome, cliente ou processo..." />
             </div>
           </div>

           <div className="bg-surface-dark rounded-xl border border-border-dark overflow-hidden">
             <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-background-dark/50 border-b border-border-dark">
                      <th className="py-4 pl-6 pr-4 text-xs font-bold uppercase text-text-secondary">Nome do Cálculo</th>
                      <th className="py-4 px-4 text-xs font-bold uppercase text-text-secondary">Área</th>
                      <th className="py-4 px-4 text-xs font-bold uppercase text-text-secondary">Data</th>
                      <th className="py-4 px-4 text-xs font-bold uppercase text-text-secondary text-right">Valor (R$)</th>
                      <th className="py-4 px-4 text-xs font-bold uppercase text-text-secondary">Tags</th>
                      <th className="py-4 pl-4 pr-6 text-xs font-bold uppercase text-text-secondary text-center">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-dark/30">
                    {calculations.map((calc) => (
                      <tr key={calc.id} className="hover:bg-surface-dark-alt/30 transition-colors cursor-pointer group">
                        <td className="py-4 pl-6 pr-4">
                          <div className="flex flex-col">
                            <span className="font-bold text-white">{calc.name}</span>
                            <span className="text-xs text-text-secondary">{calc.processNumber}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className={`px-2 py-1 rounded-md text-xs font-bold ring-1 ring-inset ${
                            calc.area === 'Trabalhista' ? 'bg-blue-500/10 text-blue-400 ring-blue-400/20' : 
                            calc.area === 'Civil' ? 'bg-purple-500/10 text-purple-400 ring-purple-400/20' : 
                            'bg-orange-500/10 text-orange-400 ring-orange-400/20'
                          }`}>
                            {calc.area}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-sm text-text-secondary">{calc.date}</td>
                        <td className="py-4 px-4 text-right text-sm font-mono text-white">{calc.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                        <td className="py-4 px-4">
                          <div className="flex gap-1">
                            {calc.tags.map((tag, i) => (
                              <span key={i} className="px-1.5 py-0.5 rounded bg-surface-dark-alt text-[10px] text-text-secondary border border-border-dark">
                                {tag}
                              </span>
                            ))}
                            {calc.tags.length === 0 && <span className="text-xs text-text-secondary/40 italic">Sem tags</span>}
                          </div>
                        </td>
                        <td className="py-4 pl-4 pr-6 text-center">
                           <button className="p-1.5 rounded-lg hover:bg-surface-dark-alt text-text-secondary hover:text-white transition-all">
                             <span className="material-symbols-outlined text-[20px]">more_vert</span>
                           </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
             </div>
           </div>
        </div>
      </div>
    </main>
  );
};

export default History;
