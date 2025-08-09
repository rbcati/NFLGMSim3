// src/components/StatBadge.jsx
export default function StatBadge({ label, value }) {
  const color = value >= 90 ? "bg-emerald-100 border-emerald-300"
    : value >= 80 ? "bg-green-100 border-green-300"
    : value >= 70 ? "bg-amber-100 border-amber-300"
    : value >= 60 ? "bg-orange-100 border-orange-300"
    : "bg-red-100 border-red-300";
  return (
    <div className={`inline-flex items-center gap-1 px-2 py-1 rounded border text-xs ${color}`}>
      <span className="font-semibold">{label}</span>
      <span>{value}</span>
    </div>
  );
}
