# ysnotebook

一个面向练手的大型项目骨架：仿飞书文档 / Notion 的协作文档系统。

## 当前技术选型

- 前端：Next.js + React + TypeScript
- 后端：NestJS
- 数据库：PostgreSQL
- 实时协作：Yjs + WebSocket
- 缓存：Redis
- 对象存储：MinIO / S3
- 工程：pnpm workspace + Turborepo

## 目录结构

```text
apps/
  web/      Web 前端
  api/      业务后端
  collab/   协作服务
  worker/   异步任务
packages/
  ui/           通用 UI
  shared/       类型/常量/工具
  editor-core/  编辑器核心抽象
```

## 下一步建议

1. 先把 `apps/web` 和 `apps/api` 跑起来。
2. 再加 PostgreSQL + Prisma。
3. 第二阶段再接入 Redis / Yjs / MinIO。
