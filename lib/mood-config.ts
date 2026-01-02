// Mood configuration for the unified 2026 experience
export type MoodId = 'ambitious' | 'calm' | 'bold' | 'minimal'

export interface MoodConfig {
    id: MoodId
    name: string
    message: string
    description: string
    celebration: string
    colors: {
        bg: string
        primary: string
        accent: string
    }
}

export const MOODS: MoodConfig[] = [
    {
        id: 'ambitious',
        name: 'Ambitious',
        message: '2026 – Build. Push. Win.',
        description: 'Fast, energetic, powerful',
        celebration: 'The year of ambition begins!',
        colors: {
            bg: '#1a0f0a',
            primary: '#ff6b35',
            accent: '#ffcc33',
        },
    },
    {
        id: 'calm',
        name: 'Calm',
        message: '2026 – Stay calm. Stay focused.',
        description: 'Peaceful, breathing, centered',
        celebration: 'Peace finds you in 2026',
        colors: {
            bg: '#0a1a0f',
            primary: '#4ade80',
            accent: '#22d3ee',
        },
    },
    {
        id: 'bold',
        name: 'Bold',
        message: '2026 – No limits.',
        description: 'Futuristic, sharp, confident',
        celebration: 'The future is yours',
        colors: {
            bg: '#0a0f1a',
            primary: '#00d9ff',
            accent: '#a855f7',
        },
    },
    {
        id: 'minimal',
        name: 'Minimal',
        message: '2026 begins.',
        description: 'Simple, poetic, pure',
        celebration: '✧ 2026 ✧',
        colors: {
            bg: '#0a0a0a',
            primary: '#ffffff',
            accent: '#a0a0a0',
        },
    },
]

export function getMoodById(id: string): MoodConfig | undefined {
    return MOODS.find((mood) => mood.id === id)
}

export function getMoodMessage(id: string, userName: string): string {
    const mood = getMoodById(id)
    if (!mood) return `${userName}, your 2026 begins.`
    return `${userName}, your ${mood.name} 2026 begins.`
}
