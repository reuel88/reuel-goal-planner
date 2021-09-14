import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "@configs/firebaseClient";

const storageService = {
  uploadSnapshotFile: (
    dir: string,
    file: Blob | Uint8Array | ArrayBuffer,
    callback: (snapshot: any) => unknown,
    error?: (err: any) => unknown,
    complete?: (downloadURL: string) => unknown
  ) => {
    const storageRef = ref(storage, dir);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return uploadTask.on("state_changed",
      (snapshot) => {
        return callback({
          progress: (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
          state: snapshot.state
        });
      },
      err => {
        if (error) {
          error(err);
        }
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          if (complete) {
            complete(downloadURL);
          }
        });
      });
  }
};

export default storageService;