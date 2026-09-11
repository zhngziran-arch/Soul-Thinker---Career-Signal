# 去留 · Career Signal

一个基于 Vue 3 与 Vite 的个人职业状态自评网站。18 道情境题分别呈现工作状态与离职准备，并提供对应具体回答的行动建议、沟通示例、可打印报告与匿名分享卡。

## 本地运行

需要 Node.js 22 和 npm。

```sh
npm ci
npm run dev
```

## 检查与构建

```sh
npm test
npm run build
npm run preview
```

生产文件输出至 `dist/`。GitHub Actions 会在 main 分支更新或发起拉取请求时运行测试与构建，并保留构建产物 7 天。

## 部署

这是纯静态网站，可将构建产物部署到商业静态网站托管服务。连接本仓库时设置：

- 构建命令：`npm run build`
- 输出目录：`dist`
- Node.js：22
- 环境变量：当前无需配置

当前没有配置 GitHub Pages。GitHub Pages 对在线业务及商业 SaaS 存在用途限制；本项目计划商业使用，应选择允许相应用途的托管服务。

## 数据与产品边界

- 答案与行动进度仅存放在当前浏览器的 localStorage，可在页脚清除。
- 评分和文案在浏览器本地计算，没有调用生成式 AI 接口。
- 不包含真实用户的评估数据。
- 分数采用内部规则，不能解释为离职概率或医学诊断。
- 尚未实现支付、兑换码、账号登录或购买后访问控制。公开网址可被任何获得链接的人访问。
- 私有仓库不等于前端代码保密：发布后的浏览器资源仍可下载。

## 主要文件

- `src/data/quizData.js`：题目与选项分值
- `src/utils/calculator.js`：计算、分档和建议文案
- `src/utils/storage.js`：本机记录
- `src/components/ResultScreen.vue`：报告与导出
- `src/components/SharePosterModal.vue`：分享卡
- `tests/calculator.test.js`：规则边界与存储检查
