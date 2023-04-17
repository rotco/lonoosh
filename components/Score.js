import { useContext } from "react";
import AppContext from "./AppContext";

export default function Score() {
  const context = useContext(AppContext);
  return (
    <div className="score">
      <p>Score: {context.scoreContext}</p>
    </div>
  );
}
