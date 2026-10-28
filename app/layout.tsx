import type { Metadata } from 'next';
import './globals.css';
import './theme-overrides.css';
export const metadata: Metadata = { title: 'TradeEnglish AI · AI外贸英语教练', description: '每天60分钟，从简单英语到真实外贸沟通。' };
export default function RootLayout({children}: Readonly<{children:React.ReactNode}>) { return <html lang="zh-CN"><body>{children}</body></html>; }
