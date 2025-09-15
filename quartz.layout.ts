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
      YouTube: "https://www.youtube.com/@carlisia.campos",
      Bluesky: "https://bsky.app/profile/carlisia.com",
      X: "https://x.com/carlisia",
      stackoverflow: "https://stackoverflow.com/users/3389881/carlisia",
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
        !page.fileData.slug.startsWith("thoughts/"), 
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
    Component.DesktopOnly(Component.Search()),
    Component.Flex({
      wrap: "wrap",
      components: [
        { Component: Component.MobileOnly(Component.Search()) },
        { Component: Component.Darkmode() },
        { Component: Component.DesktopOnly(Component.ReaderMode()) },
        { Component: Component.TagsLink() },
      ],
    }),
    Component.DesktopOnly(
      Component.ConditionalRender({
       component: Component.RecentNotes({
          title: "Recent Thinking",
          limit: 8,
          linkToMore: "thoughts",
          filter: (f) =>
            // Include all pages under thoughts/ but not the index page.
            f.slug!.startsWith("thoughts/") && f.slug !== "thoughts/index",
        }),
        condition: (page) => page.fileData.slug.startsWith("thoughts/"),
      }),
    ),
    Component.ConditionalRender({
      component: Component.RecentNotes({
        title: "Latest Thoughts",
        limit: 3,
        linkToMore: "thoughts",
        filter: (f) =>
          f.slug!.startsWith("thoughts/") && f.slug !== "thoughts/index",
      }),
      condition: (page) => page.fileData.slug === "index",
    }),
    Component.ConditionalRender({
     component: Component.Explorer({
        filterFn: (node) => {
          const slug = node.slug?.toLowerCase() ?? ""
          return !slug.startsWith("thoughts/") && !slug.startsWith("tags/")
        },
        }),
      condition: (page) => !page.fileData.slug.startsWith("thoughts/"),
    }),
  ],
  right: [
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.DesktopOnly(Component.Search()),
    Component.Flex({
      wrap: "wrap",
      components: [
        { Component: Component.MobileOnly(Component.Search()) },
        { Component: Component.Darkmode() },
        { Component: Component.DesktopOnly(Component.ReaderMode()) },
        { Component: Component.TagsLink() },
      ],
    }),
    Component.ConditionalRender({
      component: Component.RecentNotes({
        title: "Recent Thinking",
        limit: 8,
        linkToMore: "thoughts",
        filter: (f) =>
          f.slug!.startsWith("thoughts/") && f.slug !== "thoughts/index",
      }),
      condition: (page) => page.fileData.slug.startsWith("thoughts/"),
    }),
    Component.ConditionalRender({
     component: Component.Explorer({
        // Only render an Explorer component on pages that are not thoughts pages
        filterFn: (node) => {
          const slug = node.slug?.toLowerCase() ?? ""
          return !slug.startsWith("thoughts/") && !slug.startsWith("tags/")
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
