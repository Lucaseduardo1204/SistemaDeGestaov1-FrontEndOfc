import { Orcamento, DashboardStats } from '@/types/orcamento';

// Simula a busca dos dados dos cards
export async function getDashboardStats(): Promise<DashboardStats> {
  // Simula um delay de API
  await new Promise(resolve => setTimeout(resolve, 300));

  return {
    fluxoMes: {
      mes: 'Julho',
      entrada: 15000,
      saida: 2500,
    },
    aprovados: 10,
    pendentes: 5,
    proximaInstalacao: {
      data: '20/08',
      hora: '13:00',
    },
  };
}

// Simula a busca dos itens da tabela
export async function getOrcamentos(): Promise<Orcamento[]> {
  // Simula um delay de API
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return [
    {
      id: '#1023',
      status: 'Aprovado',
      nomeCliente: 'João da Silva',
      endereco: 'Rua das Flores, 123',
      telefone: '(34) 99999-9999',
      previsao: '16/07/2025 - 14:00',
      pagamento: '50%',
    },
    {
      id: '#1024',
      status: 'Pendente',
      nomeCliente: 'Ana Paula',
      endereco: 'Av. Brasil, 456',
      telefone: '(34) 98888-8888',
      previsao: '17/07/2025 - 10:30',
      pagamento: '50%',
    },
    {
      id: '#1025',
      status: 'Finalizado',
      nomeCliente: 'Carlos Lima',
      endereco: 'R. João Pinheiro, 987',
      telefone: '(34) 97777-7777',
      previsao: '18/07/2025 - 09:00',
      pagamento: '100%',
    },
  ];
}

// Helper para formatar BRL (Reais)
export const formatBRL = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

// ... (imports e funções existentes) ...
import { User } from '@/types/usuario'; // Adicione este import

// ... (funções getDashboardStats, getOrcamentos, formatBRL) ...

// NOVA FUNÇÃO PARA BUSCAR USUÁRIOS
export async function getUsuarios(): Promise<User[]> {
  // Simula um delay de API
  await new Promise(resolve => setTimeout(resolve, 100));
  
  // Dados do seu HTML original
  return [
    { id: 1, nome: 'Lucas Eduardo', email: 'lucas.eduardo@email.com', cargo: 'Administrador', status: 'Ativo', avatar: 'LE' },
    { id: 2, nome: 'Ana Paula', email: 'ana.paula@email.com', cargo: 'Vendedor', status: 'Ativo', avatar: 'AP' },
    { id: 3, nome: 'João da Silva', email: 'joao.silva@email.com', cargo: 'Produção', status: 'Inativo', avatar: 'JS' },
  ];
}