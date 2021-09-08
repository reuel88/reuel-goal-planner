import type {NextPage} from "next";
import {useRouter} from "next/router";
import {withDrive} from "../../contexts/DriveContext";
import {useFolder, folderType} from "../../hooks/useFolder";
import {withProtected} from "../../hooks/useRoute";
import AddFolderButton from "../../modules/drive/AddFolderButton";
import Breadcrumbs from "../../modules/drive/Breadcrumbs";
import Folder from "../../modules/drive/Folder";
import Navbar from "../../modules/drive/Navbar";


const Drive: NextPage = () => {
    const {query: {folderId = null}}: { query: { folderId?: string | null } } = useRouter();

    const {folder, childFolders} = useFolder(folderId);

    return (
        <>
            <Navbar/>

            <hr/>

            <div>
                <Breadcrumbs currentFolder={folder}/>

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