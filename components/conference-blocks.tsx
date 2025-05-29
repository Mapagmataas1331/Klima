import Image from "next/image";

export function ConferenceTextBlock({ text }: { text: string }) {
  return <p className="text-lg leading-relaxed">{text}</p>;
}

export function ConferenceWithImgBlock({
  text,
  image,
  imagePosition = "right",
}: {
  text: string;
  image: string;
  imagePosition?: "left" | "right";
}) {
  const img = (
    <Image
      src={image}
      alt="Conference image"
      width={400}
      height={300}
      className="rounded-xl shadow-md"
    />
  );
  return (
    <div className="flex flex-col md:flex-row items-center gap-6 my-6">
      {imagePosition === "left" && img}
      <p className="flex-1 text-lg leading-relaxed">{text}</p>
      {imagePosition === "right" && img}
    </div>
  );
}

export function ConferenceListBlock({ title, items }: { title?: string; items: string[] }) {
  return (
    <div className="space-y-2">
      {title && <h3 className="text-xl font-semibold">{title}</h3>}
      <ul className="list-disc list-inside space-y-1 text-base">
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
