'use client'; 

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react'; // Importe 'signOut'

// Tipo para a permissão do usuário
type UserPermission = 'ADMIN' | 'FINANCEIRO' | 'VENDEDOR' | 'PRODUCAO' | undefined;

const allMenuLinks = [
  { href: '/', label: 'Tela Principal', requiredPermission: null },
  { href: '/caixa', label: 'Caixa', requiredPermission: ['ADMIN', 'FINANCEIRO'] },
  // 3. ATUALIZE A PERMISSÃO DO ESTOQUE
  { href: '/estoque', label: 'Estoque', requiredPermission: ['ADMIN', 'FINANCEIRO'] }, // <-- ADICIONE A REGRA
  { href: '/orcamentos', label: 'Orçamentos', requiredPermission: ['ADMIN', 'FINANCEIRO'] }, // (Já que estamos aqui, vamos proteger Orçamentos também)
  { href: '/clientes', label: 'Clientes', requiredPermission: ['ADMIN', 'FINANCEIRO'] }, // (Anotado que você mudou 'Produção' para 'Clientes')
  { href: '/usuarios', label: 'Usuários', requiredPermission: ['ADMIN', 'FINANCEIRO'] },
];

export function Sidebar() {
  const pathname = usePathname(); // Agora está sendo usado
  const { data: session } = useSession();
  const userPermission: UserPermission = session?.user?.permissao; // Agora está sendo usado

  // Filtra os links baseado na permissão
  const filteredLinks = allMenuLinks.filter(link => {
    if (!link.requiredPermission) {
      return true; // Link público
    }
    // Verifica se a permissão do usuário está na lista de permissões requeridas
    return userPermission && link.requiredPermission.includes(userPermission);
  });

  return (
    <nav className="sidebar">
      <div className="sidebar__menu">
        <h6>Menu</h6>
        <ul>
          {filteredLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={
                  pathname === link.href ? 'sidebar__link--active' : ''
                }
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="sidebar__logout">
        {/* Usamos o onClick para chamar o signOut */}
        <button onClick={() => signOut()} className="sidebar__logout-button">
          Sair
        </button>
      </div>
    </nav>
  );
}