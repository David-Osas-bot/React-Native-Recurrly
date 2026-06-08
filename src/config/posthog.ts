import Constants from 'expo-constants'
import PostHog from 'posthog-react-native'

const rawApiKey = Constants.expoConfig?.extra?.posthogProjectToken as string | undefined
const rawHost = Constants.expoConfig?.extra?.posthogHost as string | undefined

const apiKey = rawApiKey?.trim()
const host = rawHost?.trim()
const isPostHogConfigured =
  !!apiKey && apiKey !== '' && apiKey !== 'phc_your_project_token_here'

if (!isPostHogConfigured) {
  console.warn(
    'PostHog project token not configured. Analytics will be disabled. ' +
      'Set POSTHOG_PROJECT_TOKEN in your .env file to enable analytics.'
  )
}

let _posthog: PostHog | null = null

export function getPostHog(): PostHog {
  if (!_posthog) {
    _posthog = new PostHog(apiKey || 'placeholder_key', {
      ...(host ? { host } : {}),
      disabled: !isPostHogConfigured,
      captureAppLifecycleEvents: true,
      flushAt: 20,
      flushInterval: 10000,
      maxBatchSize: 100,
      maxQueueSize: 1000,
      preloadFeatureFlags: true,
      sendFeatureFlagEvent: true,
      featureFlagsRequestTimeoutMs: 10000,
      requestTimeout: 10000,
      fetchRetryCount: 3,
      fetchRetryDelay: 3000,
    })
  }
  return _posthog
}