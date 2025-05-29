"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export function BackButton() {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.back()}
      variant="ghost"
      size="icon"
      className="absolute top-4 left-4 z-50 rounded-full shadow-md hover:bg-muted transition"
    >
      <ArrowLeft className="w-5 h-5" />
      <span className="sr-only">Назад</span>
    </Button>
  );
}
