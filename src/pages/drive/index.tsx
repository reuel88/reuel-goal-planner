import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import styled from "styled-components";
import { withDatabase } from "@contexts/DatabaseContext";
import { fileType, folderType, useFolder } from "@hooks/useFolder";
import AddFolderButton from "@modules/drive/AddFolderButton";
import FolderBreadcrumbs from "@modules/drive/FolderBreadcrumbs";
import Folder from "@modules/drive/Folder";
import BasicLayout from "@modules/layouts/BasicLayout";
import AddFileButton from "@modules/drive/AddFileButton";
import { withStorage } from "@contexts/StorageContext";
import File from "@modules/drive/File";
import nookies from "nookies";
import authBackendService from "@services/authBackendService";
import routes from "@constants/routes.json";

const MainTop = styled.div`
  display: flex;
  gap: 1em;

  > :first-child {
    flex-grow: 1;
  }
`;

const Drive: NextPage = () => {
  const { query: { folderId = null } }: { query: { folderId?: string | null } } = useRouter();
  const { folder, childFolders, childFiles } = useFolder(folderId);

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

            <section>
              <h2>Files</h2>
              {childFiles.length > 0 && <div>
                {childFiles.map((childFile: fileType) => (<div key={childFile.id}>
                  <File file={childFile}>
                    {childFile.name}
                  </File>
                </div>))}
              </div>}
            </section>
          </div>

        </main>
      </BasicLayout>
    </>
  );
};

export default withDatabase(withStorage(Drive));

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const cookies = nookies.get(ctx);

    const token = await authBackendService.verifyIdToken(cookies.token);

    console.log(token);

    return { props: {} };
  } catch (e) {
    return {
      redirect: {
        destination: `${routes.LOGIN}`,
        permanent: true
      }
    };
  }
};