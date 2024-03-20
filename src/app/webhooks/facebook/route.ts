export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const mode = searchParams.get("hub.mode");
  const challenge = searchParams.get("hub.challenge");
  const verifyToken = searchParams.get("hub.verify_token");

  if (mode === "subscribe" && verifyToken === "logora") {
    return new Response(challenge);
  }

  return new Response("error", { status: 400 });
}

export async function POST(request: Request) {
  console.log(request.body);

  return new Response("success", { status: 200 });
}
