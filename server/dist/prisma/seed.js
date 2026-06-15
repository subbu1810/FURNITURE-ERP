"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = __importStar(require("bcrypt"));
const prisma = new client_1.PrismaClient();
async function main() {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const company = await prisma.company.create({
        data: {
            name: 'Luxe Interiors & Furniture',
            address: 'Design Street, Mumbai',
            gstNumber: '27AAAAA0000A1Z5',
        },
    });
    const unit = await prisma.branch.create({
        data: {
            name: 'Main Manufacturing Unit',
            type: client_1.BranchType.MANUFACTURING_UNIT,
            companyId: company.id,
            address: 'Industrial Area, Mumbai',
        },
    });
    const outlet = await prisma.branch.create({
        data: {
            name: 'South Mumbai Showroom',
            type: client_1.BranchType.OUTLET,
            companyId: company.id,
            address: 'South Mumbai',
        },
    });
    await prisma.user.create({
        data: {
            email: 'admin@luxe.com',
            password: hashedPassword,
            fullName: 'Super Admin',
            role: client_1.UserRole.SUPER_ADMIN,
            companyId: company.id,
            branchId: outlet.id,
        },
    });
    console.log('Seed data created successfully!');
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map