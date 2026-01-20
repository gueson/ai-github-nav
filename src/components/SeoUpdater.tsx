import { useEffect } from "react";
import { getCurrentLanguage, t } from "@/lib/i18n";

interface SeoUpdaterProps {
  // 可选的自定义标题，用于特定页面
  title?: string;
  // 可选的自定义描述，用于特定页面
  description?: string;
  // 可选的自定义关键字，用于特定页面
  keywords?: string;
}

/**
 * SEO标签更新组件
 * 根据当前语言动态更新页面的SEO标签
 */
export function SeoUpdater({ title, description, keywords }: SeoUpdaterProps) {
  useEffect(() => {
    const lang = getCurrentLanguage();
    
    // 更新html标签的lang属性
    const htmlElement = document.documentElement;
    htmlElement.setAttribute("lang", lang === "zh" ? "zh-CN" : "en");
    
    // 获取翻译后的SEO内容
    const seoTitle = title || t("seo.title");
    const seoDescription = description || t("seo.description");
    const seoKeywords = keywords || t("seo.keywords");
    
    // 更新title标签
    document.title = seoTitle;
    
    // 更新meta标签
    updateMetaTag("title", seoTitle);
    updateMetaTag("description", seoDescription);
    updateMetaTag("keywords", seoKeywords);
    updateMetaTag("apple-mobile-web-app-title", t("app.title"));
    
    // 更新Open Graph标签
    updateOgTag("og:title", t("seo.og.title"));
    updateOgTag("og:description", t("seo.og.description"));
    updateOgTag("og:site_name", t("app.title"));
    updateOgTag("og:locale", lang === "zh" ? "zh_CN" : "en_US");
    
    // 更新Twitter标签
    updateTwitterTag("twitter:title", t("seo.twitter.title"));
    updateTwitterTag("twitter:description", t("seo.twitter.description"));
    
    // 更新Schema.org结构化数据
    updateSchemaData(lang);
  }, [title, description, keywords]);

  /**
   * 更新meta标签
   */
  const updateMetaTag = (name: string, content: string) => {
    let metaElement = document.querySelector(`meta[name="${name}"]`);
    if (!metaElement) {
      metaElement = document.createElement("meta");
      metaElement.setAttribute("name", name);
      document.head.appendChild(metaElement);
    }
    metaElement.setAttribute("content", content);
  };

  /**
   * 更新Open Graph标签
   */
  const updateOgTag = (property: string, content: string) => {
    let ogElement = document.querySelector(`meta[property="${property}"]`);
    if (!ogElement) {
      ogElement = document.createElement("meta");
      ogElement.setAttribute("property", property);
      document.head.appendChild(ogElement);
    }
    ogElement.setAttribute("content", content);
  };

  /**
   * 更新Twitter标签
   */
  const updateTwitterTag = (name: string, content: string) => {
    let twitterElement = document.querySelector(`meta[property="${name}"]`);
    if (!twitterElement) {
      twitterElement = document.createElement("meta");
      twitterElement.setAttribute("property", name);
      document.head.appendChild(twitterElement);
    }
    twitterElement.setAttribute("content", content);
  };

  /**
   * 更新Schema.org结构化数据
   */
  const updateSchemaData = (lang: string) => {
    // 查找现有的Schema.org脚本标签
    let schemaScript = document.querySelector("script[type='application/ld+json']");
    
    // 创建Schema.org数据
    const schemaData = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": t("seo.schema.name"),
      "description": t("seo.schema.description"),
      "url": "https://www.githubnav.online/",
      "publisher": {
        "@type": "Organization",
        "name": t("app.title"),
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.githubnav.online/logo.png"
        }
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://www.githubnav.online/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      },
      "inLanguage": lang === "zh" ? "zh-CN" : "en-US",
      "keywords": t("seo.schema.keywords")
    };
    
    // 更新或创建脚本标签
    if (schemaScript) {
      schemaScript.textContent = JSON.stringify(schemaData, null, 2);
    } else {
      schemaScript = document.createElement("script");
      schemaScript.setAttribute("type", "application/ld+json");
      schemaScript.textContent = JSON.stringify(schemaData, null, 2);
      document.head.appendChild(schemaScript);
    }
  };

  // 这个组件不渲染任何内容
  return null;
}
