import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export function getSanityClient() {
  if (!projectId || !dataset) return null
  return createClient({
    projectId,
    dataset,
    apiVersion,
    // Disable CDN so newly published content appears immediately
    useCdn: false,
  })
}
