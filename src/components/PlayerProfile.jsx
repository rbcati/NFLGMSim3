// src/pages/PlayerProfile.jsx
import { useParams, Link, useNavigate } from "react-router-dom";
import { useLeague } from "../store/useLeague";
import StatBadge from "../components/StatBadge";

export default function PlayerProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { players, teams } = useLeague();

  const p = players.find(x => String(x.id) === String(id));
  if (!p) {
    return (
      <section className="grid gap-3">
        <h1 className="text-xl font-semibold">Player not found</h1>
        <Link className="underline" to="/players">Back to Players</Link>
      </section>
    );
  }

  const team = teams.find(t => t.id === p.teamId);

  return (
    <section className="grid gap-4">
      <div className="flex items-center gap-3">
        <button className="border rounded px-3 py-1" onClick={() => navigate(-1)}>Back</button>
        <h1 className="text-2xl font-semibold">{p.name}</h1>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white border rounded-2xl p-4 shadow-sm">
          <div className="text-sm text-slate-500">Position</div>
          <div className="text-xl font-medium">{p.pos}</div>
        </div>
        <div className="bg-white border rounded-2xl p-4 shadow-sm">
          <div className="text-sm text-slate-500">Team</div>
          <div className="text-xl font-medium">{team?.name ?? "Free Agent"}</div>
        </div>
        <div className="bg-white border rounded-2xl p-4 shadow-sm">
          <div className="text-sm text-slate-500">OVR</div>
          <div className="text-2xl font-semibold">{p.ovr}</div>
        </div>
      </div>

      <div className="bg-white border rounded-2xl p-4 shadow-sm grid grid-cols-2 sm:grid-cols-5 gap-2">
        <StatBadge label="SPD" value={p.speed} />
        <StatBadge label="ACC" value={p.accel} />
        <StatBadge label="AGI" value={p.agility} />
        <StatBadge label="STR" value={p.strength} />
        <StatBadge label="AWR" value={p.awareness} />
      </div>

      <div className="bg-white border rounded-2xl p-4 shadow-sm">
        <h2 className="font-medium mb-2">Recent Games</h2>
        <p className="text-sm text-slate-500">Wire this up to your box scores later.</p>
      </div>
    </section>
  );
}
