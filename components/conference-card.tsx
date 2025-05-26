"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { type Conference } from "@/lib/data";

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
        <img src={c.image} alt={c.title + " image"} className="w-full" />
        <h2 className="text-md text-muted-foreground">{c.subTitle}</h2>
        <p className="text-sm font-medium">{c.shortDescription}</p>
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
