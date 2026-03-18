# HiBOU 喜福生活苑｜網站維護 SOP
# 供 OpenClaw 多代理人系統使用

**文件版本：** v1.0  
**建立日期：** 2025  
**適用代理人：** hibou_agent / HiBOUBrandBot  
**網站技術：** 純 HTML + CSS + JS，無框架依賴

---

## 一、專案概覽

### 1.1 檔案結構

```
hibou-website/
├── index.html                  # 首頁（主要入口）
├── hibou_landing_page_v10.html # 機能防風罩 Landing Page
├── news-bloggers.html          # 部落客推薦列表頁
├── news-travel.html            # 親子旅遊誌列表頁（待建）
├── news-parenting.html         # 媽咪育兒教室列表頁（待建）
├── article-template.html       # 文章頁模板（複製使用）
├── article-[slug].html         # 各篇文章頁
└── images/                     # 所有圖片資源
    ├── logo.png
    ├── 喜福-09049-jpg.webp      # 機能防風罩主圖
    ├── 015_9336.jpg             # 穿著衣物 / Hero
    ├── 21-6重紗_呼呼防踢被_3-7歲KEWE.jpg
    ├── Hibou_6.jpg              # 清潔沐浴
    └── fb-02.png                # 早教玩具
```

### 1.2 設計系統 CSS Token（禁止任意更改）

```css
--sage: #7A9A7E        /* 次要綠，hover 狀態 */
--moss: #4A6741        /* 主色，按鈕、標題、重點 */
--sand: #C9A97A        /* 金沙色，部落客推薦、裝飾 */
--cream: #FAF7F2       /* 淺奶油背景 */
--warm-white: #FFFEF9  /* 頁面底色 */
--charcoal: #2C2C2C    /* 主要文字 */
--soft-gray: #8A8A8A   /* 次要文字 */
--light-gray: #F0EDE8  /* 分隔線、tag 背景 */
--accent-orange: #D4845A /* 強調橘，熱銷標籤 */
```

**字型：**
- 標題：`Noto Serif TC`（font-weight: 700）
- 內文：`Noto Sans TC`（font-weight: 300/400/500）
- Logo：`Zen Antique`

### 1.3 核心 JavaScript 函式

```javascript
goPage(page)          // 頁面導航，page 參數詳見 Section 3.1
toggleMenu()          // 行動版選單開關
closeMobileMenu()     // 關閉行動版選單
```

---

## 二、任務類型與 SOP

---

### 任務 A：新增部落客推薦文章

#### A-1 觸發條件
使用者提供：部落客名稱、文章標題、文章內容（或連結）、推薦商品名稱

#### A-2 執行步驟

**Step 1｜決定文章 slug**
```
命名規則：article-[品牌縮寫]-[商品縮寫]-[流水號].html
範例：
  article-adoufu-windcover-001.html   → 阿呆夫妻 × 防風罩
  article-cynthia-windcover-002.html  → Cynthia × 防風罩
  article-boli-blanket-001.html       → 波力 × 防踢被
```

**Step 2｜複製模板並填入 {{變數}}**

複製 `article-template.html`，替換所有 `{{...}}` 佔位符：

| 變數 | 說明 | 範例 |
|------|------|------|
| `{{ARTICLE_TITLE}}` | 完整文章標題 | 喜福育兒好物分享｜寶寶我最罩 |
| `{{ARTICLE_META_DESC}}` | 160字內 SEO 摘要 | 阿呆夫妻使用喜福防風罩… |
| `{{BLOGGER_HANDLE}}` | 部落客名稱（含書名號） | 《阿呆夫妻過日子》 |
| `{{PRODUCT_TAG_1}}` | 主推商品標籤 | 機能防風罩 |
| `{{PRODUCT_TAG_2}}` | 次推商品標籤（無則刪除此行） | 有機棉圍兜 |
| `{{PUBLISH_DATE}}` | 發布日期 | 2025年3月 |
| `{{ARTICLE_CONTENT_PARAGRAPH_1~4}}` | 文章段落內容 | （見內容撰寫規則）|
| `{{SECTION_TITLE_1~2}}` | 段落小標 | 真實媽媽的使用心得 |
| `{{BLOGGER_QUOTE}}` | 部落客金句（引言框） | 超必買！用了四年還是最愛 |
| `{{PRODUCT_CATEGORY}}` | 商品分類 | 外出防護 |
| `{{PRODUCT_NAME}}` | 商品名稱 | 機能防風罩 |
| `{{PRODUCT_DESC}}` | 商品簡述 | 推車罩、背巾罩、汽座罩、哺乳巾、遮陽罩 5 合 1 |
| `{{PRODUCT_SPEC_1~2}}` | 商品規格 | 抗UV UPF50+ |
| `{{TAG_1~3}}` | 文章標籤 | 防風罩 |
| `{{RELATED_1~3_HANDLE}}` | 相關文章部落客名稱 | 《Cynthia's 分享》 |
| `{{RELATED_1~3_TITLE}}` | 相關文章標題 | 寶寶我最罩…（截短至 30 字）|

