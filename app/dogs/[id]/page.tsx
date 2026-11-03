import Image from "next/image";
import Link from "next/link";
import { supabase } from "../../supabase";
import { notFound } from "next/navigation";

export const dynamic = 'force-dynamic';

export default async function DogPage({ params }: { params: { id: string } }) {
  const { data: dog, error } = await supabase.from('dogs').select('*').eq('id', params.id).single();

  if (error || !dog) notFound();

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f5fb', color: '#4a3b69', fontFamily: 'system-ui, -apple-system, sans-serif', padding: '40px 16px' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        
        <Link href="/dogs" style={{ color: '#6b46c1', textDecoration: 'none', fontWeight: '600', display: 'inline-block', marginBottom: '24px' }}>← Назад к списку</Link>

        <div style={{ backgroundColor: 'white', borderRadius: '24px', overflow: 'hidden', display: 'flex', flexWrap: 'wrap', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
          
          <div style={{ width: '100%', maxWidth: '50%', minHeight: '400px', position: 'relative', backgroundColor: '#edf2f7' }}>
            {dog.image_url && <Image src={dog.image_url} alt={dog.name} fill style={{ objectFit: 'cover' }} />}
          </div>

          <div style={{ width: '100%', maxWidth: '50%', padding: '40px', display: 'flex', flexDirection: 'column', boxSizing: 'border-box' }}>
            <h1 style={{ fontSize: '40px', margin: '0 0 16px 0', fontWeight: '700' }}>{dog.name}</h1>
            
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '32px' }}>
              <span style={{ backgroundColor: '#f3e8ff', color: '#6b46c1', padding: '6px 16px', borderRadius: '9999px', fontSize: '15px', fontWeight: '600' }}>{dog.sex}</span>
              <span style={{ backgroundColor: '#f3e8ff', color: '#6b46c1', padding: '6px 16px', borderRadius: '9999px', fontSize: '15px', fontWeight: '600' }}>{dog.age}</span>
              {dog.height && <span style={{ backgroundColor: '#f3e8ff', color: '#6b46c1', padding: '6px 16px', borderRadius: '9999px', fontSize: '15px', fontWeight: '600' }}>Рост: {dog.height}</span>}
            </div>

            <h3 style={{ margin: '0 0 12px 0', fontSize: '20px', fontWeight: '600' }}>Обо мне</h3>
            <p style={{ lineHeight: '1.7', marginBottom: '32px', fontSize: '17px', whiteSpace: 'pre-line' }}>{dog.description}</p>

            <div style={{ marginTop: 'auto', paddingTop: '24px', borderTop: '1px solid #e9d8fd' }}>
              <p style={{ fontWeight: '600', textAlign: 'center', marginBottom: '16px', fontSize: '18px' }}>Хочу домой! Свяжитесь с нами:</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <a href="https://t.me/ВАШ_НИК" target="_blank" style={{ backgroundColor: '#229ED9', color: 'white', padding: '16px', borderRadius: '8px', textDecoration: 'none', textAlign: 'center', fontWeight: '600', fontSize: '16px' }}>Написать в Telegram</a>
                <a href="https://wa.me/79000000000" target="_blank" style={{ backgroundColor: '#25D366', color: 'white', padding: '16px', borderRadius: '8px', textDecoration: 'none', textAlign: 'center', fontWeight: '600', fontSize: '16px' }}>Написать в WhatsApp</a>
                <a href="mailto:pochta@example.com" style={{ backgroundColor: '#edf2f7', color: '#4a5568', padding: '16px', borderRadius: '8px', textDecoration: 'none', textAlign: 'center', fontWeight: '600', fontSize: '16px' }}>Написать на почту</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}