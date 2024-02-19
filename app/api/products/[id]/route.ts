import { NextResponse } from "next/server";
import { prisma } from '@/prisma/prisma';

export async function GET(request: any, { params }: any) {
    const product = await prisma.product.findUnique({
        where: {
            id: Number(params.id)
        }
    });
    return NextResponse.json(product);
}

export async function PUT(request: any, { params }: any) {
    const data = await request.json();

    try {
        const productUpdated = await prisma.product.update({
            where: {
                id: Number(params.id)
            }, data: data
        });

        return NextResponse.json(productUpdated);
    } catch (error: any) {
        return NextResponse.json(error.message);
    }
}

export async function DELETE(request: any, { params }: any) {
    try {
        const productRemove = await prisma.product.delete({
            where: {
                id: Number(params.id)
            }
        });

        return NextResponse.json(productRemove);
    } catch (error: any) {
        return NextResponse.json(error.message);
    }
}