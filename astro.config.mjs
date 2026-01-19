// // @ts-check

// import mdx from '@astrojs/mdx';
// import sitemap from '@astrojs/sitemap';
// import { defineConfig } from 'astro/config';

// import react from '@astrojs/react';
// import node from '@astrojs/node';

// import vercel from '@astrojs/vercel';

// // https://astro.build/config
// export default defineConfig({
//   site: 'https://example.com',
//   integrations: [mdx(), sitemap(), react()],

//   adapter: vercel(),
// });


import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel/serverless'; // This is the key change

export default defineConfig({
  site: 'https://greenmountainfencecompany.vercel.app',
  integrations: [mdx(), sitemap(), react()],
  output: 'server', // This allows your React components to handle dynamic logic
  adapter: vercel(),
});