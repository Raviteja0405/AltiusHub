export default function Filters({ q, ordering, onChange }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 160px 160px", gap: 8, margin: "12px 0" }}>
      <input
        placeholder="Search Books..."
        value={q}
        onChange={(e) => onChange("q", e.target.value)}
      />
      <select value={ordering} onChange={(e) => onChange("ordering", e.target.value)}>
        <option value="-created_at">Newest first</option>
        <option value="created_at">Oldest first</option>
      </select>
    </div>
  );
}
