import {FunctionComponent} from "react";
import {folderType} from "../../hooks/useFolder";

const Folder: FunctionComponent<{folder:folderType}> = ({folder}) => {
    return (<div>
        {folder.name}
    </div>)
}

export default Folder;