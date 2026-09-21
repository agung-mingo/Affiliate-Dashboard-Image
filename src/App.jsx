import { useMemo, useRef, useState } from "react";
import Editor from "./components/Editor";
import FormPanel from "./components/FormPanel";
import { TEMPLATES } from "./config/templates";
import { downloadBlob, exportStageAsPng } from "./utils/export";
import "./App.css";

const DISPLAY_MAX_WIDTH = 720;

function App() {
  const [templateId, setTemplateId] = useState("desktop");
  const [name, setName] = useState("");
  const [handle, setHandle] = useState("");
  const [photoSrc, setPhotoSrc] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [exportStatus, setExportStatus] = useState("");
  const stageRef = useRef(null);

  const template = TEMPLATES[templateId];
  const displayScale = useMemo(
    () => Math.min(1, DISPLAY_MAX_WIDTH / template.width),
    [template]
  );

  function handleTemplateChange(id) {
    setTemplateId(id);
    setOffset({ x: 0, y: 0 });
    setZoom(1);
  }

  function handlePhotoChange(file) {
    const reader = new FileReader();
    reader.onload = () => {
      setPhotoSrc(reader.result);
      setOffset({ x: 0, y: 0 });
      setZoom(1);
    };
    reader.readAsDataURL(file);
  }

  async function handleExport() {
    if (!stageRef.current) return;
    setExportStatus("Exporting…");
    try {
      const blob = await exportStageAsPng(stageRef.current, {
        onSizeReport: (size) => {
          setExportStatus(`Rendering… (${Math.round(size / 1024)} KB)`);
        },
      });
      downloadBlob(blob, `${template.id}-${name || "affiliate"}.png`);
      setExportStatus(`Done — ${Math.round(blob.size / 1024)} KB`);
    } catch (err) {
      setExportStatus("Export failed: " + err.message);
    }
  }

  return (
    <div className="app-layout">
      <FormPanel
        templateId={templateId}
        onTemplateChange={handleTemplateChange}
        name={name}
        onNameChange={setName}
        handle={handle}
        onHandleChange={setHandle}
        onPhotoChange={handlePhotoChange}
        zoom={zoom}
        onZoomChange={setZoom}
        onExport={handleExport}
        exportStatus={exportStatus}
      />
      <div className="canvas-wrap">
        <Editor
          ref={stageRef}
          template={template}
          name={name}
          handle={handle}
          photoSrc={photoSrc}
          zoom={zoom}
          offset={offset}
          onOffsetChange={setOffset}
          displayScale={displayScale}
        />
      </div>
    </div>
  );
}

export default App;
