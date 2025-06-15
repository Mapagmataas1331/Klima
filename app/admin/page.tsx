"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { enrichConference } from "@/lib/supabase/data";
import {
  EnrichedConference,
  TeamMember,
  ConferenceBase,
  Block,
  ConferenceTeamMember,
} from "@/lib/types";
import { BlockEditor } from "./block-editor";

import { Loader2, Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ConferenceCard } from "@/components/conference-card";
import { MemberCard } from "@/components/member-card";
import { Textarea } from "@/components/ui/textarea";

const cyrillicToLatinMap: Record<string, string> = {
  а: "a",
  б: "b",
  в: "v",
  г: "g",
  д: "d",
  е: "e",
  ё: "e",
  ж: "zh",
  з: "z",
  и: "i",
  й: "y",
  к: "k",
  л: "l",
  м: "m",
  н: "n",
  о: "o",
  п: "p",
  р: "r",
  с: "s",
  т: "t",
  у: "u",
  ф: "f",
  х: "h",
  ц: "ts",
  ч: "ch",
  ш: "sh",
  щ: "sch",
  ъ: "",
  ы: "y",
  ь: "",
  э: "e",
  ю: "yu",
  я: "ya",
};

function transliterate(text: string): string {
  return text
    .toLowerCase()
    .split("")
    .map((char) => cyrillicToLatinMap[char] || char)
    .join("");
}

