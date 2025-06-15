"use client";

import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { fetchConferenceBySlug } from "@/lib/supabase/data";
import { BackButton } from "@/components/back-btn";
import { useEffect, useState } from "react";
import { EnrichedConference } from "@/lib/types";

export default function BuyTicketPage() {
  const { name } = useParams();
  const [conference, setConference] = useState<EnrichedConference | null>(null);
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

  if (conference.dateValue.getTime() < new Date().getTime()) {
    return (
      <main className="min-h-screen p-6 md:p-12">
        <BackButton />
        <section className="max-w-2xl mx-auto space-y-8">
          <h1 className="text-2xl md:text-4xl font-bold text-center">
            Конференция <p className="text-muted-foreground">{conference.title}</p> завершена
          </h1>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-6 md:p-12">
      <BackButton />
      <section className="max-w-2xl mx-auto space-y-8">
        <h1 className="text-3xl md:text-5xl font-bold text-center indent-8 md:indent-0">
          Покупка билета на конференцию {conference.title}
        </h1>

        <Card className="shadow-xl rounded-2xl animate-fade-down">
          <CardContent className="p-6 space-y-6">
            <div className="space-y-2">
              <Label className="text-lg">Тип билета</Label>
              <RadioGroup defaultValue="standard" className="space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="standard" id="standard" />
                  <Label htmlFor="standard">Обычный — 1 500₽</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="vip" id="vip" />
                  <Label htmlFor="vip">VIP — 4 500₽ (включает кофе-брейки и сувенир)</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="name">Имя</Label>
                <Input id="name" placeholder="Введите ваше имя" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Введите ваш email" />
              </div>
            </div>

            <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:brightness-110 shadow-lg">
              Перейти к оплате
            </Button>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
