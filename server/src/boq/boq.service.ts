import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class BoqService {
  constructor(private prisma: PrismaService) {}

  async createQuotation(data: Prisma.QuotationCreateInput) {
    return this.prisma.quotation.create({
      data,
      include: { items: true, milestones: true },
    });
  }

  async getQuotation(id: string) {
    return this.prisma.quotation.findUnique({
      where: { id },
      include: { items: true, milestones: true, project: true },
    });
  }

  async updateStatus(id: string, status: string) {
    return this.prisma.quotation.update({
      where: { id },
      data: { status },
    });
  }

  async addPaymentMilestone(quotationId: string, data: Prisma.PaymentMilestoneCreateWithoutQuotationInput) {
    return this.prisma.paymentMilestone.create({
      data: {
        ...data,
        quotationId,
      },
    });
  }
}
