
import React from 'react';
import { AppView } from '../types';
import { IMAGES } from '../constants';

interface HelpProps {
  navigateTo: (view: AppView) => void;
}

const Help: React.FC<HelpProps> = ({ navigateTo }) => {
  return (
    <main className="flex-1 flex flex-col h-screen overflow-y-auto">
      <div className="sticky top-0 z-10 bg-background-dark/95 backdrop-blur-sm border-b border-border-dark px-10 py-10">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col gap-2">
            <p className="text-primary text-sm font-bold uppercase tracking-wider">Suporte e Educação</p>
            <h1 className="text-4xl font-black text-white tracking-tight">Central de Ajuda</h1>
            <p className="text-text-secondary text-lg max-w-lg">Encontre tutoriais, tire dúvidas e entre em contato com nosso suporte.</p>
          </div>
          <div className="w-full md:w-96">
            <div className="flex items-center rounded-lg border border-border-dark bg-surface-dark h-12 px-4 gap-3">
              <span className="material-symbols-outlined text-text-secondary">search</span>
              <input className="bg-transparent border-none text-white text-sm focus:ring-0 w-full" placeholder="Qual a sua dúvida?" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 p-10">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
           <div className="lg:col-span-2 flex flex-col gap-10">
             <section>
               <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                 <span className="material-symbols-outlined text-primary">school</span>
                 Tutorial Rápido de Uso
               </h3>
               <div className="rounded-2xl bg-surface-dark border border-border-dark overflow-hidden">
                 <div className="relative aspect-video w-full bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: `linear-gradient(rgba(17, 23, 34, 0.6), rgba(17, 23, 34, 0.6)), url("${IMAGES.VIDEO_HELP}")` }}>
                    <button className="size-20 rounded-full bg-primary flex items-center justify-center text-white shadow-2xl transform transition-transform hover:scale-110">
                      <span className="material-symbols-outlined text-5xl">play_arrow</span>
                    </button>
                    <div className="absolute bottom-6 left-6">
                      <p className="text-lg font-bold text-white">Introdução aos Cálculos Trabalhistas</p>
                      <p className="text-sm text-text-secondary">3 min • Atualizado em Out 2023</p>
                    </div>
                 </div>
                 <div className="p-4 flex gap-3 overflow-x-auto hide-scrollbar">
                   {['Visão Geral', 'Rescisão', 'Horas Extras', 'Correção Monetária'].map((t, i) => (
                     <button key={i} className={`px-4 py-2 rounded-lg border border-border-dark text-sm font-medium transition-all ${i === 0 ? 'bg-primary text-white border-primary' : 'bg-background-dark text-text-secondary hover:text-white'}`}>
                       {t}
                     </button>
                   ))}
                 </div>
               </div>
             </section>

             <section>
               <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                 <span className="material-symbols-outlined text-primary">quiz</span>
                 FAQ por área
               </h3>
               <div className="flex flex-col gap-3">
                 {[
                   { q: 'Como configurar juros compostos em ações cíveis?', a: 'Acesse as configurações avançadas do cálculo e selecione a opção "Capitalização Composta".' },
                   { q: 'O sistema atualiza tabelas de INSS automaticamente?', a: 'Sim, atualizamos todas as tabelas em até 24h após a publicação oficial.' },
                   { q: 'Como exportar relatórios detalhados para PDF?', a: 'Finalize o cálculo e clique em "Gerar Relatório" escolhendo o nível de detalhamento.' }
                 ].map((item, i) => (
                   <div key={i} className="rounded-xl bg-surface-dark border border-border-dark p-5 cursor-pointer hover:border-primary transition-all">
                     <div className="flex items-center justify-between">
                       <span className="font-bold text-white">{item.q}</span>
                       <span className="material-symbols-outlined text-text-secondary">add</span>
                     </div>
                   </div>
                 ))}
               </div>
             </section>
           </div>

           <div className="flex flex-col gap-8">
              <div className="bg-[#231f20] border-l-4 border-yellow-500 rounded-r-xl p-6 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                   <span className="material-symbols-outlined text-6xl text-yellow-500">warning</span>
                </div>
                <div className="relative z-10">
                  <h3 className="text-yellow-500 font-bold text-sm uppercase tracking-wider mb-2 flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg">gavel</span>
                    Aviso Jurídico
                  </h3>
                  <p className="text-gray-300 text-xs leading-relaxed mb-4">
                    Os resultados apresentados são de <strong>caráter estimativo</strong>. Eles não substituem a perícia contábil judicial.
                  </p>
                  <p className="text-gray-400 text-[10px] leading-relaxed italic">
                    Utilize com cautela em petições e peças processuais.
                  </p>
                </div>
              </div>

              <div className="bg-surface-dark rounded-xl border border-border-dark p-6 flex flex-col gap-6">
                <div className="flex items-center gap-4 border-b border-border-dark pb-4">
                   <div className="bg-primary/20 p-2.5 rounded-xl text-primary flex items-center justify-center">
                     <span className="material-symbols-outlined">support_agent</span>
                   </div>
                   <div>
                     <h3 className="font-bold text-white leading-tight">Suporte ND-Calc</h3>
                     <p className="text-xs text-text-secondary">Especialistas prontos para ajudar.</p>
                   </div>
                </div>
                <div className="flex flex-col gap-3">
                   <button className="w-full h-11 rounded-lg bg-primary text-white font-bold text-sm">Iniciar Chat ao Vivo</button>
                   <button className="w-full h-11 rounded-lg border border-border-dark text-white font-bold text-sm">Enviar E-mail</button>
                </div>
                <div className="flex flex-col gap-2 pt-2 border-t border-border-dark">
                  <div className="flex justify-between text-xs text-text-secondary">
                    <span>Segunda à Sexta</span>
                    <span className="text-white">09:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between text-xs text-text-secondary">
                    <span>Tempo Médio</span>
                    <span className="text-emerald-400 font-bold">~15 min</span>
                  </div>
                </div>
              </div>
           </div>
        </div>
      </div>
    </main>
  );
};

export default Help;