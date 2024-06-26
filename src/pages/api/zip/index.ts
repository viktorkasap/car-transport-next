//'localhost:3000',
// 'http://localhost:3000/',

import type { NextApiRequest, NextApiResponse } from 'next';

const allowedOrigins = process.env.ALLOWED_ORIGINS!.split(",")
const xRapidApiKey = process.env.X_RAPID_API_KEY!;
const xRapidZipHost = process.env.X_RAPID_US_ZIP_HOST!;
const usZipUrl = process.env.US_ZIP_URL!;

const getUsZipData = async (req:NextApiRequest, res:NextApiResponse<{ data: any } | { error: string }>) => {
    console.log('Req:', req);
    console.log('Res:', res);

    const xForwardedHost = Array.isArray(req.headers['x-forwarded-host'])
        ? req.headers['x-forwarded-host'][0]
        : req.headers['x-forwarded-host'];

    if (!xForwardedHost || !allowedOrigins.includes(xForwardedHost)) {
        return res.status(403).send({error: 'Access denied.' });
    }

    if (!req.query.query) {
        return res.status(200).json({data: {}});
    }

    const url = `${usZipUrl}/?zipcode=${req.query.query}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': xRapidApiKey,
            'x-rapidapi-host': xRapidZipHost,
        }
    }

    try {
        const response = await fetch(url, options);
        console.log('response1', response);
        const result = await response.json();
        console.log('result1', result);
        return res.status(200).json(result);
    } catch (error) {
        console.error('error1', error);
        return res.status(500).json({ error: 'Zip: Internal Server Error' });
    }
}

export default getUsZipData;
