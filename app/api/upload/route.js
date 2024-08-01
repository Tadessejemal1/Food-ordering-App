import {PutObjectCommand, S3Client} from "@aws-sdk/client-s3";
import uniqid from 'uniqid';

export async function POST(req) {
    try {
        const data = await req.formData();
        const file = data.get('file');

        if (file) {
            const s3Client = new S3Client({
                region: 'eu-north-1',
                credentials: {
                    accessKeyId: process.env.AWS_ACCESS_KEY,
                    secretAccessKey: process.env.AWS_SECRET_KEY,
                },
            });

            const ext = file.name.split('.').pop();
            const newFileName = uniqid() + '.' + ext;
            const chunks = [];
            for await (const chunk of file.stream()) {
                chunks.push(chunk);
            }
            const buffer = Buffer.concat(chunks);
            const bucket = 'tadesse-food-ordering';
            await s3Client.send(new PutObjectCommand({
                Bucket: bucket,
                Key: newFileName,
                ACL: 'public-read',
                ContentType: file.type,
                Body: buffer,
            }));
            const link = `https://${bucket}.s3.amazonaws.com/${newFileName}`;
            return new Response(JSON.stringify({ link }), { status: 200 });
        }
        return new Response(JSON.stringify({ message: 'No file provided' }), { status: 400 });
    } catch (error) {
        console.error('Error uploading file:', error);
        return new Response(JSON.stringify({ error: 'File upload failed' }), { status: 500 });
    }
}
