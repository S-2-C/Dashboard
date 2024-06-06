
export function make_config_json() {
    return {
        region: process.env.REGION,
        credentials: {
            accessKeyId: process.env.CONNECT_ACCESS_KEY,
            secretAccessKey: process.env.CONNECT_SECRET_ACCESS_KEY,
        },
    }
}



export function returnError(message: string, status: number) {
    return new Response(JSON.stringify({ message: message }), {
        status: status,
        headers: {
            'Content-Type': 'application/json'
        }
    });
}