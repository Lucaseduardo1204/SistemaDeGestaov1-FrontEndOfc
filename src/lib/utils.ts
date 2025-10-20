import { OrcamentoStatus } from '@/types/orcamento';

export function getStatusClass(status: OrcamentoStatus): string {
  switch (status) {
    case 'Aprovado':
      return 'status--aprovado';
    case 'Pendente':
      return 'status--pendente';
    case 'Finalizado':
      return 'status--finalizado';
    case 'Em Produção':
      return 'status--em-producao';
    default:
      return '';
  }
}