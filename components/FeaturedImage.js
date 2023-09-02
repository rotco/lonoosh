import { useState, useEffect, useCallback } from "react";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import IconButton from "@mui/material/IconButton";
import Image from "next/image";
import SayName from "./SayName";
export default function FeaturedImage({ hero, game }) {
  const [runSayName, setRunSayName] = useState(false);
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
      {hero.audioFile && (
        <IconButton
          onClick={() => setRunSayName(true)}
          style={{
            position: "absolute",
          }}
        >
          <RecordVoiceOverIcon
            style={{
              fontSize: "50px",
              color: "#af1f1f",
              variant: "outlined",
            }}
          />
        </IconButton>
      )}
      <img
        src={hero.imageurl}
        alt="hero"
        style={{
          maxWidth: "400px", // Set the maximum width to 100% of its container
          height: "auto", // Allow the height to adjust proportionally based on width
        }}
      />
      {runSayName && (
        <SayName
          audioFile={hero.audioFile}
          runSayName={runSayName}
          setRunSayName={setRunSayName}
        />
      )}
    </div>
  );
}
