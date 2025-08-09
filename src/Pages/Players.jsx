type Player = {
  id: string
  name: string
  pos: "QB"|"RB"|"WR"|"TE"|"OL"|"DL"|"LB"|"CB"|"S"|"K"|"P"
  age: number
  teamId: string
  ovr: number
  speed: number       // 0-99
  accel: number       // 0-99
  agility: number     // 0-99
  strength: number    // 0-99
  awareness: number   // 0-99
}
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
        <
