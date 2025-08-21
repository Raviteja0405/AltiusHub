export default function BookItem({ book, editing, draft, onStartEdit, onChange, onSave, onCancel, onDelete }) {
  return (
    <li style={{ border: "1px solid #eee", padding: 12, borderRadius: 8 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        {!editing ? (
          <h3 style={{ margin: 0 }}>
            {book.title} <small>({book.priority})</small>
          </h3>
        ) : (
          <input
            value={draft.title}
            onChange={(e) => onChange("title", e.target.value)}
          />
        )}
        <small>{new Date(book.created_at).toLocaleString()}</small>
      </div>

      {!editing ? (
        <p style={{ whiteSpace: "pre-wrap" }}>{book.content || <em>No content</em>}</p>
      ) : (
        <textarea
          rows={3}
          value={draft.content}
          onChange={(e) => onChange("content", e.target.value)}
        />
      )}

      <div style={{ display: "flex", gap: 8 }}>
        {!editing ? (
          <>
            <button onClick={onStartEdit}>Edit</button>
            <button onClick={onDelete}>Delete</button>
          </>
        ) : (
          <>
            <button onClick={onSave}>Save</button>
            <button onClick={onCancel}>Cancel</button>
          </>
        )}
      </div>
    </li>
  );
}
