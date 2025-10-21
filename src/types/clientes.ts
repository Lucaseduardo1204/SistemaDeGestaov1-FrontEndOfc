export type ClienteStatus = 'ATIVO' | 'INATIVO';

// Define a estrutura de um Cliente (baseado no Módulo 2)
export type Cliente = {
  id: string;
  nome: string; // Obrigatório
  email: string; // Único
  documento: string; // CPF/CNPJ (Único)
  telefone: string;
  endereco: string;
  status: ClienteStatus; // Controlado por Soft Delete
};

// Stats para os cards da página
export type StatsClientes = {
  totalClientes: number;
  totalAtivos: number;
  totalInativos: number;
};