import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class SurveysService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.SurveyCreateInput) {
    return this.prisma.survey.create({ data });
  }

  async findByProject(projectId: string) {
    return this.prisma.survey.findMany({
      where: { projectId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async update(id: string, data: Prisma.SurveyUpdateInput) {
    return this.prisma.survey.update({
      where: { id },
      data,
    });
  }
}
