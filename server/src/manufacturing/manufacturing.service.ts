import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ManufacturingService {
  constructor(private prisma: PrismaService) {}

  // BOM Management
  async createBOM(data: Prisma.BOMCreateInput) {
    return this.prisma.bOM.create({
      data,
      include: { items: { include: { material: true } } },
    });
  }

  async getBOMByProduct(productId: string) {
    return this.prisma.bOM.findMany({
      where: { productId },
      include: { items: { include: { material: true } } },
    });
  }

  // Raw Materials
  async createMaterial(data: Prisma.RawMaterialCreateInput) {
    return this.prisma.rawMaterial.create({ data });
  }

  async getAllMaterials() {
    return this.prisma.rawMaterial.findMany();
  }

  // Production (Simplified for now)
  async createProductionOrder(productId: string, quantity: number) {
    // Logic to check BOM and deduct materials would go here
    // For now, just a placeholder for the workflow
    return {
      message: 'Production order created',
      productId,
      quantity,
      status: 'PENDING',
    };
  }
}
