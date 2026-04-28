# 更新后网站视觉复审

> 说明：本次是基于当前更新后的站点做第二轮视觉与排版审查，不修改代码。重点对照上一版结论，重新判断哪些问题已经改善，哪些问题仍然是影响整体美感和专业度的核心项。

## 0. 这次更新后，已经明显变好的部分

相比上一轮，网站内容层面已经更像一个真实的 CS PhD 个人网站了，这一点非常重要。

已经改善的地方：

- 示例 `posts`、`projects`、`teachings` 基本被清空，不再是整站都像 demo。
- `papers.bib` 已经换成真实论文，不再是 Einstein 示例论文。
- `scholar.last_name / first_name` 已改成 `Xu / Tengyou`，自我作者高亮逻辑方向正确。
- `socials.yml` 已经换成真实邮箱和真实 Google Scholar ID。
- `news` 已换成真实动态，首页的 news 区域可信度显著提高。
- `resume.json` 也已经换成你的身份，不再是明显的示例人物。

这意味着上一轮里“整站还是模板示例内容”的判断已经不再成立。  
现在的主要问题，已经从“内容真假混杂”转向“视觉完成度还不够高”和“还有一些残留页面/模块会破坏品牌一致性”。

## 1. 问题列表（按优先级）

### P0. 首页内容虽然更真实了，但视觉结构仍然偏旧，第一屏还不够像一个成熟的研究者主页

现在首页最关键的问题不再是内容假，而是结构旧：

- 仍然是典型 `al-folio` 的 `about + float 图片 + 下方模块堆叠`
- profile 图片和正文关系更像博客作者页，不像现代个人品牌首页
- 第一屏缺少一个更明确的 hero 结构
- `news / latest posts / selected publications / social` 仍然按“模块顺排”方式往下堆

现在的首页已经“可信”，但还没有达到“有强视觉判断力、像认真设计过的学术主页”。

### P0. 视觉系统仍然高度依赖模板默认值，字号、行高、间距还没有被重新设计

这一点仍然是整站高级感不够的根因。

当前仍然存在：

- 没有明确的全局 body 字号与 line-height 设计
- 大量正文、meta、按钮、CV 小字仍停留在模板默认尺度
- blog 页 `5rem` 的大标题仍然过于夸张
- 不同模块之间的字号比例关系不稳定
- 间距继续使用很多零散值，缺少统一 spacing scale

即使内容已经真实，如果 typography 和 spacing 还是模板默认感，整体仍然会像“认真填过内容的模板站”，而不是“完成度很高的个人学术品牌页”。

### P0. 首页仍然有一个错误优先级模块：`latest posts`

这项在上一轮是“内容假”，现在变成了“产品定位不清”。

问题在于：

- 你已经清掉了本地示例 posts
- 但 `_config.yml` 里还保留 external_sources
- `about.md` 里 `latest_posts.enabled: true`
- `latest_posts.liquid` 仍然直接读取 `site.posts`

所以首页仍然会给 blog 一个较高的视觉位置，而 blog 本身现在并不是你站点的核心学术产品。  
这会让首页叙事被打断，削弱“研究主页”的聚焦感。

### P1. 还有几处残留的占位页/占位数据，会拉低“专业完成度”

现在已经不是全站都占位，但还剩几处很显眼：

- `repositories.yml` 还在用 `torvalds / alshedivat`
- `repositories.md` 说明文案还是模板说明
- `teaching.md` 仍有 `test@gmail.com` 的 calendar 占位
- `cv.md` 描述文案还是模板说明
- `publications.md` 描述文案仍然偏模板说明
- `_books/the_godfather.md` 还在仓库里，只是入口页已隐藏
- `dropdown.md` 还保留 `bookshelf / blog` 这类模板式子菜单结构

这些问题不一定都在首页直接暴露，但它们会影响整站的一致性和可信度。一旦用户点进去，会明显感到“还没收尾”。

### P1. 导航、搜索入口和 utility actions 仍然偏粗糙

当前导航主要问题：

- Navbar 仍是非常典型的 Bootstrap 导航条
- `ctrl k` 直接作为显性文案放在导航里，视觉噪音偏大
- `CV` 作为硬编码 nav item 是功能上可用，但视觉上有点“为功能让路”，不够精致
- 暗黑模式切换和搜索按钮都还是工程实现感较强的 utility，而不是设计过的 UI

