'use client';

import React from 'react';
import styles from './Modal.module.css';

// Ícone "X" para fechar
const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>
);

// --- Definindo as Propriedades (Props) ---
type ModalProps = {
  isOpen: boolean;      // Controla se o modal está visível
  onClose: () => void;  // Função para fechar o modal
  title: string;        // O título no cabeçalho
  children: React.ReactNode; // O conteúdo principal (ex: o formulário)
  footer?: React.ReactNode; // Opcional: para botões (ex: Salvar, Cancelar)
};

export function Modal({ isOpen, onClose, title, children, footer }: ModalProps) {
  
  // Se não estiver aberto, não renderiza nada
  if (!isOpen) {
    return null;
  }

  // Impede que o clique DENTRO do modal feche ele
  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    // O fundo escuro (overlay). Clicar nele fecha o modal.
    <div className={styles.overlay} onClick={onClose}>
      
      {/* O container branco do modal */}
      <div className={styles.modal} onClick={handleModalClick}>
        
        {/* 1. Cabeçalho */}
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <button className={styles.closeButton} onClick={onClose} title="Fechar">
            <CloseIcon />
          </button>
        </div>

        {/* 2. Corpo (Conteúdo principal) */}
        <div className={styles.content}>
          {children}
        </div>

        {/* 3. Rodapé (Opcional, para botões) */}
        {footer && (
          <div className={styles.footer}>
            {footer}
          </div>
        )}

      </div>
    </div>
  );
}