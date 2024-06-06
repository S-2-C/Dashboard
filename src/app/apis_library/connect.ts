
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


export function checkDateIsValid(date: string) {
    const dateArray = date.split("-");
    if (dateArray.length !== 3) {
        return false;
    }

    if (dateArray[0].length !== 4 || dateArray[1].length !== 2 || dateArray[2].length !== 2) {
        return false;
    }
    // Check if date numbers are valid
    if (isNaN(Number(dateArray[0])) || isNaN(Number(dateArray[1])) || isNaN(Number(dateArray[2]))) {
        return false;
    }

    // Check if month is valid
    if (Number(dateArray[1]) < 1 || Number(dateArray[1]) > 12) {
        return false;
    }

    // Check if day is valid
    if (Number(dateArray[2]) < 1 || Number(dateArray[2]) > 31) {
        return false;
    }

    // Check if day is valid for month
    if (Number(dateArray[1]) === 2 && Number(dateArray[2]) > 29) {
        return false;
    }

    return true;
}