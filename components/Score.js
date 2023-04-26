import { useContext } from "react";
import AppContext from "./AppContext";

export default function Score() {
  const context = useContext(AppContext);
  return (
    <div className="score">
      <p>ניקוד: {context.scoreContext}</p>
    </div>
  );
}
