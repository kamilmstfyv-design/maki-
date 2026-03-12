export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-03-05'

// Deployment-safe: these may be undefined during build if env vars aren't set yet.
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID

export function hasSanityEnv() {
  return Boolean(projectId && dataset)
}

export function requireSanityEnv() {
  if (!projectId) {
    throw new Error('Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID')
  }
  if (!dataset) {
    throw new Error('Missing environment variable: NEXT_PUBLIC_SANITY_DATASET')
  }
  return { projectId, dataset, apiVersion }
}
