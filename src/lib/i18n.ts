// 自定义国际化实现

// 语言类型
export type Language = 'zh' | 'en';

// 翻译资源类型
export interface TranslationResources {
  [key: string]: string;
}

// 所有语言的翻译资源
export const resources: Record<Language, TranslationResources> = {
  zh: {
    // 首页
    'app.title': 'GitHub AI 导航',
    'app.subtitle': '精选高 Star 开源项目',
    'search.placeholder': '搜索 AI 仓库...',
    'search.loading': '正在搜索优质 AI 项目...',
    'search.found': '找到 {{count}} 个相关仓库',
    'search.limit': '仅展示前 1k',
    'search.ready': '准备就绪',
    'search.noResults': '未找到相关项目',
    'search.noResultsHint': '尝试更换关键词，或者减少筛选条件。我们目前仅展示 Star 数大于 1000 的 AI 仓库。',
    'search.clear': '清除搜索条件',
    'search.end': '已加载全部高星 AI 仓库 (GitHub API 限制前 1000 条结果)',
    
    // 排序
    'sort.desc': 'Star 降序',
    'sort.asc': 'Star 升序',
    
    // 错误
    'error.title': '数据获取异常',
    'error.tryAgain': '重试',
    'error.failed': '请求失败',
    
    // 404 页面
    'notFound.title': '404',
    'notFound.message': '页面不存在',
    'notFound.description': '很抱歉，您访问的页面不存在或已被移动。请返回主页继续浏览优质的 AI 开源项目。',
    'notFound.backHome': '返回主页',
    
    // 页脚
    'footer.title': 'GitHub AI 导航',
    'footer.subtitle': '精选全球最佳 AI 开源项目',
    'footer.source': '项目源码',
    'footer.issues': '反馈问题',
    'footer.pullRequests': '贡献代码',
    'footer.copyright': '© {{year}} GitHub AI 导航. 数据来源于 GitHub API.',
    'footer.license': '仅用于学习和研究目的，所有内容的版权归原作者所有。',
    
    // 语言切换
    'language.zh': '中文',
    'language.en': 'English',
    
    // SEO 相关
    'seo.title': 'GitHub AI 导航 - 精选全球最佳 AI 开源项目',
    'seo.description': 'GitHub AI 导航 - 实时同步全球高 Star 人工智能开源项目，涵盖机器学习、深度学习、LLM 大模型、ChatGPT、Stable Diffusion 等领域，助你快速发现最前沿的 AI 技术与工具。',
    'seo.keywords': 'GitHub, AI, 人工智能, 开源项目, 机器学习, 深度学习, LLM, ChatGPT, Stable Diffusion, 导航站, 高 Star 项目, AI Tools, 开源仓库',
    'seo.og.title': 'GitHub AI 导航 - 精选全球最佳 AI 开源项目',
    'seo.og.description': 'GitHub AI 导航 - 实时同步全球高 Star 人工智能开源项目，涵盖机器学习、深度学习、LLM 大模型、ChatGPT、Stable Diffusion 等领域，助你快速发现最前沿的 AI 技术与工具。',
    'seo.twitter.title': 'GitHub AI 导航 - 精选全球最佳 AI 开源项目',
    'seo.twitter.description': 'GitHub AI 导航 - 实时同步全球高 Star 人工智能开源项目，涵盖机器学习、深度学习、LLM 大模型、ChatGPT、Stable Diffusion 等领域，助你快速发现最前沿的 AI 技术与工具。',
    'seo.schema.name': 'GitHub AI 导航',
    'seo.schema.description': 'GitHub AI 导航 - 实时同步全球高 Star 人工智能开源项目，涵盖机器学习、深度学习、LLM 大模型、ChatGPT、Stable Diffusion 等领域，助你快速发现最前沿的 AI 技术与工具。',
    'seo.schema.keywords': 'GitHub, AI, 人工智能, 开源项目, 机器学习, 深度学习, LLM, ChatGPT, Stable Diffusion, 导航站, 高 Star 项目, AI Tools, 开源仓库'
  },
  en: {
    // 首页
    'app.title': 'GitHub AI Navigator',
    'app.subtitle': 'Curated High Star Open Source Projects',
    'search.placeholder': 'Search AI repositories...',
    'search.loading': 'Searching for high-quality AI projects...',
    'search.found': 'Found {{count}} related repositories',
    'search.limit': 'Showing first 1k only',
    'search.ready': 'Ready',
    'search.noResults': 'No projects found',
    'search.noResultsHint': 'Try changing keywords or reducing filters. We only show AI repositories with more than 1000 stars.',
    'search.clear': 'Clear search criteria',
    'search.end': 'All high-star AI repositories loaded (GitHub API limits to first 1000 results)',
    
    // 排序
    'sort.desc': 'Star Descending',
    'sort.asc': 'Star Ascending',
    
    // 错误
    'error.title': 'Data Fetch Error',
    'error.tryAgain': 'Try Again',
    'error.failed': 'Request Failed',
    
    // 404 页面
    'notFound.title': '404',
    'notFound.message': 'Page Not Found',
    'notFound.description': 'Sorry, the page you are looking for does not exist or has been moved. Please return to the homepage to continue browsing high-quality AI open source projects.',
    'notFound.backHome': 'Back to Homepage',
    
    // 页脚
    'footer.title': 'GitHub AI Navigator',
    'footer.subtitle': 'Curated Global Best AI Open Source Projects',
    'footer.source': 'Source Code',
    'footer.issues': 'Report Issues',
    'footer.pullRequests': 'Contribute',
    'footer.copyright': '© {{year}} GitHub AI Navigator. Data from GitHub API.',
    'footer.license': 'For learning and research purposes only. All content copyrights belong to their original authors.',
    
    // 语言切换
    'language.zh': '中文',
    'language.en': 'English',
    
    // SEO 相关
    'seo.title': 'GitHub AI Navigator - Curated Top AI Open Source Projects',
    'seo.description': 'GitHub AI Navigator - Real-time curated collection of high-star AI open source projects from GitHub, covering machine learning, deep learning, LLM, ChatGPT, Stable Diffusion, and more. Discover the latest AI technologies and tools.',
    'seo.keywords': 'GitHub AI projects, open source AI tools, top AI repositories, machine learning projects, deep learning tools, LLM projects, ChatGPT open source, Stable Diffusion repositories, AI development resources, high star AI repos, AI frameworks, AI models, open source artificial intelligence',
    'seo.og.title': 'GitHub AI Navigator - Curated Top AI Open Source Projects',
    'seo.og.description': 'GitHub AI Navigator - Real-time curated collection of high-star AI open source projects from GitHub, covering machine learning, deep learning, LLM, ChatGPT, Stable Diffusion, and more. Discover the latest AI technologies and tools.',
    'seo.twitter.title': 'GitHub AI Navigator - Curated Top AI Open Source Projects',
    'seo.twitter.description': 'GitHub AI Navigator - Real-time curated collection of high-star AI open source projects from GitHub, covering machine learning, deep learning, LLM, ChatGPT, Stable Diffusion, and more. Discover the latest AI technologies and tools.',
    'seo.schema.name': 'GitHub AI Navigator',
    'seo.schema.description': 'GitHub AI Navigator - Real-time curated collection of high-star AI open source projects from GitHub, covering machine learning, deep learning, LLM, ChatGPT, Stable Diffusion, and more. Discover the latest AI technologies and tools.',
    'seo.schema.keywords': 'GitHub AI projects, open source AI tools, top AI repositories, machine learning projects, deep learning tools, LLM projects, ChatGPT open source, Stable Diffusion repositories, AI development resources, high star AI repos, AI frameworks, AI models, open source artificial intelligence'
  }
};

// 获取当前语言
export const getCurrentLanguage = (): Language => {
  // 从 localStorage 获取，否则使用英文作为默认语言
  const savedLang = localStorage.getItem('language') as Language | null;
  if (savedLang && (savedLang === 'zh' || savedLang === 'en')) {
    return savedLang;
  }
  
  // 默认使用英文
  return 'en';
};

// 设置当前语言
export const setCurrentLanguage = (lang: Language): void => {
  localStorage.setItem('language', lang);
};

// 翻译函数
export const t = (key: string, params?: Record<string, any>): string => {
  const lang = getCurrentLanguage();
  let text = resources[lang][key] || key;
  
  // 替换参数
  if (params) {
    Object.entries(params).forEach(([k, v]) => {
      text = text.replace(new RegExp(`{{${k}}}`, 'g'), String(v));
    });
  }
  
  return text;
};
