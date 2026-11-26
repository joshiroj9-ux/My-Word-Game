const ROWS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "BACKSPACE"],
];

export default function Keyboard({ onKey, keyStatuses }) {
  return (
    <div className="keyboard">
      {ROWS.map((row, i) => (
        <div className="keyboard-row" key={i}>
          {row.map((k) => (
            <button
              key={k}
              className={`key ${k.length > 1 ? "wide" : ""} ${
                keyStatuses[k] || ""
              }`}
              // prevents the button from keeping focus (avoids double Enter)
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => onKey(k)}
            >
              {k === "BACKSPACE" ? "⌫" : k}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}