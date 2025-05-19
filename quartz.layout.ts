import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/carlisia",
      linkedIn: "https://www.linkedin.com/in/carlisia",
      Bluesky: "https://bsky.app/profile/carlisia.com",
      X: "https://x.com/carlisia",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs({
        showCurrentPage: false,
      }),
      condition: (page) => 
        page.fileData.slug !== "index" && !page.fileData.slug.startsWith("thoughts/"), 
    }),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  afterBody: [
    Component.ConditionalRender({
      component: Component.Comments({
        provider: 'giscus',
        options: {
          repo: "carlisia/website",
          repoId: "MDEwOlJlcG9zaXRvcnkyMDQzNDYzOTU=",
          category: "💭 Comments",
          categoryId: "DIC_kwDODC4UG84CqHE9",
          reactionsEnabled: true,
          inputPosition: "bottom",
        }
      }),
      condition: (page) => page.fileData.slug !== "index",
    }),

  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Flex({
      components: [
        {
          Component: Component.Darkmode(),
        },
        { Component: Component.ReaderMode() },
      ],
    }),
    Component.RecentNotes({
      title: "Recent Thinking",
      limit: 3,
      filter: (f) =>
        f.slug!.startsWith("thoughts/"),
      linkToMore: "thoughts/" as SimpleSlug,
    }),
    Component.ConditionalRender({
     component: Component.Explorer({
        filterFn: (node) => {
          const slug = node.slug?.toLowerCase() ?? ""

          return !slug.startsWith("thoughts/") && !slug.startsWith("images/")
        },
        }),
      condition: (page) => !page.fileData.slug.startsWith("thoughts/"),
    }),
  ],
  right: [
    Component.ConditionalRender({
      component: Component.Graph(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Flex({
      components: [
        {
          Component: Component.Darkmode(),
        },
        { Component: Component.ReaderMode() },
      ],
    }),
    Component.RecentNotes({
      title: "Recent Thinking",
      limit: 3,
      filter: (f) =>
        f.slug!.startsWith("thoughts/"),
      linkToMore: "thoughts/" as SimpleSlug,
    }),
    Component.ConditionalRender({
     component: Component.Explorer({
        filterFn: (node) => {
          const slug = node.slug?.toLowerCase() ?? ""
          return !slug.startsWith("thoughts/") && !slug.startsWith("images/")
        },
        }),
      condition: (page) => !page.fileData.slug.startsWith("thoughts/"),

    }),
  ],
  right: [
    Component.ConditionalRender({
      component: Component.Graph(),
      condition: (page) =>
        (page.fileData.slug ?? "").startsWith("tags/") &&
        page.fileData.slug !== "tags" &&
        page.fileData.slug !== "tags/index",
      }),
  ],
}
