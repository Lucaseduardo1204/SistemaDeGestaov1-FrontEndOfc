// --- IMPORTS UNIFICADOS ---
import { DashboardStats, Orcamento,StatsOrcamentos } from '@/types/orcamento';
import { TransacaoCaixa, StatsCaixa } from '@/types/caixa';
import { User } from '@/types/usuario';
import { ItemEstoque, StatsEstoque } from '@/types/estoque';

// --- HELPER DE FORMATAÇÃO ---
export const formatBRL = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

// --- MÓDULO 6: DASHBOARD (TELA PRINCIPAL) ---
export async function getDashboardStats(): Promise<DashboardStats> {
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

// (ESTA É A FUNÇÃO QUE ESTAVA DANDO ERRO, AGORA CORRIGIDA)
// Retorna os orçamentos recentes para a tabela da Tela Principal
export async function getRecentOrcamentos(): Promise<Orcamento[]> {
  await new Promise(resolve => setTimeout(resolve, 300));
  return [
    {
      id: '#1023',
      status: 'APROVADO', // Corrigido para MAIÚSCULO
      clienteNome: 'João da Silva', // Corrigido
      endereco: 'Rua das Flores, 123',
      clienteTelefone: '(34) 99999-9999', // Corrigido
      previsaoData: '16/07/2025 - 14:00', // Corrigido
      pagamentoStatus: '50%', // Corrigido
      valorTotal: 1500.00,
    },
    {
      id: '#1024',
      status: 'PENDENTE', // Corrigido
      clienteNome: 'Ana Paula', // Corrigido
      endereco: 'Av. Brasil, 456',
      clienteTelefone: '(34) 98888-8888', // Corrigido
      previsaoData: '17/07/2025 - 10:30', // Corrigido
      pagamentoStatus: '50%', // Corrigido
      valorTotal: 800.00,
    },
    {
      id: '#1025',
      status: 'FINALIZADO', // Corrigido
      clienteNome: 'Carlos Lima', // Corrigido
      endereco: 'R. João Pinheiro, 987',
      clienteTelefone: '(34) 97777-7777', // Corrigido
      previsaoData: '18/07/2025 - 09:00', // Corrigido
      pagamentoStatus: '100%', // Corrigido
      valorTotal: 2200.00,
    },
  ];
}

// --- MÓDULO 1: USUÁRIOS ---
export async function getUsuarios(): Promise<User[]> {
  await new Promise(resolve => setTimeout(resolve, 100));
  return [
    // CORRIGIDO: Cargos e Status com capitalização correta
    { id: 1, nome: 'Lucas Eduardo', email: 'lucas.eduardo@email.com', cargo: 'ADMIN', status: 'Ativo', avatar: 'LE' },
    { id: 2, nome: 'Ana Paula', email: 'ana.paula@email.com', cargo: 'FINANCEIRO', status: 'Ativo', avatar: 'AP' }, // Exemplo Financeiro
    { id: 3, nome: 'João da Silva', email: 'joao.silva@email.com', cargo: 'COMUM', status: 'Inativo', avatar: 'JS' }, // Exemplo Comum
  ];
}

// --- MÓDULO 5: CAIXA ---
export async function getCaixaStats(): Promise<StatsCaixa> {
  await new Promise(resolve => setTimeout(resolve, 100));
  return {
    fluxoMes: {
      mes: 'Julho',
      entrada: 15000.00,
      saida: 2500.00,
    },
    totalEntradas: 45,
    totalSaidas: 5,
    principaisGastos: [
      'Gastos com Material',
      'Gastos com Pessoal',
      'Gastos com Estrutura',
    ],
  };
}

export async function getTransacoesCaixa(): Promise<TransacaoCaixa[]> {
  await new Promise(resolve => setTimeout(resolve, 100));
  return [
    { id: '#1023', tipo: 'Entrada', descricao: 'Fachada Supermercado', valor: 1000.00, data: '16/07/2025', hora: '14:00' },
    { id: '#1026', tipo: 'Saida', descricao: 'Gasto com material', valor: 150.00, data: '10/07/2025', hora: '09:00' },
  ];
}

// --- MÓDULO 4: ESTOQUE ---
export async function getEstoqueStats(): Promise<StatsEstoque> {
  await new Promise(resolve => setTimeout(resolve, 100));
  return {
    totalItens: 150,
    itensBaixoEstoque: 12,
    valorTotalEstoque: 45800.00,
  };
}

export async function getItensEstoque(): Promise<ItemEstoque[]> {
  await new Promise(resolve => setTimeout(resolve, 100));
  return [
    { id: 'e1', nome: 'Lona PVC Brilho 500g', sku: 'LNA-001', categoria: 'Lonas', quantidade: 50, status: 'DISPONIVEL' },
    { id: 'e2', nome: 'Adesivo Vinil Fosco', sku: 'ADV-002', categoria: 'Adesivos', quantidade: 20, status: 'DISPONIVEL' },
    { id: 'e3', nome: 'Chapa PS 2mm', sku: 'CHA-003', categoria: 'Chapas', quantidade: 3, status: 'DISPONIVEL' },
    { id: 'e4', nome: 'Tinta Solvente Amarela', sku: 'TIN-004', categoria: 'Tintas', quantidade: 0, status: 'INDISPONIVEL' },
  ];
}

// --- MÓDULO 3: ORÇAMENTOS (PÁGINA DE GESTÃO) ---
export async function getOrcamentosStats(): Promise<StatsOrcamentos> {
  await new Promise(resolve => setTimeout(resolve, 100));
  return {
    totalPendentes: 5,
    totalAprovados: 10,
    totalFinalizados: 30,
    totalCancelados: 2,
  };
}

export async function getOrcamentosFullList(): Promise<Orcamento[]> {
  await new Promise(resolve => setTimeout(resolve, 100));
  return [
    { id: '#1023', status: 'APROVADO', clienteNome: 'João da Silva', clienteTelefone: '(34) 99999-9999', endereco: 'Rua das Flores, 123', previsaoData: '16/07/2025 - 14:00', pagamentoStatus: '50%', valorTotal: 1500.00 },
    { id: '#1024', status: 'PENDENTE', clienteNome: 'Ana Paula', clienteTelefone: '(34) 98888-8888', endereco: 'Av. Brasil, 456', previsaoData: '17/07/2025 - 10:30', pagamentoStatus: '50%', valorTotal: 800.00 },
    { id: '#1025', status: 'FINALIZADO', clienteNome: 'Carlos Lima', clienteTelefone: '(34) 97777-7777', endereco: 'R. João Pinheiro, 987', previsaoData: '18/07/2025 - 09:00', pagamentoStatus: '100%', valorTotal: 2200.00 },
    { id: '#1026', status: 'CANCELADO', clienteNome: 'Mariana Costa', clienteTelefone: '(34) 96666-6666', endereco: 'R. Alfa, 101', previsaoData: '20/07/2025 - 11:00', pagamentoStatus: '0%', valorTotal: 500.00 },
  ];
}

import { Cliente, StatsClientes } from '../types/clientes';

// ... (funções existentes) ...

// --- NOVAS FUNÇÕES PARA CLIENTES (Módulo 2) ---

export async function getClienteStats(): Promise<StatsClientes> {
  await new Promise(resolve => setTimeout(resolve, 100));
  return {
    totalClientes: 120,
    totalAtivos: 115,
    totalInativos: 5,
  };
}

export async function getClientes(): Promise<Cliente[]> {
  await new Promise(resolve => setTimeout(resolve, 100));
  return [
    { id: 'c1', nome: 'Supermercado Central', email: 'compras@central.com', documento: '12.345.678/0001-99', telefone: '(34) 3232-1000', endereco: 'Av. Central, 100', status: 'ATIVO' },
    { id: 'c2', nome: 'Padaria Pão Quente', email: 'adm@paoquente.com', documento: '98.765.432/0001-11', telefone: '(34) 3232-2000', endereco: 'Rua das Flores, 200', status: 'ATIVO' },
    { id: 'c3', nome: 'Cliente Antigo (Inativo)', email: 'antigo@email.com', documento: '123.456.789-00', telefone: '(34) 9999-0000', endereco: 'Rua Teste, 300', status: 'INATIVO' },
  ];
}