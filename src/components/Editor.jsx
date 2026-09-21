import { forwardRef } from "react";
import { Stage, Layer, Text, Rect } from "react-konva";
import BackgroundPlaceholder from "./BackgroundPlaceholder";
import PhotoLayer from "./PhotoLayer";
import { COLORS } from "../config/templates";

const Editor = forwardRef(function Editor(
  { template, name, handle, photoSrc, zoom, offset, onOffsetChange, displayScale },
  stageRef
) {
  const { width, height, photoFrame, text, logo } = template;

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
          fontSize={14}
          fontStyle="bold"
          fill="#1E7FE0"
          align="center"
          verticalAlign="middle"
        />

        <Text
          x={text.greeting.x}
          y={text.greeting.y}
          text={text.greeting.text}
          fontSize={text.greeting.fontSize}
          fontStyle="italic bold"
          fill={COLORS.gold}
        />
        <Text
          x={text.name.x}
          y={text.name.y}
          text={name || "Nama Kamu"}
          fontSize={text.name.fontSize}
          fontStyle="bold"
          fill={COLORS.white}
        />
        <Text
          x={text.tagline.x}
          y={text.tagline.y}
          text={text.tagline.text}
          fontSize={text.tagline.fontSize}
          fontStyle="italic"
          fill={COLORS.white}
          width={template.width - text.tagline.x - 40}
        />
        <Text
          x={text.handle.x}
          y={text.handle.y}
          text={handle ? `@${handle}` : "@handle_kamu"}
          fontSize={text.handle.fontSize}
          fontStyle="bold"
          fill={COLORS.gold}
        />
      </Layer>
    </Stage>
  );
});

export default Editor;
