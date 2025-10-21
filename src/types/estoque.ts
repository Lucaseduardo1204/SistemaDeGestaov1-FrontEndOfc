export type ItemStatus = 'DISPONIVEL' | 'INDISPONIVEL';

// Um item do inventário
export type ItemEstoque = {
  id: string;
  nome: string;
  sku: string; // Código do produto
  categoria: string;
  quantidade: number; // Esta é a quantidade CALCULADA (soma dos movimentos)
  status: ItemStatus;
};

// Um registro de movimentação (imutável)
export type MovimentoEstoque = {
  id: string;
  itemEstoqueId: string;
  data: string;
  tipo: 'ENTRADA' | 'SAIDA' | 'AJUSTE';
  quantidade: number; // 10 para entrada, -10 para saída
  usuario: string; // Nome do usuário que fez o registro
};

// Stats para os cards
export type StatsEstoque = {
  totalItens: number;
  itensBaixoEstoque: number; // (Ex: < 5 unidades)
  valorTotalEstoque: number; // (Precisaríamos de um campo 'preco_custo' no item)
};