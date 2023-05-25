import { useEffect, useState, useContext } from "react";
import Dialog from "@mui/material/Dialog";
import * as React from "react";
import Slide from "@mui/material/Slide";
import Button from "@mui/material/Button";
import AppContext from "./AppContext";
export default function WinningVideo({}) {
  const context = useContext(AppContext);
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  const [showVideoDialog, setShowVideoDialog] = useState(false);
  const videoUrls = [
    "https://www.youtube.com/embed/jWja2U2mf5s?autoplay=1",
    "https://www.youtube.com/embed/e-3sYL7vJTQ?autoplay=1",
    "https://www.youtube.com/embed/0cK2vvJcYAQ?autoplay=1",
  ];
  const [choosenVideo, setChoosenVideo] = useState(null);
  const chooseVideo = (urls) => {
    const choosen = urls[parseInt(Math.random() * urls.length)];
    console.log("choosen", choosen);
    return choosen;
  };
  useEffect(() => {
    if (context.actionContext === "inc" && context.scoreContext >= 10) {
      setChoosenVideo(chooseVideo(videoUrls));
      context.setScoreContext(0);
      setShowVideoDialog(true);
    }
  }, [context.scoreContext]);
  return (
    <div>
      <Dialog fullScreen open={showVideoDialog} onClose={() => {}}>
        <iframe
          margin="0"
          height="100%"
          src={choosenVideo}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <Button autoFocus onClick={() => setShowVideoDialog(false)}>
          Close
        </Button>
      </Dialog>
    </div>
  );
}
