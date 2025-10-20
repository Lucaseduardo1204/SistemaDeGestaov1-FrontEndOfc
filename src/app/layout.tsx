import type { Metadata } from 'next';
import { Inter } from 'next/font/google'; // Pode usar a fonte que preferir
import './globals.css'; // Importa seu base.css
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Getmarcas - Sistema',
  description: 'Sistema de gestão Getmarcas',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <div className="page-grid"> {/* Seu layout principal do base.css */}
          <Header />
          <Sidebar />
          <main className="main-content">
            {children} {/* É AQUI QUE AS PÁGINAS SERÃO RENDERIZADAS */}

            <footer className="footer">
              &copy; Desenvolvido por Lucas Eduardo
            </footer>
          </main>
        </div>
      </body>
    </html>
  );
}