import Row from "./Row";

export default function GameBoard({ solution, currentGuess, pastGuesses }) {
  return (
    <div className="board">
      {Array.from({ length: 6 }).map((_, i) => {
        if (i < pastGuesses.length) {
          return (
            <Row key={i} guess={pastGuesses[i]} solution={solution} submitted />
          );
        }
        if (i === pastGuesses.length) {
          return (
            <Row
              key={i}
              guess={currentGuess}
              solution={solution}
              submitted={false}
            />
          );
        }
        return <Row key={i} guess="" solution={solution} submitted={false} />;
      })}
    </div>
  );
}