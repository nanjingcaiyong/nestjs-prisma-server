import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({});

async function main() {
  await prisma.story.deleteMany();
  console.log('Seeding...');

  const res = await prisma.page.createMany({
    data: [
      {
        pageName: 'home',
        description: '首页',
      },
      {
        pageName: 'collection',
        description: '商品集合页',
      },
      {
        pageName: 'pdp',
        description: '商品详情页',
      },
    ],
  });

  console.log('===>', res);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
