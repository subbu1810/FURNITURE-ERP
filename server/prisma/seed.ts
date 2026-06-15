import { PrismaClient, UserRole, BranchType } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('admin123', 10);

  // 1. Create Company
  const company = await prisma.company.create({
    data: {
      name: 'Luxe Interiors & Furniture',
      address: 'Design Street, Mumbai',
      gstNumber: '27AAAAA0000A1Z5',
    },
  });

  // 2. Create Branches
  const unit = await prisma.branch.create({
    data: {
      name: 'Main Manufacturing Unit',
      type: BranchType.MANUFACTURING_UNIT,
      companyId: company.id,
      address: 'Industrial Area, Mumbai',
    },
  });

  const outlet = await prisma.branch.create({
    data: {
      name: 'South Mumbai Showroom',
      type: BranchType.OUTLET,
      companyId: company.id,
      address: 'South Mumbai',
    },
  });

  // 3. Create Super Admin
  await prisma.user.create({
    data: {
      email: 'admin@luxe.com',
      password: hashedPassword,
      fullName: 'Super Admin',
      role: UserRole.SUPER_ADMIN,
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
