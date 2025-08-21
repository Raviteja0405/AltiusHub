export default function Filters({ q, priority, ordering, onChange, priorities }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 160px 160px", gap: 8, margin: "12px 0" }}>
      <input
        placeholder="Search notes..."
        value={q}
        onChange={(e) => onChange("q", e.target.value)}
      />
      <select value={priority} onChange={(e) => onChange("priority", e.target.value)}>
        <option value="">All priorities</option>
        {priorities.map((p) => (
          <option key={p} value={p}>{p}</option>
        ))}
      </select>
      <select value={ordering} onChange={(e) => onChange("ordering", e.target.value)}>
        <option value="-created_at">Newest first</option>
        <option value="created_at">Oldest first</option>
      </select>
    </div>
  );
}
