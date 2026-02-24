const wpCache = new Map();
export async function queryWordPress(query, variables = {}) {
  const endpoint = import.meta.env.WP_API_URL || "https://admin.greenmountainfencecompany.com/graphql";
  const cacheKey = JSON.stringify({ query, variables });
  if (wpCache.has(cacheKey)) {
    return wpCache.get(cacheKey);
  }
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (Astro-SSR-Bot)",
        "Connection": "keep-alive"
      },
      body: JSON.stringify({ query, variables }),
    });

    if (!response.ok) {
      return null;
    }

    const json = await response.json();
    
    if (json.errors) {
      return null;
    }
    wpCache.set(cacheKey, json.data);
    return json.data;
  } catch (error) {
    return null;
  }
}