**Step 3｜更新 news-bloggers.html 文章列表**

在對應商品分類的 `.reviews-grid` 內，新增一張 `review-list-card`：

```html
<a href="article-[slug].html" class="review-list-card reveal" data-cat="[category]">
  <div class="rlc-handle">《部落客名稱》</div>
  <div class="rlc-title">文章標題</div>
  <div class="rlc-tags">
    <span class="rlc-tag">商品標籤1</span>
    <span class="rlc-tag">商品標籤2</span>
  </div>
</a>
```

`data-cat` 可用值：`windcover` / `blanket` / `bib` / `bath` / `organic` / `gift` / `pacifier`

**Step 4｜更新跑馬燈（若為新部落客）**

在 `news-bloggers.html` 的 `.ticker-track` 內，正本和複製本各新增一個：

```html
<span class="ticker-item">
  <span class="ti-name">部落客名稱（不含書名號）</span>
  <span class="ti-sep">·</span>
  推薦商品名稱
</span>
```

**Step 5｜同步更新首頁 blogger-ticker（若數量有變化）**

在 `index.html` 的 `.blogger-ticker` 內同步新增。

---

### 任務 B：新增 / 修改商品資訊

#### B-1 修改首頁精選商品（products-section）

定位 `index.html` 中 `id="products"` 的 section，找到對應商品卡：

```html
<!-- 修改商品名稱 -->
<div class="product-name">【此處修改】</div>

<!-- 修改商品描述 -->
<div class="product-sub">【此處修改】</div>

<!-- 修改價格 -->
<div class="product-price">NT$ 【價格】 <small>/ 件</small></div>

<!-- 修改圖片 -->
<img src="./images/【圖檔名】" alt="【商品名稱】">

<!-- 修改連結 -->
<a href="【產品頁.html】" class="product-card reveal">
```

#### B-2 修改主打商品區（featured section）

定位 `<!-- FEATURED PRODUCT -->` 區塊：

```html
<!-- 可修改項目 -->
<div class="featured-tag">本季熱銷 NO.1</div>     <!-- 標籤文字 -->
<h3 class="featured-title">商品名稱</h3>           <!-- 商品標題 -->
<p class="featured-desc">商品描述</p>              <!-- 商品描述 -->
<span class="spec-tag">規格標籤</span>             <!-- 可新增/刪除 -->
<div class="featured-price">NT$ 1,880 <span>/ 件</span></div>  <!-- 價格 -->
```

#### B-3 新增商品分類卡片（categories section）

在 `.cat-grid` 內新增：

```html
<a href="#" class="cat-card reveal">
  <img src="./images/【圖檔名】" alt="【分類名】" class="cat-img">
  <div class="cat-overlay"></div>
  <div class="cat-info">
    <div class="cat-name">【分類名稱】</div>
    <div class="cat-sub">【商品描述，以・分隔】</div>
  </div>
  <div class="cat-arrow">→</div>
</a>
```

---

### 任務 C：SEO 文章撰寫規範

#### C-1 文章 SEO 結構要求

每篇文章 HTML 必須包含：

```html
<!-- 1. Title Tag（60字以內） -->
<title>【關鍵字】｜【部落客名稱】推薦｜HiBOU 喜福生活苑</title>

<!-- 2. Meta Description（120-160字） -->
<meta name="description" content="【部落客名稱】親身體驗喜福【商品名稱】，【商品一句話賣點】。MIT台灣製造，SGS嚴格把關。">

<!-- 3. H1（文章標題，僅一個）-->
<h1 class="article-title">【完整文章標題】</h1>

<!-- 4. H2（段落標題，每段一個）-->
<h2>【段落關鍵字標題】</h2>
```

