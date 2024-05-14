
export function make_config_json() {
    return {
        region: process.env.REGION,
        credentials: {
            accessKeyId: process.env.CONNECT_ACCESS_KEY,
            secretAccessKey: process.env.CONNECT_SECRET_ACCESS_KEY,
        },
    }
}

