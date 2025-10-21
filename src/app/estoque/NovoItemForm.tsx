'use client';

import { useState } from 'react';
import styles from '../login/LoginForm.module.css'; // Reusa o CSS
import { ItemStatus } from '../../types/estoque'; // Caminho relativo

// Props
type NovoItemFormProps = {
  onClose: () => void;
};

// Categorias de exemplo (idealmente viriam do backend ou config)
const categoriasExemplo = ['Lonas', 'Adesivos', 'Chapas', 'Tintas', 'Ferramentas', 'Outros'];

export function NovoItemForm({ onClose }: NovoItemFormProps) {
  // Estados
  const [nome, setNome] = useState('');
  const [sku, setSku] = useState('');
  const [categoria, setCategoria] = useState(categoriasExemplo[0]);
  const [status, setStatus] = useState<ItemStatus>('DISPONIVEL');

  // "Falsa Integração"
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Quantidade inicial é sempre 0, só muda com movimentações
    const novoItem = { nome, sku, categoria, status, quantidadeInicial: 0 };
    
    console.log('--- ENVIANDO NOVO ITEM DE ESTOQUE ---');
    console.log(novoItem);
    
    // Futuramente, chamar API POST /api/estoque/items
    
    alert('Novo item salvo! (Veja o console)');
    onClose(); // Fecha o modal
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGroup}>
        <label htmlFor="nome" className={styles.label}>Nome do Item*</label>
        <input
          type="text"
          id="nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
          className={styles.input}
          placeholder="Ex: Lona PVC Brilho 500g"
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="sku" className={styles.label}>Código (SKU)*</label>
        <input
          type="text"
          id="sku"
          value={sku}
          onChange={(e) => setSku(e.target.value)}
          required
          className={styles.input}
          placeholder="Ex: LNA-001"
        />
      </div>
      
      <div className={styles.formGroup}>
        <label htmlFor="categoria" className={styles.label}>Categoria*</label>
        <select
          id="categoria"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          required
          className={styles.input}
        >
          {categoriasExemplo.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

       <div className={styles.formGroup}>
        <label htmlFor="status" className={styles.label}>Status Inicial*</label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value as ItemStatus)}
          required
          className={styles.input}
        >
          <option value="DISPONIVEL">Disponível</option>
          <option value="INDISPONIVEL">Indisponível</option> 
        </select>
      </div>

      {/* Botões */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '15px', marginTop: '20px' }}>
        <button 
          type="button" 
          className={styles.submitButton} 
          style={{ backgroundColor: 'var(--color-neutral)' }}
          onClick={onClose}
        >
          Cancelar
        </button>
        <button 
          type="submit" 
          className={styles.submitButton}
        >
          Salvar Novo Item
        </button>
      </div>
    </form>
  );
}