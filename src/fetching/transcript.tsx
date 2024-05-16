

export const fetchRealTimeData = async (id: string) => {

    const urlParams = "localhost:3000/connect/ListRealtimeContactAnalysisSegments?contactId=" + id + ""

    const res = await fetch (urlParams)
    return res.json();
}

    