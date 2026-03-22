export async function fetchStrapiData<T>(endpoint: string): Promise<T> {
  try {
    const response = await fetch(`${import.meta.env.STRAPI_URL}/api${endpoint}`);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch data from Strapi: ${response.status} ${response.statusText}`
      );
    }
    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}