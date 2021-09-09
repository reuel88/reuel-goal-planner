import type { NextPage } from "next";
import { useRouter } from "next/router";
import styled from "styled-components";
import { withDrive } from "../../contexts/DatabaseContext";
import { useFolder, folderType } from "../../hooks/useFolder";
import { withProtected } from "../../hooks/useAuthRouter";
import AddFolderButton from "../../modules/drive/AddFolderButton";
import FolderBreadcrumbs from "../../modules/drive/FolderBreadcrumbs";
import Folder from "../../modules/drive/Folder";
import BasicLayout from "../../modules/layouts/BasicLayout";
import AddFileButton from "../../modules/drive/AddFileButton";
import { withStorage } from "../../contexts/StorageContext";

const MainTop = styled.div`
  display: flex;
  gap: 1em;

  > :first-child {
    flex-grow: 1;
  }
`;

const Drive: NextPage = () => {
    const {query: {folderId = null}}: { query: { folderId?: string | null } } = useRouter();
    const {folder, childFolders} = useFolder(folderId);

    return (
        <>
            <BasicLayout>
                <main>
                    <header className="main-header">
                        <h1>Drive</h1>
                    </header>

                    <MainTop className="main-top">
                        <FolderBreadcrumbs currentFolder={folder} />

                        <AddFileButton currentFolder={folder} />
                        <AddFolderButton currentFolder={folder} />
                    </MainTop>

                    <hr />

                    <div className="main-body">
                        <section>
                            <h2>Folders</h2>
                            {childFolders.length > 0 && <div>
                                {childFolders.map((childFolder: folderType) => (<div key={childFolder.id}>
                                    <Folder folder={childFolder} />
                                </div>))}
                            </div>}
                        </section>
                    </div>

                </main>
            </BasicLayout>
        </>
    );
}

export default withProtected(withDrive(withStorage(Drive)));