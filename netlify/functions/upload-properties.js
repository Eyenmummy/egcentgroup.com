const { createClient } = require('@supabase/supabase-js');
const Busboy = require('busboy');

exports.handler = async (event) => {
    const supabase = createClient(
        process.env.SUPABASE_URL,
        process.env.SUPABASE_KEY
    );

    const authHeader = event.headers.authorization || event.headers.Authorization;
    const token = authHeader ? authHeader.replace(/^Bearer\s+/i, '') : null;

    if (!token) {
        return { statusCode: 401, body: 'No token' };
    }

    supabase.auth.setSession({ access_token: token, refresh_token: '', expires_in: 3600, token_type: 'bearer' });

    const contentType = event.headers['content-type'] || event.headers['Content-Type'];
    if (!contentType || !contentType.includes('multipart/form-data')) {
        return { statusCode: 400, body: 'Invalid content type' };
    }

    const rawBody = event.isBase64Encoded
        ? Buffer.from(event.body, 'base64')
        : Buffer.from(event.body || '', 'utf8');

    const busboy = Busboy({ headers: { 'content-type': contentType } });
    const fields = {};
    const imageFiles = [];

    return new Promise((resolve) => {
        busboy.on('field', (name, val) => {
            fields[name] = val;
        });

        busboy.on('file', (name, file, info) => {
            const chunks = [];
            file.on('data', (chunk) => chunks.push(chunk));
            file.on('end', () => {
                imageFiles.push({
                    name: info.filename,
                    data: Buffer.concat(chunks),
                    type: info.mimeType
                });
            });
        });

        busboy.on('finish', async () => {
            try {
                const imageUrls = [];

                for (const file of imageFiles) {
                    const { data, error } = await supabase.storage
                        .from('property-images')
                        .upload(`${Date.now()}-${file.name}`, file.data, {
                            contentType: file.type
                        });

                    if (!error && data?.path) {
                        const { data: publicUrlData } = supabase.storage
                            .from('property-images')
                            .getPublicUrl(data.path);

                        imageUrls.push(publicUrlData.publicUrl);
                    }
                }

                const { error } = await supabase.from('Properties').insert({
                    title: fields.title,
                    price: Number(fields.price),
                    address: fields.address,
                    beds: Number(fields.beds),
                    baths: Number(fields.baths),
                    description: fields.description,
                    images: imageUrls,
                    status: 'pending'
                });

                if (error) {
                    resolve({ statusCode: 500, body: error.message });
                    return;
                }

                resolve({ statusCode: 200, body: 'Property added!' });
            } catch (err) {
                resolve({ statusCode: 500, body: err.message || 'Upload failed' });
            }
        });

        busboy.on('error', (err) => {
            resolve({ statusCode: 500, body: err.message || 'Upload failed' });
        });

        busboy.write(rawBody);
        busboy.end();
    });
};