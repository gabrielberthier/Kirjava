import { env } from "$env/dynamic/public";

// remove this if you do not want your pages to be prerendered
export const prerender = env.PUBLIC_USE_LOCAL || false
