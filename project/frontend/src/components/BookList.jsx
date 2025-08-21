import BookItem from "./BookItem";

export default function BookList({ books, editMap, onEditHandlers }) {
  return (
    <ul style={{ listStyle: "none", padding: 0, display: "grid", gap: 12 }}>
      {books.map((n) => {
        const editing = !!editMap[n.id];
        const draft = editMap[n.id] || {};

        return (
          <BookItem
            key={n.id}
            book={n}
            editing={editing}
            draft={draft}
            onStartEdit={() => onEditHandlers.startEdit(n)}
            onCancel={() => onEditHandlers.cancelEdit(n.id)}
            onSave={() => onEditHandlers.saveEdit(n.id)}
            onDelete={() => onEditHandlers.remove(n.id)}
            onChange={(field, value) =>
              onEditHandlers.updateEdit(n.id, field, value)
            }
          />
        );
      })}
    </ul>
  );
}
