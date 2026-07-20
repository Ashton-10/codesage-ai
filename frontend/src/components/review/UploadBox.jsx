import { Upload } from "lucide-react";

export default function UploadBox({
  onUpload,
}) {
  return (
    <label className="border-2 border-dashed border-slate-700 rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-indigo-500 transition">

      <Upload size={42} />

      <p className="mt-4">
        Click to upload a code file
      </p>

      <input
        hidden
        type="file"
        accept=".py,.js,.java,.cpp,.c"
        onChange={onUpload}
      />

    </label>
  );
}