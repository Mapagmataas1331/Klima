"use client";

import { fetchTeamMembers } from "@/lib/supabase/data";
import { MemberCard } from "@/components/member-card";
import { BackButton } from "@/components/back-btn";
import { useEffect, useState } from "react";
import { TeamMember } from "@/lib/types";
import { Loader2 } from "lucide-react";

export default function TeamPage() {
  const [loading, setLoading] = useState(true);
  const [teamMembers, setTeamMembers] = useState<TeamMember[] | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const teamMembers = await fetchTeamMembers();
        setTeamMembers(teamMembers);
      } catch (error) {
        console.error("Failed to load team members:", error);
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
        <h1 className="text-2xl md:text-4xl font-bold text-center">Наша команда</h1>

        {loading ? (
          <div className="flex justify-center items-center">
            <Loader2 className="animate-spin" />
          </div>
        ) : teamMembers ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.values(teamMembers || {}).map((member, index) => (
              <MemberCard key={index} m={member} className="animate-fade-down" />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-center">Нет членов команды</p>
        )}
      </section>
    </main>
  );
}
