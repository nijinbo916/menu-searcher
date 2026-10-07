/* ============================================================
   菜单搜索器 · 交互与逻辑层
   Web 开发技术 Lesson 2 作业
   ------------------------------------------------------------
   功能：
   1. 关键字实时搜索（菜名 / 描述 / 标签 / 分类 全字段匹配）
   2. 分类筛选，可与关键字搜索叠加使用
   3. 命中关键字高亮显示
   4. 空结果状态、结果计数、一键清除筛选
   5. 键盘快捷键：/ 聚焦搜索框，Esc 清空
   ============================================================ */

/* ---------- 1. 菜单数据 ---------- */
const MENU = [
  { id: 1,  name: '宫保鸡丁',   cat: '热菜', price: 38, emoji: '🍗',
    desc: '鸡腿肉丁配油酥花生，糊辣荔枝口，酸甜微辣。', tags: ['辣', '招牌'] },
  { id: 2,  name: '麻婆豆腐',   cat: '热菜', price: 28, emoji: '🍲',
    desc: '嫩豆腐配牛肉末，花椒香浓，麻辣烫口。', tags: ['辣', '素', '下饭'] },
  { id: 3,  name: '红烧狮子头', cat: '热菜', price: 46, emoji: '🥩',
    desc: '手工剁肉摔打上劲，先炸后炖两小时，入口即化。', tags: ['招牌'] },
  { id: 4,  name: '清蒸鲈鱼',   cat: '热菜', price: 68, emoji: '🐟',
    desc: '活鲈鱼现杀，铺姜丝淋热油，只加一点蒸鱼豉油。', tags: ['清淡', '低脂'] },
  { id: 5,  name: '鱼香肉丝',   cat: '热菜', price: 34, emoji: '🥢',
    desc: '里脊肉丝配木耳笋丝，泡椒炒香，酸甜微辣。', tags: ['辣', '下饭'] },
  { id: 6,  name: '干煸四季豆', cat: '热菜', price: 26, emoji: '🫛',
    desc: '四季豆煸至起皱，配肉末与干辣椒，焦香脆嫩。', tags: ['辣', '素'] },
  { id: 7,  name: '水煮牛肉',   cat: '热菜', price: 58, emoji: '🌶️',
    desc: '麻辣鲜香，牛肉嫩滑，配黄豆芽与莴笋垫底。', tags: ['辣', '重口'] },
  { id: 8,  name: '番茄炒蛋',   cat: '热菜', price: 22, emoji: '🍅',
    desc: '沙瓤番茄配土鸡蛋，少油少糖，酸甜家常。', tags: ['素', '下饭'] },

  { id: 9,  name: '凉拌黄瓜',   cat: '凉菜', price: 16, emoji: '🥒',
    desc: '手拍黄瓜蒜香十足，清爽解腻，冰镇后更佳。', tags: ['素', '清淡', '低脂'] },
  { id: 10, name: '口水鸡',     cat: '凉菜', price: 36, emoji: '🍖',
    desc: '土鸡浸熟放凉，淋红油蒜泥藤椒汁，麻辣鲜香。', tags: ['辣'] },
  { id: 11, name: '老醋蜇头',   cat: '凉菜', price: 42, emoji: '🥗',
    desc: '海蜇头脆爽弹牙，山西老醋调味，酸香开胃。', tags: ['清淡', '低脂'] },
  { id: 12, name: '皮蛋豆腐',   cat: '凉菜', price: 18, emoji: '🥚',
    desc: '内酯豆腐配溏心皮蛋，浇香葱酱汁，冰凉嫩滑。', tags: ['素', '清淡'] },

  { id: 13, name: '酸辣汤',     cat: '汤品', price: 20, emoji: '🥣',
    desc: '豆腐丝木耳丝黄花菜，胡椒与醋提味，酸辣暖胃。', tags: ['辣', '素'] },
  { id: 14, name: '菌菇鸡汤',   cat: '汤品', price: 48, emoji: '🍲',
    desc: '老母鸡配六种山珍菌菇，文火慢炖三小时。', tags: ['清淡', '滋补'] },
  { id: 15, name: '玉米排骨汤', cat: '汤品', price: 42, emoji: '🌽',
    desc: '甜玉米与肋排同炖，汤色清亮，鲜甜不腻。', tags: ['清淡', '滋补'] },
  { id: 16, name: '番茄牛腩汤', cat: '汤品', price: 52, emoji: '🥘',
    desc: '牛腩炖至软糯，番茄熬出沙感，浓郁酸甜。', tags: ['滋补'] },

  { id: 17, name: '扬州炒饭',   cat: '主食', price: 26, emoji: '🍚',
    desc: '隔夜米粒粒分明，配虾仁火腿青豆，锅气十足。', tags: ['招牌'] },
  { id: 18, name: '手工阳春面', cat: '主食', price: 18, emoji: '🍜',
    desc: '碱水面配猪油葱花高汤，简单却最见功夫。', tags: ['清淡', '素'] },
  { id: 19, name: '牛肉锅贴',   cat: '主食', price: 24, emoji: '🥟',
    desc: '底脆汁多的手工锅贴，一份八只，配姜醋汁。', tags: ['招牌', '现做'] },
  { id: 20, name: '葱油拌面',   cat: '主食', price: 20, emoji: '🍝',
    desc: '小葱慢熬成葱油，拌上细面，酱香浓郁。', tags: ['素'] },

  { id: 21, name: '酸梅汤',     cat: '饮品', price: 12, emoji: '🥤',
    desc: '乌梅山楂陈皮桂花同煮，冰镇后解腻消暑。', tags: ['素', '冰饮'] },
  { id: 22, name: '鲜榨橙汁',   cat: '饮品', price: 18, emoji: '🍊',
    desc: '三个赣南脐橙鲜榨一杯，不加水不加糖。', tags: ['素', '低脂', '冰饮'] },
  { id: 23, name: '茉莉花茶',   cat: '饮品', price: 15, emoji: '🍵',
    desc: '七窨茉莉，热泡冷萃皆可，回甘清雅。', tags: ['素', '热饮'] },

  { id: 24, name: '桂花酒酿圆子', cat: '甜品', price: 16, emoji: '🍮',
    desc: '小圆子配酒酿，撒干桂花，温热甜润。', tags: ['素', '热食'] },
  { id: 25, name: '杨枝甘露',   cat: '甜品', price: 22, emoji: '🥭',
    desc: '芒果西柚配椰浆西米，冷藏后口感最佳。', tags: ['素', '冰品'] },
  { id: 26, name: '红豆双皮奶', cat: '甜品', price: 20, emoji: '🍧',
    desc: '水牛奶蒸出双层奶皮，铺蜜红豆，细腻顺滑。', tags: ['素', '冰品'] }
];

