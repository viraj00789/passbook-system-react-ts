import { useEffect, useEffectEvent, useRef, useState } from "react";

interface ImageUploadProps {
  label: string | string[];
  required?: boolean;
  error?: string;
  value: File | null;
  onChange: (file: File | null) => void;
}

export default function ImageUpload({
  label,
  required,
  error,
  value,
  onChange,
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const updatePreview = useEffectEvent(() => {
    if (!value) {
      setPreview(null);
      if (inputRef.current) inputRef.current.value = "";
      return;
    }

    const url = URL.createObjectURL(value);
    setPreview(url);

    return () => URL.revokeObjectURL(url);
  });

  useEffect(() => {
    updatePreview();
  }, [value]);

  const handleFileChange = (file: File | null) => {
    if (!file) {
      onChange(null);
      return;
    }

    if (file.type !== "image/png") {
      onChange(null);
      return;
    }

    onChange(file);
  };

  return (
    <div className="space-y-2">
      {/* Label */}
      <div className="text-sm font-medium">
        {Array.isArray(label) ? label.join(" / ") : label}
        {required && <span className="text-red-400"> *</span>}
      </div>

      {/* Upload Box */}
      <div className="space-y-1">
        <div
          className={`w-full h-40 border rounded-md flex items-center justify-center cursor-pointer
        ${error ? "border-red-400" : "border-gray-300 dark:border-gray-600"}`}
          onClick={() => inputRef.current?.click()}
        >
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-contain rounded-md overflow-hidden"
            />
          ) : (
            <span className="text-sm font-medium dark:text-gray-300 text-gray-500 text-center px-2">
              Click to upload PNG
            </span>
          )}
        </div>

        {/* Hidden Input */}
        <input
          ref={inputRef}
          type="file"
          accept="image/png"
          hidden
          onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
        />

        {/* Error */}
        {error && (
          <p className="text-xs text-red-500 dark:text-red-400">{error}</p>
        )}
      </div>
    </div>
  );
}
