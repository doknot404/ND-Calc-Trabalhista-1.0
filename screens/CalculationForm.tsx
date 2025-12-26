import React, { useState, useMemo, useEffect } from 'react';
import { AppView, CalculatorType } from '../types';

interface SalaryPeriod {
  id: string;
  start: string;
  end: string;
  salary: number;
}

interface PastDueItem {
  id: string;
  type: '13_anterior' | 'ferias_vencida' | 'ferias_dobro' | 'salario_atraso' | 'outros';
  label: string;
  description: string;
  value: number;
  quantity: number;
  active: boolean;
  isAuto: boolean;
  periodId: string; // Vínculo com o período contratual
}

interface CalculationResultItem {
  label: string;
  value: number | string;
  type: 'pro' | 'con' | 'info';
}

interface CalculationFormProps {
  navigateTo: (view: AppView) => void;
  calcType: CalculatorType;
}

const CalculationForm: React.FC<CalculationFormProps> = ({ navigateTo, calcType }) => {
  const [periods, setPeriods] = useState<SalaryPeriod[]>([
    { id: '1', start: '2023-01-01', end: '2023-12-31', salary: 3500.00 }
  ]);
  
  const [pastDueItems, setPastDueItems] = useState<PastDueItem[]>([]);
  const [copyFeedback, setCopyFeedback] = useState(false);

  // Parâmetros Trabalhistas
  const [motivoRescisao, setMotivoRescisao] = useState('Dispensa sem Justa Causa');
  const [horasExtras, setHorasExtras] = useState(20);
  const [heMode, setHeMode] = useState<'mensal' | 'total'>('mensal');
  const [adicionalHora, setAdicionalHora] = useState(50);
  const [grauInsalubridade, setGrauInsalubridade] = useState(20);
  const [baseInsalubridadeTipo, setBaseInsalubridadeTipo] = useState<'minimo' | 'base'>('minimo');
  
  // Parâmetros de Periculosidade
  const percentualPericulosidade = 30;
  const [basePericulosidadeTipo, setBasePericulosidadeTipo] = useState<'base' | 'minimo'>('base');

  // Parâmetros de Adicional Noturno
  const [percentualNoturno, setPercentualNoturno] = useState(20);
  const [horasNoturnas, setHorasNoturnas] = useState(40);
  const [noturnoMode, setNoturnoMode] = useState<'mensal' | 'total'>('mensal');

  // Parâmetros de Diferença Salarial
  const [salarioDevido, setSalarioDevido] = useState(4500.00);
  const [diffMode, setDiffMode] = useState<'mensal' | 'total'>('mensal');
  
  // Parâmetros de Acúmulo de Função
  const [percentualAcumulo, setPercentualAcumulo] = useState(20);
  
  // FGTS Balance
  const [fgtsSaldoAtual, setFgtsSaldoAtual] = useState(0);

  const [config, setConfig] = useState({
    saldo: true,
    aviso: true,
    fgts: true,
    multa: true,
    reflexos: true,
    refDsr: true,
    ref13: true,
    refFerias: true,
    refFgts: true,
    refMulta: true
  });

  const baseSalaryRef = useMemo(() => periods[periods.length - 1]?.salary || 0, [periods]);

  const calculateSuggestedValue = (type: PastDueItem['type'], qty: number, salary: number) => {
    switch (type) {
      case 'salario_atraso': return salary * qty;
      case '13_anterior': return salary * qty;
      case 'ferias_vencida': return (salary * 1.333333) * qty;
      case 'ferias_dobro': return (salary * 1.333333 * 2) * qty;
      default: return 0;
    }
  };

  // Atualiza valores automáticos quando o salário do período ou quantidade muda
  useEffect(() => {
    setPastDueItems(prev => prev.map(item => {
      if (item.isAuto && item.type !== 'outros') {
        const period = periods.find(p => p.id === item.periodId) || periods[periods.length - 1];
        const salary = period?.salary || 0;
        return { ...item, value: calculateSuggestedValue(item.type, item.quantity, salary) };
      }
      return item;
    }));
  }, [periods]); // Recalcular se qualquer período (salário) mudar

  const getCalcInfo = () => {
    switch (calcType) {
      case CalculatorType.RESCISAO: return { title: 'Rescisão CLT', sintese: 'Cálculo de verbas rescisórias, FGTS, multas e vencidos.' };
      case CalculatorType.HORAS_EXTRAS: return { title: 'Horas Extras', sintese: 'Apuração de horas suplementares com reflexos em DSR e verbas contratuais.' };
      case CalculatorType.INSALUBRIDADE: return { title: 'Insalubridade', sintese: 'Adicional por exposição a agentes nocivos.' };
      case CalculatorType.PERICULOSIDADE: return { title: 'Periculosidade', sintese: 'Adicional de 30% por risco de morte.' };
      case CalculatorType.FGTS_ATRASO: return { title: 'FGTS em Atraso', sintese: 'Cálculo de depósitos não realizados e multa de 40%.' };
      case CalculatorType.ADICIONAL_NOTURNO: return { title: 'Adicional Noturno', sintese: 'Cálculo de jornada noturna (22h às 05h) e reflexos.' };
      case CalculatorType.DIFERENCA_SALARIAL: return { title: 'Diferença Salarial', sintese: 'Ajuste entre salário pago e o paradigma/devido.' };
      case CalculatorType.DESVIO_FUNCAO: return { title: 'Acúmulo de Função', sintese: 'Adicional por exercício simultâneo de funções distintas.' };
      default: return { title: 'Cálculo Trabalhista', sintese: 'Memória de cálculo detalhada.' };
    }
  };

  const addPeriod = () => {
    const last = periods[periods.length - 1];
    setPeriods([...periods, { id: Math.random().toString(36).substr(2, 9), start: last.end || '2024-01-01', end: '', salary: last.salary }]);
  };

  const addPastDue = () => {
    const initialType = 'salario_atraso';
    const initialPeriodId = periods[periods.length - 1].id;
    const initialSalary = periods[periods.length - 1].salary;

    setPastDueItems([...pastDueItems, { 
      id: Math.random().toString(36).substr(2, 9), 
      type: initialType, 
      label: 'Salário Atrasado', 
      description: '',
      value: calculateSuggestedValue(initialType, 1, initialSalary),
      quantity: 1,
      active: true,
      isAuto: true,
      periodId: initialPeriodId
    }]);
  };

  const removePeriod = (id: string) => {
    if (periods.length > 1) {
      setPeriods(periods.filter(p => p.id !== id));
      // Resetar vínculos de verbas vencidas que apontavam para este período
      setPastDueItems(prev => prev.map(item => 
        item.periodId === id ? { ...item, periodId: periods[0].id } : item
      ));
    }
  };

  const removePastDue = (id: string) => setPastDueItems(pastDueItems.filter(p => p.id !== id));

  const updatePeriod = (id: string, field: keyof SalaryPeriod, value: any) => {
    setPeriods(periods.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const updatePastDue = (id: string, field: keyof PastDueItem, value: any) => {
    setPastDueItems(prev => prev.map(item => {
      if (item.id === id) {
        const newItem = { ...item, [field]: value };
        
        // Se mudou o período ou tipo ou quantidade, e está no automático, recalcular
        if (field === 'type' || field === 'quantity' || field === 'periodId') {
          if (newItem.isAuto && newItem.type !== 'outros') {
            const linkedPeriod = periods.find(p => p.id === newItem.periodId) || periods[periods.length - 1];
            newItem.value = calculateSuggestedValue(newItem.type, newItem.quantity, linkedPeriod.salary);
          }
          if (newItem.type === 'outros') newItem.isAuto = false;
        }
        
        // Se editou o valor manualmente, perde o "isAuto"
        if (field === 'value' && item.isAuto) newItem.isAuto = false;
        
        return newItem;
      }
      return item;
    }));
  };

  const results = useMemo(() => {
    const items: CalculationResultItem[] = [];

    const pushReflexos = (baseValue: number, prefix: string) => {
      const rDsr = baseValue / 6;
      const r13 = (baseValue + rDsr) / 12;
      const rFer = (baseValue + rDsr) / 12 * 1.3333;
      const rFgts = (baseValue + rDsr + r13 + rFer) * 0.08;
      const rMulta = rFgts * 0.4;

      if (config.refDsr) items.push({ label: `${prefix}Reflexo em DSR (1/6)`, value: rDsr, type: 'pro' });
      if (config.ref13) items.push({ label: `${prefix}Reflexo em 13º Salário`, value: r13, type: 'pro' });
      if (config.refFerias) items.push({ label: `${prefix}Reflexo em Férias + 1/3`, value: rFer, type: 'pro' });
      if (config.refFgts) items.push({ label: `${prefix}Reflexo em FGTS (8%)`, value: rFgts, type: 'pro' });
      if (config.refMulta) items.push({ label: `${prefix}Reflexo em Multa FGTS (40%)`, value: rMulta, type: 'pro' });
    };

    periods.forEach((p, idx) => {
      const start = new Date(p.start);
      const end = new Date(p.end);
      if (isNaN(start.getTime()) || isNaN(end.getTime()) || end < start) return;

      const diffTime = Math.abs(end.getTime() - start.getTime());
      const days = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
      const months = Math.max(1, Math.floor(days / 30.44));
      const prefix = periods.length > 1 ? `[P${idx + 1}] ` : '';
      const salary = p.salary;

      switch (calcType) {
        case CalculatorType.RESCISAO:
          if (idx === periods.length - 1) {
            const vDia = salary / 30;
            let baseCalculoFGTS = 0;
            if (config.saldo) {
              const valorSaldo = end.getDate() * vDia;
              items.push({ label: `${prefix}Saldo de Salário (${end.getDate()} dias)`, value: valorSaldo, type: 'pro' });
              baseCalculoFGTS += valorSaldo;
            }
            if (config.aviso && (motivoRescisao === 'Dispensa sem Justa Causa' || motivoRescisao === 'Rescisão Indireta')) {
              const diasAviso = 30 + (Math.floor(days / 365) * 3);
              const valorAviso = diasAviso * vDia;
              items.push({ label: `${prefix}Aviso Prévio Indenizado (${diasAviso} dias)`, value: valorAviso, type: 'pro' });
              baseCalculoFGTS += valorAviso;
            }
            if (config.reflexos) {
              const m13 = end.getDate() >= 15 ? end.getMonth() + 1 : end.getMonth();
              const valor13 = (salary / 12) * m13;
              items.push({ label: `${prefix}13º Salário Proporcional (${m13}/12)`, value: valor13, type: 'pro' });
              baseCalculoFGTS += valor13;
              const mF = (Math.floor(days / 30.44)) % 12;
              items.push({ label: `${prefix}Férias Proporcionais (${mF}/12) + 1/3`, value: ((salary / 12) * mF) * 1.3333, type: 'pro' });
            }
            if (config.fgts) {
              const valFGTS = baseCalculoFGTS * 0.08;
              items.push({ label: `${prefix}FGTS Rescisório (8% s/ Verbas)`, value: valFGTS, type: 'pro' });
              if (config.multa && (motivoRescisao === 'Dispensa sem Justa Causa' || motivoRescisao === 'Rescisão Indireta')) {
                const baseMulta = valFGTS + fgtsSaldoAtual;
                items.push({ label: `${prefix}Multa de 40% (s/ Saldo e Rescisório)`, value: baseMulta * 0.4, type: 'pro' });
              }
            }
          }
          break;
        case CalculatorType.HORAS_EXTRAS:
          const vHE = (salary / 220) * (1 + (adicionalHora / 100));
          const tHE = heMode === 'mensal' ? (vHE * horasExtras) * months : (vHE * horasExtras);
          items.push({ label: `${prefix}Horas Extras (${horasExtras}${heMode === 'mensal' ? 'h/m' : 'h'})`, value: tHE, type: 'pro' });
          pushReflexos(tHE, prefix);
          break;
        case CalculatorType.INSALUBRIDADE:
          const bI = baseInsalubridadeTipo === 'minimo' ? 1412.00 : salary;
          const tI = (bI * (grauInsalubridade / 100)) * months;
          items.push({ label: `${prefix}Insalubridade (${grauInsalubridade}%)`, value: tI, type: 'pro' });
          pushReflexos(tI, prefix);
          break;
        case CalculatorType.PERICULOSIDADE:
          const bP = basePericulosidadeTipo === 'minimo' ? 1412.00 : salary;
          const tP = (bP * (percentualPericulosidade / 100)) * months;
          items.push({ label: `${prefix}Periculosidade (${percentualPericulosidade}%)`, value: tP, type: 'pro' });
          pushReflexos(tP, prefix);
          break;
        case CalculatorType.ADICIONAL_NOTURNO:
          const vAN = (salary / 220) * (percentualNoturno / 100);
          const tAN = noturnoMode === 'mensal' ? (vAN * horasNoturnas) * months : (vAN * horasNoturnas);
          items.push({ label: `${prefix}Adicional Noturno (${percentualNoturno}%)`, value: tAN, type: 'pro' });
          pushReflexos(tAN, prefix);
          break;
        case CalculatorType.FGTS_ATRASO:
          const f8 = (salary * 0.08) * months;
          items.push({ label: `${prefix}FGTS 8% (${months} meses)`, value: f8, type: 'pro' });
          if (config.multa) items.push({ label: `${prefix}Multa de 40% s/ FGTS`, value: f8 * 0.4, type: 'pro' });
          break;
        case CalculatorType.DIFERENCA_SALARIAL:
          const difUnit = salarioDevido - salary;
          const dS = diffMode === 'mensal' ? difUnit * months : difUnit;
          items.push({ label: `${prefix}Diferença Salarial (${diffMode === 'mensal' ? months + ' meses' : 'Total'})`, value: dS, type: 'pro' });
          pushReflexos(dS, prefix);
          break;
        case CalculatorType.DESVIO_FUNCAO:
          const tAcumuloValue = (salary * (percentualAcumulo / 100)) * months;
          items.push({ label: `${prefix}Adic. Acúmulo (${percentualAcumulo}%)`, value: tAcumuloValue, type: 'pro' });
          pushReflexos(tAcumuloValue, prefix);
          break;
      }
    });

    pastDueItems.forEach(it => {
      if (it.active && it.value > 0) {
        const periodIdx = periods.findIndex(p => p.id === it.periodId);
        const refLabel = periodIdx !== -1 ? `[P${periodIdx + 1}]` : '';
        items.push({ label: `[ATRASO] ${refLabel} ${it.label} (x${it.quantity})`, value: it.value, type: 'pro' });
      }
    });

    const tVal = items.reduce((acc, curr) => typeof curr.value === 'number' ? acc + curr.value : acc, 0);
    return { total: tVal, items };
  }, [calcType, periods, pastDueItems, config, motivoRescisao, horasExtras, heMode, adicionalHora, grauInsalubridade, baseInsalubridadeTipo, percentualPericulosidade, basePericulosidadeTipo, percentualNoturno, horasNoturnas, noturnoMode, salarioDevido, diffMode, percentualAcumulo, fgtsSaldoAtual]);

  const toggleAllReflexos = (checked: boolean) => {
    setConfig(prev => ({
      ...prev,
      refDsr: checked,
      ref13: checked,
      refFerias: checked,
      refFgts: checked,
      refMulta: checked
    }));
  };

  const copyTable = async () => {
    const info = getCalcInfo();
    const formattedTotal = results.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    let htmlContent = `
      <div style="font-family: sans-serif; color: #111827; max-width: 800px;">
        <h2 style="color: #135bec; border-bottom: 2px solid #135bec; padding-bottom: 8px; margin-bottom: 15px;">ND-CALC | Memória de Cálculo: ${info.title}</h2>
        <table border="1" style="border-collapse: collapse; width: 100%; border-color: #e5e7eb;">
          <thead>
            <tr style="background-color: #f3f4f6;">
              <th style="padding: 12px; text-align: left; border: 1px solid #e5e7eb; font-size: 13px; font-weight: bold; text-transform: uppercase;">Verba / Descrição</th>
              <th style="padding: 12px; text-align: right; border: 1px solid #e5e7eb; font-size: 13px; font-weight: bold; text-transform: uppercase;">Valor Apurado</th>
            </tr>
          </thead>
          <tbody>
    `;

    results.items.forEach(it => {
      const v = typeof it.value === 'number' ? it.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : String(it.value);
      htmlContent += `
        <tr>
          <td style="padding: 10px; border: 1px solid #e5e7eb; font-size: 12px; color: #374151;">${it.label}</td>
          <td style="padding: 10px; text-align: right; border: 1px solid #e5e7eb; font-size: 12px; font-family: monospace; font-weight: bold;">${v}</td>
        </tr>
      `;
    });

    htmlContent += `
          </tbody>
          <tfoot>
            <tr style="background-color: #f9fafb; font-weight: bold;">
              <td style="padding: 12px; border: 1px solid #e5e7eb; font-size: 13px;">TOTAL LÍQUIDO ESTIMADO</td>
              <td style="padding: 12px; text-align: right; border: 1px solid #e5e7eb; font-size: 16px; color: #135bec;">${formattedTotal}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    `;

    try {
      const blobHtml = new Blob([htmlContent], { type: 'text/html' });
      const data = [new ClipboardItem({ 'text/html': blobHtml })];
      await navigator.clipboard.write(data);
      setCopyFeedback(true);
      setTimeout(() => setCopyFeedback(false), 2000);
    } catch (e) {
      setCopyFeedback(true);
      setTimeout(() => setCopyFeedback(false), 2000);
    }
  };

  const info = getCalcInfo();

  return (
    <main className="flex-1 overflow-y-auto bg-background-dark">
      <div className="flex w-full justify-center">
        <div className="w-full max-w-[1400px] px-8 py-8">
          <div className="mb-6 flex gap-2 text-[10px] font-black uppercase tracking-widest text-text-secondary">
            <button onClick={() => navigateTo(AppView.TRABALHISTA_HUB)} className="hover:text-white transition-colors">Hub Trabalhista</button>
            <span className="text-border-dark">/</span>
            <span className="text-primary font-bold">{info.title}</span>
          </div>

          <div className="mb-10 p-6 bg-primary/5 border border-primary/20 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-inner">
             <div className="flex flex-col gap-1">
               <div className="flex items-center gap-2 text-primary mb-1">
                 <span className="material-symbols-outlined text-sm font-black">gavel</span>
                 <span className="text-[10px] font-black uppercase tracking-widest">Módulo de Liquidação</span>
               </div>
               <h1 className="text-4xl font-black text-white tracking-tight">{info.title}</h1>
               <p className="text-text-secondary font-medium">{info.sintese}</p>
             </div>
             <button onClick={() => navigateTo(AppView.TRABALHISTA_HUB)} className="px-5 py-2.5 rounded-xl border border-border-dark text-xs font-black uppercase tracking-widest text-white hover:bg-surface-dark-alt transition-all flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">swap_horiz</span> ALTERAR CÁLCULO
             </button>
          </div>

          <div className="flex flex-col gap-8 lg:flex-row">
            <div className="flex-1 flex flex-col gap-6">
              
              <div className="rounded-2xl bg-surface-dark border border-border-dark p-6 shadow-xl">
                <div className="mb-6 flex items-center justify-between pb-4 border-b border-border-dark/50">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">history</span>
                    Período Contratual Principal
                  </h3>
                  <button onClick={addPeriod} className="px-4 py-2 rounded-lg bg-primary/10 text-primary text-xs font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all">
                    + Adicionar Período
                  </button>
                </div>
                <div className="space-y-4">
                  {periods.map((p, idx) => (
                    <div key={p.id} className="p-5 rounded-xl bg-background-dark/40 border border-border-dark grid grid-cols-1 md:grid-cols-12 gap-4 relative group hover:border-primary/30 transition-all">
                      <div className="md:col-span-1 flex items-center">
                         <span className="bg-primary/20 text-primary text-[10px] font-black w-7 h-7 rounded-lg flex items-center justify-center">P{idx+1}</span>
                      </div>
                      <div className="md:col-span-3 flex flex-col gap-1.5">
                        <label className="text-[10px] font-black text-text-secondary uppercase tracking-widest">Data Admissão</label>
                        <input type="date" value={p.start} onChange={(e) => updatePeriod(p.id, 'start', e.target.value)} className="bg-background-dark border border-border-dark rounded-lg p-2.5 text-sm text-white focus:border-primary outline-none" />
                      </div>
                      <div className="md:col-span-3 flex flex-col gap-1.5">
                        <label className="text-[10px] font-black text-text-secondary uppercase tracking-widest">Data Demissão</label>
                        <input type="date" value={p.end} onChange={(e) => updatePeriod(p.id, 'end', e.target.value)} className="bg-background-dark border border-border-dark rounded-lg p-2.5 text-sm text-white focus:border-primary outline-none" />
                      </div>
                      <div className="md:col-span-4 flex flex-col gap-1.5">
                        <label className="text-[10px] font-black text-text-secondary uppercase tracking-widest">Salário Base (R$)</label>
                        <input type="number" value={p.salary} onChange={(e) => updatePeriod(p.id, 'salary', Number(e.target.value))} className="bg-background-dark border border-border-dark rounded-lg p-2.5 text-sm text-white focus:border-primary outline-none" />
                      </div>
                      <div className="md:col-span-1 flex items-center justify-end">
                        {periods.length > 1 && (
                          <button onClick={() => removePeriod(p.id)} className="p-2 text-red-500/50 hover:text-red-500 transition-all">
                            <span className="material-symbols-outlined text-[20px]">delete</span>
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {calcType === CalculatorType.RESCISAO && (
                <div className="rounded-2xl bg-surface-dark border border-border-dark p-6 shadow-xl">
                  <div className="mb-6 flex items-center justify-between pb-4 border-b border-border-dark/50">
                    <div className="flex flex-col gap-1">
                      <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <span className="material-symbols-outlined text-amber-500">payments</span>
                        Verbas Vencidas / Em Atraso
                      </h3>
                    </div>
                    <button onClick={addPastDue} className="px-4 py-2 rounded-lg bg-amber-500/10 text-amber-500 text-xs font-black uppercase tracking-widest hover:bg-amber-500 hover:text-white transition-all">
                      + Adicionar
                    </button>
                  </div>
                  <div className="space-y-4">
                    {pastDueItems.map((item) => (
                      <div key={item.id} className={`p-4 rounded-xl border transition-all grid grid-cols-1 md:grid-cols-12 gap-3 relative group ${item.active ? 'bg-background-dark/40 border-border-dark shadow-inner' : 'bg-background-dark/10 border-border-dark/30 opacity-60'}`}>
                        <div className="md:col-span-1 flex items-center justify-center">
                          <button onClick={() => updatePastDue(item.id, 'active', !item.active)} className={`size-6 rounded-lg flex items-center justify-center transition-all ${item.active ? 'bg-amber-500 text-white shadow-lg' : 'bg-surface-dark-alt text-text-secondary'}`}>
                            <span className="material-symbols-outlined text-[18px] font-bold">{item.active ? 'check' : ''}</span>
                          </button>
                        </div>
                        <div className="md:col-span-2 flex flex-col gap-1.5">
                          <label className="text-[10px] font-black text-text-secondary uppercase tracking-widest">Tipo</label>
                          <select value={item.type} onChange={(e) => updatePastDue(item.id, 'type', e.target.value)} className="bg-background-dark border border-border-dark rounded-lg p-2 text-[11px] text-white outline-none">
                            <option value="salario_atraso">Salário</option>
                            <option value="ferias_dobro">Férias Dobro</option>
                            <option value="ferias_vencida">Férias Venc.</option>
                            <option value="13_anterior">13º Vencido</option>
                            <option value="outros">Outros</option>
                          </select>
                        </div>
                        <div className="md:col-span-2 flex flex-col gap-1.5">
                          <label className="text-[10px] font-black text-text-secondary uppercase tracking-widest">Ref. Período</label>
                          <select value={item.periodId} onChange={(e) => updatePastDue(item.id, 'periodId', e.target.value)} className="bg-background-dark border border-border-dark rounded-lg p-2 text-[11px] text-white outline-none">
                            {periods.map((p, idx) => (
                              <option key={p.id} value={p.id}>P{idx+1} ({new Date(p.start).toLocaleDateString()})</option>
                            ))}
                          </select>
                        </div>
                        <div className="md:col-span-2 flex flex-col gap-1.5">
                          <label className="text-[10px] font-black text-text-secondary uppercase tracking-widest">Descrição</label>
                          <input type="text" value={item.description} onChange={(e) => updatePastDue(item.id, 'description', e.target.value)} className="bg-background-dark border border-border-dark rounded-lg p-2 text-[11px] text-white outline-none" placeholder="Ex: Ref 2023" />
                        </div>
                        <div className="md:col-span-2 flex flex-col gap-1.5">
                          <label className="text-[10px] font-black text-text-secondary uppercase tracking-widest">Qtd</label>
                          <input type="number" step="0.5" value={item.quantity} onChange={(e) => updatePastDue(item.id, 'quantity', Number(e.target.value))} className="bg-background-dark border border-border-dark rounded-lg p-2 text-[11px] text-white outline-none" min="0.1" />
                        </div>
                        <div className="md:col-span-2 flex flex-col gap-1.5">
                          <label className="text-[10px] font-black text-text-secondary uppercase tracking-widest">Valor (R$)</label>
                          <input type="number" value={item.value} onChange={(e) => updatePastDue(item.id, 'value', Number(e.target.value))} className="bg-background-dark border border-border-dark rounded-lg p-2 text-[11px] text-white outline-none" placeholder="0,00" />
                        </div>
                        <div className="md:col-span-1 flex items-center justify-end">
                           <button onClick={() => removePastDue(item.id)} className="p-2 text-red-500/50 hover:text-red-500 rounded-lg">
                              <span className="material-symbols-outlined text-[18px]">delete</span>
                           </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="rounded-2xl bg-surface-dark border border-border-dark p-6 shadow-xl">
                <div className="mb-6 flex items-center gap-2 pb-4 border-b border-border-dark/50">
                  <span className="material-symbols-outlined text-primary">tune</span>
                  <h3 className="text-lg font-bold text-white">Parâmetros Detalhados</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {calcType === CalculatorType.RESCISAO && (
                    <div className="flex flex-col gap-2 md:col-span-2">
                      <label className="text-sm font-bold text-text-secondary">Motivo do Desligamento</label>
                      <select value={motivoRescisao} onChange={(e) => setMotivoRescisao(e.target.value)} className="bg-background-dark border border-border-dark rounded-xl p-3 text-white outline-none focus:border-primary">
                        <option>Dispensa sem Justa Causa</option>
                        <option>Pedido de Demissão</option>
                        <option>Rescisão Indireta</option>
                        <option>Justa Causa</option>
                        <option>Culpa Recíproca</option>
                        <option>Acordo Comum (Art. 484-A)</option>
                      </select>
                    </div>
                  )}

                  {calcType === CalculatorType.HORAS_EXTRAS && (
                    <>
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-text-secondary">Modo de Apuração</label>
                        <div className="flex p-1 bg-background-dark border border-border-dark rounded-xl">
                          <button onClick={() => setHeMode('mensal')} className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${heMode === 'mensal' ? 'bg-primary text-white shadow-lg' : 'text-text-secondary hover:text-white'}`}>Média Mensal</button>
                          <button onClick={() => setHeMode('total')} className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${heMode === 'total' ? 'bg-primary text-white shadow-lg' : 'text-text-secondary hover:text-white'}`}>Total</button>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-text-secondary">Qtd. de Horas Extras</label>
                        <input type="number" value={horasExtras} onChange={(e) => setHorasExtras(Number(e.target.value))} className="bg-background-dark border border-border-dark rounded-xl p-3 text-white outline-none focus:border-primary" />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-text-secondary">Adicional (%)</label>
                        <input type="number" value={adicionalHora} onChange={(e) => setAdicionalHora(Number(e.target.value))} className="bg-background-dark border border-border-dark rounded-xl p-3 text-white outline-none focus:border-primary" />
                      </div>
                    </>
                  )}

                  {calcType === CalculatorType.INSALUBRIDADE && (
                    <>
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-text-secondary">Grau de Insalubridade</label>
                        <select value={grauInsalubridade} onChange={(e) => setGrauInsalubridade(Number(e.target.value))} className="bg-background-dark border border-border-dark rounded-xl p-3 text-white outline-none focus:border-primary">
                          <option value={10}>10% (Grau Mínimo)</option>
                          <option value={20}>20% (Grau Médio)</option>
                          <option value={40}>40% (Grau Máximo)</option>
                        </select>
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-text-secondary">Base de Cálculo</label>
                        <div className="flex p-1 bg-background-dark border border-border-dark rounded-xl">
                          <button onClick={() => setBaseInsalubridadeTipo('minimo')} className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${baseInsalubridadeTipo === 'minimo' ? 'bg-primary text-white shadow-lg' : 'text-text-secondary hover:text-white'}`}>Mínimo</button>
                          <button onClick={() => setBaseInsalubridadeTipo('base')} className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${baseInsalubridadeTipo === 'base' ? 'bg-primary text-white shadow-lg' : 'text-text-secondary hover:text-white'}`}>Base</button>
                        </div>
                      </div>
                    </>
                  )}

                  {calcType === CalculatorType.PERICULOSIDADE && (
                    <>
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-text-secondary">Adicional (%)</label>
                        <div className="w-full bg-background-dark/50 border border-border-dark/50 rounded-xl p-3 text-text-secondary font-bold cursor-not-allowed">30%</div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-text-secondary">Base de Cálculo</label>
                        <div className="flex p-1 bg-background-dark border border-border-dark rounded-xl">
                          <button onClick={() => setBasePericulosidadeTipo('base')} className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${basePericulosidadeTipo === 'base' ? 'bg-primary text-white shadow-lg' : 'text-text-secondary hover:text-white'}`}>Base</button>
                          <button onClick={() => setBasePericulosidadeTipo('minimo')} className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${basePericulosidadeTipo === 'minimo' ? 'bg-primary text-white shadow-lg' : 'text-text-secondary hover:text-white'}`}>Mínimo</button>
                        </div>
                      </div>
                    </>
                  )}

                  {calcType === CalculatorType.ADICIONAL_NOTURNO && (
                    <>
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-text-secondary">Modo de Apuração</label>
                        <div className="flex p-1 bg-background-dark border border-border-dark rounded-xl shadow-inner">
                          <button onClick={() => setNoturnoMode('mensal')} className={`flex-1 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${noturnoMode === 'mensal' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-text-secondary hover:text-white hover:bg-white/5'}`}>
                            Média Mensal
                          </button>
                          <button onClick={() => setNoturnoMode('total')} className={`flex-1 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${noturnoMode === 'total' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-text-secondary hover:text-white hover:bg-white/5'}`}>
                            Quantidade Total
                          </button>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-text-secondary">Qtd. de Horas Noturnas</label>
                        <input type="number" value={horasNoturnas} onChange={(e) => setHorasNoturnas(Number(e.target.value))} className="bg-background-dark border border-border-dark rounded-xl p-3 text-white outline-none focus:border-primary transition-all" />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-text-secondary">Adicional Noturno (%)</label>
                        <div className="relative">
                           <input type="number" value={percentualNoturno} onChange={(e) => setPercentualNoturno(Number(e.target.value))} className="w-full bg-background-dark border border-border-dark rounded-xl p-3 text-white outline-none focus:border-primary transition-all" />
                           <span className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary font-bold">%</span>
                        </div>
                      </div>
                    </>
                  )}

                  {calcType === CalculatorType.DIFERENCA_SALARIAL && (
                    <>
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-text-secondary">Modo de Apuração</label>
                        <div className="flex p-1 bg-background-dark border border-border-dark rounded-xl shadow-inner">
                          <button onClick={() => setDiffMode('mensal')} className={`flex-1 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${diffMode === 'mensal' ? 'bg-primary text-white shadow-lg' : 'text-text-secondary hover:text-white hover:bg-white/5'}`}>
                            Média Mensal
                          </button>
                          <button onClick={() => setDiffMode('total')} className={`flex-1 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${diffMode === 'total' ? 'bg-primary text-white shadow-lg' : 'text-text-secondary hover:text-white hover:bg-white/5'}`}>
                            Diferença Total
                          </button>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-text-secondary">Salário Devido (Paradigma/Piso)</label>
                        <div className="relative">
                          <input type="number" value={salarioDevido} onChange={(e) => setSalarioDevido(Number(e.target.value))} className="w-full bg-background-dark border border-border-dark rounded-xl p-3 text-white outline-none focus:border-primary transition-all" />
                          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary font-bold">R$</span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 md:col-span-2">
                        <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 flex items-center justify-between shadow-inner">
                          <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-primary">info</span>
                            <p className="text-xs text-text-secondary font-medium">Base de comparação: Salário Pago de <span className="text-white font-bold">{baseSalaryRef.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span></p>
                          </div>
                          <p className="text-xs font-black text-primary uppercase">Δ { (salarioDevido - baseSalaryRef).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }</p>
                        </div>
                      </div>
                    </>
                  )}

                  {calcType === CalculatorType.DESVIO_FUNCAO && (
                    <>
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-text-secondary">Adicional de Acúmulo (%)</label>
                        <div className="relative">
                          <input type="number" value={percentualAcumulo} onChange={(e) => setPercentualAcumulo(Number(e.target.value))} className="w-full bg-background-dark border border-border-dark rounded-xl p-3 text-white outline-none focus:border-primary transition-all" />
                          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary font-bold">%</span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 md:col-span-2">
                        <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 flex items-center justify-between shadow-inner">
                          <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-primary">engineering</span>
                            <p className="text-xs text-text-secondary font-medium">O adicional incide mensalmente sobre o salário base de <span className="text-white font-bold">{baseSalaryRef.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span></p>
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {calcType === CalculatorType.FGTS_ATRASO && (
                    <div className="flex flex-col gap-2 md:col-span-2">
                      <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 flex items-center gap-3 shadow-inner">
                        <span className="material-symbols-outlined text-primary">info</span>
                        <p className="text-xs text-text-secondary font-medium">Cálculo de depósitos de 8% baseados no salário mensal informado no período contratual.</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="rounded-2xl bg-surface-dark border border-border-dark p-6 shadow-xl">
                <div className="mb-6 flex items-center gap-2 pb-4 border-b border-border-dark/50">
                   <span className="material-symbols-outlined text-primary">verified_user</span>
                   <h3 className="text-lg font-bold text-white">Opções de Inclusão de Verbas</h3>
                </div>
                
                {([CalculatorType.HORAS_EXTRAS, CalculatorType.INSALUBRIDADE, CalculatorType.PERICULOSIDADE, CalculatorType.ADICIONAL_NOTURNO, CalculatorType.DIFERENCA_SALARIAL, CalculatorType.DESVIO_FUNCAO].includes(calcType)) ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <label className="flex items-center gap-3 p-3 rounded-xl bg-primary/5 border border-primary/20 cursor-pointer hover:bg-primary/10 transition-all col-span-full">
                      <input type="checkbox" checked={config.refDsr && config.ref13 && config.refFerias && config.refFgts && config.refMulta} onChange={(e) => toggleAllReflexos(e.target.checked)} className="size-5 rounded border-border-dark bg-background-dark text-primary focus:ring-0" />
                      <span className="text-xs font-black text-white uppercase tracking-widest leading-none">Todos os reflexos</span>
                    </label>
                    <label className="flex items-center gap-3 p-3 rounded-xl bg-background-dark/40 border border-border-dark cursor-pointer hover:bg-primary/10 transition-all">
                      <input type="checkbox" checked={config.refDsr} onChange={() => setConfig(v => ({ ...v, refDsr: !v.refDsr }))} className="size-5 rounded border-border-dark bg-background-dark text-primary focus:ring-0" />
                      <span className="text-[10px] font-black text-white uppercase tracking-widest leading-none">Reflexo em DSR (1/6)</span>
                    </label>
                    <label className="flex items-center gap-3 p-3 rounded-xl bg-background-dark/40 border border-border-dark cursor-pointer hover:bg-primary/10 transition-all">
                      <input type="checkbox" checked={config.ref13} onChange={() => setConfig(v => ({ ...v, ref13: !v.ref13 }))} className="size-5 rounded border-border-dark bg-background-dark text-primary focus:ring-0" />
                      <span className="text-[10px] font-black text-white uppercase tracking-widest leading-none">Reflexo em 13º Salário</span>
                    </label>
                    <label className="flex items-center gap-3 p-3 rounded-xl bg-background-dark/40 border border-border-dark cursor-pointer hover:bg-primary/10 transition-all">
                      <input type="checkbox" checked={config.refFerias} onChange={() => setConfig(v => ({ ...v, refFerias: !v.refFerias }))} className="size-5 rounded border-border-dark bg-background-dark text-primary focus:ring-0" />
                      <span className="text-[10px] font-black text-white uppercase tracking-widest leading-none">Reflexo em Férias + 1/3</span>
                    </label>
                    <label className="flex items-center gap-3 p-3 rounded-xl bg-background-dark/40 border border-border-dark cursor-pointer hover:bg-primary/10 transition-all">
                      <input type="checkbox" checked={config.refFgts} onChange={() => setConfig(v => ({ ...v, refFgts: !v.refFgts }))} className="size-5 rounded border-border-dark bg-background-dark text-primary focus:ring-0" />
                      <span className="text-[10px] font-black text-white uppercase tracking-widest leading-none">Reflexo em FGTS (8%)</span>
                    </label>
                    <label className="flex items-center gap-3 p-3 rounded-xl bg-background-dark/40 border border-border-dark cursor-pointer hover:bg-primary/10 transition-all">
                      <input type="checkbox" checked={config.refMulta} onChange={() => setConfig(v => ({ ...v, refMulta: !v.refMulta }))} className="size-5 rounded border-border-dark bg-background-dark text-primary focus:ring-0" />
                      <span className="text-[10px] font-black text-white uppercase tracking-widest leading-none">Reflexo em Multa 40%</span>
                    </label>
                  </div>
                ) : calcType === CalculatorType.FGTS_ATRASO ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className="flex items-center gap-3 p-4 rounded-xl bg-background-dark/40 border border-border-dark cursor-pointer hover:bg-primary/10 transition-all">
                      <input type="checkbox" checked={config.multa} onChange={() => setConfig(v => ({ ...v, multa: !v.multa }))} className="size-5 rounded border-border-dark bg-background-dark text-primary focus:ring-0" />
                      <span className="text-xs font-black text-white uppercase tracking-widest leading-none">Incluir Multa de 40% do FGTS</span>
                    </label>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className="flex items-center gap-3 p-4 rounded-xl bg-background-dark/40 border border-border-dark cursor-pointer hover:bg-primary/10 transition-all">
                      <input type="checkbox" checked={config.reflexos} onChange={() => setConfig(v => ({ ...v, reflexos: !v.reflexos }))} className="size-5 rounded border-border-dark bg-background-dark text-primary focus:ring-0" />
                      <span className="text-xs font-black text-white uppercase tracking-widest leading-none">Reflexos Proporcionais (13º/Fér/DSR)</span>
                    </label>
                    {calcType === CalculatorType.RESCISAO && (
                      <>
                        <label className="flex items-center gap-3 p-4 rounded-xl bg-background-dark/40 border border-border-dark cursor-pointer hover:bg-primary/10 transition-all">
                          <input type="checkbox" checked={config.fgts} onChange={() => setConfig(v => ({ ...v, fgts: !v.fgts }))} className="size-5 rounded border-border-dark bg-background-dark text-primary focus:ring-0" />
                          <span className="text-xs font-black text-white uppercase tracking-widest leading-none">FGTS (8%) Rescisório</span>
                        </label>
                        <label className="flex items-center gap-3 p-4 rounded-xl bg-background-dark/40 border border-border-dark cursor-pointer hover:bg-primary/10 transition-all">
                          <input type="checkbox" checked={config.multa} onChange={() => setConfig(v => ({ ...v, multa: !v.multa }))} className="size-5 rounded border-border-dark bg-background-dark text-primary focus:ring-0" />
                          <span className="text-xs font-black text-white uppercase tracking-widest leading-none">Multa 40% FGTS</span>
                        </label>
                        <label className="flex items-center gap-3 p-4 rounded-xl bg-background-dark/40 border border-border-dark cursor-pointer hover:bg-primary/10 transition-all">
                          <input type="checkbox" checked={config.saldo} onChange={() => setConfig(v => ({ ...v, saldo: !v.saldo }))} className="size-5 rounded border-border-dark bg-background-dark text-primary focus:ring-0" />
                          <span className="text-xs font-black text-white uppercase tracking-widest leading-none">Saldo de Salário</span>
                        </label>
                        <label className="flex items-center gap-3 p-4 rounded-xl bg-background-dark/40 border border-border-dark cursor-pointer hover:bg-primary/10 transition-all">
                          <input type="checkbox" checked={config.aviso} onChange={() => setConfig(v => ({ ...v, aviso: !v.aviso }))} className="size-5 rounded border-border-dark bg-background-dark text-primary focus:ring-0" />
                          <span className="text-xs font-black text-white uppercase tracking-widest leading-none">Aviso Prévio Indenizado</span>
                        </label>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="w-full lg:w-[420px] shrink-0">
              <div className="sticky top-8 flex flex-col gap-6">
                <div className="rounded-3xl bg-surface-dark border border-border-dark overflow-hidden shadow-2xl relative border-t-4 border-t-primary">
                  <div className="absolute top-6 right-6 z-10">
                    <button onClick={copyTable} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[10px] font-black uppercase tracking-widest transition-all ${copyFeedback ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' : 'bg-surface-dark-alt border-border-dark text-text-secondary hover:text-white hover:bg-primary/20'}`}>
                      <span className="material-symbols-outlined text-[16px]">{copyFeedback ? 'check' : 'content_copy'}</span>
                      {copyFeedback ? 'Copiado!' : 'Copiar'}
                    </button>
                  </div>
                  <div className="bg-primary/10 p-8 border-b border-border-dark shadow-inner">
                    <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-2">Total Líquido Estimado</p>
                    <h2 className="text-4xl font-black text-white tracking-tight">{results.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h2>
                  </div>
                  <div className="p-8 space-y-4 max-h-[400px] overflow-y-auto custom-scrollbar">
                    {results.items.map((it, i) => (
                      <div key={i} className="flex justify-between items-start gap-4 pb-3 border-b border-border-dark/30 last:border-0 hover:bg-white/5 p-1 rounded transition-all">
                        <span className={`text-[11px] font-bold leading-relaxed ${String(it.label).includes('[ATRASO]') ? 'text-amber-400' : 'text-text-secondary'}`}>{it.label}</span>
                        <span className="font-mono font-bold text-xs whitespace-nowrap text-white">
                           {typeof it.value === 'number' ? it.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : it.value}
                        </span>
                      </div>
                    ))}
                    {results.items.length === 0 && (
                      <p className="text-xs text-text-secondary italic text-center py-4">Aguardando definição de verbas...</p>
                    )}
                  </div>
                  <div className="p-8 bg-background-dark border-t border-border-dark space-y-3">
                    <button className="w-full bg-primary text-white font-black py-4 rounded-xl shadow-lg hover:bg-blue-600 transition-all uppercase tracking-widest text-xs group">
                       <span className="material-symbols-outlined text-[20px] group-hover:scale-110 transition-transform">save</span> Salvar Histórico
                    </button>
                    <button onClick={() => navigateTo(AppView.EXPORT)} className="w-full bg-surface-dark-alt text-white font-black py-3 rounded-xl hover:bg-surface-dark transition-all border border-border-dark uppercase tracking-widest text-xs">
                       <span className="material-symbols-outlined text-[20px]">picture_as_pdf</span> Gerar Laudo PDF
                    </button>
                  </div>
                </div>
                
                <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 flex gap-3 shadow-inner">
                   <span className="material-symbols-outlined text-amber-500">auto_fix_high</span>
                   <p className="text-[11px] text-amber-200/70 leading-relaxed italic">
                      Parâmetros sincronizados ao salário base. Alterações recalcularão instantaneamente todos os reflexos contratuais.
                   </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CalculationForm;