/* ---------- 2. 状态 ---------- */
const state = {
  keyword: '',
  category: '全部'
};

/* ---------- 3. DOM 引用 ---------- */
const el = {
  searchInput: document.getElementById('searchInput'),
  clearBtn: document.getElementById('clearBtn'),
  categoryBar: document.getElementById('categoryBar'),
  menuList: document.getElementById('menuList'),
  emptyState: document.getElementById('emptyState'),
  emptyReset: document.getElementById('emptyReset'),
  resultText: document.getElementById('resultText'),
  resetBtn: document.getElementById('resetBtn'),
  totalCount: document.getElementById('totalCount')
};

/* ---------- 4. 工具函数 ---------- */

/** 转义 HTML，防止数据里的特殊字符破坏结构 */
function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (ch) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[ch]));
}

/** 转义正则元字符 */
function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/** 把 text 中命中 keyword 的片段包上 <mark>，返回安全的 HTML */
function highlight(text, keyword) {
  const safe = escapeHtml(text);
  if (!keyword) return safe;
  const re = new RegExp(`(${escapeRegExp(escapeHtml(keyword))})`, 'gi');
  return safe.replace(re, '<mark>$1</mark>');
}

/** 一条菜品是否命中当前关键字 */
function matchKeyword(dish, keyword) {
  if (!keyword) return true;
  const haystack = [
    dish.name,
    dish.desc,
    dish.cat,
    dish.tags.join(' ')
  ].join(' ').toLowerCase();
  return haystack.includes(keyword.toLowerCase());
}

/** 取当前筛选结果 */
function getFiltered() {
  return MENU.filter((dish) => {
    const catOk = state.category === '全部' || dish.cat === state.category;
    return catOk && matchKeyword(dish, state.keyword);
  });
}

/* ---------- 5. 渲染：分类栏（只在初始化时构建一次） ---------- */
function renderCategories() {
  const cats = ['全部', ...new Set(MENU.map((d) => d.cat))];

  el.categoryBar.innerHTML = cats.map((cat) => {
    const count = cat === '全部'
      ? MENU.length
      : MENU.filter((d) => d.cat === cat).length;
    return `<button class="cat" type="button"
              data-cat="${escapeHtml(cat)}"
              aria-pressed="false">
              ${escapeHtml(cat)}<span class="cat-count">${count}</span>
            </button>`;
  }).join('');
}