这会让网站顶部看起来“能用”，但不够像现代 SaaS / landing page 级别的 polished navigation。

### P1. 页面之间的完成度差异仍然很大，整站还没有形成统一品牌语言

现在首页、publication、CV、blog、repositories、teaching 之间的完成度不一致。

例如：

- 首页内容真实，但布局仍旧
- publications 内容已经可信，但展示样式还是 scholar/模板感
- CV 内容真实，但视觉密度偏高
- blog 页结构完整，但视觉语言还是 demo blog
- repositories / teaching 还是明显未收尾的占位页

这种“部分页面已经像正式站点，部分页面还像开发中页面”的状态，会削弱整体的高级感。

### P1. Publications 和 CV 已经进入“真实内容阶段”，但版面还缺少更强的秩序感

现在这两个页面的核心问题已经不是内容真假，而是“信息组织还不够优雅”。

具体包括：

- Publications 中 title / author / venue / links / badges 距离仍比较近
- 按钮很多时，视觉噪音仍然偏高
- CV 中仍然有较多小字号
- 时间、地点、机构、项目符号之间的对齐仍略散
- 页面的信息密度较高，但没有形成很强的阅读主次

对于学术主页来说，这两页是最重要的 credibility page，所以视觉整理程度要更高。

### P2. 颜色和字体仍然保守，缺少“现代、冷静、技术型”的识别度

当前仍然是：

- Roboto / Roboto Slab
- light mode 紫色，dark mode 青色
- 某些局部组件有独立蓝色

这套系统可用，但不够精致，也没有很鲜明的研究型品牌气质。  
它比较像“成熟模板”，而不是“为一位 AI / HCI / Medical Imaging 研究者定制过的视觉身份”。

### P2. 社交区、footer、辅助说明区仍然带有一点“旧式个人站”气质

尤其是：

- 社交 icon 仍然偏大
- footer 仍然是相对廉价的窄深色条
- 一些说明文字（description）还是模板式、弱设计的说明文本

这些不是致命问题，但会持续拉低质感上限。

## 2. 每个问题的具体改进建议

### 针对 P0：首页结构仍然偏旧

建议：

1. 把首页改造成更明确的 hero section。
2. 第一屏建议只保留：
   - 姓名
   - 当前身份与机构
   - 研究方向摘要
   - 核心 CTA：CV / Publications / Google Scholar / Email
3. profile 图片不要再依赖 float 逻辑，改为稳定的双栏或 12 栏 grid。
4. `selected publications` 应成为首页第二优先级模块。
5. `news` 可以保留，但建议变成更轻、更短、更 editorial 的列表。
6. 首页底部再考虑放 social，而不是让 icon 区块过早抢节奏。

### 针对 P0：视觉系统仍然模板感重

建议优先建立一套统一排版系统：

- Hero title：`2.8rem` 到 `3.2rem`
- Page h1：`2.1rem` 到 `2.4rem`
- Section title：`1.35rem` 到 `1.6rem`
- 正文：`1rem` 到 `1.0625rem`
- 次要说明：`0.9rem`
- meta：`0.84rem` 到 `0.88rem`

同时统一：

- 正文行高：`1.6` 到 `1.7`
- 标题行高：`1.15` 到 `1.25`
- 不再使用大量 `0.7rem`
- blog 页 `5rem` 标题应显著收敛

间距建议收敛到固定档位：

- `8`
- `12`
- `16`
- `24`
- `32`
- `48`
- `64`

### 针对 P0：首页 `latest posts` 模块优先级错误

建议：

1. 如果 blog 不是当前重点，首页直接关闭 `latest_posts`。
2. 如果要保留 blog，则至少不要让它在首页位于 selected publications 同等级位置。
3. 如果继续保留 external_sources，建议把它们放到 blog 页内部，而不是首页暴露。
4. 让首页更像“研究入口页”，不是内容流入口页。

### 针对 P1：残留占位页与占位数据

建议：

1. `repositories` 页面如果还没准备好，就临时隐藏或取消入口。
2. `repositories.yml` 未换真实数据前，不建议展示。
3. `teaching.md` 未准备好时，建议取消 calendar embed 和占位文案。
4. `cv.md`、`publications.md` 的 description 改成真实内容导向文案。
5. `dropdown.md` 如果当前不用，就不要保留这类模板式菜单结构。
6. `_books` 中的示例书目如果不是近期计划，建议删除或彻底不暴露。

