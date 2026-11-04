import { MetadataRoute } from 'next'
import { supabase } from './supabase'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://usatye-hvostatye.vercel.app'

  // Получаем список всех собак из базы данных
  const { data: dogs } = await supabase.from('dogs').select('id, created_at')

  // Создаем страницы для каждой собаки
  const dogUrls = (dogs || []).map((dog) => ({
    url: `${baseUrl}/dogs/${dog.id}`,
    lastModified: dog.created_at ? new Date(dog.created_at) : new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Возвращаем все страницы сайта
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/dogs`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/how-to-adopt`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    ...dogUrls, // Добавляем страницы всех собак
  ]
}