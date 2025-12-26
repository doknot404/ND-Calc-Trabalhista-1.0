import React from 'react';
import { AppView } from '../types';

interface SettingsProps {
  navigateTo: (view: AppView) => void;
}

const Settings: React.FC<SettingsProps> = ({ navigateTo }) => {
  return (
    <main className="flex-1 flex flex-col h-screen overflow-hidden">
      <header className="flex-none flex items-center justify-between border-b border-border-dark bg-surface-dark px-8 py-4">
        <div>
          <h1 className="text-xl font-bold text-white">Configurações</h1>
          <p className="text-xs text-text-secondary">Defina os parâmetros globais do sistema.</p>
        </div>
        <button className="h-9 px-4 rounded-lg bg-primary text-white text-sm font-bold shadow-sm">
          Salvar Alterações
        </button>
      </header>

      <div className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-3xl mx-auto flex flex-col gap-8">
           <section className="bg-surface-dark rounded-xl border border-border-dark p-6 shadow-sm">
             <div className="flex items-center gap-2 mb-6 border-b border-border-dark pb-4">
                <span className="material-symbols-outlined text-primary">tune</span>
                <h2 className="text-lg font-bold text-white">Indicadores Financeiros</h2>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                   <label className="text-sm font-medium text-white">Índice de correção padrão</label>
                   <select className="h-11 rounded-lg border border-border-dark bg-background-dark text-white px-3 text-sm focus:ring-1 focus:ring-primary outline-none">
                      <option>INPC (IBGE)</option>
                      <option>IPCA-E</option>
                      <option>SELIC</option>
                   </select>
                </div>
                <div className="flex flex-col gap-2">
                   <label className="text-sm font-medium text-white">Percentual de Honorários</label>
                   <div className="relative">
                      <input defaultValue="10" type="number" className="w-full h-11 rounded-lg border border-border-dark bg-background-dark text-white pl-3 pr-10 text-sm focus:ring-1 focus:ring-primary outline-none" />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary text-sm font-medium">%</span>
                   </div>
                </div>
             </div>
           </section>

           <section className="bg-surface-dark rounded-xl border border-border-dark p-6 shadow-sm">
             <div className="flex items-center gap-2 mb-6 border-b border-border-dark pb-4">
                <span className="material-symbols-outlined text-primary">description</span>
                <h2 className="text-lg font-bold text-white">Preferências de Relatório</h2>
             </div>
             <div className="space-y-6">
                <div className="flex items-center justify-between">
                   <div>
                      <p className="text-sm font-medium text-white">Incluir cabeçalho personalizado</p>
                      <p className="text-xs text-text-secondary">Logotipo e dados do escritório.</p>
                   </div>
                   <div className="w-11 h-6 bg-primary rounded-full relative cursor-pointer">
                      <div className="absolute right-1 top-1 bg-white size-4 rounded-full"></div>
                   </div>
                </div>
                <div className="flex items-center justify-between">
                   <div>
                      <p className="text-sm font-medium text-white">Memória de cálculo detalhada</p>
                      <p className="text-xs text-text-secondary">Exibe passo-a-passo da evolução da dívida.</p>
                   </div>
                   <div className="w-11 h-6 bg-surface-dark-alt rounded-full relative cursor-pointer">
                      <div className="absolute left-1 top-1 bg-white size-4 rounded-full"></div>
                   </div>
                </div>
             </div>
           </section>

           <section className="bg-surface-dark rounded-xl border border-red-900/30 p-6 shadow-sm relative overflow-hidden">
             <div className="absolute top-0 left-0 w-1 h-full bg-red-500"></div>
             <div className="flex items-center gap-2 mb-6 border-b border-border-dark pb-4">
                <span className="material-symbols-outlined text-red-500">warning</span>
                <h2 className="text-lg font-bold text-white">Gerenciamento de Dados</h2>
             </div>
             <div className="flex flex-col gap-4">
                <p className="text-sm text-text-secondary">Faça backup ou limpe os dados locais do seu navegador.</p>
                <div className="flex gap-3">
                   <button className="px-4 py-2 rounded-lg border border-border-dark text-white text-sm font-medium">Exportar Tudo</button>
                   <button className="px-4 py-2 rounded-lg border border-red-900/50 bg-red-500/10 text-red-400 text-sm font-medium">Limpar Banco Local</button>
                </div>
             </div>
           </section>
        </div>
      </div>
    </main>
  );
};

export default Settings;