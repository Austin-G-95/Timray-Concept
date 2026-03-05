import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ message: 'No file uploaded' }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Ensure uploads directory exists
        const uploadDir = join(process.cwd(), 'public', 'uploads');
        try {
            await mkdir(uploadDir, { recursive: true });
        } catch (e) { }

        // Generate unique filename
        const filename = `${uuidv4()}-${file.name}`;
        const path = join(uploadDir, filename);

        await writeFile(path, buffer);
        console.log(`File uploaded to ${path}`);

        return NextResponse.json({
            message: 'File uploaded successfully',
            url: `/uploads/${filename}`
        });
    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json({ message: 'Error uploading file' }, { status: 500 });
    }
}
