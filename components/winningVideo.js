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
  useEffect(() => {
    console.log("actionContext", context.actionContext);
    console.log("scoreContext", context.scoreContext);
    if (context.actionContext === "inc" && context.scoreContext >= 10) {
      setShowVideoDialog(true);
      console.log("Winning!");
    }
  }, [context.scoreContext]);
  return (
    <div>
      {" "}
      <Dialog
        fullScreen
        open={showVideoDialog}
        onClose={() => {}}
        // TransitionComponent={Transition}
      >
        <iframe
          margin="0"
          height="100%"
          src="https://www.youtube.com/embed/jWja2U2mf5s?autoplay=1"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
        <Button autoFocus onClick={() => setShowVideoDialog(false)}>
          Close
        </Button>
      </Dialog>
    </div>
  );
}
