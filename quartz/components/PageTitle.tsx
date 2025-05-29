import { pathToRoot } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { i18n } from "../i18n"
import { joinSegments } from "../util/path"

const PageTitle: QuartzComponent = ({ fileData, cfg, displayClass }: QuartzComponentProps) => {
  const title = cfg?.pageTitle ?? i18n(cfg.locale).propertyDefaults.title
  const baseDir = pathToRoot(fileData.slug!)
  const iconPath = joinSegments(baseDir, "static/carlisia-campos.png")
  return (
    <h2 class={classNames(displayClass, "page-title")}>
      <a href={baseDir}>
        <img class="Logo" src={iconPath} alt={title}/>
      </a> 
      <a href={baseDir}>
        <a class="name-title" href={baseDir}>{title}</a> 
      </a>
     </h2>
  )
}

PageTitle.css = `
.page-title {
  font-size: 1.75rem;
  margin: 0;
  font-family: var(--titleFont);
}
`

export default (() => PageTitle) satisfies QuartzComponentConstructor
