import { PrismaClient } from '@/generated/prisma';

const prisma = new PrismaClient();

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const body = await req.json();
  const input = body.input;

  //capture IP address from headers
  const ip =req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'Unknown';

  //check if summary already exists for this input
  const existing = await prisma.summary.findFirst({
    where: { content: input },
  });

  if (existing) {
    console.log('Returning existing summary from database');
    return Response.json({ summary: existing.summary });
  }

  //else forward to n8n webhook for summarization
  const webhookRes = await fetch('https://hashir123.app.n8n.cloud/webhook/summarize-blog', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ input }),
  });

  const data = await webhookRes.json();
  const summary = data.summary;

  console.log('SUMMARY FROM n8n:', summary);

  //save the new summary in PostgreSQL
  await prisma.summary.create({
    data: {
      content: input,
      summary,
      ip,
    },
  });

  return Response.json({ summary });
}
