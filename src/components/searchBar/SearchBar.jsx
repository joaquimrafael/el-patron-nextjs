export default function SearchBar({ placeholder = "Buscar..." }) {
  return (
    <label className="search-bar">
      <span className="material-symbols-outlined">search</span>
      <input type="search" placeholder={placeholder} />
    </label>
  );
}
