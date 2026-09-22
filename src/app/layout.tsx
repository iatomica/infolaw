import type { Metadata } from 'next';
import './globals.css';
import { InfoLawProvider } from '@/lib/store';
import { CommandPalette } from '@/components/workspace/CommandPalette';
import { QuickViewDrawer } from '@/components/workspace/QuickViewDrawer';
import { RoleSwitcherBar } from '@/components/workspace/RoleSwitcherBar';

export const metadata: Metadata = {
  title: 'InfoLaw | Sistema Integral Jurídico & Contable',
  description: 'Plataforma integral de gestión profesional, portal de clientes y software operativo para estudios jurídicos y contables.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        <InfoLawProvider>
          {/* Universal Demo Switcher at top */}
          <RoleSwitcherBar />
          
          <main className="flex-1 flex flex-col">
            {children}
          </main>

          {/* Global Search Command Palette (⌘K) */}
          <CommandPalette />

          {/* Global 360° Quick View Drawer */}
          <QuickViewDrawer />
        </InfoLawProvider>
      </body>
    </html>
  );
}
