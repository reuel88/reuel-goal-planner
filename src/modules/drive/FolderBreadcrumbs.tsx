import Link from "next/link";
import React, { FunctionComponent } from "react";
import Button from "react-bootstrap/Button";
import routes from "@constants/routes.json";
import { folderType, ROOT_FOLDER } from "@hooks/useFolder";

const FolderBreadcrumbs: FunctionComponent<{ currentFolder: folderType }> = ({ currentFolder }) => {
  let path: Array<null | { name: string, id: null | string }>;
  path = currentFolder === ROOT_FOLDER ? [] : [ROOT_FOLDER];
  if (currentFolder) path = [...path, ...currentFolder.path];

  return <div>
    {path.map((folder, index) => {
      if (!folder?.name) return null;

      return (<React.Fragment key={index}>
        <Link href={!folder?.id ? routes.DRIVE : `${routes.DRIVE}/${folder?.id}`} passHref>
          <Button as="a">
            {folder.name}
          </Button>
        </Link>
        &nbsp;
      </React.Fragment>);
    })}
    {currentFolder && (<span>{currentFolder.name}</span>)}
  </div>;
};

export default FolderBreadcrumbs;