export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const body = await req.json();
  const input = body.input;

  const webhookRes = await fetch('https://hashir123.app.n8n.cloud/webhook-test/blog-summarizer', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ input }),
  });

  const data = await webhookRes.json();
  console.log("SUMMARY FROM n8n:", data.summary); 
  return Response.json({ summary: data.summary });
}
