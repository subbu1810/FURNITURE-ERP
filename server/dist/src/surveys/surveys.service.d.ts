import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
export declare class SurveysService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: Prisma.SurveyCreateInput): Promise<{
        id: string;
        projectId: string;
        details: Prisma.JsonValue;
        photos: Prisma.JsonValue | null;
        createdAt: Date;
    }>;
    findByProject(projectId: string): Promise<{
        id: string;
        projectId: string;
        details: Prisma.JsonValue;
        photos: Prisma.JsonValue | null;
        createdAt: Date;
    }[]>;
    update(id: string, data: Prisma.SurveyUpdateInput): Promise<{
        id: string;
        projectId: string;
        details: Prisma.JsonValue;
        photos: Prisma.JsonValue | null;
        createdAt: Date;
    }>;
}
