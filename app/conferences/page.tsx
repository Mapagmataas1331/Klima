import { ConferenceCard } from "@/components/conference-card";
import { BackButton } from "@/components/back-btn";
import { sortedConferences } from "@/lib/data";

export default function ConferencesPage() {
  return (
    <main className="min-h-screen p-6 md:p-12">
      <BackButton />
      <section className="max-w-5xl mx-auto space-y-8">
        <h1 className="text-3xl md:text-5xl font-bold text-center">Все конференции</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sortedConferences.map((conf) => (
            <ConferenceCard key={conf.slug} c={conf} className="animate-fade-down" />
          ))}
        </div>
      </section>
    </main>
  );
}
