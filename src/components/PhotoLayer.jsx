import { useEffect, useRef, useState } from "react";
import { Group, Image as KonvaImage, Rect } from "react-konva";

export default function PhotoLayer({ frame, imageSrc, zoom, offset, onOffsetChange }) {
  const [image, setImage] = useState(null);
  const imgRef = useRef(null);

  useEffect(() => {
    if (!imageSrc) {
      setImage(null);
      return;
    }
    const img = new window.Image();
    img.src = imageSrc;
    img.onload = () => setImage(img);
  }, [imageSrc]);

  if (!image) {
    return (
      <Group clipFunc={(ctx) => ctx.rect(frame.x, frame.y, frame.width, frame.height)}>
        <Rect x={frame.x} y={frame.y} width={frame.width} height={frame.height} fill="#ffffff33" />
      </Group>
    );
  }

  // Base scale: cover the frame at zoom = 1
  const coverScale = Math.max(frame.width / image.width, frame.height / image.height);
  const scale = coverScale * zoom;
  const drawWidth = image.width * scale;
  const drawHeight = image.height * scale;

  return (
    <Group clipFunc={(ctx) => ctx.rect(frame.x, frame.y, frame.width, frame.height)}>
      <KonvaImage
        ref={imgRef}
        image={image}
        x={frame.x + frame.width / 2 + offset.x}
        y={frame.y + frame.height / 2 + offset.y}
        width={drawWidth}
        height={drawHeight}
        offsetX={drawWidth / 2}
        offsetY={drawHeight / 2}
        draggable
        onDragMove={(e) => {
          const node = e.target;
          onOffsetChange({
            x: node.x() - (frame.x + frame.width / 2),
            y: node.y() - (frame.y + frame.height / 2),
          });
        }}
      />
    </Group>
  );
}
