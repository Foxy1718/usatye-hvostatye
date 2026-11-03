import Image from "next/image";
import Link from "next/link";
import { supabase } from "../supabase";

export const dynamic = 'force-dynamic';

export default async function AllDogs() {
  const { data: dogs, error } = await supabase
    .from('dogs')
    .select('*')
    .eq('status', 'looking')
    .order('created_at', { ascending: false });

  if (error) return <div style={{ padding: '20px', color: 'red' }}>Ошибка: {error.message}</div>;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f5fb', color: '#4a3b69', fontFamily: 'system-ui, -apple-system, sans-serif', padding: '40px 16px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '32px', margin: 0, fontWeight: '700' }}>Наши собаки</h1>
          <Link href="/" style={{ color: '#6b46c1', textDecoration: 'none', fontWeight: '600' }}>← На главную</Link>
        </div>

        {dogs?.length === 0 && <p style={{ textAlign: 'center', fontSize: '18px' }}>Пока здесь никого нет.</p>}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
          {dogs?.map((dog) => (
            <div key={dog.id} style={{ backgroundColor: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column' }}>
              
              <div style={{ position: 'relative', width: '100%', height: '300px', backgroundColor: '#edf2f7' }}>
                {dog.image_url && (
  <Image 
    src={dog.image_url.split(',')[0].trim()} 
    alt={dog.name} 
    fill 
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
    quality={100} 
    style={{ objectFit: 'cover' }} 
  />
)}
              </div>

              <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <h3 style={{ fontSize: '24px', margin: '0 0 8px 0', fontWeight: '700' }}>{dog.name}</h3>
                <p style={{ color: '#718096', margin: '0 0 24px 0', fontSize: '16px' }}>{dog.sex} • {dog.age}</p>
                <Link href={`/dogs/${dog.id}`} style={{ marginTop: 'auto', display: 'block', textAlign: 'center', backgroundColor: '#f3e8ff', color: '#6b46c1', padding: '12px', borderRadius: '8px', textDecoration: 'none', fontWeight: '600', transition: 'background-color 0.2s' }}>
                  Узнать больше
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}