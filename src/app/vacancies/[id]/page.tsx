import type { Metadata } from "next";
import { notFound } from "next/navigation";
import VacancyDetailNew from "@/components/vacancies/VacancyDetailNew";
import { getVacancyById } from "@/lib/firestore";
import type { FirestoreVacancy } from "@/types";

interface VacancyPageProps {
  params: Promise<{
    id: string;
  }>;
}

// Генерируем статические параметры для всех возможных ID вакансий
export async function generateStaticParams() {
  // Для статического экспорта создаем базовые ID
  // В реальном приложении здесь был бы запрос к базе данных
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' },
  ];
}

export async function generateMetadata({ params }: VacancyPageProps): Promise<Metadata> {
  // Используем getVacancyById для получения данных вакансии
  const resolvedParams = await params;
  const vacancy = await getVacancyById(resolvedParams.id);

  if (!vacancy) {
    return {
      title: "Вакансия не найдена | Работа Вахтой: для граждан РФ и РБ",
    };
  }

  return {
    title: `${vacancy.title} | Работа Вахтой: для граждан РФ и РБ`,
    description: vacancy.description
      ? vacancy.description.slice(0, 150) + "..."
      : "Подробная информация о вакансии",
  };
}

export default async function VacancyPage({ params }: VacancyPageProps) {
  // Получаем вакансию по ID (асинхронно)
  const resolvedParams = await params;
  const vacancy = await getVacancyById(resolvedParams.id);

  if (!vacancy) {
    notFound();
  }

  return <VacancyDetailNew vacancy={vacancy} />;
}
