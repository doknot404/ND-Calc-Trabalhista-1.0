
export enum AppView {
  DASHBOARD = 'dashboard',
  TRABALHISTA_HUB = 'trabalhista-hub',
  CALCULATION_FORM = 'calculation-form',
  HISTORY = 'history',
  SETTINGS = 'settings',
  HELP = 'help',
  EXPORT = 'export'
}

export enum CalculatorType {
  RESCISAO = 'rescisao',
  HORAS_EXTRAS = 'horas_extras',
  INSALUBRIDADE = 'insalubridade',
  PERICULOSIDADE = 'periculosidade',
  FGTS_ATRASO = 'fgts_atraso',
  ADICIONAL_NOTURNO = 'adicional_noturno',
  DIFERENCA_SALARIAL = 'diferenca_salarial',
  DESVIO_FUNCAO = 'desvio_funcao',
  // Fix: Adding missing members to CalculatorType to resolve errors in CivilHub and PrevidenciarioHub
  ATUALIZACAO_CIVIL = 'atualizacao_civil',
  TEMPO_CONTRIBUICAO = 'tempo_contribuicao',
  RMI_PREV = 'rmi_prev',
  ATRASADOS_PREV = 'atrasados_prev',
  PLANEJAMENTO_PREV = 'planejamento_prev'
}

export interface CalculationEntry {
  id: string;
  name: string;
  client: string;
  processNumber: string;
  area: string;
  date: string;
  value: number;
  status: 'Completo' | 'Rascunho' | 'Pendente' | 'Finalizado' | 'Revisar';
  tags: string[];
}