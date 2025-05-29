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
      <CardContent className="p-6 space-y-4">
        <h2 className="text-xl font-semibold">{c.title}</h2>
        <Image
          src={c.image ? c.image : "/images/conference-placeholder.png"}
          alt={c.title + " image"}
          width={800}
          height={600}
          className="w-full h-auto rounded-xl"
        />
        <h2 className="text-md text-muted-foreground">{c.subTitle}</h2>
        <p className="text-sm font-medium">{c.description}</p>
        <p className="text-md text-muted-foreground mb-6">
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
