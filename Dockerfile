FROM centos:centos7

FROM mysql:latest

# 使用 Node.js 官方镜像作为基础镜像
FROM node:21-alpine3.18



# 设置工作目录
WORKDIR /app

# 将 package.json 和 package-lock.json 复制到工作目录
COPY package*.json ./

RUN npm install pnpm -g
# 安装依赖
RUN pnpm install

# 将项目文件复制到工作目录
COPY . .

# 暴露应用端口
EXPOSE 3000
 
# 运行 NestJS 应用
CMD [ "npm", "run", "dev:sit" ]