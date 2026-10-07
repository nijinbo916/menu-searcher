# 菜单搜索器 · Menu Searcher

> Web 开发技术 · **Lesson 2 作业**
> 使用 VS Code 完成的前端小项目（HTML + CSS + JS），并部署到 Vercel。

## 在线预览

- **Vercel 线上地址**：<待部署后填写>
- **GitHub Pages 备用地址**：<待开启后填写>
- **GitHub 仓库地址**：<待填写>

## 功能

| 功能 | 说明 |
| --- | --- |
| 实时搜索 | 输入即筛选，匹配**菜名 / 描述 / 分类 / 标签**四个字段 |
| 分类筛选 | 全部 / 热菜 / 凉菜 / 汤品 / 主食 / 饮品 / 甜品，可与关键字叠加 |
| 关键字高亮 | 命中的文字用黄色底纹标出，一眼看到为什么匹配 |
| 结果统计 | 实时显示「找到 N 道与 XX 相关的菜品」 |
| 空状态 | 无结果时给出提示与「查看全部菜品」按钮 |
| 清除筛选 | 输入框右侧 × 按钮 / 结果条「清除筛选」/ Esc 键，三处入口 |
| 键盘快捷键 | `/` 聚焦搜索框，`Esc` 清空关键字 |
| 响应式 | 桌面多列网格，移动端单列；窄屏搜索框换行铺满 |

## 目录结构

```
menu-searcher/
├── index.html        页面结构：品牌头 + 搜索框 + 分类栏 + 菜品列表 + 页脚
├── css/
│   └── style.css     样式层：设计变量、卡片网格、标签胶囊、空状态、响应式
├── js/
│   └── main.js       逻辑层：菜单数据、筛选、渲染、高亮、快捷键
├── README.md
└── .gitignore
```

## 本地运行

无需构建、无需依赖，直接双击 `index.html` 即可。

若想用本地服务器预览（推荐，行为与线上一致）：

```bash
# 方式一：VS Code 装 Live Server 插件，右键 index.html → Open with Live Server
# 方式二：命令行起一个静态服务
python -m http.server 5173
# 然后访问 http://localhost:5173
```

## 实现要点

**HTML** —— 语义化标签：`header` / `nav` / `main` / `ul > li` / `footer`；
搜索框用 `<input type="search">` 并配 `aria-label`；
结果文案用 `aria-live="polite"`，保证读屏软件能播报筛选结果。

**CSS** —— `:root` 设计变量统一配色与圆角阴影；
`grid-template-columns: repeat(auto-fill, minmax(268px, 1fr))` 实现自适应卡片网格；
卡片 hover 上浮 + 渐变描边 + 图标轻微旋转；
`@media (prefers-reduced-motion: reduce)` 尊重系统的减少动效偏好。

**JS** —— 单页 26 条菜品数据，全部字段拼接后做 `includes` 匹配；
`escapeHtml()` 转义后再插入 `innerHTML`，避免 XSS；
高亮通过 `RegExp` 替换生成 `<mark>`；
分类栏只构建一次，切换时仅同步 `is-active` 类，避免重复渲染导致闪烁；
分类切换使用事件委托，只为父容器绑定一个监听器。

## 部署

1. 本地代码经 SSH 推送到 GitHub 仓库
2. Vercel 导入该仓库（Framework Preset 选 **Other**，无需构建命令），自动部署
3. 此后每次推送到 `main`，Vercel 与 GitHub Pages 都会自动重新部署
