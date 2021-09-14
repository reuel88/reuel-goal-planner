import { FunctionComponent } from "react";
import Link from "next/link";
import { fileType } from "@hooks/useFolder";

const File: FunctionComponent<{ file: fileType }> = ({ file }) => {
  return (<Link href={file.url}>
    <a target="_blank">
      {file.name}
    </a>
  </Link>);
};

export default File;