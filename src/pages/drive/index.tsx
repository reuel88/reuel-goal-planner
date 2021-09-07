import type {NextPage} from "next";
import {withProtected} from "../../hooks/route";
import Navbar from "../../modules/drive/Navbar";
import AddFolderButton from "../../modules/drive/AddFolderButton";
import {useDrive, withDrive} from "../../contexts/DriveContext";

const Drive: NextPage = () => {
    const {getDocs} = useDrive();

    getDocs();


    return (
        <>
            <Navbar/>

            <div>
                <AddFolderButton/>
            </div>

            <div>
                drive
            </div>
        </>
    );
}

export default withProtected(withDrive(Drive));