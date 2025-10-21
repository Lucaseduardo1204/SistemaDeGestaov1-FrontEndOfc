import { getUsuarios } from '../../lib/data'; // Usa caminho relativo
import { UsuariosPageClient } from './UsuariosPageClient'; // Importa o Client

// Server Component
export default async function UsuariosPage() {
  
  // Busca os dados no servidor
  const usuarios = await getUsuarios();

  // Renderiza o Client Component, passando os dados
  return (
    <UsuariosPageClient usuarios={usuarios} />
  );
}