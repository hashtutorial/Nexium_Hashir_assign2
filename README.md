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

### Daily log: Blog Summarizer — Assignment 2

### Day 1: Project Setup

Set up project folder `assignment-2/` using Next.js and TypeScript.

### Day 2: Static AI Summary & Urdu Translation

* Wrote static logic in `routes.ts` to simulate AI summarization (first 10 words).
* Built a custom English-to-Urdu dictionary using JavaScript `Record<string, string>`.
* Implemented the `translateToUrdu()` function to convert simulated summary.
* Verified the Urdu summary output via frontend POST requests.
* Confirmed fallback handling for unknown words during translation.

---

### Day 3: MongoDB (Unstructured Data) Integration

* Created a `BlogText` Mongoose model for full blog content storage.
* Connected to MongoDB Atlas via URI and `.env` config.
* Stored full scraped blog text along with user input and IP address.
* Verified document creation via MongoDB Atlas dashboard.

---

### Day 4: Supabase (Structured Summary Storage)

* Initialized Supabase project and generated `SUPABASE_URL` and `ANON_KEY`.
* Created a `summaries` table with fields: input, summary, ip\_address, created\_at.
* Connected Supabase to the Next.js app using `@supabase/supabase-js`.
* Successfully inserted Urdu summaries to Supabase on blog submission.

---

### Day 5: Frontend with ShadCN UI

* Built a responsive blog submission UI using `Input`, `Button`, `Card`, and `Textarea` from ShadCN.
* Styled the layout using Tailwind with theme toggle (`dark`/`light` mode).
* Implemented error validation, button loading spinner, and success output.
* Used Lucide icons (`Sun`, `Moon`, `Loader2`) for theme toggle and UX polish.

---

### Day 6: Deployment & Final Testing

* Tested blog URLs from [freeCodeCamp](https://www.freecodecamp.org/news/) and confirmed summaries were accurate and translated.
* Verified Supabase and MongoDB received logs properly with IP + input + content.
* Deployed the project to Vercel from `assignment-2/` directory with live environment variables.
* Finalized a clean UI/UX with theme toggle, animation, and real-time feedback.
