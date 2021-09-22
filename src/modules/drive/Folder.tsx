import Link from "next/link";
import { FunctionComponent } from "react";
import Button from "react-bootstrap/Button";
import routes from "@constants/routes.json";
import { folderType } from "@hooks/useFolder";

const Folder: FunctionComponent<{ folder: folderType }> = ({ folder }) => {
  return (<Link href={`${routes.DRIVE}/${folder.id}`} passHref>
    <Button as="a">
      {folder.name}
    </Button>
  </Link>);
};

export default Folder;