import { Rect, Circle, Group } from "react-konva";
import { COLORS } from "../config/templates";

// Stand-in for the real template background (sky gradient + suns) until
// the actual template asset is provided. See PLAN.md.
export default function BackgroundPlaceholder({ width, height }) {
  const suns = [
    { x: width * 0.42, y: height * 0.15, r: width * 0.02 },
    { x: width * 0.85, y: height * 0.1, r: width * 0.04 },
  ];

  return (
    <Group>
      <Rect
        x={0}
        y={0}
        width={width}
        height={height}
        fillLinearGradientStartPoint={{ x: 0, y: 0 }}
        fillLinearGradientEndPoint={{ x: 0, y: height }}
        fillLinearGradientColorStops={[0, COLORS.skyTop, 1, COLORS.skyBottom]}
      />
      {suns.map((s, i) => (
        <Circle key={i} x={s.x} y={s.y} radius={s.r} fill={COLORS.gold} opacity={0.85} />
      ))}
    </Group>
  );
}
