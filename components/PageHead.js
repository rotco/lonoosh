import Image from "next/image";

export default function PageHead() {
  return (
    <div className="alona-banner">
      <Image
        src="/assets/images/alona_games_logo_320.jpg"
        width={200}
        height={217}
      ></Image>
    </div>
  );
}
