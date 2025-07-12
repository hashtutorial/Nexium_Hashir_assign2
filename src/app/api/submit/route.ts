import { PrismaClient } from '@/generated/prisma';

const prisma = new PrismaClient();

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const body = await req.json();
  const input = body.input;

  //capture IP from request headers
  const ip =
    req.headers.get('x-forwarded-for') ||
    req.headers.get('x-real-ip') ||
    'Unknown';

  //forward to n8n webhook
  const webhookRes = await fetch('https://hashir123.app.n8n.cloud/webhook/summarize-blog', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ input }),
  });

  const data = await webhookRes.json();
  const summary = data.summary;

  console.log("SUMMARY FROM n8n:", summary);

  //save to PostgreSQL
  await prisma.summary.create({
    data: {
      content: input,
      summary,
      ip,
    },
  });

  return Response.json({ summary });
}
