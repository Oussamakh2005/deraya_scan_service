import { CryptoHasher } from "bun";
import ObsClient from "../classes/obsClient";
import { OBS_ACCESS_KEY_ID, OBS_END_POINT, OBS_SECRET_ACCESS_KEY } from "../config/env";
const hasher = new CryptoHasher('sha1',OBS_SECRET_ACCESS_KEY)
const obsClient = new ObsClient(OBS_END_POINT,OBS_ACCESS_KEY_ID,hasher);

export default obsClient;