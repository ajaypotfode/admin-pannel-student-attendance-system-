import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { imageDb } from "./firebaseStorageService";

export const uploadImageService = async (image: File) => {
    try {
        const imageRef = ref(imageDb, `images/${image.name}`);
        const metadata = { contentType: image.type };
        const uploadResult = await uploadBytes(imageRef, image, metadata);
        // console.log("image Url Is :", uploadResult);
        return await getDownloadURL(uploadResult.ref);
    } catch (error) {
        throw new Error((error as Error).message)
    }
}