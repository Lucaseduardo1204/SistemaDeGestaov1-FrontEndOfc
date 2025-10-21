// Define o tipo de transação
export type TipoTransacao = 'Entrada' | 'Saida';

// Define a estrutura de uma transação (linha da tabela)
export type TransacaoCaixa = {
  id: string;
  tipo: TipoTransacao;
  descricao: string;
  valor: number;
  data: string;
  hora: string;
};

// Define a estrutura dos cards de estatísticas
export type StatsCaixa = {
  fluxoMes: {
    mes: string;
    entrada: number;
    saida: number;
  };
  totalEntradas: number;
  totalSaidas: number;
  principaisGastos: string[];
};