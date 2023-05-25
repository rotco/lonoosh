import { useContext, useState, useEffect } from "react";
import AppContext from "./AppContext";
import ProgressBar from "react-bootstrap/ProgressBar";

export default function Score() {
  const context = useContext(AppContext);
  const [progressColor, setProgressColor] = useState("danger");
  useEffect(() => {
    if (context.scoreContext <= 3) {
      setProgressColor("danger");
    } else if (context.scoreContext > 3 && context.scoreContext <= 6) {
      setProgressColor("warning");
    } else if (context.scoreContext > 6 && context.scoreContext <= 8) {
      setProgressColor("info");
    } else if (context.scoreContext > 8 && context.scoreContext <= 10) {
      setProgressColor("success");
    }
  }, [context.scoreContext]);

  return (
    <div className="_score">
      <div className="scoreLabel">ניקוד</div>
      <div>
        <ProgressBar
          now={Math.max(context.scoreContext * 10, 8)}
          label={`${context.scoreContext * 10}%`}
          variant={progressColor}
          animated
          style={{
            height: "50px",
          }}
        />
      </div>
    </div>
  );
}
