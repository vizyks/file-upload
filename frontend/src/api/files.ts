import api from "@/lib/api-client";
import { FileType } from "@/types/api";

export const getAllFiles = async (): Promise<{ files: FileType[] }> => {
  return api.get("/files");
};

/* Change route to /files/<file_id>/download
export const downloadFile = async () => {
  const res = await api.get("/files/download", { responseType: "blob" });

  return res;
};
*/

export const uploadFile = async (formData: FormData) => {
  const res = await api.post("/files/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res;
};
