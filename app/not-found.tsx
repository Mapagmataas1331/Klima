import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">404 – Page Not Found</CardTitle>
          <CardDescription className="text-gray-600">
            Мы не можем найти страницу, которую вы ищите.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Link href="/">
            <Button variant="outline">На главную</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