const generateSlug = (text: string) =>
  transliterate(text)
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9\-]/g, "")
    .replace(/-{2,}/g, "-")
    .replace(/^-+|-+$/g, "");

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);

  const [conferences, setConferences] = useState<EnrichedConference[]>([]);
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [conferenceTeam, setConferenceTeam] = useState<ConferenceTeamMember[]>([]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editType, setEditType] = useState<"conference" | "member" | null>(null);
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [form, setForm] = useState<any>({});
  const [submitting, setSubmitting] = useState(false);

  const fetchAndEnrichData = async () => {
    setLoading(true);
    const supabase = createClient();

    const [confBlockRes, confTeamRes, confRes, teamRes] = await Promise.all([
      supabase.from("conference_blocks").select("*"),
      supabase.from("conference_team").select("*"),
      supabase.from("conferences").select("*"),
      supabase.from("team_members").select("*"),
    ]);

    const rawConfs: ConferenceBase[] = confRes.data || [];
    const enriched = rawConfs.map((c) => enrichConference(c, confBlockRes.data || []));
    setConferences(enriched);
    setTeam(teamRes.data || []);
    setConferenceTeam(confTeamRes.data || []);
    setLoading(false);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      setAuthenticated(true);
      fetchAndEnrichData();
    } else {
      alert("Wrong password");
    }
  };

  const deleteItem = async (id: string, table: "conferences" | "team_members") => {
    const supabase = createClient();
    if (table === "conferences") {
      await supabase.from("conference_blocks").delete().eq("conference_id", id).throwOnError();
      await supabase.from("conference_team").delete().eq("conference_id", id).throwOnError();
    }

    await supabase.from(table).delete().eq("id", id);
    fetchAndEnrichData();
  };

  const handleSave = async () => {
    setSubmitting(true);
    const supabase = createClient();
    const slug = generateSlug(form.title || form.name);
    const isEdit = !!form.id;
    const table = editType === "conference" ? "conferences" : "team_members";

    try {
      if (isEdit) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { blocks, teamMembers, ...safeForm } = form;
        await supabase
          .from(table)
          .update({ ...safeForm, slug })
          .eq("id", form.id);
      } else {
        const { data, error } = await supabase
          .from(table)
          .insert([{ ...form, slug }])
          .select();
        if (error) throw error;
        form.id = data?.[0]?.id;
      }

      if (editType === "conference" && form.blocks?.length > 0) {
        await supabase.from("conference_blocks").delete().eq("conference_id", form.id);
        await supabase.from("conference_blocks").insert(
          form.blocks.map((block: Block, i: number) => ({
            conference_id: form.id,
            block_order: i,
            type: block.type,
            data: block,
          }))
        );
      }

      if (editType === "conference" && form.teamMembers?.length > 0) {
        await supabase.from("conference_team").delete().eq("conference_id", form.id);
        await supabase.from("conference_team").insert(
          form.teamMembers.map((tm: string) => ({
            conference_id: form.id,
            team_member_id: tm,
          }))
        );
      }
    } catch (err: any) {
      alert("Error saving: " + err.message);
    } finally {
      setDialogOpen(false);
      setEditingItem(null);
      setForm({});
      setSubmitting(false);
      fetchAndEnrichData();
    }
  };

  const openDialog = (type: "conference" | "member", item: any = null) => {
    setEditType(type);
    setEditingItem(item);
    if (type === "conference") {
      const relatedBlocks = conferences.find((c) => c.id === item?.id)?.content || [];
      const memberIds = conferenceTeam
        .filter((ct) => ct.conference_id === item?.id)
        .map((ct) => ct.team_member_id);
      setForm({ ...item, blocks: relatedBlocks, teamMembers: memberIds });
    } else {
      setForm(item || {});
    }
    setDialogOpen(true);
  };

  if (!authenticated) {
    return (
      <form onSubmit={handleLogin} className="p-6">
        <Input
          type="password"
          placeholder="Enter admin password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" className="mt-4">
          Access Admin
        </Button>
      </form>
    );
  }

  return (
    <main className="p-6 space-y-8">
      <h1 className="text-2xl font-bold">Admin Panel</h1>
      {loading ? (
        <div className="flex justify-center">
          <Loader2 className="animate-spin w-8 h-8" />
        </div>
      ) : (
        <>
          {/* Conferences */}
          <section>
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-semibold">Conferences</h2>
              <Button onClick={() => openDialog("conference")} size="sm">
                <Plus className="w-4 h-4 mr-1" /> Add Conference
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {conferences.map((c) => (
                <div key={c.id} className="relative group">
                  <ConferenceCard c={c} />
                  <div className="absolute top-2 right-2 flex gap-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => openDialog("conference", c)}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="destructive"
                      onClick={() => deleteItem(c.id, "conferences")}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Team */}
          <section>
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-semibold">Team Members</h2>
              <Button onClick={() => openDialog("member")} size="sm">
                <Plus className="w-4 h-4 mr-1" /> Add Member
              </Button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {team.map((m) => (
                <div key={m.id} className="relative group">
                  <MemberCard m={m} />
                  <div className="absolute top-2 right-2 flex gap-2">
                    <Button size="icon" variant="ghost" onClick={() => openDialog("member", m)}>
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="destructive"
                      onClick={() => deleteItem(m.id, "team_members")}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {/* Shared Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-screen overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingItem ? `Edit ${editType}` : `Add ${editType}`}</DialogTitle>
          </DialogHeader>

          {editType === "conference" ? (
            <>
              <Input
                placeholder="Title"
                value={form.title || ""}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="mb-2"
              />
              <Input
                placeholder="Subtitle"
                value={form.sub_title || ""}
                onChange={(e) => setForm({ ...form, sub_title: e.target.value })}
                className="mb-2"
              />
              <Input
                placeholder="Location"
                value={form.location || ""}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                className="mb-2"
              />
              <div className="grid grid-cols-3 gap-2 mb-2">
                <Input
                  placeholder="Day"
                  value={form.day || ""}
                  onChange={(e) => setForm({ ...form, day: e.target.value })}
                />
                <Input
                  placeholder="Month"
                  value={form.month || ""}
                  onChange={(e) => setForm({ ...form, month: e.target.value })}
                />
                <Input
                  placeholder="Year"
                  value={form.year || ""}
                  onChange={(e) => setForm({ ...form, year: e.target.value })}
                />
              </div>
              <Textarea
                placeholder="Description"
                value={form.description || ""}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="mb-2"
              />
              <Input
                placeholder="Image URL"
                value={form.image || ""}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
                className="mb-2"
              />

              <BlockEditor
                blocks={form.blocks || []}
                onChange={(blocks) => setForm({ ...form, blocks })}
              />

              <label className="block mb-1 text-sm font-medium">Select Team Members</label>
              <select
                multiple
                value={form.teamMembers || []}
                onChange={(e) =>
                  setForm({
                    ...form,
                    teamMembers: Array.from(e.target.selectedOptions).map((opt) => opt.value),
                  })
                }
                className="w-full border rounded p-2 text-sm"
              >
                {team.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name}
                  </option>
                ))}
              </select>
            </>
          ) : (
            <>
              <Input
                placeholder="Name"
                value={form.name || ""}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="mb-2"
              />
              <Input
                placeholder="Role"
                value={form.role || ""}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                className="mb-2"
              />
              <Input
                placeholder="About (semicolon separated)"
                value={form.about_list?.join("; ") || ""}
                onChange={(e) =>
                  setForm({
                    ...form,
                    about_list: e.target.value.split(";").map((s: string) => s.trim()),
                  })
                }
                className="mb-2"
              />
              <Input
                placeholder="Contacts (semicolon separated)"
                value={form.contacts?.join("; ") || ""}
                onChange={(e) =>
                  setForm({
                    ...form,
                    contacts: e.target.value.split(";").map((s: string) => s.trim()),
                  })
                }
                className="mb-2"
              />
              <Input
                placeholder="Image URL"
                value={form.image || ""}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
              />
            </>
          )}

          <Button onClick={handleSave} className="mt-4" disabled={submitting}>
            {submitting ? "Saving..." : "Save"}
          </Button>
        </DialogContent>
      </Dialog>
    </main>
  );
}
