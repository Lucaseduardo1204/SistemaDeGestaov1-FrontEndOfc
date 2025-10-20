export type UserStatus = 'Ativo' | 'Inativo';

export type User = {
  id: number;
  nome: string;
  email: string;
  cargo: string;
  status: UserStatus;
  avatar: string; // Para as iniciais "LE", "AP"
};