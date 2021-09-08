import {FunctionComponent} from "react";
import {folderType, ROOT_FOLDER} from "../../hooks/useFolder";

const Breadcrumbs: FunctionComponent<{currentFolder:folderType}> = ({currentFolder}) => {
    let path = currentFolder === ROOT_FOLDER ? [] : [ROOT_FOLDER];
    // if(currentFolder) path = [...path, ...currentFolder.path]

    return <div>
        {path.length > 0 && path.map(path => <span key={path.id}>{path.name}</span>)}
        {currentFolder && (<span>{currentFolder.name}</span>)}
    </div>
}

export default Breadcrumbs;