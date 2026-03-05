import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user || !session.user.id) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const { productId } = await req.json();

        if (!productId) {
            return NextResponse.json({ message: 'Product ID required' }, { status: 400 });
        }

        // Check if already wishlisted
        const existing = await prisma.wishlist.findUnique({
            where: {
                userId_productId: {
                    userId: session.user.id,
                    productId,
                },
            },
        });

        if (existing) {
            // Remove
            await prisma.wishlist.delete({
                where: { id: existing.id },
            });
            return NextResponse.json({ message: 'Removed from wishlist', added: false });
        } else {
            // Add
            await prisma.wishlist.create({
                data: {
                    userId: session.user.id,
                    productId,
                },
            });
            return NextResponse.json({ message: 'Added to wishlist', added: true });
        }

    } catch (error) {
        console.error('Wishlist error:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}

export async function GET(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user || !session.user.id) {
            // Return empty for unauthorized, or 401. Let's return empty array.
            return NextResponse.json([], { status: 200 });
        }

        const wishlist = await prisma.wishlist.findMany({
            where: { userId: session.user.id },
            select: { productId: true }
        });

        return NextResponse.json(wishlist.map(w => w.productId));

    } catch (error) {
        console.error('Wishlist fetch error:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
