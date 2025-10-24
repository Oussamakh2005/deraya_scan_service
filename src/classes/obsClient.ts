import axios from "axios";
import { CryptoHasher } from "bun";

class ObsClient {
    private endpoint: string;
    private accessKey: string;
    //private secretKey: string;
    private hasher: CryptoHasher;
    constructor(ep: string, AK: string, /*SK: string,*/ hasher: CryptoHasher) {
        this.endpoint = ep;
        this.accessKey = AK;
        //this.secretKey = SK;

        this.hasher = hasher;
    }
    generateSignature(httpMethod: string, bucketName: string, objectKey: string, headers: Record<string, string>, query: Record<string, string>): string {
        const currentDate: string = new Date().toUTCString();
        const contentType: string = headers["Content-Type"] || "application/octet-stream";
        const obsHeaders: string = Object.keys(headers)
            .filter((key) => key.startsWith('x-obs-'))
            .sort()
            .map((key) => `${key.toLowerCase()}:${headers[key].trim()}\n`)
            .join('');
        const queryString: string = '?' + Object.keys(query).length ? Object.keys(query).sort().map((key) => `${key}=${query[key]}`).join("&") : '';
        const resources: string = `/${bucketName}/${objectKey}${queryString}`;
        const stringToSign: string = `${httpMethod}\n${headers['Content-MD5'] || ''}\n${contentType}\n${currentDate}\n${obsHeaders}${resources}`;
        //Create signature : 
        const signature = this.hasher.update(stringToSign).digest("base64");
        return `OBS ${this.accessKey} : ${signature}`;
    }

    async uploadFileToBucket(bucketName: string, objectKey: string, file: File): Promise<boolean> {
        const fileContent = Buffer.from(await file.arrayBuffer());
        const contentType: string = file.type;
        const headers: Record<string, string> = {
            'Content-Type': contentType,
            'Content-Length': fileContent.length.toString(),
            'Date': new Date().toUTCString(),
            // Optional: ACL for public-read
            // 'x-obs-acl': 'public-read',
            // Optional: Storage class
            // 'x-obs-storage-class': 'STANDARD',
        };
        headers['Authorization'] = this.generateSignature('PUT', bucketName, objectKey, headers, {});
        try {
            const response = await axios.put(`${this.endpoint}/${bucketName}/${objectKey}`, fileContent, {
                headers,
            })
            if (response.status === 200) {
                console.log(`File uploaded successfully to ${bucketName}/${objectKey}`);
                console.log(`ETag: ${response.headers.etag}`);
                console.log(`Request-Id: ${response.headers['x-obs-request-id']}`);
                return true;
            } else {
                console.error(`Unexpected status code: ${response.status}`);
                return true;
            }
        } catch (error: any) {
            if (error.response) {
                // Server-side error (e.g., 403 Forbidden, 404 Not Found)
                console.error('OBS Error:');
                console.error(`Status: ${error.response.status}`);
                console.error(`Message: ${error.response.data}`);
                console.error(`Request-Id: ${error.response.headers['x-obs-request-id']}`);
                return false;
            } else {
                // Client-side error (e.g., network issue)
                console.error('Client Error:', error.message);
                return false;
            }
        }
    }
}

export default ObsClient;