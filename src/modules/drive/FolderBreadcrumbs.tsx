import React, { FunctionComponent } from "react";
import Link from "next/link";
import routes from "@constants/routes.json";
import { folderType, ROOT_FOLDER } from "@hooks/useFolder";
import { RotButton } from "../../web-components/components";

const FolderBreadcrumbs: FunctionComponent<{ currentFolder: folderType }> = ({ currentFolder }) => {
  let path: Array<null | { name: string, id: null | string }>;
  path = currentFolder === ROOT_FOLDER ? [] : [ROOT_FOLDER];
  if (currentFolder) path = [...path, ...currentFolder.path];

  return <div>
    {path.map((folder, index) => {
      if (!folder?.name) return null;

      const href = !folder?.id ? routes.DRIVE : `${routes.DRIVE}/${folder?.id}`

      return (<React.Fragment key={index}>
        <Link href={href} passHref>
          <RotButton as="a" href={href}>
            {folder.name}
          </RotButton>
        </Link>
        &nbsp;
      </React.Fragment>);
    })}
    {currentFolder && (<span>{currentFolder.name}</span>)}
  </div>;
};

export default FolderBreadcrumbs;