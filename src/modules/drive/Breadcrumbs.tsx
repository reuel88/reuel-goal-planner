import React,{FunctionComponent} from "react";
import Link from "next/link";
import route from "../../constants/route.json";
import {folderType, ROOT_FOLDER} from "../../hooks/useFolder";

const Breadcrumbs: FunctionComponent<{ currentFolder: folderType }> = ({currentFolder}) => {
    let path: Array<null | {name: string, id: null | string}> = currentFolder === ROOT_FOLDER ? [] : [ROOT_FOLDER];
    if (currentFolder) path = [...path, ...currentFolder.path]

    return <div>
        {path.map((path, index) =>
            <React.Fragment key={index}>
                <Link href={!path?.id ? route.DRIVE : `${route.DRIVE}/${path.id}`} >
                    <a>
                        {path?.name}
                    </a>
                </Link>
                &nbsp;
            </React.Fragment>
        )}
        {currentFolder && (<span>{currentFolder.name}</span>)}
    </div>
}

export default Breadcrumbs;