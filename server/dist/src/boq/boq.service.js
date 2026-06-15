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
exports.BoqService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let BoqService = class BoqService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createQuotation(data) {
        return this.prisma.quotation.create({
            data,
            include: { items: true, milestones: true },
        });
    }
    async getQuotation(id) {
        return this.prisma.quotation.findUnique({
            where: { id },
            include: { items: true, milestones: true, project: true },
        });
    }
    async updateStatus(id, status) {
        return this.prisma.quotation.update({
            where: { id },
            data: { status },
        });
    }
    async addPaymentMilestone(quotationId, data) {
        return this.prisma.paymentMilestone.create({
            data: {
                ...data,
                quotationId,
            },
        });
    }
};
exports.BoqService = BoqService;
exports.BoqService = BoqService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BoqService);
//# sourceMappingURL=boq.service.js.map