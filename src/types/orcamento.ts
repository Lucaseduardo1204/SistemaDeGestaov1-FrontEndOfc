// Define os status possíveis baseados no seu HTML e base.css
export type OrcamentoStatus = 'Aprovado' | 'Pendente' | 'Finalizado' | 'Em Produção';

// Define a estrutura de um item da tabela
export type Orcamento = {
  id: string; // Ex: "#1023"
  status: OrcamentoStatus;
  nomeCliente: string;
  endereco: string;
  telefone: string;
  previsao: string; // Ex: "16/07/2025 - 14:00"
  pagamento: string; // Ex: "50%"
};

// Define a estrutura dos dados dos cards
export type DashboardStats = {
  fluxoMes: {
    mes: string;
    entrada: number;
    saida: number;
  };
  aprovados: number;
  pendentes: number;
  proximaInstalacao: {
    data: string; // Ex: "20/08"
    hora: string; // Ex: "13:00"
  };
};