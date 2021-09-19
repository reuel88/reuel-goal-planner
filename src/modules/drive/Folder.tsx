import { FunctionComponent } from "react";
import Link from "next/link";
import routes from "@constants/routes.json";
import { folderType } from "@hooks/useFolder";
import { RotButton } from "../../web-components/components";

const Folder: FunctionComponent<{ folder: folderType }> = ({ folder }) => {
  return (<Link href={`${routes.DRIVE}/${folder.id}`} passHref>
    <RotButton as="a" href={`${routes.DRIVE}/${folder.id}`}>
      {folder.name}
    </RotButton>
  </Link>);
};

export default Folder;