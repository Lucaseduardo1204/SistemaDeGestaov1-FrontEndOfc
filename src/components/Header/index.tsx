'use client'; // 1. Converte para Client Component para interatividade

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// 2. Definimos um ícone de usuário simples
const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 0 24 24" width="28px" fill="var(--color-text-light)">
    <path d="M0 0h24v24H0V0z" fill="none"/>
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
  </svg>
);

export function Header() {
  // 3. Estado para controlar o menu dropdown
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // 4. Lógica para fechar o menu ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef]);

  return (
    <header className="header"> {/* "header" vem do globals.css */}
      
      {/* Container do Logo */}
      <div>
        <Image
          className="header__logo"
          src="/img/Get-horizontal.svg" // ATENÇÃO: Mudei o caminho, assumindo que /img está na pasta /public
          alt="Logo Getmarcas"
          width={150}
          height={40}
          priority // Ajuda a carregar o logo mais rápido
        />
      </div>

      {/* 5. Novo Menu de Usuário */}
      <div className="header__user-menu" ref={menuRef}>
        
        {/* Botão que abre/fecha o dropdown */}
        <button 
          className="header__user-button" 
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          title="Menu de usuário"
        >
          <UserIcon />
        </button>

        {/* O Dropdown (só aparece se isDropdownOpen for true) */}
        {isDropdownOpen && (
          <div className="user-dropdown">
            <ul>
              <li>
                <Link href="/perfil/alterar-senha">Alterar Senha</Link>
              </li>
              <li>
                <Link href="/login">Sair</Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}