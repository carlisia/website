import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"
import { CustomOgImages } from "./quartz/plugins/emitters/ogImage"


/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Carlisia Campos",
    pageTitleSuffix: " - Carlisia Campos",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "en-US",
    baseUrl: "grokkingtech.io",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "created",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: {
          name: "Inter",
        },
        body: "IBM Plex Mono",
        code: "Fira Code",
      },
      colors: {
        lightMode: {
          light: "#ffffff",             // Clean background
          lightgray: "#f4f4f4",         // Subtle section contrast
          gray: "#b8b8b8",              // Light neutral elements
          darkgray: "#707070",          // Stronger neutral
          dark: "#2b2b2b",              // For dark text on cards
          secondary: "#825ce5",         // Main accent (vibrant violet)
          tertiary: "#487f89",          // Oceanic balance
          highlight: "rgba(168, 51, 130, 0.10)",  // Soft pink overlay
          textHighlight: "#cb6ce688",   // Bright pink text background
        },
        darkMode: {
          light: "#1a1a1d",             // Dark base
          lightgray: "#2a2a2d",         // Subtle dark sections
          gray: "#4f4f4f",              // Muted UI elements
          darkgray: "#dcdcdc",          // Light text
          dark: "#ffffff",              // Brightest elements
          secondary: "#a83382",         // Main accent (deep pink)
          tertiary: "#5f81ff",          // Periwinkle balance
          highlight: "rgba(130, 92, 229, 0.10)",  // Violet tone overlay
          textHighlight: "#487f8988",   // Teal text background
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: true}),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({
        markdownLinkResolution: "shortest",
        openLinksInNewTab: true,
        lazyLoad: true,
      }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      Plugin.CustomOgImages({
        colorScheme: "darkMode", // what colors to use for generating image, same as theme colors from config, valid values are "darkMode" and "lightMode"
        width: 1200, // width to generate with (in pixels)
        height: 630, // height to generate with (in pixels)
        excludeRoot: false, // wether to exclude "/" index path to be excluded from auto generated images (false = use auto, true = use default og image)
        // imageStructure: defaultImage, // custom image component to use
      }),
    ],
  },
}

export default config
