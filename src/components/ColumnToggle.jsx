// src/components/ColumnToggle.jsx
export function ColumnToggle({ columns, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {columns.map(c => (
        <label key={c.key} className="inline-flex items-center gap-2 text-sm border rounded px-2 py-1 bg-white">
          <input
            type="checkbox"
            checked={c.visible}
            onChange={(e) => onChange(c.key, e.target.checked)}
          />
          {c.label}
        </label>
      ))}
    </div>
  );
}
