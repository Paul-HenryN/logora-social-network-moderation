export let received = null;

export async function GET(request: Request) {
  return Response.json({ received });
}
