import Link from "next/link";
import { FunctionComponent } from "react";
import Button from "react-bootstrap/Button";
import { fileType } from "@hooks/useFolder";

const File: FunctionComponent<{ file: fileType }> = ({ file }) => {
  return (<Link href={file.url} passHref>
    <Button as="a" target="_blank">
      {file.name}
    </Button>
  </Link>);
};

export default File;