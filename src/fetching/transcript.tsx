export const fetchRealTimeData = async (id: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const urlParams =
    "connect/ListRealtimeContactAnalysisSegments?contactId=" + id + "";

  const res = await fetch(baseUrl + urlParams, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.json();
};
