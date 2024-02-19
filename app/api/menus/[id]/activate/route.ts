import { NextResponse } from "next/server";
import { prisma } from '@/prisma/prisma';

export async function POST(request: any, { params }: any) {
    
    await prisma.menu.updateMany({
        data: {
            active: false
        }
    });

    const activeMenu = await prisma.menu.update({
        where: {
            id: Number(params.id)
        }, data: {
            active: true
        }
    });

    return NextResponse.json(activeMenu);
}