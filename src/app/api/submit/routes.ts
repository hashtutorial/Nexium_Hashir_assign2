export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const body = await req.json();
  const input = body.input;

  const webhookRes = await fetch('https://hashir123.app.n8n.cloud/webhook-test/1f621170-f7a2-4939-b127-87696035fc33', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ input }),
  });

  const data = await webhookRes.json();
  return Response.json({ summary: data.summary });
}
