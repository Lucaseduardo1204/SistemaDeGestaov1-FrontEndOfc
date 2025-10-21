'use client';

import { useState } from 'react';
import styles from '../login/LoginForm.module.css'; // Reusa o CSS
import { TipoTransacao } from '../../types/caixa'; // Caminho relativo

// Props
type NovaTransacaoFormProps = {
  onClose: () => void;
};

// Categorias de exemplo (idealmente viriam do backend ou config)
const categoriasExemplo = [
  'Venda de Produto', 
  'Recebimento Cliente', 
  'Matéria-Prima', 
  'Salários', 
  'Aluguel', 
  'Marketing', 
  'Outros'
];

export function NovaTransacaoForm({ onClose }: NovaTransacaoFormProps) {
  // Estados
  const [tipo, setTipo] = useState<TipoTransacao>('Entrada');
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [categoria, setCategoria] = useState(categoriasExemplo[0]); // Padrão: primeira categoria

  // "Falsa Integração"
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const novaTransacao = { 
      tipo, 
      descricao, 
      valor: parseFloat(valor) || 0, 
      categoria 
    };
    
    console.log('--- REGISTRANDO NOVA TRANSAÇÃO ---');
    console.log(novaTransacao);
    
    // Futuramente, chamar API POST /api/lancamentos
    
    alert('Transação registrada! (Veja o console)');
    onClose(); // Fecha o modal
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {/* TIPO */}
      <div className={styles.formGroup}>
        <label htmlFor="tipo" className={styles.label}>Tipo*</label>
        <select
          id="tipo"
          value={tipo}
          onChange={(e) => setTipo(e.target.value as TipoTransacao)}
          required
          className={styles.input}
        >
          <option value="Entrada">Entrada</option>
          <option value="Saida">Saída</option>
        </select>
      </div>

      {/* DESCRIÇÃO */}
      <div className={styles.formGroup}>
        <label htmlFor="descricao" className={styles.label}>Descrição*</label>
        <textarea
          id="descricao"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          required
          className={styles.input}
          rows={3}
          placeholder="Ex: Recebimento cliente X, Pagamento fornecedor Y..."
        />
      </div>

      {/* VALOR */}
      <div className={styles.formGroup}>
        <label htmlFor="valor" className={styles.label}>Valor (R$)*</label>
        <input
          type="number"
          id="valor"
          step="0.01"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          required
          className={styles.input}
          placeholder="100.00"
        />
      </div>
      
      {/* CATEGORIA */}
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
          {/* Poderia ter uma opção "Nova Categoria..." */}
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
          Registrar Lançamento
        </button>
      </div>
    </form>
  );
}