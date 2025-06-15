"use client";

import { useEffect, useState } from "react";
import { ConferenceCard } from "@/components/conference-card";
import { BackButton } from "@/components/back-btn";
import { fetchAllConferencesSorted } from "@/lib/supabase/data";
import { Loader2 } from "lucide-react";
import { EnrichedConference } from "@/lib/types";

export default function ConferencesPage() {
  const [conferences, setConferences] = useState<EnrichedConference[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const all = await fetchAllConferencesSorted();
        setConferences(all);
      } catch (error) {
        console.error("Failed to fetch conferences:", error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <main className="min-h-screen p-6 md:p-12">
      <BackButton />
      <section className="max-w-5xl mx-auto space-y-8">
        <h1 className="text-2xl md:text-4xl font-bold text-center">Все конференции</h1>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="animate-spin w-6 h-6 text-muted-foreground" />
          </div>
        ) : conferences.length === 0 ? (
          <p className="text-muted-foreground text-center py-12">Нет доступных конференций.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-center">
            {conferences.map((conf) => (
              <div key={conf.slug} className="animate-fade-down flex w-full justify-center">
                <ConferenceCard c={conf} />
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
