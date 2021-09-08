import type {NextPage} from "next";
import {withDrive} from "../../contexts/DriveContext";
import {useFolder, folderType} from "../../hooks/useFolder";
import {withProtected} from "../../hooks/useRoute";
import AddFolderButton from "../../modules/drive/AddFolderButton";
import Folder from "../../modules/drive/Folder";
import Navbar from "../../modules/drive/Navbar";

const Drive: NextPage = () => {
    const {folder, childFolders} = useFolder('xtTvnc8yqxR5tFqCXCGg');

    return (
        <>
            <Navbar/>

            <hr/>

            <div>
                <AddFolderButton currentFolder={folder}/>
            </div>

            <hr/>

            <div>
                {childFolders.length > 0 && <div>
                    {childFolders.map((childFolder: folderType) => (<div key={childFolder.id}>
                        <Folder folder={childFolder}/>
                    </div>))}
                </div>}
            </div>
        </>
    );
}

export default withProtected(withDrive(Drive));