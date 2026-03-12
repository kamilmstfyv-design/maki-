// Querying with "sanityFetch" will keep content automatically updated
// Before using it, import and render "<SanityLive />" in your layout, see
// https://github.com/sanity-io/next-sanity#live-content-api for more information.
import { defineLive } from "next-sanity/live";
import { getSanityClient } from "./client";

const client = getSanityClient();

export const { sanityFetch, SanityLive } = client
  ? defineLive({ client })
  : ({
      sanityFetch: async () => {
        throw new Error(
          "Sanity client is not configured. Set NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET.",
        );
      },
      SanityLive: () => null,
    } as any);
