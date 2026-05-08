import Image from "next/image";
import TagList from "@/components/tagList/TagList";

export default function HaircutDetail({ haircut }) {
  return (
    <main className="detail-page">
      <h1>{haircut.name}</h1>

      <div className="detail-summary">
        <Image
          className="detail-img"
          src={haircut.image}
          alt={haircut.name}
          width={500}
          height={500}
        />
        <TagList tags={haircut.tags} />
      </div>

      <p>{haircut.description}</p>
    </main>
  );
}
