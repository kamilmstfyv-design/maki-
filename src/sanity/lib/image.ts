import createImageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

import { requireSanityEnv } from '../env'

// https://www.sanity.io/docs/image-url
let builder: ReturnType<typeof createImageUrlBuilder> | null = null

export const urlFor = (source: SanityImageSource) => {
  if (!builder) {
    const { projectId, dataset } = requireSanityEnv()
    builder = createImageUrlBuilder({ projectId, dataset })
  }
  return builder.image(source)
}