#### C-2 關鍵字植入原則

**主要關鍵字（每篇至少出現 3 次）：**
- 喜福 / HiBOU
- 商品名稱（如：防風罩、防踢被、紗布巾）
- MIT台灣製造

**長尾關鍵字（自然融入內文）：**
- 嬰幼兒用品推薦
- 新手媽媽必備
- 寶寶外出好物
- 台灣嬰兒品牌

**禁止行為：**
- 關鍵字堆疊（同一段落同一詞出現 3 次以上）
- 與內文不相關的關鍵字

#### C-3 文章字數標準

| 文章類型 | 最低字數 | 建議字數 |
|----------|----------|----------|
| 部落客推薦 | 400 字 | 600-800 字 |
| 育兒教室 | 600 字 | 800-1200 字 |
| 親子旅遊 | 500 字 | 700-1000 字 |

#### C-4 內文段落結構（標準模板）

```
段落一：開場白 — 部落客個人情境引入（80-120字）
段落二：使用場景 — 什麼情況下用到這個商品（100-150字）
[圖片/引言]
段落三：實際體驗 — 觸感、使用感受、細節描述（150-200字）
[商品卡]
段落四：推薦結語 — 適合誰、購買建議（80-120字）
```

---

### 任務 D：品牌數字更新

當累積數字有變化時，需同步更新以下位置：

#### D-1 首頁 brand-stats 區塊

```html
<!-- 定位：index.html → section.brand-stats → .stats-inner -->
<div class="stat-number">【數字】<sup>+</sup></div>
```

#### D-2 首頁 blogger-wall 數字列

```html
<!-- 定位：index.html → section.blogger-wall → .blogger-stats-row -->
<div class="bstat-num">【數字】<sup>+</sup></div>
```

#### D-3 部落客推薦頁 Hero 數字

```html
<!-- 定位：news-bloggers.html → .page-hero → .page-hero-stats -->
<div class="phs-num">【數字】<sup>+</sup></div>
```

**注意：** 三處數字需保持一致。

---

### 任務 E：建立新的列表頁

目前待建：`news-travel.html`、`news-parenting.html`

#### E-1 建立流程

1. 複製 `news-bloggers.html` 作為基底
2. 修改 `<title>`、`<meta description>`
3. 修改 Page Hero 標題、描述、配色（travel 用 moss 系、parenting 用 accent-orange 系）
4. 修改 Filter Bar 篩選條件（依該分類調整）
5. 替換所有文章卡片內容
6. 更新 Breadcrumb 路徑
7. 在 `index.html` 的 `news-grid` 中，更新對應卡片的 `href`

---

### 任務 F：圖片管理規範

#### F-1 圖片命名

```
[商品英文]-[編號].jpg / .webp
範例：windcover-01.jpg、blanket-main.webp
```

#### F-2 圖片尺寸建議

| 用途 | 建議尺寸 | 格式 |
|------|----------|------|
| Hero 主視覺 | 1920 × 1080px | jpg/webp |
| 商品分類卡片 | 800 × 600px | jpg/webp |
| 商品精選卡片 | 800 × 800px（1:1） | jpg/webp |
| 文章封面 | 1200 × 675px（16:9） | jpg/webp |
| 文章內嵌圖 | 800 × 600px | jpg/webp |

#### F-3 圖片 alt 文字規範

```
格式：[商品名稱] [使用場景] HiBOU 喜福
範例：喜福機能防風罩 寶寶外出使用 HiBOU 喜福
```

---

## 三、常用代碼片段速查

### 3.1 goPage() 路由對照表

```javascript
goPage('home')       → index.html
goPage('landing')    → hibou_landing_page_v10.html
goPage('outdoor')    → index.html#categories
goPage('bedding')    → index.html#categories
goPage('clothing')   → index.html#categories
goPage('cleaning')   → index.html#categories
goPage('toys')       → index.html#categories
goPage('giftbox')    → index.html#categories
goPage('brand')      → index.html#brand
goPage('products')   → index.html#products
goPage('news')       → index.html#news
goPage('travel')     → news-travel.html
goPage('parenting')  → news-parenting.html
goPage('bloggers')   → news-bloggers.html
```

### 3.2 常用 CSS 類別速查

