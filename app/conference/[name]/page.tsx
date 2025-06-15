"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import {
  ConferenceTextBlock,
  ConferenceWithImgBlock,
  ConferenceListBlock,
} from "@/components/conference-blocks";
import { BackButton } from "@/components/back-btn";
import { MemberCard } from "@/components/member-card";
import { EnrichedConference, TeamMember } from "@/lib/types";
import { fetchConferenceBySlug, fetchConferenceMembers } from "@/lib/supabase/data";

export default function ConferenceDetailPage() {
  const { name } = useParams();
  const [conference, setConference] = useState<EnrichedConference | null>(null);
  const [team, setTeam] = useState<{ team_member: TeamMember; role_in_conference?: string }[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!name) return;

    const loadConference = async () => {
      setLoading(true);
      try {
        const conf = await fetchConferenceBySlug(name.toString());
        if (!conf) {
          setNotFound(true);
          return;
        }
        setConference(conf);

        const members = await fetchConferenceMembers(conf.id);
        setTeam(members);
      } catch (err) {
        console.error(err);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    loadConference();
  }, [name]);

  if (loading) {
    return (
      <main className="min-h-screen p-6 md:p-12 flex items-center justify-center">
        <p className="text-muted-foreground">Загрузка...</p>
      </main>
    );
  }

  if (notFound || !conference) {
    return (
      <main className="min-h-screen p-6 md:p-12">
        <BackButton />
        <section className="max-w-2xl mx-auto space-y-8">
          <h1 className="text-2xl md:text-4xl font-bold text-center">
            Конференция <p className="text-muted-foreground">{name?.toString()}</p> не найдена
          </h1>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-6 md:p-12">
      <BackButton />
      <section className="max-w-4xl mx-auto space-y-6 md:space-y-10">
        <div className="space-y-2 flex flex-col">
          <h1 className="text-2xl md:text-4xl font-bold self-center indent-8 md:indent-0">
            {conference.title}
          </h1>
          <Image
            src={conference.image || "/images/conference-placeholder.png"}
            alt={conference.title + " image"}
            width={800}
            height={600}
            className="w-full max-w-2xl self-center my-4"
          />
          <div className="flex flex-col md:flex-row md:justify-between text-sm">
            <p>
              {conference.location} ·{" "}
              {conference.day
                ? `${conference.dateValue.getDate()} ${conference.monthNameGenitive}`
                : conference.month
                ? `${conference.monthName.charAt(0).toUpperCase()}${conference.monthName.slice(
                    1
                  )}`
                : conference.year
                ? conference.year
                : ""}
            </p>
            <p>
              {conference.time && `· ${conference.time}`}{" "}
              {conference.address && `· ${conference.address}`}
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          {conference.isPast ? (
            <p className="font-bold text-lg sm:text-xl text-center">Конференция завершена!</p>
          ) : (
            <Link href={`/conference/${conference.slug}/buy`}>
              <Button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:brightness-110 shadow-lg px-8">
                Купить билет
              </Button>
            </Link>
          )}
        </div>

        {conference.content.map((block, index) => {
          switch (block.type) {
            case "text":
              return <ConferenceTextBlock key={index} text={block.text} />;
            case "withImg":
              return (
                <ConferenceWithImgBlock
                  key={index}
                  text={block.text}
                  image={block.image}
                  imagePosition={block.imagePosition}
                />
              );
            case "list":
              return (
                <ConferenceListBlock key={index} title={block.title} items={block.items} />
              );
            default:
              return null;
          }
        })}

        {team.length > 0 && (
          <section className="pt-8 border-t border-border space-y-6">
            <h2 className="text-2xl font-bold text-center">Организаторы и команда</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {team.map(({ team_member, role_in_conference }, index) => (
                <div key={index}>
                  {role_in_conference && (
                    <p className="text-sm sm:text-base text-center text-muted-foreground my-2 font-semibold">
                      {role_in_conference}
                    </p>
                  )}
                  <MemberCard m={team_member} />
                </div>
              ))}
            </div>
          </section>
        )}
      </section>
    </main>
  );
}
