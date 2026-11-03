import Link from "next/link";

export default function HowToAdopt() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f5fb', color: '#4a3b69', fontFamily: 'system-ui, -apple-system, sans-serif', padding: '32px' }}>
      <div style={{ maxWidth: '768px', margin: '0 auto', backgroundColor: 'white', padding: '32px', borderRadius: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #f3e8ff' }}>
        
        <h1 style={{ fontSize: '30px', fontWeight: 'bold', marginBottom: '24px' }}>Как забрать собаку?</h1>
        
        <div style={{ fontSize: '18px', lineHeight: '1.6', color: '#4a5568' }}>
          <p style={{ marginBottom: '16px' }}>Мы очень рады, что вы готовы подарить дом одному из наших подопечных! Вот несколько шагов для этого:</p>
          
          <ol style={{ paddingLeft: '20px', marginBottom: '32px', fontWeight: '500', color: '#6b46c1' }}>
            <li style={{ marginBottom: '12px' }}>Выберите собаку на нашем сайте.</li>
            <li style={{ marginBottom: '12px' }}>Свяжитесь c нами.</li>
            <li style={{ marginBottom: '12px' }}>Мы организуем встречу c собакой.</li>
            <li>Если вы подружитесь — подпишем договор и поможем c перевозкой.</li>
          </ol>

          <div style={{ backgroundColor: '#f3e8ff', padding: '20px', borderRadius: '16px', marginBottom: '32px', border: '1px solid #e9d8fd' }}>
            <p style={{ fontWeight: 'bold', margin: '0 0 8px 0', color: '#6b46c1' }}>Важно:</p>
            <p style={{ margin: 0, color: '#4a3b69' }}>Все наши подопечные отдаются с ненавязчивым отслеживанием их судьбы. Мы всегда рады фотографиям и новостям!</p>
          </div>
        </div>

        <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid #f7fafc' }}>
          <Link href="/" style={{ color: '#6b46c1', textDecoration: 'none', fontWeight: '500' }}>
            ← Вернуться на главную
          </Link>
        </div>

      </div>
    </div>
  );
}