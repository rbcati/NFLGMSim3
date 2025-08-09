// src/components/PlayerRowDetail.jsx
import StatBadge from "./StatBadge";
export default function PlayerRowDetail({ p }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 p-3 bg-slate-50 rounded-lg">
      <StatBadge label="SPD" value={p.speed} />
      <StatBadge label="ACC" value={p.accel} />
      <StatBadge label="AGI" value={p.agility} />
      <StatBadge label="STR" value={p.strength} />
      <StatBadge label="AWR" value={p.awareness} />
    </div>
  );
}
