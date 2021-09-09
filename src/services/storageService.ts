import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../configs/firebase";


const storageService = {
    uploadSnapshotFile: (dir: string, file: Blob | Uint8Array | ArrayBuffer) => {
        const storageRef = ref(storage, dir);
        const uploadTask = uploadBytesResumable(storageRef, file);

        return uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            },
            error => {
                throw error;
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log(downloadURL);
                });
            })
    }
}

export default storageService;