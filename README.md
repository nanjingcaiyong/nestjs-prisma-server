
## 创建数据模型

### 初始化prisma模版

```sh
npx prisma init
```

prisma cli 已经帮我们生成了一个 schema 模版 `prisma/schema.prisma`。以及一个 `dotenv` 配置文件 `.env`

### 模型映射数据库

**生成 migrate 脚本**

migrations 文件主要用于数据库迁移

```sh
npx prisma migrate dev --name init
```

执行完成，即可创建数据库并生成 `migration` 脚本

**直接修改数据库**

不创建 `migrate` 脚本，常用于本地快速迭代，不关心中的变更场景下很有用

```sh
npx prisma db push
```

**生产环境**

生产环境期望不丢失数据的情况下安全迁移数据库的场景下，应该用 `migrate deploy` 而非 `db push`

```sh
prisma migrate deploy
```

### 修改表结构

```sh
# 修改 prisma/schema.prisma
npx prisma migrate dev --name add_xxx_column
# 改动点同步到数据库
npx prisma migrate dev
```


## 模型声明

### 表/字段重命名

为了规避数据库的大小写问题，一般数据库最佳实践都是表和字段统一使用小写下划线形式命名。对于 prisma 需要使用 @@map 和 @map 函数定义:

```prisma
model User {
  id Int @id
  // @map 用于定义列名
  cardId Int @map("card_id")
  // @@map 用于定义表名
  @@map("user")
}
```

如果要对索引、约束等命名的话参考官方文档: https://www.prisma.io/docs/orm/prisma-schema/data-model/database-mapping#using-custom-constraint--index-names

### 字段默认值

@default 可以定义字段的默认值，参数可以是静态的固定值，如5, false等等，也可以是 prisma 提供的几种函数，如autoincrement(), uuid(), now() 等等。参考：https://www.prisma.io/docs/orm/reference/prisma-schema-reference#default

```prisma
model User {
  id Int @id @default(autoincrement())
  createAt DateTime @default(now())
}
```

### 枚举类型
```prisma
model User {
  id Int @id @default(autoincrement())
  email String @unique
  name String?
  role Role @default(USER)
}

enum Role {
  USER
  ADMIN
}
```

### 自动存储更新时间(@updatedAt)

```prisma
model User {
  id Int @id @default(autoincrement())
  email String
  createdAt DateTime @default(now()) @db.Timestamp
  updatedAt DateTime @updatedAt @db.Timestamp
}
```

### 字段约束

**主键(@id / @@id)**

单主键
```prisma
model Table {
  id Int @id @default(autoincrement())
}
```

联合主键
```prisma
model Table {
  firstName String @db.VarChar(10)
  lastName String @db.VarChar(10)

  @@id([firstName, lastName])
}
```

**唯一性(@unique / @@unique)**

单列唯一性
```prisma
model User {
  id Int @id @default(autoincrement())
  email String? @unique
  name String
}
```

多列唯一性
```prisma
model User {
  id Int @id
  firstName String
  lastName String
  card Int?

  @@unique([firstName, lastName, card])
}
```

**非空约束**

默认字段类型都是`非空`的，可空字段类型加上`?`就行了：
```prisma
model User {
  id Int @id
  firstName String
  lastName String
  card Int?
}
```

**索引(@@index)**

**外键约束(@relation)**

## CURD 

### api
- findUnique
- findFirst
- findMany
- create
- update
- upsert
- delete
- createMany
- updateMany
- deleteMany
- count
- aggregate
- groupBy

## 数据库类型 https://www.prisma.io/docs/orm/reference/prisma-schema-reference#model-field-scalar-types

### 整数类型
- tinyinit
- smallint
- mediumint
- int          最大值2147483647
- bigint       有符号数的范围是 [-9223372036854775808, 9223372036854775807];无符号数的范围是 [0, 18446744073709551615] 

### 小数类型
- float         单精度浮点数
- double        双精度浮点数
- decimal       定点，能够保证小数精度

### 字符串
- char          定长
- varchar       可变长度
- text          文本字符串，专门用来存储较长的文本
  + tinytext    迷你文本
  + text        普通文本
  + mediumtext 
  + longtext    长文本
- blob          文本超过255个字符时，都会使用text(blob极少使用)
  + tinyblob
  + blob
  + mediumblob
  + longblob

### 位
- bit

### 枚举类型
- enum

### 日期时间类型
- year          年
- timestamp     时间戳(2024-01-17 13:47:10)
- date          日期，用来记录年月日信息(2024-01-17 13:47:10.268)
- datetime      日期时间，存储年月日和时间信息
- time          用来记录时间或时间段


## 加密方式

### 哈希算法
- 哈希算法将密码转换为另一种形式（哈希值），这种转换是单向的，无法逆转。
- 常用的哈希算法包括MD5、SHA-1、SHA-256等。
- 哈希通常与盐值（salt）结合使用，以增强安全性。

### 对称加密（Symmetric Encryption）
- 使用相同的密钥来加密和解密数据。
- 常见的对称加密算法包括AES（高级加密标准）、DES（数据加密标准）和3DES（三重数据加密算法）

### 非对称加密（Asymmetric Encryption）
- 使用一对密钥，一个公钥用于加密，一个私钥用于解密。
- 常见的非对称加密算法有RSA、ECC（椭圆曲线加密）和Diffie-Hellman密钥交换。

### 基于证书的加密
- 使用数字证书（结合了公钥加密和数字签名技术）来加密和验证数据的完整性
- 常见于HTTPS和电子邮件加密


## session
- @nestjs/passport 
- passport 
- passport-local
- express-session