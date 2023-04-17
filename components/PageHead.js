import Image from "next/image";

export default function PageHead({ width, height }) {
  return (
    <div className="alona-banner">
      <Image
        src="/assets/images/alona_games_logo_320.jpg"
        width={width ? width : 200}
        height={height ? height : 217}
      ></Image>
    </div>
  );
}
