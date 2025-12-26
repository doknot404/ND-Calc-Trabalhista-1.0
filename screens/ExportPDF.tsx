
import React from 'react';
import { AppView } from '../types';

interface ExportPDFProps {
  navigateTo: (view: AppView) => void;
}

const ExportPDF: React.FC<ExportPDFProps> = ({ navigateTo }) => {
  return (
    <main className="flex-1 flex flex-col h-screen overflow-hidden">
      <header className="flex-none flex items-center justify-between border-b border-border-dark bg-surface-dark px-8 py-4">
        <div className="flex items-center gap-3">
          <button onClick={() => navigateTo(AppView.CALCULATION_FORM)} className="p-2 hover:bg-surface-dark-alt rounded-lg text-text-secondary">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h1 className="text-lg font-bold text-white">Exportar Relatório PDF</h1>
        </div>
        <button className="h-9 px-4 rounded-lg bg-primary text-white text-sm font-bold shadow-sm">
          Gerar Arquivo
        </button>
      </header>

      <div className="flex-1 flex flex-col lg:flex-row h-full overflow-hidden">
        {/* Settings Panel */}
        <aside className="w-full lg:w-[400px] bg-surface-dark border-r border-border-dark p-8 overflow-y-auto">
          <h2 className="text-lg font-bold text-white mb-6">Configurações do Relatório</h2>
          
          <div className="flex flex-col gap-6">
            <div className="space-y-3">
              <p className="text-xs font-bold text-text-secondary uppercase">Seções Inclusas</p>
              {[
                { label: 'Capa do Relatório', checked: true },
                { label: 'Memória de Cálculo', checked: true },
                { label: 'Parâmetros Financeiros', checked: true },
                { label: 'Honorários Advocatícios', checked: false },
                { label: 'Jurisprudência Anexa', checked: false },
              ].map((item, i) => (
                <label key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-surface-dark-alt/50 cursor-pointer transition-colors">
                  <span className="text-sm font-medium text-white">{item.label}</span>
                  <input type="checkbox" defaultChecked={item.checked} className="h-5 w-5 rounded border-border-dark bg-background-dark text-primary" />
                </label>
              ))}
            </div>

            <div className="space-y-3">
              <p className="text-xs font-bold text-text-secondary uppercase">Metadados</p>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-text-secondary">DATA DE EMISSÃO</label>
                <input type="date" className="w-full bg-background-dark border border-border-dark rounded-lg p-2.5 text-white text-sm" defaultValue="2023-10-27" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-text-secondary">OBSERVAÇÕES ADICIONAIS</label>
                <textarea className="w-full bg-background-dark border border-border-dark rounded-lg p-2.5 text-white text-sm resize-none" rows={3} placeholder="Notas para o cliente..."></textarea>
              </div>
            </div>
          </div>
        </aside>

        {/* Preview Area */}
        <div className="flex-1 bg-background-dark/50 p-10 overflow-auto flex justify-center">
          <div className="w-full max-w-[595px] aspect-[1/1.414] bg-white shadow-2xl p-[40px] text-slate-900 flex flex-col relative overflow-hidden">
             {/* Header */}
             <div className="flex justify-between items-start border-b-2 border-slate-900 pb-4 mb-8">
               <div>
                 <h3 className="text-2xl font-bold font-serif mb-1">Relatório de Cálculo</h3>
                 <p className="text-[10px] font-mono text-slate-500">PROCESSO: 004829-82.2023.8.26.0100</p>
               </div>
               <div className="text-right">
                 <p className="text-lg font-bold text-blue-600">ND-Calc</p>
                 <p className="text-[9px] text-slate-400">Gerado em 27/10/2023</p>
               </div>
             </div>

             {/* Content */}
             <div className="flex-1 space-y-8">
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-widest border-l-4 border-blue-600 pl-3">1. Resumo do Objeto</h4>
                  <div className="space-y-2 opacity-10">
                    <div className="h-2 bg-slate-900 rounded w-full"></div>
                    <div className="h-2 bg-slate-900 rounded w-[95%]"></div>
                    <div className="h-2 bg-slate-900 rounded w-[80%]"></div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-widest border-l-4 border-blue-600 pl-3">2. Memória de Cálculo</h4>
                  <div className="border border-slate-200 rounded">
                    <table className="w-full text-[10px]">
                      <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                          <th className="p-2 text-left">DESCRIÇÃO</th>
                          <th className="p-2 text-right">VALOR</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        <tr><td className="p-2">Saldo de Salário (15d)</td><td className="p-2 text-right">R$ 1.750,00</td></tr>
                        <tr><td className="p-2">13º Proporcional (8/12)</td><td className="p-2 text-right">R$ 2.333,33</td></tr>
                        <tr><td className="p-2">Férias + 1/3 (Integral)</td><td className="p-2 text-right">R$ 4.666,66</td></tr>
                      </tbody>
                      <tfoot className="bg-slate-50 border-t border-slate-200 font-bold">
                        <tr><td className="p-2">TOTAL</td><td className="p-2 text-right text-blue-600">R$ 8.749,99</td></tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
             </div>

             {/* Footer */}
             <div className="mt-auto pt-4 border-t border-slate-200 flex justify-between items-center text-[8px] text-slate-400">
               <span>Página 1 de 3</span>
               <span>Documento gerado eletronicamente por ND-Calc.</span>
             </div>

             {/* Draft Overlay */}
             <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
               <span className="text-6xl font-black -rotate-45 uppercase">PREVIEW</span>
             </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ExportPDF;