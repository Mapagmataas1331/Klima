"use client";

import * as React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Member } from "@/lib/types";

export function MemberCard({ m, className }: { m: Member; className?: string }) {
  return (
    <Card
      className={
        "group shadow-md hover:shadow-xl transition rounded-2xl overflow-hidden py-2 px-1.5" +
        (className ? " " + className : "")
      }
    >
      <Image
        src={m.image ? m.image : "/images/member-placeholder.png"}
        alt={m.name + " image"}
        width={600}
        height={800}
        className="w-full aspect-3/4 rounded-lg object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <CardContent className="p-0 pb-6 text-center space-y-1">
        <p className="text-lg font-medium">{m.name}</p>
        <p className="text-sm">{m.role}</p>
        <div className="space-y-1">
          {m.aboutList && (
            <ul className="list-disc list-inside space-y-1 py-2">
              {m.aboutList.map((about, index) => (
                <li key={index} className="text-sm text-muted-foreground">
                  {about}
                </li>
              ))}
            </ul>
          )}
          {m.contacts && (
            <div>
              {m.contacts.map((contact, index) => (
                <p key={index} className="text-sm text-muted-foreground">
                  {contact}
                </p>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
