// INTERFACE FOR FETCHOPTIONS
export interface FetchOptions {
  type?: string;
  season?: string;
  format?: string;
  sort?: string[];
  genres?: string[];
  id?: string;
  year?: string;
  status?: string;
}

// Error handling function
// Function to handle errors and throw appropriately
function handleError(error: any, context: string) {
  let errorMessage = "An error occurred";

  // Handling CORS errors (Note: This is a simplification. Real CORS errors are hard to catch in JS)
  if (error.message && error.message.includes("Access-Control-Allow-Origin")) {
    errorMessage = "A CORS error occurred";
  }

  switch (context) {
    case "data":
      errorMessage = "Error fetching data";
      break;
    case "anime episodes":
      errorMessage = "Error fetching anime episodes";
      break;
    // Extend with other cases as needed
  }

  if (error.response) {
    // Extend with more nuanced handling based on HTTP status codes
    const status = error.response.status;
    if (status >= 500) {
      errorMessage += ": Server error";
    } else if (status >= 400) {
      errorMessage += ": Client error";
    }
    // Include server-provided error message if available
    errorMessage += `: ${error.response.data.message || "Unknown error"}`;
  } else if (error.message) {
    errorMessage += `: ${error.message}`;
  }

  console.error(`${errorMessage}`, error);
  throw new Error(errorMessage);
}

// Cache key generator
// Function to generate cache key from arguments
export function generateCacheKey(...args: string[]) {
  return args.join("-");
}

interface CacheItem {
  value: any; // Replace 'any' with a more specific type if possible
  timestamp: number;
}

// Session storage cache creation
// Function to create a cache in session storage
interface CacheItem {
  value: any;
  timestamp: number;
}

function createOptimizedSessionStorageCache(
  maxSize: number,
  maxAge: number,
  cacheKey: string
) {
  // Check if we are in a browser environment
  if (typeof window === "undefined" || typeof sessionStorage === "undefined") {
    console.warn("sessionStorage is not available in this environment.");
    return;
  }

  // Initialize cache from sessionStorage
  const cache = new Map<string, CacheItem>(
    JSON.parse(sessionStorage.getItem(cacheKey) || "[]")
  );
  const keys = new Set<string>(cache.keys());

  function isItemExpired(item: CacheItem) {
    return Date.now() - item.timestamp > maxAge;
  }

  function updateSessionStorage() {
    sessionStorage.setItem(
      cacheKey,
      JSON.stringify(Array.from(cache.entries()))
    );
  }

  return {
    get(key: string) {
      if (cache.has(key)) {
        const item = cache.get(key);
        if (!isItemExpired(item!)) {
          keys.delete(key);
          keys.add(key);
          return item!.value;
        }
        cache.delete(key);
        keys.delete(key);
      }
      return undefined;
    },
    set(key: string, value: any) {
      if (cache.size >= maxSize) {
        const oldestKey = keys.values().next().value;
        cache.delete(oldestKey);
        keys.delete(oldestKey);
      }
      keys.add(key);
      cache.set(key, { value, timestamp: Date.now() });
      updateSessionStorage();
    },
  };
}

// Constants for cache configuration
// Cache size and max age constants
const CACHE_SIZE = 20;
const CACHE_MAX_AGE = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

// Factory function for cache creation
// Function to create cache with given cache key
export function createCache(cacheKey: string) {
  return createOptimizedSessionStorageCache(
    CACHE_SIZE,
    CACHE_MAX_AGE,
    cacheKey
  );
}

// Fetch data from URL with caching
// Function to fetch data from URL with caching
export async function fetchData(url: string, cache: any, cacheKey: string) {
  try {
    // Attempt to retrieve the cached response using the cacheKey
    const cachedResponse = cache.get(cacheKey);
    if (cachedResponse) {
      return cachedResponse; // Return the cached response if available
    }

    // Proceed with the network request using the default URL
    const response = await fetch(url);
    const data = await response.json();

    // After obtaining the response, verify it for errors or empty data
    if (
      response.status !== 200 ||
      (data.statusCode && data.statusCode >= 400)
    ) {
      const errorMessage = data.message || "Unknown server error";
      throw new Error(
        `Server error: ${data.statusCode || response.status} ${errorMessage}`
      );
    }

    // Assuming response data is valid, store it in the cache
    cache.set(cacheKey, data);

    return data; // Return the newly fetched data
  } catch (error) {
    handleError(error, "data");
    throw error; // Rethrow the error for the caller to handle
  }
}
