import { getCaixaStats, getTransacoesCaixa } from '../../lib/data'; // Usa caminho relativo
import { CaixaPageClient } from './CaixaPageClient'; // Importa o Client

// Server Component
export default async function CaixaPage() {
  
  // Busca os dados no servidor
  const [stats, transacoes] = await Promise.all([
    getCaixaStats(),
    getTransacoesCaixa(),
  ]);

  // Renderiza o Client Component
  return (
    <CaixaPageClient stats={stats} transacoes={transacoes} />
  );
}