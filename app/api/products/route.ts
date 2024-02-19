import { NextResponse } from "next/server";
import { prisma } from '@/prisma/prisma';

export async function GET(request: any, { params }: any) {
    const products = await prisma.product.findMany();
    return NextResponse.json(products);
}

export async function POST(request: any, { params }: any) {
    const {name, description, category} = await request.json();

    const newProduct = await prisma.product.create({
        data: {
            name,
            description,
            category
        }
    });

    return NextResponse.json(newProduct);
}