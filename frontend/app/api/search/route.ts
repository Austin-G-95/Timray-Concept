import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const query = searchParams.get('q');

        if (!query || query.trim().length === 0) {
            return NextResponse.json([]);
        }

        const searchTerm = query.trim().toLowerCase();

        // Search products by name, description, and category
        const products = await prisma.product.findMany({
            where: {
                OR: [
                    { name: { contains: searchTerm } },
                    { description: { contains: searchTerm } },
                    { category: { contains: searchTerm } },
                ],
            },
            orderBy: { createdAt: 'desc' },
            take: 20,
        });

        return NextResponse.json(products);
    } catch (error) {
        console.error('Search error:', error);
        return NextResponse.json({ message: 'Error searching products' }, { status: 500 });
    }
}
