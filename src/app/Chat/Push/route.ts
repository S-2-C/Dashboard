// group_channel:message_send - Sendbird API webhook for message send event (triggered when a message is sent in a group channel)

export async function POST(req: Request) {
  // Get the request body await

  const body = await req.json();

  console.log("Message sent in a group channel:", body);

  return new Response("OK", { status: 200 });
}
