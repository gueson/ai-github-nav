# GitHub AI 导航 (GitHub AI Nav)

> 🤖 **发现全球最热门的 AI 开源项目** | 实时同步 GitHub 高 Star 仓库
> 
> A curated, real-time navigation dashboard for top AI repositories on GitHub.

![Project Preview](./.screenshots/bundle-preview-20260112_100147.png)

## 📖 项目简介

**GitHub AI Nav** 是一个专注于挖掘和展示高质量 AI 开源项目的导航站。它通过直接对接 GitHub Search API，实时筛选出 Star 数超过 1000 的优质 AI 仓库，帮助开发者、研究人员和 AI 爱好者快速发现最新的 AI 工具、框架和模型。

本项目采用极简主义设计风格，拒绝繁杂的干扰，专注于信息本身的高效获取。

## ✨ 核心特性

- 🚀 **实时数据引擎**：无后端数据库，直接调用 GitHub API，保证数据零延迟、绝对真实。
- 🔍 **精准搜索**：支持对仓库名称、简介、Topic 的实时模糊搜索，内置防抖处理。
- 📊 **动态筛选与排序**：
  - 自动过滤 Star < 1000 的项目
  - 支持按 Star 数量 降序/升序 切换
- 📱 **完美响应式设计**：
  - 桌面端：沉浸式网格布局
  - 移动端：原生级列表体验，自动适配屏幕
- ⚡ **极致性能体验**：
  - 骨架屏 (Skeleton) 智能加载占位
  - 平滑滚动与微交互动画
  - API 限流自动兜底处理
- 🎨 **现代化 UI**：基于 Tailwind CSS v4 打造的清爽科技风界面。

## 🛠️ 技术栈

本项目基于现代前端工程化标准构建：

- **核心框架**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **构建工具**: [Vite](https://vitejs.dev/)
- **样式方案**: [Tailwind CSS v4](https://tailwindcss.com/)
- **UI 组件库**: [shadcn/ui](https://ui.shadcn.com/) (Radix UI based)
- **图标库**: [Lucide React](https://lucide.dev/)
- **路由管理**: [wouter](https://github.com/molefrog/wouter) (轻量级路由)
- **网络请求**: [Axios](https://axios-http.com/)

## 🚀 快速开始

### 1. 克隆项目

```bash
git clone https://github.com/your-username/ai-github-nav.git
cd ai-github-nav
```

### 2. 安装依赖

推荐使用 `pnpm` 进行包管理：

```bash
pnpm install
```

### 3. 启动开发服务器

```bash
pnpm dev
```

打开浏览器访问 `http://localhost:5173` 即可看到效果。

### 4. 构建生产版本

```bash
pnpm build
```

构建产物将输出到 `dist` 目录，可直接部署到 Vercel, Netlify 或任何静态服务器。

## ⚠️ 关于 GitHub API 限制

本项目使用 GitHub 公共搜索接口 (`GET /search/repositories`)。
- **速率限制**：未认证请求限制为每分钟 10 次（建议在开发时注意）。
- **结果限制**：GitHub API 仅返回前 **1000** 条匹配结果。本项目 UI 已对此限制做了显式说明，当数据量超过 1000 时会提示用户优化搜索关键词。

## 🤝 贡献指南

欢迎提交 Issue 或 Pull Request！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交修改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 提交 Pull Request

## 📄 开源协议

MIT License © 2026 GitHub AI Nav
