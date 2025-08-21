export default function BookForm({ title, author, year, category,onChange, onSubmit }) {
  return (
    <form onSubmit={onSubmit} style={{ border: "1px solid #ddd", padding: 12, borderRadius: 8, marginBottom: 16 }}>
      <h3>Create a book</h3>
      <div style={{ display: "grid", gap: 8 }}>
        <input
          required
          maxLength={120}
          placeholder="Title"
          value={title}
          onChange={(e) => onChange("title", e.target.value)}
        />
        <input
          required
          maxLength={120}
          placeholder="Author"
          value={author}
          onChange={(e) => onChange("author", e.target.value)}
        />
        <input
          required
          maxLength={120}
          placeholder="Year"
          value={year}
          onChange={(e) => onChange("year", e.target.value)}
        />
        <input
          required
          maxLength={120}
          placeholder="Category"
          value={category}
          onChange={(e) => onChange("category", e.target.value)}
        />

        <button type="submit">Add</button>

      </div>
    </form>
  );
}
