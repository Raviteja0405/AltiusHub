import { useEffect, useState } from "react";

/**
 * Small, dependency-free debounce hook to avoid chatty API calls while typing.
 * Usage: const debouncedValue = useDebounce(value, 300);
 */
export function useDebounce(value, delay = 300) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}
