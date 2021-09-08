import {FunctionComponent} from "react";
import Link from "next/link";
import route from "../../constants/route.json";
import {folderType} from "../../hooks/useFolder";

const Folder: FunctionComponent<{folder:folderType}> = ({folder}) => {
    return (<Link href={`${route.DRIVE}/${folder.id}`}>
        <a>
            {folder.name}
        </a>
    </Link>)
}

export default Folder;