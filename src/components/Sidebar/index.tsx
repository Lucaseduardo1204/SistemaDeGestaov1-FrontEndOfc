'use client'; // Este componente precisa ser Client-side para usar o hook

import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Hook para saber a URL atual

const menuLinks = [
  { href: '/', label: 'Tela Principal' },
  { href: '/caixa', label: 'Caixa' },
  { href: '/estoque', label: 'Estoque' },
  { href: '/orcamentos', label: 'Orçamentos' },
  { href: '/clientes', label: 'Clientes' },
  { href: '/usuarios', label: 'Usuários' },
];

export function Sidebar() {
  const pathname = usePathname(); // Pega a URL atual (ex: "/usuarios")

  return (
    <nav className="sidebar"> {/* "sidebar" vem do globals.css */}
      <div className="sidebar__menu">
        <h6>Menu</h6>
        <ul>
          {menuLinks.map((link) => (
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
      </div>
    </nav>
  );
}