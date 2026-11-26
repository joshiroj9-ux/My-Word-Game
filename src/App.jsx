import { useState, useEffect, useCallback, useMemo } from "react";
import GameBoard from "./components/GameBoard";
import Keyboard from "./components/Keyboard";
import Modal from "./components/Modal";
import { getRandomWord } from "./words";
import { evaluateGuess } from "./utils/evaluate";
import "./App.css";

const PRIORITY = { absent: 1, present: 2, correct: 3 };

export default function App() {
  const [solutionWord, setSolutionWord] = useState(() => getRandomWord());
  const [currentGuess, setCurrentGuess] = useState("");
  const [pastGuesses, setPastGuesses] = useState([]);
  const [gameStatus, setGameStatus] = useState("IN_PROGRESS"); // IN_PROGRESS | WON | LOST
  const [message, setMessage] = useState("");

  // Clear toast message after a moment
  useEffect(() => {
    if (!message) return;
    const t = setTimeout(() => setMessage(""), 1200);
    return () => clearTimeout(t);
  }, [message]);

  // Central input handler (used by physical AND virtual keyboard)
  const handleKey = useCallback(
    (key) => {
      if (gameStatus !== "IN_PROGRESS") return;

      if (key === "ENTER") {
        if (currentGuess.length < 5) {
          setMessage("Not enough letters");
          return;
        }
        const updated = [...pastGuesses, currentGuess];
        setPastGuesses(updated);
        setCurrentGuess("");

        if (currentGuess === solutionWord) {
          setGameStatus("WON");
        } else if (updated.length === 6) {
          setGameStatus("LOST");
        }
        return;
      }

      if (key === "BACKSPACE") {
        setCurrentGuess((g) => g.slice(0, -1));
        return;
      }

      if (/^[A-Z]$/.test(key) && currentGuess.length < 5) {
        setCurrentGuess((g) => g + key);
      }
    },
    [gameStatus, currentGuess, pastGuesses, solutionWord]
  );

  // Physical keyboard listener
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      const key = e.key.toUpperCase();
      if (key === "ENTER" || key === "BACKSPACE" || /^[A-Z]$/.test(key)) {
        handleKey(key);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handleKey]);

  // Keyboard colors derived from past guesses (best status per letter)
  const keyStatuses = useMemo(() => {
    const map = {};
    pastGuesses.forEach((guess) => {
      const result = evaluateGuess(guess, solutionWord);
      guess.split("").forEach((letter, i) => {
        const current = map[letter];
        if (!current || PRIORITY[result[i]] > PRIORITY[current]) {
          map[letter] = result[i];
        }
      });
    });
    return map;
  }, [pastGuesses, solutionWord]);

  const restart = () => {
    setSolutionWord(getRandomWord());
    setCurrentGuess("");
    setPastGuesses([]);
    setGameStatus("IN_PROGRESS");
    setMessage("");
  };

  return (
    <div className="app">
      <h1>WORDLE</h1>
      <div className="toast-area">
        {message && <div className="toast">{message}</div>}
      </div>
      <GameBoard
        solution={solutionWord}
        currentGuess={currentGuess}
        pastGuesses={pastGuesses}
      />
      <Keyboard onKey={handleKey} keyStatuses={keyStatuses} />
      <Modal status={gameStatus} solution={solutionWord} onRestart={restart} />
    </div>
  );
}