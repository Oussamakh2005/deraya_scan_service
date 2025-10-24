import { Context } from "hono";
import obsClient from "../clients/obsClient";
import { v4 as uuidV4 } from "uuid";
const uploadImage = async (c : Context) => {
    const body = await c.req.parseBody();
    const image = body["image"] as File; 
    const objectKey = `${uuidV4()}-${image.name}.${image.type.split('/')[1]}`;
    const bucketName = 'x-ray-images';
    const uploaded = await obsClient.uploadFileToBucket(bucketName,objectKey,image);
    if(!uploaded){
        return c.json({
            msg : "faild to upload image",
        },400);
    }
}

export default uploadImage;