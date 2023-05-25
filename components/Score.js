import { useContext } from "react";
import AppContext from "./AppContext";
import ProgressBar from "react-bootstrap/ProgressBar";

export default function Score() {
  const context = useContext(AppContext);
  // context.scoreContext * 10
  return (
    <div className="_score">
      <ProgressBar
        now={context.scoreContext * 10}
        label={`${context.scoreContext * 10}%`}
        variant="success"
        animated
      />
    </div>
  );
}