```css
/* 按鈕 */
.btn-primary    /* moss綠實心按鈕 */
.btn-secondary  /* 透明外框按鈕 */
.btn-shop       /* header選購按鈕 */

/* 商品標籤 */
.badge-hot      /* 橘色：熱銷 */
.badge-new      /* sage綠：新品 */
.badge-best     /* moss綠：推薦精選 */

/* 動畫 */
.reveal         /* 捲動進入動畫（需JS配合） */
.fade-in        /* 淡入動畫（CSS animation） */

/* 文章頁元件 */
.article-quote         /* 引言框 */
.product-card-inline   /* 文章內嵌商品卡 */
.img-placeholder       /* 圖片佔位符 */
```

### 3.3 商品分類對照表

| 中文名稱 | data-cat 值 | 對應圖片 |
|----------|------------|---------|
| 外出防護 | windcover | 喜福-09049-jpg.webp |
| 寢具床品 | blanket | 21-6重紗_呼呼防踢被_3-7歲KEWE.jpg |
| 穿著衣物 | clothing | 015_9336.jpg |
| 清潔沐浴 | bath | Hibou_6.jpg |
| 早教玩具 | toys | fb-02.png |
| 禮盒客製 | gift | （待補圖） |

---

## 四、品牌聲音規範（撰寫文案時遵守）

### 4.1 語氣原則
- 溫暖、有媽媽溫度，不冷硬、不過度行銷
- 第一人稱以「喜福」或「我們」稱呼品牌
- 對消費者用「媽媽」、「爸爸」、「您」，不用「消費者」

### 4.2 品牌核心語句（可直接使用）
- 「最私心的呵護」
- 「為守護孩子而幸福誕生」
- 「給孩子的永遠都要最好的」
- 「台灣本土嬰幼兒精品品牌」
- 「MIT 台灣製造・SGS 嚴格把關」

### 4.3 產品描述必帶資訊
每次描述商品，必須包含至少一項認證：
- SGS-CNS 15290 國家標準
- BSMI M55352 商品安全標章
- MIT 台灣製造
- 日本三河木棉認證（六重紗系列）

### 4.4 禁止使用詞彙
- 「最好」（誇大不實）→ 改用「極致」、「嚴格把關」
- 「第一名」（未經認證）→ 改用「媽媽首選」、「熱銷」
- 「保證」（法律風險）→ 改用「通過檢驗」、「品質把關」

---

## 五、錯誤處理 / 常見問題

### Q1：reveal 動畫元素不出現
**原因：** `.reveal` 沒有被 `IntersectionObserver` 觀察到  
**解法：** 確認新增的元素有加 `.reveal` class，且 JS 已執行 `observer.observe(el)`

### Q2：行動版選單點擊沒反應
**原因：** `id="hamburger"` 或 `id="mobileNav"` 重複或缺失  
**解法：** 每個頁面只能有一個 `id="hamburger"` 和 `id="mobileNav"`

### Q3：Filter 篩選後部分卡片消失不掉
**原因：** `data-cat` 屬性值拼錯  
**解法：** 對照 Section 3.3 的 data-cat 值，確認完全一致（全小寫英文）

### Q4：數字動畫不觸發
**原因：** `.stat-number` 內有非數字字元影響 `parseFloat()`  
**解法：** 確認 `.stat-number` 的直接文字節點只含數字（`<sup>` 等標籤不影響）

### Q5：goPage() 找不到頁面
**原因：** 新頁面未加入 `goPage()` 的 pages 物件  
**解法：** 在 `index.html` JS 的 `goPage()` 函式內，新增對應的 key-value

---

## 六、發布 Checklist

每次更新完成後，發布前確認：

- [ ] `<title>` 已更新
- [ ] `<meta description>` 已填寫（非空、非模板佔位符）
- [ ] 所有 `{{...}}` 佔位符已替換完畢
- [ ] 圖片 `src` 路徑正確（相對路徑，以 `./images/` 開頭）
- [ ] 圖片 `alt` 文字已填寫
- [ ] 新文章已加入 `news-bloggers.html` 列表
- [ ] 跑馬燈已同步更新（正本 + 複製本）
- [ ] 行動版選單可正常開關
- [ ] reveal 動畫可在捲動時觸發
- [ ] Footer 連結正確（不指向 `#`）
- [ ] Breadcrumb 路徑正確

---

*本 SOP 由 Claude 協助 HiBOU 喜福生活苑建立，供 OpenClaw hibou_agent 執行網站維護任務使用。*
*如網站架構有重大調整，請同步更新本文件。*
