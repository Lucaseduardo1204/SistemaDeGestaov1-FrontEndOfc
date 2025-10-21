import { getEstoqueStats, getItensEstoque } from '../../lib/data'; // Usa caminho relativo
import { EstoquePageClient } from './EstoquePageClient'; // Importa o Client

// Server Component
export default async function EstoquePage() {

  // Busca os dados no servidor
  const [stats, itens] = await Promise.all([
    getEstoqueStats(),
    getItensEstoque(),
  ]);

  // Renderiza o Client Component
  return (
    <EstoquePageClient stats={stats} itens={itens} />
  );
}