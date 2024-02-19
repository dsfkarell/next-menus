import { NextResponse } from "next/server";
import { prisma } from '@/prisma/prisma';

export async function GET(request: any, { params }: any) {
    const menus = await prisma.menu.findMany({
        include: {
            products: {
                include: {
                    product: true
                }
            }
        },
    });

    const formattedMenus = menus.map(menu => {
        const { id, title, description, active, products } = menu;
        const formattedProducts = products.map(({ price, product }) => {
            return { ...product, price }
        });

        return {
            id,
            title,
            description,
            active,
            products: formattedProducts
        };
    });

    return NextResponse.json(formattedMenus);
}

export async function POST(request: any, { params }: any) {
    const { title, description, products } = await request.json();

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

    const newMenu = await prisma.menu.create({
        data: {
            title,
            description,
            products: {
                create: productsInMenu
            },
            active: await prisma.menu.count() === 0 ? true : false
        }
    });

    return NextResponse.json(newMenu);
}