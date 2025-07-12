This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) 
for more details.

### Daily log:

##  Day 1: n8n Webhooks Integration
- Successfully set up and activated a dedicated n8n cloud instance.
- Understood the role of webhooks and how they enable external services to push data into workflows.
- Created a Webhook node with the POST method and tested it with JSON input.
- Verified successful data reception in n8n's execution panel.
- Ready to process and summarize the data using LLMs in the next step.

##  Day 2: LLM Agents & AI Flows in n8n
Explored LLM Chain node in n8n for integrating AI summarization into workflows.
Configured a webhook trigger and tested blog content input via Postman.
Crafted an optimized prompt to extract concise blog summaries in bullet format.
Verified LLM output and ensured the input content was correctly parsed and summarized.
Successfully built a working blog summarizer agent with AI + automation in n8n.

## Day 9: LLM Chains & AI Agents in n8n
Configured the LLM Request node using Together AI with the Mixtral-8x7B-Instruct model for generating blog summaries.
Designed a clear summarization prompt using {{ $json.body.input }} and ensured correct JSON body formatting.
Linked the LLM output to a Set node and finalized response handling using the Respond to Webhook node.
Confirmed smooth end-to-end flow of blog content → LLM summary → frontend via API.