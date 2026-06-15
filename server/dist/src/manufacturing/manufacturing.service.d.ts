import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
export declare class ManufacturingService {
    private prisma;
    constructor(prisma: PrismaService);
    createBOM(data: Prisma.BOMCreateInput): Promise<{
        items: ({
            material: {
                id: string;
                sku: string;
                name: string;
                unit: string;
                costPerUnit: Prisma.Decimal;
                createdAt: Date;
                updatedAt: Date;
            };
        } & {
            id: string;
            bomId: string;
            materialId: string;
            quantity: Prisma.Decimal;
        })[];
    } & {
        id: string;
        productId: string;
        name: string;
        createdAt: Date;
    }>;
    getBOMByProduct(productId: string): Promise<({
        items: ({
            material: {
                id: string;
                sku: string;
                name: string;
                unit: string;
                costPerUnit: Prisma.Decimal;
                createdAt: Date;
                updatedAt: Date;
            };
        } & {
            id: string;
            bomId: string;
            materialId: string;
            quantity: Prisma.Decimal;
        })[];
    } & {
        id: string;
        productId: string;
        name: string;
        createdAt: Date;
    })[]>;
    createMaterial(data: Prisma.RawMaterialCreateInput): Promise<{
        id: string;
        sku: string;
        name: string;
        unit: string;
        costPerUnit: Prisma.Decimal;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getAllMaterials(): Promise<{
        id: string;
        sku: string;
        name: string;
        unit: string;
        costPerUnit: Prisma.Decimal;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    createProductionOrder(productId: string, quantity: number): Promise<{
        message: string;
        productId: string;
        quantity: number;
        status: string;
    }>;
}
