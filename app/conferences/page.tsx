import { ConferenceCard } from "@/components/conference-card";
import { BackButton } from "@/components/back-btn";
import { sortedConferences } from "@/lib/data";

export default function ConferencesPage() {
  return (
    <main className="min-h-screen p-6 md:p-12">
      <BackButton />
      <section className="max-w-5xl mx-auto space-y-8">
        <h1 className="text-2xl md:text-4xl font-bold text-center">Все конференции</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-center">
          {sortedConferences.map((conf) => (
            <div key={conf.slug} className="animate-fade-down flex w-full justify-center">
              <ConferenceCard key={conf.slug} c={conf} />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
