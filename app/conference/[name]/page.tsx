"use client";

import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { conferences } from "@/lib/data";

export default function ConferenceDetailPage() {
  const { name } = useParams();

  if (!name) {
    return null;
  } else if (!conferences[name.toString()]) {
    return (
      <main className="min-h-screen p-6 md:p-12">
        <section className="max-w-2xl mx-auto space-y-8">
          <h1 className="text-3xl md:text-5xl font-bold text-center">
            Конференция <p className="text-muted-foreground">{name.toString()}</p> не найдена
          </h1>
        </section>
      </main>
    );
  }
  const conference = conferences[name.toString()];

  return (
    <main className="min-h-screen p-6 md:p-12">
      <section className="max-w-4xl mx-auto space-y-10">
        <div className="space-y-2 flex flex-col">
          <h1 className="text-2xl md:text-4xl font-bold self-center">{conference.title}</h1>
          <img
            src={conference.image}
            alt={conference.title + " image"}
            className="w-full max-w-2xl self-center my-4"
          />
          <div className="flex flex-col md:flex-row md:justify-between">
            <p className="text-sm">
              {conference.location} ·{" "}
              {conference.date
                ? conference.dateValue.getDate() + " " + conference.monthNameGenitive
                : conference.monthName.charAt(0).toUpperCase() + conference.monthName.slice(1)}
            </p>
            <p className="text-sm">
              {conference.date} {conference.timeStart && " · " + conference.timeStart}{" "}
              {conference.address && " · " + conference.address}
            </p>
          </div>
        </div>

        <p className="text-lg">{conference.description}</p>

        {/* <section className="space-y-3">
          <h2 className="text-2xl font-semibold">Программа</h2>
          <ul className="list-disc list-inside space-y-1">
            {conference.program.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">Спикеры</h2>
          <ul className="space-y-2">
            {conference.speakers.map((speaker, index) => (
              <li key={index} className="border p-4 rounded-xl shadow-sm">
                <p className="font-medium">{speaker.name}</p>
                <p className="text-sm">{speaker.role}</p>
              </li>
            ))}
          </ul>
        </section> */}

        <div>
          <Link href={`/conference/${name}/buy`}>
            <Button>Купить билет</Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
