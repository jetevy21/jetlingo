"use client";

import { useEffect, useRef, useState } from "react";
import { getRobotConfig, RobotConfig } from "@/data/robotConfigs";

interface Props {
  tutorId: string;
  isSpeaking?: boolean;
  emotion?: "idle" | "happy" | "thinking" | "explaining";
  size?: "sm" | "md" | "lg";
}

const sizeMap = { sm: 120, md: 180, lg: 260 };

function Eye(config: RobotConfig, blinkPhase: number) {
  const scaleY = blinkPhase < 0.05 ? 0.1 : 1;

  if (config.eyeStyle === "visor") {
    return (
      <div className="absolute flex gap-3" style={{ top: "35%", left: "50%", transform: "translateX(-50%)" }}>
        <div
          className="rounded-sm"
          style={{
            width: 44,
            height: 14,
            background: config.accent,
            boxShadow: `0 0 12px ${config.accent}`,
            transform: `scaleY(${scaleY})`,
            transition: "transform 0.05s",
          }}
        />
      </div>
    );
  }

  if (config.eyeStyle === "halfmoon") {
    return (
      <div className="absolute flex gap-4" style={{ top: "36%", left: "50%", transform: "translateX(-50%)" }}>
        {[0, 1].map((i) => (
          <div
            key={i}
            style={{
              width: 16,
              height: 10,
              borderRadius: "16px 16px 0 0",
              background: config.accent,
              boxShadow: `0 0 8px ${config.accent}`,
              transform: `scaleY(${scaleY})`,
              transition: "transform 0.05s",
            }}
          />
        ))}
      </div>
    );
  }

  if (config.eyeStyle === "almond") {
    return (
      <div className="absolute flex gap-4" style={{ top: "36%", left: "50%", transform: "translateX(-50%)" }}>
        {[0, 1].map((i) => (
          <div
            key={i}
            style={{
              width: 18,
              height: 12,
              borderRadius: "50%",
              background: config.accent,
              boxShadow: `0 0 8px ${config.accent}`,
              transform: `scaleY(${scaleY * 0.7})`,
              transition: "transform 0.05s",
            }}
          />
        ))}
      </div>
    );
  }

  if (config.eyeStyle === "rectangular") {
    return (
      <div className="absolute flex gap-4" style={{ top: "36%", left: "50%", transform: "translateX(-50%)" }}>
        {[0, 1].map((i) => (
          <div
            key={i}
            style={{
              width: 16,
              height: 16,
              borderRadius: 3,
              background: config.accent,
              boxShadow: `0 0 8px ${config.accent}`,
              transform: `scaleY(${scaleY})`,
              transition: "transform 0.05s",
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="absolute flex gap-4" style={{ top: "36%", left: "50%", transform: "translateX(-50%)" }}>
      {[0, 1].map((i) => (
        <div
          key={i}
          style={{
            width: 16,
            height: 16,
            borderRadius: "50%",
            background: config.accent,
            boxShadow: `0 0 10px ${config.accent}`,
            transform: `scaleY(${scaleY})`,
            transition: "transform 0.05s",
          }}
        />
      ))}
    </div>
  );
}

function Mouth(isSpeaking: boolean, speakFrame: number) {
  const height = isSpeaking ? 4 + Math.sin(speakFrame * 8) * 4 : 3;
  return (
    <div
      className="absolute"
      style={{
        bottom: "28%",
        left: "50%",
        transform: "translateX(-50%)",
        width: isSpeaking ? 14 + Math.abs(Math.sin(speakFrame * 8)) * 4 : 16,
        height,
        borderRadius: isSpeaking ? "4px 4px 8px 8px" : "0 0 10px 10px",
        background: "#1e293b",
        transition: isSpeaking ? "none" : "all 0.2s",
      }}
    />
  );
}

function Accessory(config: RobotConfig) {
  const base = "absolute text-xs font-bold";

  switch (config.accessory) {
    case "monocle":
      return (
        <div className={base} style={{ top: "30%", right: "12%", color: "#fbbf24", fontSize: 18 }}>
          🔍
        </div>
      );
    case "earrings":
      return (
        <>
          <div className={base} style={{ top: "42%", left: "4%", color: config.accent, fontSize: 10 }}>●</div>
          <div className={base} style={{ top: "42%", right: "4%", color: config.accent, fontSize: 10 }}>●</div>
        </>
      );
    case "screen":
      return (
        <div
          className={base}
          style={{
            top: "20%", left: "50%", transform: "translateX(-50%)",
            width: 30, height: 18, borderRadius: 3,
            background: `linear-gradient(135deg, ${config.accent}33, ${config.accent}66)`,
            border: `1px solid ${config.accent}`,
          }}
        />
      );
    case "headphones":
      return (
        <div className={base} style={{ top: "18%", left: "50%", transform: "translateX(-50%)" }}>
          <div style={{
            width: 50, height: 8, borderRadius: "20px 20px 0 0",
            background: config.secondary, position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
          }} />
          <div style={{
            width: 10, height: 14, borderRadius: 4,
            background: config.accent, position: "absolute", top: 6, left: -2,
          }} />
          <div style={{
            width: 10, height: 14, borderRadius: 4,
            background: config.accent, position: "absolute", top: 6, right: -2,
          }} />
        </div>
      );
    case "controller":
      return (
        <div className={base} style={{ bottom: "-8%", right: "8%", fontSize: 20, transform: "rotate(-15deg)" }}>
          🎮
        </div>
      );
    case "tie":
      return (
        <div className={base} style={{ top: "72%", left: "50%", transform: "translateX(-50%)", fontSize: 14 }}>
          🎩
        </div>
      );
    case "bowtie":
      return (
        <div className={base} style={{ top: "72%", left: "50%", transform: "translateX(-50%)", fontSize: 12 }}>
          🎀
        </div>
      );
    case "bowler":
      return (
        <div
          className={base}
          style={{
            top: "-6%", left: "50%", transform: "translateX(-50%)",
            width: 40, height: 16, borderRadius: "20px 20px 0 0",
            background: "#1e293b", boxShadow: `0 -2px 0 ${config.secondary}`,
          }}
        />
      );
    case "tree":
      return (
        <div className={base} style={{ bottom: "-4%", right: "4%", fontSize: 16 }}>🌳</div>
      );
    case "antenna":
      return (
        <div className={base} style={{ top: "-10%", left: "50%", transform: "translateX(-50%)" }}>
          <div style={{ width: 2, height: 16, background: config.secondary, margin: "0 auto" }} />
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: config.accent, boxShadow: `0 0 8px ${config.accent}`, margin: "-2px auto 0" }} />
        </div>
      );
    case "map":
      return (
        <div className={base} style={{ bottom: "-6%", left: "8%", fontSize: 16, transform: "rotate(10deg)" }}>
          🗺️
        </div>
      );
    default:
      return null;
  }
}

export default function RobotAvatarCSS({ tutorId, isSpeaking = false, emotion = "idle", size = "md" }: Props) {
  const config = getRobotConfig(tutorId);
  const px = sizeMap[size];
  const [blinkPhase, setBlinkPhase] = useState(1);
  const [speakFrame, setSpeakFrame] = useState(0);
  const blinkTimer = useRef(0);

  useEffect(() => {
    let raf: number;
    const tick = (t: number) => {
      blinkTimer.current += 0.016;
      if (blinkTimer.current > 3 + Math.random() * 3) {
        blinkTimer.current = 0;
        setBlinkPhase(0);
        setTimeout(() => setBlinkPhase(1), 100);
      }
      if (isSpeaking) {
        setSpeakFrame(t / 1000);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isSpeaking]);

  const bobY = Math.sin(Date.now() / 1000 * config.idleSpeed) * 3;
  const tiltDeg = emotion === "thinking" ? -5 : emotion === "happy" ? 3 : Math.sin(Date.now() / 2000) * 1.5;

  return (
    <div
      className="relative select-none"
      style={{
        width: px,
        height: px * 1.4,
        perspective: 400,
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          transformStyle: "preserve-3d",
          transform: `translateY(${bobY}px) rotateZ(${tiltDeg}deg)`,
          transition: "transform 0.3s ease-out",
        }}
      >
        {/* Head */}
        <div
          className="absolute"
          style={{
            width: `${55 * config.headScale}%`,
            height: `${40 * config.headScale}%`,
            top: "5%",
            left: "50%",
            transform: "translateX(-50%)",
            borderRadius:
              config.headShape === "round" ? "50%" :
              config.headShape === "square" ? "16px" :
              config.headShape === "angular" ? "8px 8px 16px 16px" :
              config.headShape === "pointed" ? "50% 50% 20% 20%" :
              "40%",
            background: `linear-gradient(145deg, ${config.secondary}, ${config.primary})`,
            boxShadow: `0 4px 20px ${config.primary}66, inset 0 -4px 12px ${config.primary}44`,
          }}
        >
          {Eye(config, blinkPhase)}
          {Mouth(isSpeaking, speakFrame)}
          {Accessory(config)}

          {/* Cheek lights */}
          <div
            className="absolute rounded-full"
            style={{
              width: 8, height: 8, bottom: "32%", left: "15%",
              background: config.accent, opacity: 0.4,
              boxShadow: `0 0 6px ${config.accent}`,
            }}
          />
          <div
            className="absolute rounded-full"
            style={{
              width: 8, height: 8, bottom: "32%", right: "15%",
              background: config.accent, opacity: 0.4,
              boxShadow: `0 0 6px ${config.accent}`,
            }}
          />
        </div>

        {/* Neck */}
        <div
          className="absolute"
          style={{
            width: "12%",
            height: "6%",
            top: "43%",
            left: "50%",
            transform: "translateX(-50%)",
            background: config.primary,
            borderRadius: "0 0 4px 4px",
          }}
        />

        {/* Body */}
        <div
          className="absolute"
          style={{
            width: `${42 * config.bodyWidth}%`,
            height: `${42 * config.bodyHeight}%`,
            top: "48%",
            left: "50%",
            transform: "translateX(-50%)",
            borderRadius: "16px 16px 24px 24px",
            background: `linear-gradient(180deg, ${config.primary}, ${config.primary}dd)`,
            boxShadow: `0 6px 24px ${config.primary}44, inset 0 2px 8px ${config.secondary}33`,
          }}
        >
          {/* Chest light */}
          <div
            className="absolute rounded-full"
            style={{
              width: 16, height: 16,
              top: "20%", left: "50%", transform: "translateX(-50%)",
              background: config.accent,
              boxShadow: `0 0 12px ${config.accent}`,
              animation: "pulse 2s ease-in-out infinite",
            }}
          />
          {/* Chest lines */}
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="absolute"
              style={{
                width: "60%", height: 1, left: "20%",
                top: `${50 + i * 10}%`,
                background: `${config.secondary}44`,
              }}
            />
          ))}
        </div>

        {/* Arms */}
        {config.armStyle !== "none" && (
          <>
            <div
              className="absolute"
              style={{
                width: config.armStyle === "elegant" ? "10%" : "12%",
                height: "28%",
                top: "50%",
                left: `${14 - (config.bodyWidth - 1) * 5}%`,
                borderRadius: "12px",
                background: `linear-gradient(180deg, ${config.secondary}, ${config.primary})`,
                transform: isSpeaking && emotion === "explaining" ? "rotate(-15deg)" : "rotate(5deg)",
                transformOrigin: "top center",
                transition: "transform 0.3s",
              }}
            />
            <div
              className="absolute"
              style={{
                width: config.armStyle === "elegant" ? "10%" : "12%",
                height: "28%",
                top: "50%",
                right: `${14 - (config.bodyWidth - 1) * 5}%`,
                borderRadius: "12px",
                background: `linear-gradient(180deg, ${config.secondary}, ${config.primary})`,
                transform: isSpeaking && emotion === "explaining" ? "rotate(15deg)" : "rotate(-5deg)",
                transformOrigin: "top center",
                transition: "transform 0.3s",
              }}
            />
          </>
        )}

        {/* Legs */}
        <div
          className="absolute"
          style={{
            width: "16%", height: "14%",
            bottom: "8%", left: "30%",
            borderRadius: "0 0 8px 8px",
            background: config.primary,
          }}
        />
        <div
          className="absolute"
          style={{
            width: "16%", height: "14%",
            bottom: "8%", right: "30%",
            borderRadius: "0 0 8px 8px",
            background: config.primary,
          }}
        />

        {/* Feet */}
        <div
          className="absolute"
          style={{
            width: "20%", height: "6%",
            bottom: "2%", left: "27%",
            borderRadius: "4px 4px 8px 8px",
            background: config.secondary,
          }}
        />
        <div
          className="absolute"
          style={{
            width: "20%", height: "6%",
            bottom: "2%", right: "27%",
            borderRadius: "4px 4px 8px 8px",
            background: config.secondary,
          }}
        />
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}
