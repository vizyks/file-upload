import { useRef } from "react";
import { uploadFile } from "@/api/files";

// Temp quick file upload button to test file upload capabities.
// Refactor to include better error handling/upload progess etc.

export default function FileUploader() {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = async (e) => {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);

    uploadFile(formData)
      .then((res) => console.log(res))
      .catch((err) => {
        console.log(err);
      });
  };

  const onChooseFile = () => {
    if (!inputRef.current) return;

    inputRef.current.click();
  };

  return (
    <div className="self-center ml-auto">
      <input
        className="hidden"
        ref={inputRef}
        onChange={handleFileChange}
        type="file"
      />
      <button
        onClick={onChooseFile}
        className="bg-purple px-2 py-1 rounded-sm font-bold text-sm hover:cursor-pointer"
      >
        Upload
      </button>
    </div>
  );
}
