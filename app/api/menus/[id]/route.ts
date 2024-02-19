import { NextResponse } from "next/server";
import { prisma } from '@/prisma/prisma';

export async function GET(request: any, { params }: any) {
    const menu = await prisma.menu.findUnique({
        where: {
            id: Number(params.id)
        }
    });
    return NextResponse.json(menu);
}

export async function PUT(request: any, { params }: any) {
    const { title, description, products } = await request.json();

    await prisma.productsOnMenu.deleteMany({
        where: {
            menu_id: parseInt(params.id)
        }
    });

    var productsInMenu: any[] = [];

    products.forEach((p: any) => {
        productsInMenu.push(
            {
                price: parseFloat(p.price),
                product: {
                    connect: {
                        id: parseInt(p.id)
                    }
                }
            }
        );
    });

    try {
        const menuUpdated = await prisma.menu.update({
            where: {
                id: Number(params.id)
            }, data: {
                title,
                description,
                products: {
                    create: productsInMenu
                },
            }
        });

        return NextResponse.json(menuUpdated);
    } catch (error: any) {
        return NextResponse.json(error.message);
    }
}

export async function DELETE(request: any, { params }: any) {
    try {
        const menuRemove = await prisma.menu.delete({
            where: {
                id: Number(params.id)
            }
        });

        return NextResponse.json(menuRemove);
    } catch (error: any) {
        return NextResponse.json(error.message);
    }
}