'use client';

import { useState, useEffect } from 'react';
import styles from '../login/LoginForm.module.css'; // Reusa o CSS
import { Cliente } from '../../types/clientes'; // Precisa do tipo Cliente
import { getClientes } from '../../lib/data'; // Para buscar os clientes (mock)

// Props
type NovoOrcamentoFormProps = {
  onClose: () => void;
};

export function NovoOrcamentoForm({ onClose }: NovoOrcamentoFormProps) {
  // Estados do formulário
  const [clienteId, setClienteId] = useState('');
  const [descricaoServico, setDescricaoServico] = useState('');
  const [valorTotal, setValorTotal] = useState('');
  const [previsaoData, setPrevisaoData] = useState(''); // Ex: "AAAA-MM-DDTHH:MM"
  const [pagamentoStatus, setPagamentoStatus] = useState('0%'); // Valor inicial
  const [endereco, setEndereco] = useState(''); // Opcional, pode vir do cliente

  // Estado para os clientes (para o dropdown)
  const [clientes, setClientes] = useState<Cliente[]>([]);
  
  // Estado para controlar a exibição do botão PDF
  const [savedBudgetId, setSavedBudgetId] = useState<string | null>(null);

  // Busca os clientes para o dropdown (Mock - Apenas para demonstração)
  // NOTA: Em produção, buscar dados assim em um Client Component não é ideal.
  // Seria melhor passar os clientes como prop ou usar Server Actions.
  useEffect(() => {
    async function fetchClientes() {
      const listaClientes = await getClientes();
      setClientes(listaClientes.filter(c => c.status === 'ATIVO')); // Só clientes ativos
    }
    fetchClientes();
  }, []);

  // "Falsa Integração"
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const novoOrcamento = { 
      clienteId, 
      descricaoServico, 
      valorTotal: parseFloat(valorTotal) || 0,
      previsaoData,
      pagamentoStatus,
      endereco: endereco || clientes.find(c => c.id === clienteId)?.endereco || '', // Pega endereço do cliente se vazio
    };

    console.log('--- ENVIANDO NOVO ORÇAMENTO ---');
    console.log(novoOrcamento);
    
    // Simula a resposta do backend com um ID
    const mockId = `#${Math.floor(Math.random() * 9000) + 1000}`; 
    
    alert('Orçamento salvo com ID: ' + mockId + '! (Veja o console)');
    setSavedBudgetId(mockId); // Guarda o ID para habilitar o botão PDF
    
    // onClose(); // NÃO FECHA MAIS AQUI! Fecha só se clicar no "Cancelar" ou "X"
  };

  // Lógica (falsa) para o botão PDF
  const handleDownloadPdf = () => {
    console.log(`--- BAIXANDO PDF PARA ORÇAMENTO ${savedBudgetId} ---`);
    alert(`PDF do orçamento ${savedBudgetId} seria baixado aqui.`);
    // Futuramente: window.location.href = `/api/orcamentos/${savedBudgetId}/pdf`;
    onClose(); // Fecha o modal DEPOIS de clicar no PDF
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {/* SELEÇÃO DE CLIENTE */}
      <div className={styles.formGroup}>
        <label htmlFor="clienteId" className={styles.label}>Cliente*</label>
        <select
          id="clienteId"
          value={clienteId}
          onChange={(e) => setClienteId(e.target.value)}
          required
          className={styles.input} // Reutiliza estilo do input
        >
          <option value="" disabled>Selecione um cliente...</option>
          {clientes.map(cliente => (
            <option key={cliente.id} value={cliente.id}>
              {cliente.nome} ({cliente.documento})
            </option>
          ))}
        </select>
      </div>

      {/* DESCRIÇÃO DO SERVIÇO */}
      <div className={styles.formGroup}>
        <label htmlFor="descricao" className={styles.label}>Descrição do Serviço*</label>
        <textarea
          id="descricao"
          value={descricaoServico}
          onChange={(e) => setDescricaoServico(e.target.value)}
          required
          className={styles.input}
          rows={3}
          placeholder="Ex: Fachada em ACM com letra caixa..."
        />
      </div>

      {/* VALOR TOTAL */}
      <div className={styles.formGroup}>
        <label htmlFor="valor" className={styles.label}>Valor Total (R$)*</label>
        <input
          type="number"
          id="valor"
          step="0.01" // Permite centavos
          value={valorTotal}
          onChange={(e) => setValorTotal(e.target.value)}
          required
          className={styles.input}
          placeholder="1500.00"
        />
      </div>

      {/* PREVISÃO DE DATA/HORA */}
      <div className={styles.formGroup}>
        <label htmlFor="previsao" className={styles.label}>Previsão de Entrega/Instalação</label>
        <input
          type="datetime-local" // Input de data e hora
          id="previsao"
          value={previsaoData}
          onChange={(e) => setPrevisaoData(e.target.value)}
          className={styles.input}
        />
      </div>

      {/* STATUS DO PAGAMENTO */}
       <div className={styles.formGroup}>
        <label htmlFor="pagamento" className={styles.label}>Status Pagamento</label>
        <select
          id="pagamento"
          value={pagamentoStatus}
          onChange={(e) => setPagamentoStatus(e.target.value)}
          className={styles.input}
        >
          <option value="0%">0% (Pendente)</option>
          <option value="50%">50% (Sinal)</option>
          <option value="100%">100% (Pago)</option>
          {/* Adicione outros status se necessário */}
        </select>
      </div>

      {/* ENDEREÇO (Opcional, pode puxar do cliente) */}
      <div className={styles.formGroup}>
        <label htmlFor="endereco" className={styles.label}>Endereço (se diferente do cliente)</label>
        <input
          type="text"
          id="endereco"
          value={endereco}
          onChange={(e) => setEndereco(e.target.value)}
          className={styles.input}
          placeholder="Rua, Número, Bairro..."
        />
      </div>


      {/* BOTÕES DE AÇÃO */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '15px', marginTop: '20px' }}>
        <button
          type="button"
          className={styles.submitButton}
          style={{ backgroundColor: 'var(--color-neutral)' }}
          onClick={onClose}
          disabled={!!savedBudgetId} // Desabilita Cancelar após salvar
        >
          Cancelar
        </button>
        <button
          type="submit"
          className={styles.submitButton}
          disabled={!!savedBudgetId} // Desabilita Salvar após salvar
        >
          Salvar Orçamento
        </button>

        {/* BOTÃO PDF CONDICIONAL */}
        {savedBudgetId && (
          <button
            type="button"
            className={`${styles.submitButton} pdf-button`} // Adiciona classe para estilizar
            onClick={handleDownloadPdf}
          >
            Baixar PDF ({savedBudgetId})
          </button>
        )}
      </div>
    </form>
  );
}