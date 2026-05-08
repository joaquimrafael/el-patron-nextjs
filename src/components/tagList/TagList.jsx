export default function TagList({ tags }) {
  return (
    <ul className="tag-list">
      {tags.map((tag) => (
        <li key={tag}>
          <button type="button" className="tag">
            {tag}
          </button>
        </li>
      ))}
    </ul>
  );
}
