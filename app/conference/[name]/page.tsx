"use client";

import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import {
  ConferenceTextBlock,
  ConferenceWithImgBlock,
  ConferenceListBlock,
} from "@/components/conference-blocks";
import { conferences } from "@/lib/data";
import { BackButton } from "@/components/back-btn";
import { team as teamData } from "@/lib/data";
import { MemberCard } from "@/components/member-card";

export default function ConferenceDetailPage() {
  const { name } = useParams();

  if (!name) {
    return null;
  } else if (!conferences[name.toString()]) {
    return (
      <main className="min-h-screen p-6 md:p-12">
        <BackButton />
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
      <BackButton />
      <section className="max-w-4xl mx-auto space-y-10">
        <div className="space-y-2 flex flex-col">
          <h1 className="text-2xl md:text-4xl font-bold self-center">{conference.title}</h1>
          <Image
            src={conference.image ? conference.image : "/images/conference-placeholder.png"}
            alt={conference.title + " image"}
            width={800}
            height={600}
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

        <div className="flex justify-center">
          <Link href={`/conference/${name}/buy`}>
            <Button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:brightness-110 shadow-lg px-8">
              Купить билет
            </Button>
          </Link>
        </div>

        {conference.content?.map((block, index) => {
          switch (block.type) {
            case "text":
              if (!block.text) {
                return null;
              }
              return <ConferenceTextBlock key={index} text={block.text} />;
            case "withImg":
              if (!block.text || !block.image || !block.imagePosition) {
                return null;
              }
              return (
                <ConferenceWithImgBlock
                  key={index}
                  text={block.text}
                  image={block.image}
                  imagePosition={block.imagePosition}
                />
              );
            case "list":
              if (!block.title || !block.items) {
                return null;
              }
              return (
                <ConferenceListBlock key={index} title={block.title} items={block.items} />
              );
            default:
              return null;
          }
        })}

        {conference.team && conference.team.length > 0 && (
          <section className="pt-8 border-t border-border space-y-6">
            <h2 className="text-2xl font-bold text-center">Организаторы и команда</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {conference.team.map((item, index) => {
                if (!teamData[item.member]) return null;
                const member = teamData[item.member];
                if (!member) return null;
                return (
                  <div key={index}>
                    <MemberCard m={member} />
                    {item.roleHere && (
                      <p className="text-sm text-center text-muted-foreground mt-1">
                        {item.roleHere}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </section>
    </main>
  );
}
