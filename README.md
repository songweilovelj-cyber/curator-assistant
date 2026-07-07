# 🎨 策展助手 - 博物馆策展方案AI辅助生成系统

> AI-powered Exhibition Planning Assistant for Museums

![GitHub Stars](https://img.shields.io/github/stars/songweilovelj-cyber/curator-assistant?style=social)
![GitHub Forks](https://img.shields.io/github/forks/songweilovelj-cyber/curator-assistant?style=social)
![GitHub Issues](https://img.shields.io/github/issues/songweilovelj-cyber/curator-assistant)
![GitHub License](https://img.shields.io/github/license/songweilovelj-cyber/curator-assistant)
![GitHub last commit](https://img.shields.io/github/last-commit/songweilovelj-cyber/curator-assistant)

---

## ✨ 项目简介

**策展助手** 是一款面向博物馆、美术馆等文化机构的AI辅助策展工具，通过智能分析主题、匹配文物、生成内容，帮助策展人快速完成专业的策展方案设计。

### 🎯 核心价值

- **智能主题拆解**：AI自动生成核心维度、受众分层、章节结构
- **文物智能匹配**：基于多维度评分算法，从52件国博级文物库中精准匹配
- **专业内容生成**：展陈大纲、学术文献、空间设计建议一键生成
- **AI配图生成**：封面图、展区示意图自动生成（本地开发环境）
- **多格式导出**：支持HTML、Markdown、CSV多种格式导出

---

## 🚀 在线演示

👉 **https://songweilovelj-cyber.github.io/curator-assistant/**

> 💡 注：AI生图功能仅在TRAE IDE本地开发环境可用，部署环境会自动使用CSS动画作为替代方案

---

## 📋 功能特性

### 🏛️ 策展策划阶段
- 主题关键词智能分析
- 核心维度自动生成（可编辑）
- 受众分层推荐
- 章节结构规划

### 📝 内容深化阶段
- AI生成展陈大纲
- 学术研究资料推荐
- 文物智能匹配（7维度评分）
- 策展人笔记自动生成

### 📐 空间与展陈阶段
- 展厅布局预览
- VI视觉系统选择
- 灯光方案配置
- 展柜与多媒体展项配置

### 🖥️ 数字预览阶段
- AI配图生成（封面+展区）
- 策展方案HTML导出
- Markdown文档导出
- 展品清单CSV导出
- 预算估算参考

---

## 🛠️ 技术栈

| 分类 | 技术 |
|------|------|
| 框架 | React 18 + TypeScript |
| 构建工具 | Vite 8 |
| 样式 | Tailwind CSS 3 |
| 状态管理 | Zustand |
| 数据持久化 | localStorage |
| 图标 | Lucide React |
| 部署 | GitHub Pages + GitHub Actions |

---

## 📦 快速开始

### 环境要求

- Node.js >= 20.x
- npm >= 10.x

### 安装与运行

```bash
# 克隆仓库
git clone https://github.com/songweilovelj-cyber/curator-assistant.git
cd curator-assistant

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产版本
npm run preview
```

### 开发环境配置

开发服务器默认运行在 `http://localhost:5180/`

---

## 📁 项目结构

```
curator-assistant/
├── src/
│   ├── components/          # 通用组件
│   ├── data/                # 数据层（文物库、匹配算法、主题知识库）
│   │   ├── artifactPool.ts          # 国博文物库（52件）
│   │   ├── artifactMatcher.ts       # 文物-主题匹配算法
│   │   ├── themeKnowledgeBase.ts    # 主题知识库
│   │   └── curationContentEngine.ts # 策展内容生成引擎
│   ├── pages/               # 页面组件
│   │   └── ExhibitionPlanPage/      # 策展方案页面
│   │       ├── CurationWorkspace.tsx # 策展工作台
│   │       └── ExhibitionPlanPage.tsx
│   ├── stores/              # 状态管理
│   ├── styles/              # 全局样式
│   │   └── curation-dark.css        # 深色主题样式
│   ├── types/               # TypeScript类型定义
│   │   └── exhibition.ts            # 展览相关类型
│   └── main.tsx             # 入口文件
├── public/                  # 静态资源
├── index.html               # HTML模板
├── vite.config.ts           # Vite配置
└── package.json             # 项目配置
```

---

## 🧠 AI功能说明

### 主题拆解模型

系统内置12个维度模板 + 6类受众 + 7种章节模板，AI根据主题关键词自动生成：

- **核心维度**：历史背景、文化内涵、艺术价值、科技工艺、社会影响等
- **目标受众**：亲子家庭、学生群体、专业研究者、国际观众等
- **章节结构**：序章、核心展项、延伸展项、互动体验、尾章等

### 文物智能匹配算法

基于7个维度进行评分匹配：

| 维度 | 权重 | 说明 |
|------|------|------|
| 类别匹配 | 15分 | 文物类别与主题相关性 |
| 主题标签 | 13分 | 标签匹配度（8+5分） |
| 名称匹配 | 9分 | 名称关键词匹配（6+3分） |
| 描述匹配 | 3分 | 描述内容相关性 |
| 时代相关 | 4-5分 | 时代/朝代匹配 |
| 文物等级 | 1-3分 | 一级/二级/三级文物 |
| 出土地点 | 1分 | 出土地点相关性 |

综合评分机制：匹配度70% + 文物等级30%

---

## 📄 导出格式

### 1. 策展方案 HTML
- 独立可打开的HTML文件
- 深色博物馆风格设计
- 包含完整策展方案内容
- 自动嵌入生成的图片（base64）

### 2. Markdown 文档
- 结构化的Markdown格式
- 适合文档编辑和版本管理

### 3. 展品清单 CSV
- 所有展品的详细信息
- 包含等级、时代、价值等字段

---

## 🤝 贡献指南

欢迎贡献代码、提出问题或分享建议！

### 如何贡献

1. **Fork** 本仓库
2. 创建功能分支：`git checkout -b feature/your-feature`
3. 提交更改：`git commit -m "feat: 添加新功能"`
4. 推送到分支：`git push origin feature/your-feature`
5. 创建 **Pull Request**

### 开发规范

- 使用 TypeScript 编写代码
- 遵循现有的代码风格
- 添加必要的类型定义
- 确保构建通过：`npm run build`

---

## 📜 许可证

本项目采用 **MIT License** 开源协议，详见 [LICENSE](LICENSE) 文件。

---

## 🙏 致谢

感谢以下开源项目和服务：

- [React](https://react.dev/) - UI框架
- [Vite](https://vitejs.dev/) - 构建工具
- [Tailwind CSS](https://tailwindcss.com/) - CSS框架
- [Lucide React](https://lucide.dev/) - 图标库
- [Zustand](https://zustand-demo.pmnd.rs/) - 状态管理

---

## ⭐ 请给个 Star！

如果这个项目对你有帮助，请不要吝啬你的 ⭐️，这是对我最大的鼓励！

[![Star History Chart](https://api.star-history.com/svg?repos=songweilovelj-cyber/curator-assistant&type=Date)](https://star-history.com/#songweilovelj-cyber/curator-assistant&Date)

---

**Made with ❤️ for Museum Curators**