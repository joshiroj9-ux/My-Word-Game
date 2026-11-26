import Tile from "./Tile";
import { evaluateGuess } from "../utils/evaluate";

export default function Row({ guess = "", solution, submitted }) {
  const statuses = submitted ? evaluateGuess(guess, solution) : [];

  return (
    <div className="row">
      {Array.from({ length: 5 }).map((_, i) => (
        <Tile
          key={i}
          index={i}
          letter={guess[i] || ""}
          status={submitted ? statuses[i] : null}
        />
      ))}
    </div>
  );
}