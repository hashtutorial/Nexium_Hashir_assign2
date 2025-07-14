import { supabase } from '@/lib/supabase';
import { connectToDatabase } from '@/lib/mongo';
import BlogText from '@/models/BlogText';

import * as cheerio from 'cheerio';

export const dynamic = 'force-dynamic';


//simulated Urdu dictionary for translation so whole sentences may not translate perfectly
//In a real application, I would use a proper translation service(api).
const urduDictionary: Record<string, string> = {
  blog: 'بلاگ',
  summary: 'خلاصہ',
  technology: 'ٹیکنالوجی',
  learning: 'سیکھنا',
  modern: 'جدید',
  world: 'دنیا',
  this: 'یہ',
  is: 'ہے',
  about: 'کے بارے میں',
  and: 'اور',
  in: 'میں',
  the: '',
  of: 'کا',
  a: 'ایک',
  to: 'کو',
  for: 'کے لیے',
  from: 'سے',
  with: 'کے ساتھ',
  you: 'آپ',
  we: 'ہم',
  they: 'وہ',
  it: 'یہ',
  he: 'وہ',
  she: 'وہ',
  on: 'پر',
  that: 'وہ',
  was: 'تھا',
  were: 'تھے',
  are: 'ہیں',
  be: 'ہونا',
  as: 'جیسے',
  an: 'ایک',
  important: 'اہم',
  use: 'استعمال',
  used: 'استعمال کیا گیا',
  can: 'سکتا ہے',
  make: 'بنانا',  
  done: 'مکمل',
  cannot: 'نہیں کر سکتا',
  will: 'ہوگا',
  improve: 'بہتر بنانا',
  performance: 'کارکردگی',
  speed: 'رفتار',
  application: 'درخواست',
  system: 'نظام',
  user: 'صارف',
  experience: 'تجربہ',
  fast: 'تیز',
  slow: 'سست',
  information: 'معلومات',
  internet: 'انٹرنیٹ',
  data: 'ڈیٹا',
  process: 'عمل',
  content: 'مواد',
  access: 'رسائی',
  help: 'مدد',
};

async function scrapeTextFromUrl(url: string): Promise<string> {
  try {
    const res = await fetch(url);
    const html = await res.text();
    const $ = cheerio.load(html);

    let text = '';
    $('p').each((_, el) => {
      const paragraph = $(el).text();
      if (paragraph.length > 40) text += paragraph + '\n';
    });

    return text.trim() || 'No readable content found.';
  } catch (err) {
    console.error('Error scraping:', err);
    return 'Failed to scrape blog content.';
  }
}

//Simulate summary logic: (first 30 words)
function simulateSummary(text: string): string {
  return text.split(/\s+/).slice(0, 30).join(' ') + '...';
}


function translateToUrdu(english: string): string {
  return english
    .split(/\s+/)
    .map((word) => urduDictionary[word.toLowerCase()] || word)
    .join(' ');
}

export async function POST(req: Request) {
  const { input } = await req.json();

  if (!input || typeof input !== 'string') {
    return new Response(JSON.stringify({ error: 'Invalid input' }), {
      status: 400,
    });
  }

  //Scrape blog content
  const scrapedText = await scrapeTextFromUrl(input);

  //Simulate summary
  const simulatedSummary = simulateSummary(scrapedText);

  //Translate to Urdu
  const translated = translateToUrdu(simulatedSummary);

  //Save summary in Supabase
  await supabase.from('summaries').insert([
    {
      input,
      summary: translated,
    },
  ]);

  //Save full blog text in MongoDB
  await connectToMongo();
  await BlogText.create({
    input,
    content: scrapedText,
  });

  // Return translated summary
  return new Response(JSON.stringify({ summary: translated }), {
    headers: { 'Content-Type': 'application/json' },
  });
}
