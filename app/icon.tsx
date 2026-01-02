import { ImageResponse } from 'next/og'
import { readFileSync } from 'fs'
import { join } from 'path'

// Route segment config
export const runtime = 'nodejs'

// Image metadata
export const size = {
    width: 256,
    height: 256,
}
export const contentType = 'image/png'

// Image generation
export default function Icon() {

    const filePath = join(process.cwd(), 'public', 'Happy Year.png')
    const file = readFileSync(filePath)

    // Convert buffer to base64 data URL for the img src
    const src = `data:image/png;base64,${file.toString('base64')}`

    return new ImageResponse(
        (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'transparent',
                }}
            >
                <img
                    src={src}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: '20%',
                    }}
                />
            </div>
        ),
        {
            ...size,
        }
    )
}
