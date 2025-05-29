import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/icon";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { ConferenceCard } from "@/components/conference-card";
import { upcomingConferences } from "@/lib/data";
const lc = upcomingConferences[0];

export default function Home() {
  return (
    <main className="min-h-screen px-6 pt-6 pb-0 md:p-12">
      <section className="max-w-4xl mx-auto space-y-4 md:space-y-12">
        <section className="bg-muted pt-6 px-6 pb-8 rounded-xl space-y-4 flex flex-col items-center justify-center text-center md:pb-20 md:pt-16">
          <ThemeSwitcher className="absolute z-50 top-4 right-4 md:top-8 md:right-8 transition-transform duration-300 shadow-md !bg-muted hover:brightness-110" />
          <h1 className="text-2xl md:text-4xl font-bold">Конференции по Этикету</h1>
          <Icon className="max-w-3xs md:max-w-xs m-6 fill-current text-foreground/75 animate-fade-down hover:scale-[102.5%] hover:text-foreground/80 transition-transform duration-300 [&>.icon-k]:animate-float-reverse [&>.icon-k]:delay-1000 [&>.icon-e]:animate-float [&>.icon-e]:delay-1000" />
          <p className="text-lg md:text-2xl mt-2.5">
            Современный взгляд на классический этикет
          </p>
        </section>
        <section className="bg-muted py-6 px-1 sm:px-6 rounded-xl space-y-4 flex flex-col">
          <h2 className="self-center text-lg sm:place-self-start sm:text-xl font-semibold">
            Ближайшая конференция
          </h2>
          <ConferenceCard c={lc} className="animate-fade-down" />
        </section>

        <div className="text-center">
          <Link href="/conferences">
            <Button variant="outline">Смотреть все конференции</Button>
          </Link>
        </div>

        <section className="space-y-4">
          <section className="bg-muted p-6 rounded-xl space-y-4">
            <h2 className="text-xl font-semibold">О нас</h2>
            <p className="mb-6">
              Мы организуем тематические конференции, где обсуждаются современные формы этикета,
              поведение в обществе, деловое общение и культура общения в интернете.
            </p>
            <Link href="/team">
              <Button>Наша команда</Button>
            </Link>
          </section>
          <section className="bg-muted p-6 rounded-xl space-y-4">
            <h2 className="text-xl font-semibold">Что такое этикет?</h2>
            <p>
              Это не только набор свод и правил, это еще свобода и комфорт. Ведь цель этикета –
              сделать общение между людьми комфортными!
            </p>
            <p>
              Знание и соблюдение правил этикета – это позитивный имидж, эффективность деловых
              коммуникаций, экономия времени и доброжелательная атмосфера!
            </p>
            <p>
              Высокая культура общения привлекает новых клиентов и партнеров – этикет
              экономически выгоден!
            </p>
            <p className="mb-4">
              У вас никогда не будет второй возможности произвести первое впечатление!
            </p>
          </section>
          <section className="bg-muted p-6 rounded-xl space-y-4">
            <h2 className="text-xl font-semibold">Зачем участвовать?</h2>
            <ul className="my-4 ml-6 list-disc [&>li]:mt-2">
              <li>Обмен опытом и лучшими практиками</li>
              <li>Развитие профессиональных стандартов</li>
              <li>Нетворкинг и новые контакты</li>
              <li>Возможность представить свои исследования и проекты</li>
            </ul>
          </section>
          <section className="bg-muted p-6 rounded-xl space-y-4">
            <h2 className="text-xl font-semibold">Формат и структура</h2>
            <ul className="my-4 ml-6 list-disc [&>li]:mt-2">
              <li>Пленарные заседания</li>
              <li>Практические тренинги и мастер‑классы</li>
              <li>Дискуссионные панели и круглые столы</li>
              <li>Экскурсии и культурная программа</li>
            </ul>
          </section>
          <section className="bg-muted p-6 rounded-xl space-y-4 mb-8">
            <h2 className="text-xl font-semibold">Кому это интересно?</h2>
            <ul className="my-4 ml-6 list-disc [&>li]:mt-2">
              <li>Профессионалы и эксперты отрасли</li>
              <li>Преподаватели и исследователи</li>
              <li>Представители бизнеса и госструктур</li>
              <li>Все, кто хочет расширить круг знакомств и получить новые знания</li>
            </ul>
          </section>
        </section>
      </section>
    </main>
  );
}
