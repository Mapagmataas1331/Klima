import { createClient } from "./client";
import {
  EnrichedConference,
  ConferenceBase,
  Block,
  TeamMember,
  ConferenceMember,
} from "../types";

const monthNames = [
  "январь",
  "февраль",
  "март",
  "апрель",
  "май",
  "июнь",
  "июль",
  "август",
  "сентябрь",
  "октябрь",
  "ноябрь",
  "декабрь",
];

const monthNamesGenitive = [
  "января",
  "февраля",
  "марта",
  "апреля",
  "мая",
  "июня",
  "июля",
  "августа",
  "сентября",
  "октября",
  "ноября",
  "декабря",
];

function getDateValue(day?: string, month?: string, year?: string): Date {
  const y = parseInt(year ?? "");
  const m = parseInt(month ?? "") - 1;
  const d = parseInt(day ?? "");

  if (!isNaN(y)) {
    if (!isNaN(m) && !isNaN(d)) return new Date(y, m, d);
    if (!isNaN(m)) return new Date(y, m + 1, 0);
    return new Date(y, 11, 31);
  }

  return new Date("2100-01-01");
}

async function fetchRawConferences(): Promise<ConferenceBase[]> {
  const supabase = createClient();
  const { data, error } = await supabase.from("conferences").select("*");
  if (error) throw error;
  return data;
}

async function fetchBlocks(): Promise<
  { conference_id: string; block_order: number; type: string; data: any }[]
> {
  const supabase = createClient();
  const { data, error } = await supabase.from("conference_blocks").select("*");
  if (error) throw error;
  return data;
}

export function enrichConference(
  conf: ConferenceBase,
  blocks: Awaited<ReturnType<typeof fetchBlocks>>
): EnrichedConference {
  const dateValue = getDateValue(conf.day, conf.month, conf.year);
  const now = new Date();
  const monthIndex = parseInt(conf.month ?? "") - 1;

  const content: Block[] = blocks
    .filter((b) => b.conference_id === conf.id)
    .sort((a, b) => a.block_order - b.block_order)
    .map((b) => ({ ...b.data, type: b.type }));

  return {
    ...conf,
    dateValue,
    isPast: dateValue.getTime() < now.getTime(),
    content,
    monthName: monthNames[monthIndex] || "",
    monthNameGenitive: monthNamesGenitive[monthIndex] || "",
  };
}

export async function fetchAllConferencesSorted(): Promise<EnrichedConference[]> {
  const [conferences, blocks] = await Promise.all([fetchRawConferences(), fetchBlocks()]);

  return conferences
    .map((conf) => enrichConference(conf, blocks))
    .sort((a, b) => b.dateValue.getTime() - a.dateValue.getTime());
}

export async function fetchUpcomingConferences(): Promise<EnrichedConference[]> {
  const all = await fetchAllConferencesSorted();
  const now = new Date();
  return all
    .filter((c) => c.dateValue.getTime() >= now.getTime())
    .sort((a, b) => a.dateValue.getTime() - b.dateValue.getTime());
}

export async function fetchClosestConference(): Promise<EnrichedConference | null> {
  const upcoming = await fetchUpcomingConferences();
  return upcoming[0] ?? null;
}

export async function fetchConferenceBySlug(slug: string): Promise<EnrichedConference | null> {
  const supabase = createClient();

  const { data: confList, error: confErr } = await supabase
    .from("conferences")
    .select("*")
    .eq("slug", slug)
    .limit(1);

  if (confErr) throw confErr;

  const conf = confList?.[0];
  if (!conf) return null;

  const { data: blocks, error: blockErr } = await supabase
    .from("conference_blocks")
    .select("*")
    .eq("conference_id", conf.id)
    .order("block_order");

  if (blockErr) throw blockErr;

  return enrichConference(conf, blocks);
}

export async function fetchTeamMembers(): Promise<TeamMember[]> {
  const supabase = createClient();
  const { data, error } = await supabase.from("team_members").select("*");
  if (error) throw error;
  return data;
}

export async function fetchConferenceMembers(
  conferenceId: string
): Promise<ConferenceMember[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("conference_team")
    .select("role_in_conference, team_member:team_member_id(*)")
    .eq("conference_id", conferenceId);

  if (error) throw error;

  return (
    (data as unknown as {
      role_in_conference: string;
      team_member: TeamMember;
    }[]) ?? []
  );
}
