import DogGallery from "./DogGallery";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "../../supabase";
import { notFound } from "next/navigation";

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const { data: dog } = await supabase.from('dogs').select('name, sex, age, description').eq('id', resolvedParams.id).single();
  
  if (!dog) return { title: "Собака не найдена" };

  return {
    title: `${dog.name} — ${dog.sex}, ${dog.age} | Взять из приюта «Печатники»`,
    description: `Собака ${dog.name} ищет дом. ${dog.description?.slice(0, 150)}...`,
  };
}

export default async function DogPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const { data: dog, error } = await supabase.from('dogs').select('*').eq('id', resolvedParams.id).single();

  if (error || !dog) notFound();

  // Умное склонение имени
  let titleName = dog.name;
  const lowerName = titleName.toLowerCase();
  
  if (lowerName.endsWith('и') || lowerName.endsWith('у') || lowerName.endsWith('ю') || lowerName.endsWith('э') || lowerName.endsWith('о')) {
    titleName = titleName;
  } 
  else if (lowerName.endsWith('а') || lowerName.endsWith('я')) {
    titleName = titleName.slice(0, -1) + 'е';
  } 
  else {
    titleName = titleName + 'е';
  }

  const photos = dog.image_url ? dog.image_url.split(',').map((url: string) => url.trim()) : [];

  // Структурированные данные (Schema.org) для красивой карточки в поиске
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": dog.name,
    "image": photos[0],
    "description": dog.description,
    "brand": {
      "@type": "Brand",
      "name": "Приют «Печатники»"
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "RUB",
      "url": `https://usatye-hvostatye.layero.app/dogs/${dog.id}`
    }
  };
  
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f5fb', color: '#4a3b69', fontFamily: 'system-ui, -apple-system, sans-serif', padding: '40px 16px' }}>
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        
        <Link href="/dogs" style={{ color: '#6b46c1', textDecoration: 'none', fontWeight: '600', display: 'inline-block', marginBottom: '24px' }}>← Назад к списку</Link>

        {/* Карточка собаки */}
        <div className="dog-card" style={{ backgroundColor: 'white', borderRadius: '24px', overflow: 'hidden', display: 'flex', flexWrap: 'wrap', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', marginBottom: '24px' }}>
          
          <div style={{ width: '100%', maxWidth: '50%', padding: '20px', boxSizing: 'border-box', backgroundColor: '#fcfcfc' }}>
  <DogGallery photos={photos} dogName={dog.name} />
          </div>

          {/* Правая колонка с текстом */}
          <div style={{ width: '100%', maxWidth: '50%', padding: '40px', display: 'flex', flexDirection: 'column', boxSizing: 'border-box' }}>
            <h1 style={{ fontSize: '40px', margin: '0 0 16px 0', fontWeight: '700' }}>{dog.name}</h1>
            
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '32px' }}>
              <span style={{ backgroundColor: '#f3e8ff', color: '#6b46c1', padding: '6px 16px', borderRadius: '9999px', fontSize: '15px', fontWeight: '600' }}>{dog.sex}</span>
              <span style={{ backgroundColor: '#f3e8ff', color: '#6b46c1', padding: '6px 16px', borderRadius: '9999px', fontSize: '15px', fontWeight: '600' }}>{dog.age}</span>
              {dog.height && <span style={{ backgroundColor: '#f3e8ff', color: '#6b46c1', padding: '6px 16px', borderRadius: '9999px', fontSize: '15px', fontWeight: '600' }}>Рост: {dog.height}</span>}
            </div>

            <h3 style={{ margin: '0 0 12px 0', fontSize: '20px', fontWeight: '600' }}>
              {['а', 'о', 'у', 'э', 'и'].includes(dog.name[0].toLowerCase()) ? `Об ${titleName}` : `О ${titleName}`}
            </h3>
           
            <p style={{ lineHeight: '1.7', marginBottom: '32px', fontSize: '17px', whiteSpace: 'pre-line' }}>{dog.description}</p>

            <div style={{ marginTop: 'auto', paddingTop: '24px', borderTop: '1px solid #e9d8fd' }}>
              <p style={{ fontWeight: '600', textAlign: 'center', marginBottom: '16px', fontSize: '18px' }}>Контакты:</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <a href="https://t.me/Foxy_L17" target="_blank" style={{ backgroundColor: '#229ED9', color: 'white', padding: '16px', borderRadius: '8px', textDecoration: 'none', textAlign: 'center', fontWeight: '600', fontSize: '16px' }}>Telegram</a>
                <a href="https://wa.me/79775987050" target="_blank" style={{ backgroundColor: '#25D366', color: 'white', padding: '16px', borderRadius: '8px', textDecoration: 'none', textAlign: 'center', fontWeight: '600', fontSize: '16px' }}>WhatsApp</a>
                <p style={{ textAlign: 'center', marginTop: '10px', color: '#4a5568', fontSize: '16px' }}>
                  <strong>Elizavetastep13@mail.ru</strong>
                </p>
                <p style={{ textAlign: 'center', marginTop: '2px', color: '#4a5568', fontSize: '16px' }}>
                  <strong>+79775987050</strong>
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}