import { FunctionComponent } from "react";
import Link from "next/link";
import { fileType } from "@hooks/useFolder";
import { RotButton } from "../../web-components/components";

const File: FunctionComponent<{ file: fileType }> = ({ file }) => {
  return (<Link href={file.url} passHref>
    <RotButton as="a" href={file.url} target="_blank">
      {file.name}
    </RotButton>
  </Link>);
};

export default File;