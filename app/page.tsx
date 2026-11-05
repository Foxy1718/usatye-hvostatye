import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f5fb', color: '#4a3b69', fontFamily: 'system-ui, -apple-system, sans-serif', display: 'flex', flexDirection: 'column' }}>
      
      <header style={{ textAlign: 'center', paddingTop: '40px', paddingBottom: '24px', backgroundColor: '#ffffff', borderBottom: '1px solid #e9d8fd' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
          <Image src="/logo.png" alt="Логотип" width={120} height={120} style={{ borderRadius: '50%', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }} />
        </div>
        <h1 style={{ fontSize: '36px', margin: '0 0 12px 0', fontWeight: '700', letterSpacing: '0.05em' }}>Усатые-хвостатые</h1>
        <p style={{ fontSize: '18px', color: '#805ad5', margin: 0 }}>Команда волонтёров приюта «Печатники»</p>
      </header>

      <main style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '64px 16px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '30px', marginBottom: '24px', fontWeight: '600' }}>Подарите дом тому, кто его ждет</h2>
        
        <p style={{ fontSize: '18px', maxWidth: '672px', lineHeight: '1.6', marginBottom: '32px', color: '#4a5568' }}>
          Помогаем собакам из приюта «Печатники» найти своих людей. 
          Все наши подопечные привиты, кастрированы/стерилизованы и готовы к переезду в новую семью.
        </p>
        
        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', justifyContent: 'center', width: '100%', maxWidth: '450px' }}>
          <Link href="/dogs" style={{ flex: 1, padding: '16px 32px', backgroundColor: '#6b46c1', color: 'white', textDecoration: 'none', borderRadius: '9999px', fontSize: '18px', fontWeight: '600', boxShadow: '0 4px 6px rgba(107, 70, 193, 0.2)' }}>
            Смотреть собак
          </Link>
          <Link href="/how-to-adopt" style={{ flex: 1, padding: '16px 32px', backgroundColor: 'white', color: '#6b46c1', border: '2px solid #6b46c1', textDecoration: 'none', borderRadius: '9999px', fontSize: '18px', fontWeight: '600', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
            Как забрать
          </Link>
        </div>
      </main>

      <footer style={{ textAlign: 'center', padding: '24px', fontSize: '14px', color: '#718096', borderTop: '1px solid #e9d8fd', backgroundColor: 'white' }}>
        <p style={{ margin: 0 }}>© 2026 Усатые-хвостатые. Пристройство животных.</p>
      </footer>
    </div>
  );
}