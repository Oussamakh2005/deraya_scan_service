import { Hono } from 'hono'

interface CustomContext {
  Variables: {
    jwtPayload: {
        id : string,
        role : string,
        institution_id : string | null,
    }; 
  };
}
const app = new Hono<CustomContext>();


export default {
    port : 3000,
    fetch : app.fetch
};
