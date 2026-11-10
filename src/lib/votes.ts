export const VOTES_API = "https://faifa-gateway.a-alfaifi771.workers.dev/api/votes";
export type VoteSnapshot = { counts: Record<string, number>; choice: string | null };
export function getVoterId(): string {
  const key = "faifa-voter-id-v1";
  try {
    let id = localStorage.getItem(key);
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem(key, id);
    }
    return id;
  } catch { return ""; }
}
