'use client';

import { useState, useEffect } from 'react';
import styles from '../login/LoginForm.module.css'; // Reusa o CSS
import { ItemEstoque } from '../../types/estoque'; // Caminho relativo
import { getItensEstoque } from '../../lib/data'; // Caminho relativo

// Props
type RegistrarMovimentoFormProps = {
  onClose: () => void;
};

// Tipos de Movimento
type TipoMovimento = 'ENTRADA' | 'SAIDA' | 'AJUSTE';

export function RegistrarMovimentoForm({ onClose }: RegistrarMovimentoFormProps) {
  // Estados
  const [itemId, setItemId] = useState('');
  const [tipoMovimento, setTipoMovimento] = useState<TipoMovimento>('ENTRADA');
  const [quantidade, setQuantidade] = useState('');
  const [observacao, setObservacao] = useState(''); // Opcional

  // Estado para os itens (para o dropdown)
  const [itens, setItens] = useState<ItemEstoque[]>([]);

  // Busca os itens para o dropdown (Mock - Mesma observação da busca de clientes)
  useEffect(() => {
    async function fetchItens() {
      const listaItens = await getItensEstoque();
      setItens(listaItens.filter(i => i.status === 'DISPONIVEL')); // Só itens disponíveis
    }
    fetchItens();
  }, []);

  // "Falsa Integração"
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // A quantidade é positiva para Entrada/Ajuste Positivo, negativa para Saída/Ajuste Negativo
    let qtdFinal = parseFloat(quantidade) || 0;
    if (tipoMovimento === 'SAIDA') {
        qtdFinal = -Math.abs(qtdFinal); // Garante que saída seja negativa
    }
    
    const novoMovimento = { 
        itemId, 
        tipo: tipoMovimento, 
        quantidade: qtdFinal,
        observacao
    };
    
    console.log('--- REGISTRANDO MOVIMENTO DE ESTOQUE ---');
    console.log(novoMovimento);
    
    // Futuramente, chamar API POST /api/estoque/movimentos
    
    alert('Movimento registrado! (Veja o console)');
    onClose(); // Fecha o modal
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {/* SELEÇÃO DO ITEM */}
      <div className={styles.formGroup}>
        <label htmlFor="itemId" className={styles.label}>Item do Estoque*</label>
        <select
          id="itemId"
          value={itemId}
          onChange={(e) => setItemId(e.target.value)}
          required
          className={styles.input}
        >
          <option value="" disabled>Selecione um item...</option>
          {itens.map(item => (
            <option key={item.id} value={item.id}>
              {item.nome} (SKU: {item.sku}) - Atual: {item.quantidade}
            </option>
          ))}
        </select>
      </div>

      {/* TIPO DE MOVIMENTO */}
      <div className={styles.formGroup}>
        <label htmlFor="tipoMovimento" className={styles.label}>Tipo de Movimento*</label>
        <select
          id="tipoMovimento"
          value={tipoMovimento}
          onChange={(e) => setTipoMovimento(e.target.value as TipoMovimento)}
          required
          className={styles.input}
        >
          <option value="ENTRADA">Entrada (+)</option>
          <option value="SAIDA">Saída (-)</option>
          <option value="AJUSTE">Ajuste (+/- na quantidade)</option> 
        </select>
      </div>

      {/* QUANTIDADE */}
      <div className={styles.formGroup}>
        <label htmlFor="quantidade" className={styles.label}>
            Quantidade* {tipoMovimento === 'AJUSTE' && ' (Positivo para adicionar, Negativo para remover)'}
        </label>
        <input
          type="number"
          id="quantidade"
          step="1" // Geralmente estoque é unitário
          value={quantidade}
          onChange={(e) => setQuantidade(e.target.value)}
          required
          className={styles.input}
          placeholder="10"
        />
      </div>

      {/* OBSERVAÇÃO (Opcional) */}
      <div className={styles.formGroup}>
        <label htmlFor="observacao" className={styles.label}>Observação (Opcional)</label>
        <textarea
          id="observacao"
          value={observacao}
          onChange={(e) => setObservacao(e.target.value)}
          className={styles.input}
          rows={2}
          placeholder="Ex: Compra NF 123, Uso na OS 456, Ajuste de inventário..."
        />
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
          Registrar Movimento
        </button>
      </div>
    </form>
  );
}