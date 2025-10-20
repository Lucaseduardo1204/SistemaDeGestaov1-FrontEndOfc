
// 1. ATUALIZE AS PROPS PARA INCLUIR 'className'
type CardProps = {
  title: string;
  value: string | number;
  subValue?: string;
  variant?: 'positive' | 'negative' | 'warning' | 'info' | 'default';
  className?: string; // <-- ADICIONE ESTA LINHA
};

export function Card({ 
  title, 
  value, 
  subValue, 
  variant = 'default',
  className = ''     // <-- ADICIONE ESTA LINHA (com valor padrão)
}: CardProps) {
  
  // Mapeia a prop "variant" para a classe CSS do seu globals.css
  const valueClassMap = {
    positive: 'card__value--positive',
    negative: 'card__value--negative',
    warning: 'card__value--warning',
    info: 'card__value--info',
    default: 'card__value--default',
  };
  
  const valueClassName = `card__value ${valueClassMap[variant]}`;

  // 2. MESCLE A CLASSE 'card' GLOBAL COM A 'className' EXTERNA
  const cardClassName = `card ${className}`; // <-- ATUALIZE ESTA LINHA

  return (
    // 3. APLIQUE A CLASSE MESCLADA AQUI
    <div className={cardClassName}> 
      <h2 className="card__title">{title}</h2>
      <p className={valueClassName}>{value}</p>
      {subValue && (
        <p className="card__sub-value">{subValue}</p>
      )}
    </div>
  );
}