import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

const registerSchema = z.object({
    name: z.string().min(1, "Name is required").max(20, "Name must be 20 characters or less"),
})

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { name } = registerSchema.parse(body)

        const user = await prisma.user.create({
            data: {
                name,
            },
        })

        return NextResponse.json({ success: true, user })
    } catch (error) {
        console.error("Registration error:", error)

        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { success: false, error: error.errors[0].message },
                { status: 400 }
            )
        }

        return NextResponse.json(
            { success: false, error: "Failed to register user" },
            { status: 500 }
        )
    }
}
