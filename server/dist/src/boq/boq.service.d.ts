import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
export declare class BoqService {
    private prisma;
    constructor(prisma: PrismaService);
    createQuotation(data: Prisma.QuotationCreateInput): Promise<{
        items: {
            id: string;
            quotationId: string;
            description: string;
            quantity: number;
            unitPrice: Prisma.Decimal;
            totalPrice: Prisma.Decimal;
        }[];
        milestones: {
            id: string;
            quotationId: string;
            name: string;
            percentage: Prisma.Decimal;
            amount: Prisma.Decimal;
            isPaid: boolean;
        }[];
    } & {
        id: string;
        projectId: string;
        totalAmount: Prisma.Decimal;
        taxAmount: Prisma.Decimal;
        status: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getQuotation(id: string): Promise<({
        project: {
            id: string;
            title: string;
            description: string | null;
            status: import(".prisma/client").$Enums.ProjectStatus;
            budget: Prisma.Decimal | null;
            leadId: string | null;
            managerId: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
        items: {
            id: string;
            quotationId: string;
            description: string;
            quantity: number;
            unitPrice: Prisma.Decimal;
            totalPrice: Prisma.Decimal;
        }[];
        milestones: {
            id: string;
            quotationId: string;
            name: string;
            percentage: Prisma.Decimal;
            amount: Prisma.Decimal;
            isPaid: boolean;
        }[];
    } & {
        id: string;
        projectId: string;
        totalAmount: Prisma.Decimal;
        taxAmount: Prisma.Decimal;
        status: string;
        createdAt: Date;
        updatedAt: Date;
    }) | null>;
    updateStatus(id: string, status: string): Promise<{
        id: string;
        projectId: string;
        totalAmount: Prisma.Decimal;
        taxAmount: Prisma.Decimal;
        status: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    addPaymentMilestone(quotationId: string, data: Prisma.PaymentMilestoneCreateWithoutQuotationInput): Promise<{
        id: string;
        quotationId: string;
        name: string;
        percentage: Prisma.Decimal;
        amount: Prisma.Decimal;
        isPaid: boolean;
    }>;
}
