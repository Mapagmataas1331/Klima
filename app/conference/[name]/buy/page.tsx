"use client";

import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { BackButton } from "@/components/back-btn";

export default function BuyTicketPage() {
  const { name } = useParams();

  return (
    <main className="min-h-screen p-6 md:p-12">
      <BackButton />
      <section className="max-w-2xl mx-auto space-y-8">
        <h1 className="text-3xl md:text-5xl font-bold text-center">
          Покупка билета на конференцию {name}
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
