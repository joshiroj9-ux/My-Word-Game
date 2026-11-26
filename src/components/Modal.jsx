export default function Modal({ status, solution, onRestart }) {
  if (status === "IN_PROGRESS") return null;
  const won = status === "WON";

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{won ? "🎉 You Won!" : "Game Over"}</h2>
        {won ? (
          <p>Great job! You guessed the word.</p>
        ) : (
          <p>
            The word was <strong className="solution">{solution}</strong>
          </p>
        )}
        <button className="restart" onClick={onRestart}>
          Play Again
        </button>
      </div>
    </div>
  );
}