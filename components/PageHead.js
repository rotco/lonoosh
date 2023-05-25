import Image from "next/image";
import { useRouter } from "next/router";

export default function PageHead({ width, height }) {
  const router = useRouter();
  function handleClick() {
    router.push("/");
  }
  return (
    <div className="alona-banner" onClick={handleClick}>
      <Image
        src="/assets/images/alona_games_logo_320.jpg"
        width={width ? width : 200}
        height={height ? height : 217}
        alt="banner"
      ></Image>
    </div>
  );
}
