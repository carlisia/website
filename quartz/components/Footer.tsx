import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/footer.scss"
import { version } from "../../package.json"
import { i18n } from "../i18n"

interface Options {
  links: Record<string, string>
}

export default ((opts?: Options) => {
  const Footer: QuartzComponent = ({ displayClass, cfg }: QuartzComponentProps) => {
    const links = opts?.links ?? []
    return (
      <footer class={`${displayClass ?? ""}`}>
        <hr />
        <ul class="footer-links">
          {Object.entries(links).map(([text, link]) => (
            <li>
              <a href={link}>{text}</a>
            </li>
          ))}
        </ul>
        <p></p>
        <ul>
          <li>
            <p></p>
            <a
              href="#"
              onclick={(e) => {
                e.preventDefault()
                const el = document.querySelector(".center")
                if (el) {
                  el.scrollTo({ top: 0, behavior: "smooth" })
                } else {
                  window.scrollTo({ top: 0, behavior: "smooth" })
                }
              }}
            >
              Scroll to top ↑
            </a>
          </li>
        </ul>
      </footer>
    )
  }

  Footer.css = style
  return Footer
}) satisfies QuartzComponentConstructor
