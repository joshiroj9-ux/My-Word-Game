export default function Tile({ letter, status, index }) {
  const classes = ["tile"];
  if (letter && !status) classes.push("filled");
  if (status) classes.push(status, "reveal");

  return (
    <div
      className={classes.join(" ")}
      style={status ? { animationDelay: `${index * 0.15}s` } : undefined}
    >
      {letter}
    </div>
  );
}