import { forwardRef, useEffect, useState } from "react";
import { Stage, Layer, Text, Rect } from "react-konva";
import BackgroundPlaceholder from "./BackgroundPlaceholder";
import PhotoLayer from "./PhotoLayer";
import { COLORS, FONT_FAMILY } from "../config/templates";

function useFontsReady() {
  const [ready, setReady] = useState(document.fonts.status === "loaded");

  useEffect(() => {
    if (ready) return;
    const weights = ["400", "600", "700", "800"];
    Promise.all(weights.map((w) => document.fonts.load(`${w} 16px "${FONT_FAMILY}"`)))
      .then(() => document.fonts.ready)
      .then(() => setReady(true));
  }, [ready]);

  return ready;
}

const Editor = forwardRef(function Editor(
  { template, name, handle, photoSrc, zoom, offset, onOffsetChange, displayScale },
  stageRef
) {
  const { width, height, photoFrame, text, logo } = template;
  const fontsReady = useFontsReady();
  const fontFamily = fontsReady ? FONT_FAMILY : "sans-serif";

  return (
    <Stage
      ref={stageRef}
      width={width}
      height={height}
      scaleX={displayScale}
      scaleY={displayScale}
      style={{ width: width * displayScale, height: height * displayScale }}
    >
      <Layer>
        <BackgroundPlaceholder width={width} height={height} />

        <PhotoLayer
          frame={photoFrame}
          imageSrc={photoSrc}
          zoom={zoom}
          offset={offset}
          onOffsetChange={onOffsetChange}
        />

        <Rect
          x={logo.x}
          y={logo.y}
          width={logo.width}
          height={logo.height}
          fill={COLORS.white}
          cornerRadius={12}
        />
        <Text
          x={logo.x}
          y={logo.y}
          width={logo.width}
          height={logo.height}
          text="blibli tiket affiliate"
          fontFamily={fontFamily}
          fontSize={14}
          fontStyle="700"
          fill="#1E7FE0"
          align="center"
          verticalAlign="middle"
        />

        <Text
          x={text.greeting.x}
          y={text.greeting.y}
          text={text.greeting.text}
          fontFamily={fontFamily}
          fontSize={text.greeting.fontSize}
          fontStyle="700 italic"
          fill={COLORS.gold}
        />
        <Text
          x={text.name.x}
          y={text.name.y}
          text={name || "Nama Kamu"}
          fontFamily={fontFamily}
          fontSize={text.name.fontSize}
          fontStyle="800"
          fill={COLORS.white}
        />
        <Text
          x={text.tagline.x}
          y={text.tagline.y}
          text={text.tagline.text}
          fontFamily={fontFamily}
          fontSize={text.tagline.fontSize}
          fontStyle="400 italic"
          fill={COLORS.white}
          width={template.width - text.tagline.x - 40}
        />
        <Text
          x={text.handle.x}
          y={text.handle.y}
          text={handle ? `@${handle}` : "@handle_kamu"}
          fontFamily={fontFamily}
          fontSize={text.handle.fontSize}
          fontStyle="700"
          fill={COLORS.gold}
        />
      </Layer>
    </Stage>
  );
});

export default Editor;
