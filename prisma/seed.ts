import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({});

async function main() {
  await prisma.story.deleteMany();

  console.log('Seeding...');

  const story = await prisma.story.create({
    data: {
      id: 1,
      creatorName: 'admin',
      description: '这是一条测试数据',
      createAt: new Date(),
      updateAt: new Date(),
    },
  });

  console.log(story);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
