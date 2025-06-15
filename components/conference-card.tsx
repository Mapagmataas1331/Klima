"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { EnrichedConference as Conference } from "@/lib/types";

export function ConferenceCard({ c, className }: { c: Conference; className?: string }) {
  const isPast = c.dateValue.getTime() < new Date().getTime();

  return (
    <Card
      className={
        "shadow-xl rounded-2xl text-left max-w-md w-full m-4 hover:scale-[102.5%] transition-transform duration-300 " +
        (className ?? "")
      }
    >
      <CardContent className="p-4 sm:p-6 space-y-4">
        <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden">
          <Image
            src={c.image || "/images/conference-placeholder.png"}
            alt={`${c.title} image`}
            fill
            className="object-cover rounded-xl"
          />
          {isPast && (
            <div className="absolute top-2 right-2 bg-black/60 text-white text-xs sm:text-sm px-2 py-1 rounded-full font-semibold shadow-lg">
              Завершена
            </div>
          )}
        </div>

        <div className="space-y-1">
          <h2 className="text-lg sm:text-xl font-semibold">{c.title}</h2>
          {c.sub_title && <h3 className="text-sm text-muted-foreground">{c.sub_title}</h3>}
        </div>

        {c.description && (
          <p className="text-sm text-muted-foreground line-clamp-3">{c.description}</p>
        )}

        <p className="text-sm text-muted-foreground">
          {c.location} ·{" "}
          {c.day
            ? `${c.dateValue.getDate()} ${c.monthNameGenitive}`
            : c.month
            ? `${c.monthName.charAt(0).toUpperCase()}${c.monthName.slice(1)}`
            : c.year
            ? c.year
            : ""}
        </p>

        <div className="pt-2">
          <Link href={`/conference/${c.slug}`}>
            <Button className="w-full sm:w-auto">Подробнее</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
