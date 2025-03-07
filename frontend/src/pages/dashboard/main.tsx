import { HiDotsVertical } from "react-icons/hi";
import { FaFolder } from "react-icons/fa";
import { DiGithubBadge } from "react-icons/di";
import { Link } from "react-router-dom";
import { downloadFile, getAllFiles } from "@/api/files";
import FileUploader from "@/components/fileUploader";
import FileRow from "@/components/fileRow";
import { useEffect, useState } from "react";
import { FileType } from "@/types/api";

export default function Main() {
  const [files, setFiles] = useState<FileType[] | null>(null);
  /* Export into a new function and pass fileId to determine what file to download.
  const download = () => {
    downloadFile()
      .then((res) => {
        const blob = res as unknown as Blob;
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "discordBotIntents.png"; // Change filename as needed
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      })
      .catch((err) => console.log(err));
  };
  */

  // Add a spinner while loading files
  useEffect(() => {
    const fetchData = async () => {
      const files = await getAllFiles();

      setFiles(files.files);
    };

    fetchData();
  }, []);

  return (
    <div className="flex-1 flex">
      <div className="bg-grey flex flex-col flex-1 rounded-lg p-4">
        <div className="flex">
          <h2 className="text-2xl font-bold">Root</h2>
          <FileUploader />
        </div>
        <div className="">
          <div className="grid grid-cols-[3fr_2fr_1fr_50px] text-sm p-2 gap-2 border-b-1 border-grey-ring">
            <p className="">Name</p>
            <p className="">Last Modified</p>
            <p className="">Size</p>
            <p className="">More</p>
          </div>
          <div className="grid grid-cols-[3fr_2fr_1fr_50px] items-center p-2 gap-2 border-b-1 border-grey-ring hover:bg-grey-hover">
            <div className="flex items-center gap-2">
              <FaFolder className="size-7 text-purple-accent ml-[2px]" />
              <p>New Folder</p>
            </div>
            <p className="text-sm">08/27/2024 at 7:05 PM</p>
            <p className="text-sm">267 MB</p>
            <HiDotsVertical className="justify-self-center" />
          </div>
          {files && files.map((file) => <FileRow key={file.id} file={file} />)}
        </div>
        <div className="mt-auto border-t-1 text-sm text-grey-accent border-grey-ring flex">
          <ul className="flex gap-2 pt-4 ">
            <li className="hover:text-purple-accent ">
              <a href="">Terms of Service</a>
            </li>
            |
            <li className="hover:text-purple-accent ">
              <a href="">Privacy Policy</a>
            </li>
            |
            <li className="hover:text-purple-accent ">
              <a href="">Copyight</a>
            </li>
            |
            <li className="hover:text-purple-accent ">
              <a href="">Contact</a>
            </li>
          </ul>
          <Link
            to=""
            className="ml-auto pt-4 flex items-center gap-2 hover:text-purple-accent"
          >
            Created by Vizyks{" "}
            <DiGithubBadge className="size-6 text-purple-accent" />
          </Link>
        </div>
      </div>
    </div>
  );
}
