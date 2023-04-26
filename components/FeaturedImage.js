import CampaignIcon from "@mui/icons-material/Campaign";
import IconButton from "@mui/material/IconButton";
import Image from "next/image";
export default function FeaturedImage({ hero }) {
  return (
    <div
      style={{
        // display: "flex",
        alignItems: "center",
        alignContent: "center",
        textAlign: "center",
        justifyContent: "center",
      }}
    >
      <IconButton
        onClick={() => setRunSayName(true)}
        style={{
          position: "absolute",
        }}
      >
        <CampaignIcon
          style={{
            fontSize: "50px",
            color: "#af1f1f",
            variant: "outlined",
          }}
        />
      </IconButton>
      <Image src={hero.imageurl} height={400} width={400} />
    </div>
  );
}
