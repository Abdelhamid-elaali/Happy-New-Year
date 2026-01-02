import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

const moodSchema = z.object({
    mood: z.enum(["ambitious", "calm", "bold", "minimal"]),
})

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const userId = parseInt(id, 10)

        if (isNaN(userId)) {
            return NextResponse.json(
                { success: false, error: "Invalid user ID" },
                { status: 400 }
            )
        }

        const body = await request.json()
        const { mood } = moodSchema.parse(body)

        const user = await prisma.user.update({
            where: { id: userId },
            data: { mood },
        })

        return NextResponse.json({ success: true, user })
    } catch (error) {
        console.error("Mood update error:", error)

        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { success: false, error: error.errors[0].message },
                { status: 400 }
            )
        }

        return NextResponse.json(
            { success: false, error: "Failed to update mood" },
            { status: 500 }
        )
    }
}