/** 同步分类栏选中态（不重建 DOM，避免闪烁与失焦） */
function updateCategoryActive() {
  el.categoryBar.querySelectorAll('.cat').forEach((btn) => {
    const on = btn.dataset.cat === state.category;
    btn.classList.toggle('is-active', on);
    btn.setAttribute('aria-pressed', String(on));
  });
}

/* ---------- 6. 渲染：菜品列表 ---------- */
function renderList() {
  const list = getFiltered();
  const kw = state.keyword.trim();

  /* 空状态 */
  if (list.length === 0) {
    el.menuList.innerHTML = '';
    el.menuList.hidden = true;
    el.emptyState.hidden = false;
    el.resultText.innerHTML = kw
      ? `没有匹配 <mark>${escapeHtml(kw)}</mark> 的菜品`
      : '当前分类下暂无菜品';
    el.resetBtn.hidden = false;
    return;
  }

  el.emptyState.hidden = true;
  el.menuList.hidden = false;
  el.resetBtn.hidden = !kw && state.category === '全部';

  /* 结果统计文案 */
  const where = state.category === '全部' ? '' : `「${escapeHtml(state.category)}」分类下，`;
  el.resultText.innerHTML = kw
    ? `${where}找到 <strong>${list.length}</strong> 道与 <mark>${escapeHtml(kw)}</mark> 相关的菜品`
    : `${where}共 <strong>${list.length}</strong> 道菜品`;

  /* 卡片 */
  el.menuList.innerHTML = list.map((dish, i) => {
    const tags = dish.tags.map((t) => {
      let cls = 'tag';
      if (t === '辣') cls += ' is-spicy';
      if (t === '素') cls += ' is-veg';
      if (t === '招牌') cls += ' is-hot';
      return `<span class="${cls}">${escapeHtml(t)}</span>`;
    }).join('');

    return `
      <li class="dish" style="animation-delay:${Math.min(i * 28, 320)}ms">
        <div class="dish-head">
          <span class="dish-emoji" aria-hidden="true">${dish.emoji}</span>
          <div class="dish-title">
            <h2 class="dish-name">${highlight(dish.name, kw)}</h2>
            <p class="dish-cat">${escapeHtml(dish.cat)}</p>
          </div>
          <span class="dish-price"><small>¥</small>${dish.price}</span>
        </div>
        <p class="dish-desc">${highlight(dish.desc, kw)}</p>
        <div class="dish-tags">${tags}</div>
      </li>`;
  }).join('');
}

/* ---------- 7. 统一刷新 ---------- */
function update() {
  const kw = state.keyword.trim();
  el.clearBtn.hidden = kw === '';
  updateCategoryActive();
  renderList();
}

/* ---------- 8. 事件绑定 ---------- */

/* 输入即搜索 */
el.searchInput.addEventListener('input', (e) => {
  state.keyword = e.target.value;
  update();
});

/* 回车不提交表单（防误触），改为收起键盘 */
el.searchInput.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    e.preventDefault();
    clearSearch();
    el.searchInput.blur();
  }
});

/* 清空搜索 */
el.clearBtn.addEventListener('click', clearSearch);

function clearSearch() {
  state.keyword = '';
  el.searchInput.value = '';
  update();
  el.searchInput.focus();
}

/* 分类切换（事件委托） */
el.categoryBar.addEventListener('click', (e) => {
  const btn = e.target.closest('.cat');
  if (!btn) return;
  state.category = btn.dataset.cat;
  update();
});

/* 清除所有筛选 */
function resetAll() {
  state.category = '全部';
  clearSearch();
}
el.resetBtn.addEventListener('click', resetAll);
el.emptyReset.addEventListener('click', resetAll);

/* 全局快捷键：/ 聚焦搜索框 */
document.addEventListener('keydown', (e) => {
  const tag = (e.target.tagName || '').toLowerCase();
  const typing = tag === 'input' || tag === 'textarea' || e.target.isContentEditable;
  if (e.key === '/' && !typing) {
    e.preventDefault();
    el.searchInput.focus();
  }
});

/* ---------- 9. 初始化 ---------- */
el.totalCount.textContent = MENU.length;
el.searchInput.value = '';
renderCategories();
update();
