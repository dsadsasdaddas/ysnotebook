export default function HomePage() {
  return (
    <main style={{ padding: 40, maxWidth: 960, margin: '0 auto' }}>
      <h1>ysnotebook</h1>
      <p>仿飞书文档 / Notion 的大型练手项目骨架已创建。</p>
      <ul>
        <li>apps/web: 用户前端</li>
        <li>apps/api: NestJS 业务后端</li>
        <li>apps/collab: 实时协作服务</li>
        <li>apps/worker: 异步任务服务</li>
      </ul>
      <p>下一步建议先做登录、工作区、文档树、文档 CRUD。</p>
    </main>
  );
}
