# 购房指北 🏠

一个基于国家统计局房价指数数据的房价走势可视化工具，帮助用户了解各城市房价变化趋势。

## 📊 项目介绍

本项目收集了国家统计局的房价指数数据，将其制作成直观的趋势图和详细的数据列表，方便用户：

- 📈 **房价走势可视化** - 多城市房价指数趋势图对比
- 📋 **详细数据展示** - 环比、同比、平均值等关键指标
- 🎯 **多城市对比** - 支持同时选择多个城市进行对比

## 🛠️ 技术栈

- **前端框架**: React 18 + TypeScript
- **构建工具**: Vite
- **UI 组件库**: Ant Design
- **图表库**: Ant Design Charts
- **样式**: Tailwind CSS
- **日期处理**: Day.js

## 👀 预览

**站点**: [点我预览](https://how-to-buy-house.vercel.app)

![购房指北预览1](https://github.com/user-attachments/assets/47d37538-b0ec-4387-a34a-c3796944e9be)
![购房指北预览2](https://github.com/user-attachments/assets/9676298a-13a1-4fe6-9630-fe69add2f116)

## 🚀 快速开始

### 环境要求

- Node.js >= 16.0.0
- npm >= 8.0.0 或 yarn >= 1.22.0

### 安装依赖

```bash
yarn install
```

### 启动开发服务器

```bash
yarn dev
```

启动后，在浏览器中打开 [http://localhost:5173](http://localhost:5173) 即可查看项目。

### 构建生产版本

```bash
yarn build
```

构建完成后，生产文件将生成在 `dist` 目录中。

### 预览生产版本

```bash
yarn preview
```

## 📁 项目结构

```
how-to-buy-house/
├── public/                 # 静态资源
├── src/
│   ├── Components/         # 通用组件
│   ├── Pages/             # 页面组件
│   │   └── Home/          # 首页
│   │       ├── data/      # CSV 数据文件
│   │       ├── index.tsx  # 首页组件
│   │       └── utils.ts   # 数据处理工具
│   ├── App.tsx            # 应用入口
│   └── main.tsx           # 主入口文件
├── package.json           # 项目配置
├── vite.config.ts         # Vite 配置
└── README.md              # 项目说明
```

## 📊 数据说明

### 数据来源

- **数据源**: 国家统计局
- **数据格式**: CSV 文件，文件名格式为 `YYYYMM.csv`
- **基准时间**: 2022 年 5 月（设定全部城市房价指数为 100）

### 数据字段

- **环比**: 与上月相比的房价指数变化
- **同比**: 与去年同期相比的房价指数变化
- **今年以来平均**: 今年以来平均房价指数（上年同期=100）
- **当前房价**: 基于环比数据计算的实际房价指数

## 🎨 功能特性

- ✅ **多城市选择** - 支持同时选择多个城市
- ✅ **趋势图对比** - 直观显示房价走势变化
- ✅ **数据表格** - 详细展示各项指标数据
- ✅ **实时数据** - 基于最新统计数据

## 🤝 贡献指南

欢迎所有形式的贡献！无论是报告 bug、提出新功能建议，还是提交代码改进，都非常欢迎。

### 如何贡献

1. **Fork 本仓库**

   ```bash
   git clone https://github.com/your-username/how-to-buy-house.git
   cd how-to-buy-house
   ```

2. **创建功能分支**

   ```bash
   git checkout -b feature/your-feature-name
   # 或
   git checkout -b fix/your-bug-fix
   ```

3. **提交你的更改**

   ```bash
   git add .
   git commit -m "feat: add new feature description"
   ```

4. **推送到分支**

   ```bash
   git push origin feature/your-feature-name
   ```

5. **创建 Pull Request**
   - 访问 [GitHub Pull Requests](https://github.com/your-username/how-to-buy-house/pulls)
   - 点击 "New Pull Request"
   - 选择你的功能分支
   - 填写详细的描述信息

### 提交规范

我们使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

- `feat:` 新功能
- `fix:` 修复 bug
- `docs:` 文档更新
- `style:` 代码格式调整
- `refactor:` 代码重构
- `test:` 测试相关
- `chore:` 构建过程或辅助工具的变动

### 开发指南

1. **代码风格**: 使用 Prettier 和 ESLint 保持代码风格一致
2. **类型安全**: 使用 TypeScript 确保类型安全
3. **组件设计**: 遵循 React 最佳实践
4. **测试**: 建议为新功能添加测试用例

## 📄 许可证

本项目采用 [MIT 许可证](LICENSE)。

## ⭐ 支持项目

如果这个项目对你有帮助，请给我们一个 ⭐ Star！

## 📞 联系我们

- 项目地址: [GitHub Repository](https://github.com/your-username/how-to-buy-house)
- 问题反馈: [Issues](https://github.com/your-username/how-to-buy-house/issues)
- 功能建议: [Discussions](https://github.com/your-username/how-to-buy-house/discussions)

---

**购房指北** - 让房价数据更透明，让购房决策更明智 🏠✨
