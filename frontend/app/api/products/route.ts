import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from '@/lib/prisma';

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const category = searchParams.get('category');
        const sort = searchParams.get('sort');
        const search = searchParams.get('search');
        const id = searchParams.get('id');

        // Fetch single product if ID is provided
        if (id) {
            const product = await prisma.product.findUnique({
                where: { id }
            });

            if (!product) {
                return NextResponse.json({ message: 'Product not found' }, { status: 404 });
            }

            return NextResponse.json(product);
        }

        let where: any = {};

        // Category filter
        if (category && category !== 'All') {
            where.category = category;
        }

        // Search filter - search in name, description, and category
        if (search && search.trim()) {
            const searchTerm = search.trim().toLowerCase();
            where.OR = [
                { name: { contains: searchTerm } },
                { description: { contains: searchTerm } },
                { category: { contains: searchTerm } },
            ];
        }

        let orderBy: any = {};
        if (sort === 'price-asc') {
            orderBy.price = 'asc';
        } else if (sort === 'price-desc') {
            orderBy.price = 'desc';
        } else {
            orderBy.createdAt = 'desc';
        }

        const products = await prisma.product.findMany({
            where,
            orderBy,
        });

        return NextResponse.json(products);
    } catch (error) {
        console.error('Fetch products error:', error);
        return NextResponse.json({ message: 'Error fetching products' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== 'ADMIN') {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const data = await req.json();
        const product = await prisma.product.create({
            data: {
                ...data,
                price: parseFloat(data.price),
                stock: parseInt(data.stock),
            },
        });

        return NextResponse.json(product, { status: 201 });
    } catch (error) {
        console.error('Create product error:', error);
        return NextResponse.json({ message: 'Error creating product' }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== 'ADMIN') {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const { id, ...data } = await req.json();
        const product = await prisma.product.update({
            where: { id },
            data: {
                ...data,
                price: parseFloat(data.price),
                stock: parseInt(data.stock),
            },
        });

        return NextResponse.json(product);
    } catch (error) {
        console.error('Update product error:', error);
        return NextResponse.json({ message: 'Error updating product' }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== 'ADMIN') {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ message: 'ID required' }, { status: 400 });
        }

        await prisma.product.delete({
            where: { id },
        });

        return NextResponse.json({ message: 'Product deleted' });
    } catch (error) {
        console.error('Delete product error:', error);
        return NextResponse.json({ message: 'Error deleting product' }, { status: 500 });
    }
}
