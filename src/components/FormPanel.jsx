export default function FormPanel({
  templateId,
  onTemplateChange,
  name,
  onNameChange,
  handle,
  onHandleChange,
  onPhotoChange,
  zoom,
  onZoomChange,
  onExport,
  exportStatus,
}) {
  return (
    <div className="form-panel">
      <label>
        Template
        <select value={templateId} onChange={(e) => onTemplateChange(e.target.value)}>
          <option value="desktop">Desktop Banner</option>
          <option value="mobile">Mobile / Story Card</option>
        </select>
      </label>

      <label>
        Nama
        <input
          type="text"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          placeholder="Ayu Tirta Dewi"
        />
      </label>

      <label>
        Social Media Handle
        <input
          type="text"
          value={handle}
          onChange={(e) => onHandleChange(e.target.value.replace(/^@/, ""))}
          placeholder="ayudewi"
        />
      </label>

      <label>
        Foto
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) onPhotoChange(file);
          }}
        />
      </label>

      <label>
        Zoom
        <input
          type="range"
          min="1"
          max="3"
          step="0.01"
          value={zoom}
          onChange={(e) => onZoomChange(Number(e.target.value))}
        />
      </label>

      <button onClick={onExport}>Download PNG</button>
      {exportStatus && <p className="export-status">{exportStatus}</p>}
    </div>
  );
}
