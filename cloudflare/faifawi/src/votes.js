const categories = new Set(["hotels", "parks", "cafes"]);
const response = (body, status, headers) => new Response(JSON.stringify(body), {status, headers});
export async function handleVotes(request, env, headers) {
  if (!env.VOTES_DB) return response({error:"Voting database not configured"},503,headers);
  const url = new URL(request.url);
  const category = request.method === "GET" ? url.searchParams.get("category") : null;
  if (request.method === "GET") {
    if (!categories.has(category)) return response({error:"Invalid category"},400,headers);
    const rows = await env.VOTES_DB.prepare("SELECT place_id, COUNT(*) AS votes FROM votes WHERE category = ? GROUP BY place_id").bind(category).all();
    const counts = Object.fromEntries((rows.results || []).map(r => [r.place_id, Number(r.votes)]));
    return response({counts},200,headers);
  }
  if (request.method !== "POST") return response({error:"Method not allowed"},405,headers);
  if (Number(request.headers.get("content-length") || 0) > 2000) return response({error:"Request too large"},413,headers);
  let data;
  try { data = await request.json(); } catch { return response({error:"Invalid JSON"},400,headers); }
  const {category:cat,placeId,voterId} = data || {};
  if (!categories.has(cat) || typeof placeId !== "string" || !placeId.trim() || placeId.length > 180 || typeof voterId !== "string" || !/^[0-9a-f-]{36}$/i.test(voterId)) return response({error:"Invalid vote"},400,headers);
  await env.VOTES_DB.prepare("INSERT INTO votes(category,voter_id,place_id) VALUES(?,?,?) ON CONFLICT(category,voter_id) DO UPDATE SET place_id=excluded.place_id, updated_at=CURRENT_TIMESTAMP").bind(cat,voterId,placeId).run();
  const rows = await env.VOTES_DB.prepare("SELECT place_id, COUNT(*) AS votes FROM votes WHERE category = ? GROUP BY place_id").bind(cat).all();
  return response({counts:Object.fromEntries((rows.results||[]).map(r=>[r.place_id,Number(r.votes)])),choice:placeId},200,headers);
}
