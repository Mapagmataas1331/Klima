import { team } from "@/lib/data";
import { MemberCard } from "@/components/member-card";
import { BackButton } from "@/components/back-btn";

export default function TeamPage() {
  return (
    <main className="min-h-screen p-6 md:p-12">
      <BackButton />
      <section className="max-w-5xl mx-auto space-y-8">
        <h1 className="text-2xl md:text-4xl font-bold text-center">Наша команда</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.values(team).map((member, index) => (
            <MemberCard key={index} m={member} className="animate-fade-down" />
          ))}
        </div>
      </section>
    </main>
  );
}
