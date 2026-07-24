export type RobotHeadShape = "round" | "square" | "angular" | "oval" | "pointed";
export type RobotEyeStyle = "round" | "rectangular" | "visor" | "halfmoon" | "almond";
export type RobotAccessory = "monocle" | "earrings" | "screen" | "headphones" | "controller" | "tie" | "bowtie" | "bowler" | "tree" | "antenna" | "map";

export interface RobotConfig {
  id: string;
  primary: string;
  secondary: string;
  accent: string;
  headShape: RobotHeadShape;
  eyeStyle: RobotEyeStyle;
  accessory: RobotAccessory;
  bodyWidth: number;
  bodyHeight: number;
  headScale: number;
  armStyle: "thin" | "thick" | "elegant" | "none";
  idleSpeed: number;
  personality: "calm" | "energetic" | "playful" | "strict" | "professional";
}

const colorMap: Record<string, { primary: string; secondary: string; accent: string }> = {
  teal: { primary: "#0d9488", secondary: "#14b8a6", accent: "#5eead4" },
  rose: { primary: "#e11d48", secondary: "#fb7185", accent: "#fda4af" },
  amber: { primary: "#d97706", secondary: "#f59e0b", accent: "#fcd34d" },
  purple: { primary: "#7c3aed", secondary: "#a78bfa", accent: "#c4b5fd" },
  emerald: { primary: "#059669", secondary: "#34d399", accent: "#6ee7b7" },
  slate: { primary: "#475569", secondary: "#94a3b8", accent: "#cbd5e1" },
  blue: { primary: "#2563eb", secondary: "#60a5fa", accent: "#93c5fd" },
};

export const robotConfigs: Record<string, RobotConfig> = {
  "profesor-carlos": {
    id: "profesor-carlos",
    ...colorMap.teal,
    headShape: "round",
    eyeStyle: "round",
    accessory: "monocle",
    bodyWidth: 1,
    bodyHeight: 1.2,
    headScale: 1.1,
    armStyle: "thick",
    idleSpeed: 0.8,
    personality: "calm",
  },
  "maria-conversacion": {
    id: "maria-conversacion",
    ...colorMap.rose,
    headShape: "oval",
    eyeStyle: "almond",
    accessory: "earrings",
    bodyWidth: 0.85,
    bodyHeight: 1.1,
    headScale: 1,
    armStyle: "elegant",
    idleSpeed: 1.2,
    personality: "energetic",
  },
  "diego-vocabulario": {
    id: "diego-vocabulario",
    ...colorMap.amber,
    headShape: "square",
    eyeStyle: "rectangular",
    accessory: "screen",
    bodyWidth: 1.05,
    bodyHeight: 1.15,
    headScale: 1.05,
    armStyle: "thin",
    idleSpeed: 0.6,
    personality: "calm",
  },
  "sofia-pronunciacion": {
    id: "sofia-pronunciacion",
    ...colorMap.purple,
    headShape: "pointed",
    eyeStyle: "visor",
    accessory: "headphones",
    bodyWidth: 0.9,
    bodyHeight: 1.1,
    headScale: 1,
    armStyle: "thin",
    idleSpeed: 1,
    personality: "strict",
  },
  "mateo-juegos": {
    id: "mateo-juegos",
    ...colorMap.emerald,
    headShape: "round",
    eyeStyle: "round",
    accessory: "controller",
    bodyWidth: 0.95,
    bodyHeight: 1,
    headScale: 1.15,
    armStyle: "thick",
    idleSpeed: 1.5,
    personality: "playful",
  },
  "carmen-business": {
    id: "carmen-business",
    ...colorMap.slate,
    headShape: "angular",
    eyeStyle: "rectangular",
    accessory: "tie",
    bodyWidth: 1,
    bodyHeight: 1.3,
    headScale: 0.95,
    armStyle: "none",
    idleSpeed: 0.5,
    personality: "professional",
  },
  "aria": {
    id: "aria",
    ...colorMap.teal,
    headShape: "round",
    eyeStyle: "round",
    accessory: "bowtie",
    bodyWidth: 0.9,
    bodyHeight: 1.1,
    headScale: 1.05,
    armStyle: "thin",
    idleSpeed: 1,
    personality: "calm",
  },
  "james": {
    id: "james",
    ...colorMap.amber,
    headShape: "square",
    eyeStyle: "rectangular",
    accessory: "bowler",
    bodyWidth: 1,
    bodyHeight: 1.2,
    headScale: 1,
    armStyle: "thick",
    idleSpeed: 0.7,
    personality: "professional",
  },
  "kenji": {
    id: "kenji",
    ...colorMap.emerald,
    headShape: "round",
    eyeStyle: "halfmoon",
    accessory: "tree",
    bodyWidth: 0.9,
    bodyHeight: 1.1,
    headScale: 1,
    armStyle: "thin",
    idleSpeed: 0.4,
    personality: "calm",
  },
  "sofia": {
    id: "sofia",
    ...colorMap.purple,
    headShape: "angular",
    eyeStyle: "visor",
    accessory: "antenna",
    bodyWidth: 0.85,
    bodyHeight: 1.15,
    headScale: 1,
    armStyle: "thin",
    idleSpeed: 0.9,
    personality: "strict",
  },
  "emma": {
    id: "emma",
    ...colorMap.rose,
    headShape: "round",
    eyeStyle: "round",
    accessory: "map",
    bodyWidth: 0.9,
    bodyHeight: 1,
    headScale: 1.1,
    armStyle: "elegant",
    idleSpeed: 1.3,
    personality: "playful",
  },
};

export function getRobotConfig(tutorId: string): RobotConfig {
  return robotConfigs[tutorId] || robotConfigs["profesor-carlos"];
}