### 针对 P1：导航与 utility actions 不够精致

建议：

1. 减弱搜索入口的文本存在感，不要把 `ctrl k` 当成主展示文案。
2. 把搜索和主题切换做成统一尺寸、统一视觉语言的 icon action。
3. 调整 nav 链接的横向节奏，让顶部更像产品化导航，而不是默认菜单条。
4. 重新审视 `CV` 链接在导航中的视觉优先级，可以保留功能，但风格上更像一个次级 CTA。
5. Navbar 的背景、边框、透明度和 hover 反馈都建议更克制。

### 针对 P1：整站完成度不统一

建议：

1. 先定义一套“正式页面标准”：
   - 页面标题样式
   - 页面描述样式
   - section spacing
   - card padding
   - 边框和圆角
2. 然后逐页检查：首页、publications、CV、blog、repositories、teaching 是否都在这套系统内。
3. 对未完成页面，不要让它们“半正式上线”。

### 针对 P1：Publications 和 CV 的秩序感

建议：

1. Publications 里弱化按钮区，把最重要的 1 到 3 个链接放前，其余降级。
2. 让作者、venue、年份、备注之间的层级对比更明确。
3. badge 数量和权重收敛，避免一条论文像“插件展示区”。
4. CV 页面提高小字可读性，减少视觉碎片。
5. 时间轴、机构名、地点、bullet 之间建立更稳定的左对齐轴线。

### 针对 P2：颜色与字体识别度不足

建议：

1. 品牌色收敛为一个冷静的单一主色系，light/dark 只做明度变化，不换色相。
2. 推荐方向：
   - 深蓝灰
   - slate blue
   - 冷青蓝
3. 标题和正文字体重新组合，避免继续完全依赖 Roboto / Roboto Slab。
4. 字体选择目标不是“花”，而是“更冷静、更现代、更研究型”。

### 针对 P2：social / footer 旧式感

建议：

1. social icon 尺寸显著缩小。
2. social 区更像一行精致 contact actions，而不是大 icon wall。
3. footer 改成更轻的、留白更多的页尾，而不是一条压扁的深色信息带。
4. 减少模板说明式 description 文案，让辅助文本更像真实品牌 copy。

## 3. 更新后的整体视觉优化策略

### 建议方向：更克制、更产品化的研究者主页

上一轮我建议的是：

**Editorial Minimalism + Research Product Aesthetic**

这轮复审后，这个方向依然成立，而且更明确了：

- 现在网站已经有真实内容基础
- 下一步不该再优先“补功能”
- 而应该优先“把视觉骨架做成熟”

更具体地说，应该往这个气质推进：

- 像一个年轻 AI / HCI / Medical Imaging researcher 的正式主页
- 有现代产品设计感
- 但绝不营销化
- 内容优先，设计克制
- 看起来像“可信、冷静、专业、完成度高”

### 视觉关键词

- 简洁
- 学术可信
- 冷静
- 轻技术感
- 高可读
- 留白充分
- 结构清晰

### 核心方法

1. 先清理信息优先级
2. 再重建 typography
3. 再统一 spacing rhythm
4. 再统一 page shell 和 section 语言
5. 最后优化导航、按钮、footer、social 等细节

## 4. 当前最值得优先处理的顺序

### 第一阶段：决定首页叙事

1. 重做首页 hero
2. 下调或移除 `latest posts`
3. 强化 `selected publications`
4. 让 `news` 更轻、更短、更像研究动态

### 第二阶段：建立视觉系统

1. 重做字号体系
2. 统一 line-height
3. 建立 spacing scale
4. 收敛 card / border / button 风格

### 第三阶段：处理未完成页面

1. repositories
2. teaching
3. dropdown
4. books

策略很简单：

- 要么做完整
- 要么先不露出

### 第四阶段：提升精致度

1. navbar
2. search / theme utility
3. publications links/badges
4. CV 信息对齐
5. social / footer

## 5. 这次复审的核心判断

这次更新之后，网站已经不再是“内容还是假的模板站”，而是一个：

> 内容基础已经真实、方向已经正确，但视觉和页面完成度还没有完全跟上的个人学术网站。

所以接下来的重点，不再是“继续清 demo 内容”本身，而是：

> 把已经变真实的内容，用一套更成熟、更克制、更现代的视觉系统包装起来。

如果这一轮做对，网站会从“可信的个人站”提升到“有设计判断力的研究者主页”。

