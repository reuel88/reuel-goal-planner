import { FunctionComponent } from "react";
import Link from "next/link";
import routes from "@constants/routes.json";
import { folderType } from "@hooks/useFolder";

const Folder: FunctionComponent<{ folder: folderType }> = ({ folder }) => {
  return (<Link href={`${routes.DRIVE}/${folder.id}`}>
    <a>
      {folder.name}
    </a>
  </Link>);
};

export default Folder;