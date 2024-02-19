import { NextResponse } from "next/server";
import { prisma } from '@/prisma/prisma';

export async function GET(request: any, { params }: any) {
    const menu = await prisma.menu.findFirst({
        where: {
            active: true
        },
        include: {
            products: {
                include: {
                    product: true
                }
            }
        }
    });

    const { id, title, description, active, products }: any = menu;
    const formattedProducts = products.map(({ price, product }: any) => {
        return { ...product, price }
    });

    const activeMenu = {id, title, description, active, products: formattedProducts};

    return NextResponse.json(activeMenu);
}