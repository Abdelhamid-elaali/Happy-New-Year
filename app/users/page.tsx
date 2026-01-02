import { prisma } from "@/lib/prisma"
import { format } from "date-fns"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

// Force dynamic rendering so we always get the latest list
export const dynamic = "force-dynamic"

export default async function UsersPage() {
    const cookieStore = await cookies()
    const isAuthenticated = cookieStore.get("admin-token")

    if (!isAuthenticated) {
        redirect("/api/auth/challenge")
    }

    const users = await prisma.user.findMany({
        orderBy: {
            createdAt: "desc",
        },
    })

    return (
        <div className="min-h-screen bg-black text-white p-8 font-sans">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <Link
                        href="/enter"
                        className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
                    >
                        <ArrowLeft size={20} />
                        <span>Back</span>
                    </Link>
                </div>

                <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                    Registered Users ({users.length})
                </h1>

                <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden backdrop-blur-sm">
                    <table className="w-full text-left">
                        <thead className="bg-white/5 border-b border-white/10">
                            <tr>
                                <th className="p-4 font-semibold text-gray-300">ID</th>
                                <th className="p-4 font-semibold text-gray-300">Name</th>
                                <th className="p-4 font-semibold text-gray-300">Mood</th>
                                <th className="p-4 font-semibold text-gray-300">Date Registered</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {users.map((user) => (
                                <tr key={user.id} className="hover:bg-white/5 transition-colors">
                                    <td className="p-4 text-gray-500 font-mono text-sm">{user.id}</td>
                                    <td className="p-4 font-medium text-blue-200">{user.name}</td>
                                    <td className="p-4">
                                        {user.mood ? (
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${user.mood === 'ambitious' ? 'bg-orange-500/20 text-orange-400' :
                                                user.mood === 'calm' ? 'bg-green-500/20 text-green-400' :
                                                    user.mood === 'bold' ? 'bg-blue-500/20 text-blue-400' :
                                                        'bg-white/10 text-white/60'
                                                }`}>
                                                {user.mood}
                                            </span>
                                        ) : (
                                            <span className="text-gray-600">—</span>
                                        )}
                                    </td>
                                    <td className="p-4 text-gray-400 text-sm">
                                        {format(user.createdAt, "PPP 'at' pp")}
                                    </td>
                                </tr>
                            ))}
                            {users.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="p-8 text-center text-gray-500">
                                        No users registered yet.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="mt-8 text-sm text-gray-600">
                    <p>Admin view • Data from PostgreSQL database</p>
                </div>
            </div>
        </div>
    )
}
