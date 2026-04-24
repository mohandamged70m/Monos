export const colors = {
    background: "#0A0A0F",
    surface: "#12123b",
    surfaceElevated: "rgba(255,255,255,0.06)",
    border: "rgba(255,255,255,0.06)",
    borderSubtle: "rgba(255,255,255,0.07)",
    textPrimary: "#fff",
    textSecondary: "#ccc",
    textMuted: "rgba(255,255,255,0.35)",
    accent: "#7c3aed",
    accentLight: "rgba(124,58,237,0.25)",
    accentSubtle: "rgba(124,58,237,0.15)",
    accentGlow: "rgba(124,58,237,0.3)",
    success: "#4ade80",
    warning: "#f59e0b",
    destructive: "#f87171",
    purple: "#c4b5fd",
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
        iconFrame: spacing[12],
        itemPaddingVertical: spacing[2],
    },
} as const;

export const theme = {
    colors,
    spacing,
    components,
} as const;