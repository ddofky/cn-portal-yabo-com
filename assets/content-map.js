// assets/content-map.js
// Site content sections, keyword tags, and search/filter utilities

const contentMap = {
  siteUrl: "https://cn-portal-yabo.com",
  defaultKeyword: "亚博体育",
  sections: [
    {
      id: "home",
      title: "首页",
      tags: ["亚博体育", "首页推荐", "热门活动"],
      description: "平台首页，展示最新活动和推荐内容"
    },
    {
      id: "sports",
      title: "体育赛事",
      tags: ["亚博体育", "足球", "篮球", "网球", "电子竞技"],
      description: "各类体育赛事信息与实时比分"
    },
    {
      id: "live-casino",
      title: "真人娱乐",
      tags: ["亚博体育", "真人视讯", "百家乐", "轮盘", "骰宝"],
      description: "真人荷官在线视讯游戏"
    },
    {
      id: "slots",
      title: "电子游艺",
      tags: ["亚博体育", "老虎机", "捕鱼达人", "电子棋牌"],
      description: "热门电子游戏与老虎机"
    },
    {
      id: "promotions",
      title: "优惠活动",
      tags: ["亚博体育", "首存红利", "每日返水", "VIP"],
      description: "当前优惠活动和VIP福利"
    },
    {
      id: "about",
      title: "关于我们",
      tags: ["亚博体育", "平台介绍", "联系我们"],
      description: "平台介绍和联系方式"
    }
  ]
};

/**
 * Search sections by keyword tag
 * @param {string} keyword - keyword to search for
 * @returns {Array} matching sections
 */
function searchSectionsByTag(keyword) {
  if (!keyword || keyword.trim() === "") return [];
  const lowerKeyword = keyword.toLowerCase().trim();
  return contentMap.sections.filter(section =>
    section.tags.some(tag => tag.toLowerCase().includes(lowerKeyword))
  );
}

/**
 * Filter sections by tag list (AND logic)
 * @param {Array} tagList - array of tag strings
 * @returns {Array} sections containing all given tags
 */
function filterSectionsByTags(tagList) {
  if (!Array.isArray(tagList) || tagList.length === 0) return contentMap.sections;
  const lowerTags = tagList.map(t => t.toLowerCase().trim());
  return contentMap.sections.filter(section => {
    const sectionTags = section.tags.map(t => t.toLowerCase());
    return lowerTags.every(t => sectionTags.includes(t));
  });
}

/**
 * Get all unique tags from all sections
 * @returns {Array} sorted unique tags
 */
function getAllTags() {
  const tagSet = new Set();
  contentMap.sections.forEach(section => {
    section.tags.forEach(tag => tagSet.add(tag));
  });
  return Array.from(tagSet).sort();
}

/**
 * Count sections associated with each tag
 * @returns {Object} tag -> count mapping
 */
function countTags() {
  const tagCount = {};
  contentMap.sections.forEach(section => {
    section.tags.forEach(tag => {
      tagCount[tag] = (tagCount[tag] || 0) + 1;
    });
  });
  return tagCount;
}

/**
 * Generate a simple search result summary
 * @param {string} keyword
 * @returns {string} summary text
 */
function generateSearchSummary(keyword) {
  const results = searchSectionsByTag(keyword);
  if (results.length === 0) {
    return `未找到与"${keyword}"相关的分区`;
  }
  const names = results.map(r => r.title).join("、");
  return `找到 ${results.length} 个与"${keyword}"相关的分区: ${names}`;
}

/**
 * Get section by its id
 * @param {string} id - section identifier
 * @returns {object|null} section object or null
 */
function getSectionById(id) {
  return contentMap.sections.find(s => s.id === id) || null;
}

/**
 * Add a new section (mutates contentMap, returns updated sections length)
 * @param {object} section - section object with id, title, tags, description
 * @returns {number} new sections count
 */
function addSection(section) {
  if (!section.id || !section.title) return contentMap.sections.length;
  contentMap.sections.push(section);
  return contentMap.sections.length;
}

// Self-test demonstration (runs when loaded directly)
if (typeof require !== 'undefined' && require.main === module) {
  console.log("=== 内容分区映射演示 ===");
  console.log("站点:", contentMap.siteUrl);
  console.log("默认关键词:", contentMap.defaultKeyword);
  console.log("全部分区:", contentMap.sections.map(s => s.title).join(", "));
  console.log("所有标签:", getAllTags().join(", "));
  console.log("标签计数:", JSON.stringify(countTags(), null, 2));
  console.log("搜索 '足球':", generateSearchSummary("足球"));
  console.log("搜索 '亚博体育':", generateSearchSummary("亚博体育"));
  console.log("过滤 ['亚博体育', '电子游艺']:", filterSectionsByTags(["亚博体育", "电子游艺"]).map(s => s.title));
}