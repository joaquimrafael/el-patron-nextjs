import Image from "next/image";
import Link from "next/link";

export default function Card({ name, image, subtitle, href }) {
  const body = (
    <>
      <Image
        className="card-img"
        src={image}
        alt={name}
        width={420}
        height={458}
      />
      <div className="card-label">
        <span className="card-title">{name}</span>
        {subtitle && <span className="card-subtitle">{subtitle}</span>}
      </div>
    </>
  );

  return (
    <li className="card">{href ? <Link href={href}>{body}</Link> : body}</li>
  );
}
