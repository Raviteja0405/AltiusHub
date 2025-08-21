import { useEffect, useMemo, useState } from "react";
import api from "../api";
import { useDebounce } from "../hooks/useDebounce";

import Filters from "../components/Filters";
import BookForm from "../components/BookForm";
import BookList from "../components/BookList";


export default function BooksPage() {
  // Filters
  const [q, setQ] = useState("");
  const [ordering, setOrdering] = useState("-created_at");
  const debouncedQ = useDebounce(q, 300);

  // Notes state
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  // Form state
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");
  const [category, setCategory] = useState("");

  // Edit map
  const [editMap, setEditMap] = useState({});

  const queryParams = useMemo(() => {
    const p = new URLSearchParams();
    if (debouncedQ) p.set("q", debouncedQ);
    if (ordering) p.set("ordering", ordering);
    return p.toString();
  }, [debouncedQ, ordering]);

  useEffect(() => {
    fetchNotes();
  }, [ queryParams ]);

  async function fetchNotes() {
    try {
      setLoading(true);
      setErr("");
      const res = await api.get(`?${queryParams}`);
      setBooks(res.data);
    } catch {
      setErr("Failed to load notes.");
    } finally {
      setLoading(false);
    }
  }

  async function handleCreate(e) {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      await api.post("create", { title, author, year, category });
      setTitle("");
      setAuthor("");
      setYear("");
      setCategory("");
      fetchNotes();
    } catch {
      alert("Create failed. Check validation.");
    }
  }

  // Inline edit handlers
  const editHandlers = {
    startEdit: (book) => {
      setEditMap((m) => ({ ...m, [book.id]: { title: book.title, year: book.year, author: book.author, category: book.category } }));
    },
    cancelEdit: (id) => {
      setEditMap((m) => {
        const copy = { ...m };
        delete copy[id];
        return copy;
      });
    },
    saveEdit: async (id) => {
      const changes = editMap[id];
      if (!changes) return;
      try {
        await api.patch(`${id}/`, changes);
        editHandlers.cancelEdit(id);
        fetchNotes();
      } catch {
        alert("Update failed.");
      }
    },
    remove: async (id) => {
      if (!confirm("Delete this note?")) return;
      try {
        await api.delete(`${id}/`);
        fetchNotes();
      } catch {
        alert("Delete failed.");
      }
    },
    updateEdit: (id, field, value) => {
      setEditMap((m) => ({
        ...m,
        [id]: {
          ...m[id],
          [field]: value,
        },
      }));
    },
  };

  return (
    <div style={{ maxWidth: 840, margin: "0 auto", padding: 16 }}>
      <h1>Books</h1>

      <Filters
        q={q}
        ordering={ordering}
        onChange={(field, value) => {
          if (field === "q") setQ(value);
          if (field === "ordering") setOrdering(value);
        }}
      />

      <BookForm
        title={title}
        author={author}
        year={year}
        category={category}
        onChange={(field, value) => {
          if (field === "title") setTitle(value);
          if  (field === "author") setAuthor(value);
          if (field === "year") setYear(value);
          if(field === "category") setCategory(value); 
        }}
        onSubmit={handleCreate}
      />

      {loading ? (
        <p>Loading…</p>
      ) : err ? (
        <p style={{ color: "crimson" }}>{err}</p>
      ) : books.length === 0 ? (
        <p>No notes found.</p>
      ) : (
        <BookList
          notes={books}
          editMap={editMap}
          onEditHandlers={editHandlers}
        />
      )}
    </div>
  );
}
