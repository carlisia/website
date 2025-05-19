import { FullSlug, resolveRelative } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import style from "./styles/custom.scss"

const TagList: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
  const tags = fileData.frontmatter?.tags
  if (tags && tags.length > 0) {
    return (
      <ul class={classNames(displayClass, "tags")}>
        {tags.map((tag) => {
          const linkDest = resolveRelative(fileData.slug!, `tags/${tag}` as FullSlug)
          return (
            <li>
              <a href={linkDest} class="internal tag-link">
                {tag}
              </a>
            </li>
          )
        })}
      </ul>
    )
  } else {
    return null
  }
}

TagList.css = `
.tags {
  list-style: none;
  display: flex;
  padding-left: 0;
  gap: 0.4rem;
  margin: 1rem 0;
  flex-wrap: wrap;
}

.section-li > .section > .tags {
  grid-column: 1 / -1;
  justify-content: flex-start;
  margin-top: 0.2rem;
  gap: 0.1rem;
}
  
.tags > li {
  display: inline-block;
  white-space: nowrap;
  margin: 0;
  overflow-wrap: normal;
}

a.internal.tag-link {
  color: var(--tag-color);
  font-weight: normal;
  font-size: 0.9rem;
  opacity: 0.8;
  border-radius: 8px;
  background-color: transparent;
  padding: 0.2rem 0.4rem;
  margin: 0 0.1rem;
}

h2.tag-header > a.internal.tag-link {
  background-color: var(--highlight);
  font-size: 1.2rem;
}
h2.tag-header.bottom{
  margin-bottom: 0.2rem;
}
`

export default (() => TagList) satisfies QuartzComponentConstructor
