export const colors = {
    background: "#0F0F18",
    surface: "#1A1A24",
    surfaceElevated: "rgba(255,255,255,0.06)",
    border: "rgba(255,255,255,0.08)",
    borderSubtle: "rgba(255,255,255,0.06)",
    textPrimary: "#fff",
    textSecondary: "#A0A0B0",
    textMuted: "rgba(255,255,255,0.35)",
    accent: "#8B5CF6",
    accentLight: "rgba(139,92,246,0.25)",
    accentSubtle: "rgba(139,92,246,0.12)",
    accentGlow: "rgba(139,92,246,0.4)",
    success: "#22C55E",
    warning: "#F59E0B",
    destructive: "#EF4444",
    purple: "#A78BFA",
    teal: "#14B8A6",
    tealLight: "rgba(20,184,166,0.2)",
    overBudget: "#EF4444",
    saved: "#22C55E",
} as const;

export const spacing = {
    0: 0,
    1: 4,
    2: 8,
    3: 12,
    4: 16,
    5: 20,
    6: 24,
    7: 28,
    8: 32,
    9: 36,
    10: 40,
    11: 44,
    12: 48,
    14: 56,
    16: 64,
    18: 72,
    20: 80,
    24: 96,
    30: 120,
} as const;

export const components = {
    tabBar: {
        height: spacing[18],
        horizontalInset: spacing[5],
        radius: spacing[8],
        iconFrame: spacing[7],
        itemPaddingVertical: spacing[2],
    },
} as const;

export const theme = {
    colors,
    spacing,
    components,
} as const;