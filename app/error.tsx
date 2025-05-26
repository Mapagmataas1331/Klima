"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export default function RootError({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error("Unhandled error:", error);
  }, [error]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-red-50 p-4">
      <Card className="max-w-md w-full border-red-200">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-red-600">Упс! Что-то пошло не так</CardTitle>
          <CardDescription className="text-gray-700">{error.message}</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Button onClick={() => reset()} variant="default">
            Попробовать снова
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
