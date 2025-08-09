// src/pages/Players.jsx
import { useMemo, useState } from "react";
import { useLeague } from "../store/useLeague";
import StatBadge from "../components/StatBadge";
import { ColumnToggle } from "../components/ColumnToggle";

const POS = ["QB","RB","WR","TE","OL","DL","LB","CB","S","K","P"];

const BASE_COLS = [
  { key: "speed", label: "SPD", visible: true },
  { key: "accel", label: "ACC", visible: true },
  { key: "agility", label: "AGI", visible: true },
  { key: "strength", label: "STR", visible: true },
  { key: "awareness", label: "AWR", visible: false },
];

export default function Players() {
  const { players, teams } = useLeague();
  const [q, setQ] = useState("");
  const [pos, setPos] = useState("ALL");
  const [team, setTeam] = useState("ALL");
  const [sortKey, setSortKey] = useState("ovr");
  const [sortDir, setSortDir] = useState("desc");
  const [cols, setCols] = useState(BASE_COLS);
  const [page, setPage] = useState(1);
  const pageSize = 25;

  const colMap = useMemo(() => Object.fromEntries(cols.map(c => [c.key, c.visible])), [cols]);

  const rows = useMemo(() => {
    const nameMatch = (p) => p.name.toLowerCase().includes(q.toLowerCase());
    const posMatch = (p) => pos === "ALL" || p.pos === pos;
    const teamMatch = (p) => team === "ALL" || p.teamId === team;

    const out = players
      .filter(p => nameMatch(p) && posMatch(p) && teamMatch(p))
      .sort((a, b) => {
        const va = a[sortKey] ?? 0;
        const vb = b[sortKey] ?? 0;
        return sortDir === "asc" ? va - vb : vb - va;
      });

    return out;
  }, [players, q, pos, team, sortKey, sortDir]);

  const pageCount = Math.max(1, Math.ceil(rows.length / pageSize));
  const pageRows = rows.slice((page-1)*pageSize, page*pageSize);

  const setColumnVisible = (key, visible) => {
    setCols((prev) => prev.map(c => c.key === key ? { ...c, visible } : c));
  };

  const switchSort = (key) => {
    if (key === sortKey) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir("desc"); }
  };

  const teamName = (id) => teams.find(t => t.id === id)?.name ?? "FA";

  return (
    <section className="grid gap-4">
      <h1 className="text-2xl font-semibold">Players</h1>

      <div className="grid sm:grid-cols-4 gap-3">
        <input
          className="border rounded px-3 py-2"
          placeholder="Search name"
          value={q}
          onChange={(e) => { setQ(e.target.value); setPage(1); }}
        />
        <select className="border rounded px-3 py-2" value={pos} onChange={(e) => { setPos(e.target.value); setPage(1); }}>
          <option value="ALL">All positions</option>
          {POS.map(p => <option key={p} value={p}>{p}</option>)}
        </select>
        <select className="border rounded px-3 py-2" value={team} onChange={(e) => { setTeam(e.target.value); setPage(1); }}>
          <option value="ALL">All teams</option>
          {teams.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
        </select>
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-600">Sort</span>
          <select className="border rounded px-2 py-2" value={sortKey} onChange={(e) => setSortKey(e.target.value)}>
            <option value="ovr">OVR</option>
            <option value="speed">SPD</option>
            <option value="accel">ACC</option>
            <option value="agility">AGI</option>
            <option value="strength">STR</option>
            <option value="awareness">AWR</option>
            <option value="age">Age</option>
          </select>
          <button className="border rounded px-2 py-2" onClick={() => setSortDir(d => d === "asc" ? "desc" : "asc")}>
            {sortDir === "asc" ? "Asc" : "Desc"}
          </button>
        </div>
      </div>

      <div className="bg-white border rounded-2xl p-3 shadow-sm">
        <div className="mb-3">
          <ColumnToggle
            columns={cols}
            onChange={setColumnVisible}
          />
        </div>

        <div className="overflow-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <Th label="Name" onClick={() => switchSort("name")} />
                <Th label="Pos" />
                <Th label="Team" />
                <Th label="OVR" onClick={() => switchSort("ovr")} />
                {colMap.speed && <Th label="SPD" onClick={() => switchSort("speed")} />}
                {colMap.accel && <Th label="ACC" onClick={() => switchSort("accel")} />}
                {colMap.agility && <Th label="AGI" onClick={() => switchSort("agility")} />}
                {colMap.strength && <Th label="STR" onClick={() => switchSort("strength")} />}
                {colMap.awareness && <Th label="AWR" onClick={() => switchSort("awareness")} />}
              </tr>
            </thead>
            <tbody>
              {pageRows.map(p => (
                <tr key={p.id} className="border-b hover:bg-slate-50">
                  <td className="py-2">
                    <div className="font-medium">{p.name}</div>
                    <div className="text-xs text-slate-500">Age {p.age}</div>
                  </td>
                  <td>{p.pos}</td>
                  <td>{teamName(p.teamId)}</td>
                  <td className="font-semibold">{p.ovr}</td>
                  {colMap.speed && <td><StatBadge label="SPD" value={p.speed} /></td>}
                  {colMap.accel && <td><StatBadge label="ACC" value={p.accel} /></td>}
                  {colMap.agility && <td><StatBadge label="AGI" value={p.agility} /></td>}
                  {colMap.strength && <td><StatBadge label="STR" value={p.strength} /></td>}
                  {colMap.awareness && <td><StatBadge label="AWR" value={p.awareness} /></td>}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Pagination
          page={page}
          pageCount={pageCount}
          onPage={(n) => setPage(n)}
        />
      </div>
    </section>
  );
}

function Th({ label, onClick }) {
  return (
    <th
      className={`py-2 text-left ${onClick ? "cursor-pointer select-none" : ""}`}
      onClick={onClick}
    >
      {label}
    </th>
  );
}

function Pagination({ page, pageCount, onPage }) {
  return (
    <div className="flex items-center justify-between mt-3">
      <span className="text-sm text-slate-600">Page {page} of {pageCount}</span>
      <div className="flex gap-2">
        <button className="border rounded px-2 py-1" disabled={page<=1} onClick={() => onPage(page-1)}>Prev</button>
        <button className="border rounded px-2 py-1" disabled={page>=pageCount} onClick={() => onPage(page+1)}>Next</button>
      </div>
    </div>
  );
}
// src/pages/Players.jsx
import { Link } from "react-router-dom";

// inside <tbody>
<tr key={p.id} className="border-b hover:bg-slate-50">
  <td className="py-2">
    <div className="font-medium">
      <Link
        to={`/players/${p.id}`}
        className="underline underline-offset-2 hover:no-underline focus:outline-none focus:ring-2 focus:ring-slate-400 rounded"
      >
        {p.name}
      </Link>
    </div>
    <div className="text-xs text-slate-500">Age {p.age}</div>
  </td>
  {/* rest of cells */}
</tr>
