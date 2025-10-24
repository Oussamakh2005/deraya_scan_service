import { Hono } from "hono";
import uploadImage from "../controllers/uploadImage";

const mainRouter = new Hono();

mainRouter.post('/image',uploadImage);

export default mainRouter;