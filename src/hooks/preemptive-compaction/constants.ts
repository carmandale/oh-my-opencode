// Trigger compaction when context reaches this percentage of limit
// Lowered from 0.85 to 0.70 to give more headroom before overflow
export const DEFAULT_THRESHOLD = 0.70

// Emergency threshold - bypass cooldown and compact immediately
// This prevents the fatal "prompt too long" error
export const EMERGENCY_THRESHOLD = 0.90

// Minimum tokens before compaction is considered
// Prevents unnecessary compaction on small sessions
export const MIN_TOKENS_FOR_COMPACTION = 50_000

// Normal cooldown between compactions (1 minute)
export const COMPACTION_COOLDOWN_MS = 60_000

// Reduced cooldown for high-usage situations (10 seconds)
// Used when context is between DEFAULT_THRESHOLD and EMERGENCY_THRESHOLD
export const COMPACTION_COOLDOWN_HIGH_USAGE_MS = 10_000
