import './style.css';
import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'AI Lead Engine', description: 'Multi-industry AI lead intelligence platform' };
export default function RootLayout({children}:{children:React.ReactNode}) {return <html lang="en"><body>{children}</body></html>}
