import { PrismaClient } from '@prisma/client';
import { crypto } from '../src/utils/crypto';

const prisma = new PrismaClient({});

/**
 * @description 创建管理员账号
 * @returns
 */
async function createAdminAccount() {
  return prisma.account.create({
    data: {
      account: 'admin',
      password: crypto.encodePassword('admin123'),
      email: 'yong.cai@kapeixi.com',
      roles: {
        connectOrCreate: [
          {
            where: { roleName: 'admin' },
            create: {
              roleName: 'admin',
              creator: 'caiyong',
              auths: {
                create: [
                  {
                    authName: 'visit',
                    type: 0,
                    desc: '查询接口操作权限',
                  },
                  {
                    authName: 'add',
                    type: 1,
                    desc: '新增接口操作权限',
                  },
                  {
                    authName: 'delete',
                    type: 2,
                    desc: '删除接口操作权限',
                  },
                  {
                    authName: 'update',
                    type: 3,
                    desc: '更新接口操作权限',
                  },
                  {
                    authName: 'all',
                    type: 99,
                    desc: '超级管理员权限',
                  },
                ],
              },
            },
          },
        ],
      },
    },
    include: {
      roles: {
        include: {
          auths: true,
        },
      },
    },
  });
}

async function main() {
  await prisma.story.deleteMany();
  console.log('Seeding...');
  const res = await createAdminAccount();
  console.log('===>', res);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
