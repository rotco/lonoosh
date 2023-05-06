import ReactHowler from "react-howler";

export default function SayName({ audioFile, setRunSayName, sayName }) {
  return (
    <ReactHowler
      src={`https://lonoosh.s3.amazonaws.com/audio/${audioFile}`}
      playing={sayName}
      onEnd={() => {
        setRunSayName(false);
      }}
    />
  );
}
