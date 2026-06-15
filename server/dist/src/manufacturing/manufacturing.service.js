"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManufacturingService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ManufacturingService = class ManufacturingService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createBOM(data) {
        return this.prisma.bOM.create({
            data,
            include: { items: { include: { material: true } } },
        });
    }
    async getBOMByProduct(productId) {
        return this.prisma.bOM.findMany({
            where: { productId },
            include: { items: { include: { material: true } } },
        });
    }
    async createMaterial(data) {
        return this.prisma.rawMaterial.create({ data });
    }
    async getAllMaterials() {
        return this.prisma.rawMaterial.findMany();
    }
    async createProductionOrder(productId, quantity) {
        return {
            message: 'Production order created',
            productId,
            quantity,
            status: 'PENDING',
        };
    }
};
exports.ManufacturingService = ManufacturingService;
exports.ManufacturingService = ManufacturingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ManufacturingService);
//# sourceMappingURL=manufacturing.service.js.map