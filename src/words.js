export const WORDS = [
  "APPLE", "BRAVE", "CRANE", "DREAM", "EARTH", "FLAME", "GRAPE", "HOUSE",
  "IMAGE", "JOKER", "KNIFE", "LEMON", "MANGO", "NIGHT", "OCEAN", "PLANT",
  "QUEEN", "RIVER", "STONE", "TIGER", "UNITY", "VOICE", "WATER", "YOUTH",
  "ZEBRA", "BEACH", "CLOUD", "DANCE", "EAGLE", "FIELD", "GHOST", "HEART",
  "LIGHT", "MUSIC", "PIANO", "ROBOT", "SMILE", "TRAIN", "WORLD", "SPARK",
  "BRICK", "CHAIR", "DRIVE", "FROST", "GLASS", "HAPPY", "MONEY", "PAPER",
];

export const getRandomWord = () =>
  WORDS[Math.floor(Math.random() * WORDS.length)];