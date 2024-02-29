import { PrismaClient } from '@prisma/client';
import { crypto } from '../src/utils/crypto';

const prisma = new PrismaClient({});

function createAdminRole() {
  return prisma.account.create({
    data: {
      account: 'admin',
      password: crypto.encodePassword('admin123'),
      email: 'yong.cai@kapeixi.com',
      roles: {
        create: [
          {
            name: 'admin',
            creator: 'caiyong',
          },
        ],
      },
    },
  });
}

async function main() {
  await prisma.story.deleteMany();
  console.log('Seeding...');

  const res = await createAdminRole();

  console.log('===>', res);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
