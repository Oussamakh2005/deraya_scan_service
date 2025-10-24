import { Hono } from 'hono'
import mainRouter from './routes/mainRouter';
/*import { CryptoHasher } from 'bun'


const hasher = new CryptoHasher("sha1","secret key");


hasher.update("message").digest("base64");*/
const app = new Hono();

app.route('/api',mainRouter);

export default app;
