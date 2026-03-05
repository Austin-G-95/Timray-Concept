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

        const data = await req.json();
        const { items, total, status, reference } = data;

        const order = await prisma.order.create({
            data: {
                userId: session.user.id,
                total: parseFloat(total),
                status: status || 'PAID',
                reference: reference,
                orderItems: {
                    create: items.map((item: any) => ({
                        productId: item.productId || item.id,
                        quantity: item.quantity,
                        price: parseFloat(item.price)
                    }))
                }
            },
            include: {
                orderItems: true
            }
        });

        return NextResponse.json(order, { status: 201 });
    } catch (error) {
        console.error('Create order error:', error);
        return NextResponse.json({ message: 'Error creating order' }, { status: 500 });
    }
}

export async function GET(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user || !session.user.id) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const userId = session.user.id;
        const orders = await prisma.order.findMany({
            where: {
                userId: userId
            },
            include: {
                orderItems: {
                    include: {
                        product: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return NextResponse.json(orders);
    } catch (error) {
        console.error('Fetch orders error:', error);
        return NextResponse.json({ message: 'Error fetching orders' }, { status: 500 });
    }
}
