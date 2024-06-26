'use client';

const fetchZipData = async () => {
    try {
        const result = await fetch('/api/zip?query=97060');
        const response = await result.json();
        console.log('response', response);
    } catch (err) {
        console.log('error:', err);
    }
}

export const ZipButton = () => {
    return <button onClick={fetchZipData}>Get Zip Data</button>
}
