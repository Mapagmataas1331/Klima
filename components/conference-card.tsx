"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { EnrichedConference as Conference } from "@/lib/types";

export function ConferenceCard({ c, className }: { c: Conference; className?: string }) {
  return (
    <Card
      className={
        "shadow-xl rounded-2xl text-center flex justify-center items-center max-w-md self-center m-4 hover:scale-[102.5%] transition-transform duration-300" +
        (className ? " " + className : "")
      }
    >
      <CardContent className="p-2 sm:p-6 space-y-4">
        <h2 className="text-lg sm:text-xl font-semibold">{c.title}</h2>
        <div className="relative w-full pb-[75%] rounded-xl">
          <Image
            src={c.image || "/images/conference-placeholder.png"}
            alt={`${c.title} image`}
            fill
            className="object-cover rounded-xl"
          />
          {c.dateValue.getTime() < new Date().getTime() && (
            <div className="absolute inset-0 flex items-end justify-end p-1.5">
              <p className="text-white/80 font-bold text-base sm:text-xl text-center drop-shadow-lg bg-black/50 rounded-xl px-4 py-1 sm:px-6 sm:py-2">
                Завершена
              </p>
            </div>
          )}
        </div>
        <h2 className="text-sm md:text-md text-muted-foreground">{c.subTitle}</h2>
        <p className="text-xs md:text-sm font-medium">{c.description}</p>
        <p className="text-sm md:text-md text-muted-foreground mb-6">
          {c.location} ·{" "}
          {c.date
            ? c.dateValue.getDate() + " " + c.monthNameGenitive
            : c.monthName.charAt(0).toUpperCase() + c.monthName.slice(1)}
        </p>
        <Link href={"conference/" + c.slug}>
          <Button>Подробнее</Button>
        </Link>
      </CardContent>
    </Card>
  );
}
