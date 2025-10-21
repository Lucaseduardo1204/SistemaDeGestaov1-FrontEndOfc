// Status possíveis (ATUALIZADO CONFORME O DOCUMENTO DE REGRAS)
export type OrcamentoStatus = 'PENDENTE' | 'APROVADO' | 'FINALIZADO' | 'CANCELADO';

// Define a estrutura de um item da tabela (ATUALIZADO)
export type Orcamento = {
  id: string;
  status: OrcamentoStatus;
  clienteNome: string;
  clienteTelefone: string;
  endereco: string;
  previsaoData: string;
  pagamentoStatus: string;
  valorTotal: number;
};

// Define a estrutura dos dados dos cards PARA A PÁGINA PRINCIPAL (/ - Módulo 6)
export type DashboardStats = {
  fluxoMes: {
    mes: string;
    entrada: number;
    saida: number;
  };
  aprovados: number;
  pendentes: number;
  proximaInstalacao: {
    data: string;
    hora: string;
  };
};

// NOVO TIPO: Define a estrutura dos cards PARA A PÁGINA DE ORÇAMENTOS (/orcamentos)
export type StatsOrcamentos = {
  totalPendentes: number;
  totalAprovados: number;
  totalFinalizados: number;
  totalCancelados: number;
};