import { filesize } from "filesize";
import dateFormat from "dateformat";
import { HiDotsVertical } from "react-icons/hi";
import {
  GrDocumentZip,
  GrDocumentVideo,
  GrDocumentText,
  GrDocumentImage,
  GrFolder,
} from "react-icons/gr";
import { FileType } from "@/types/api";

export default function FileRow({ file }: { file: FileType }) {
  // File icons all share the same size but due to how to they look some seem to "misaligned"
  // Even though they arn't so I added a ml-[2px] to make it more visually look right.
  return (
    <div className="grid grid-cols-[3fr_2fr_1fr_50px] items-center p-2 gap-2 border-b-1 last:border-0 border-grey-ring hover:bg-grey-hover">
      <div className="flex items-center gap-2">
        {file.type === "text/plain" ? (
          <GrDocumentText className="size-7 text-purple-accent ml-[2px]" />
        ) : file.type === "video/mp4" ? (
          <GrDocumentVideo className="size-7 text-purple-accent" />
        ) : file.type === "image/png" ? (
          <GrDocumentImage className="size-7 text-purple-accent " />
        ) : file.type === "application/zip" ? (
          <GrDocumentZip className="size-7 text-purple-accent" />
        ) : (
          <GrFolder className="size-7 text-purple-accent" />
        )}
        <p>{file.name}</p>
      </div>
      <p className="text-sm">
        {dateFormat(file.lastModified, "mmm dd, yyyy 'at' h:MM TT")}
      </p>
      <p className="text-sm uppercase">{filesize(file.size)}</p>
      <HiDotsVertical className="justify-self-center" />
    </div>
  );
}
