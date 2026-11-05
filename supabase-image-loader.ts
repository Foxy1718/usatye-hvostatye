export default function supabaseLoader({ src, width, quality }: { src: string, width: number, quality?: number }) {
  // Ваш URL проекта Supabase
  const projectUrl = "https://cbkdglqdlhvasuryxgtq.supabase.co"
  
  // Мы не трогаем локальные картинки (логотип), только те, что из Supabase
  if (!src.includes("supabase.co")) {
    return src;
  }

  // Берем путь к картинке после /public/
  const path = src.split('/public/')[1];
  
  // Возвращаем ссылку на трансформацию, но с жестким кэшем и лимитами
  return `${projectUrl}/storage/v1/render/image/public/${path}?width=${width}&quality=${quality || 75}`;
}