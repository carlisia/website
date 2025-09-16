import { QuartzComponent, QuartzComponentConstructor } from "./types"

const ScrollToTopButton: QuartzComponent = () => {
  return (
    <>
      <button id="scrollToTopButton" type="button" class="scroll-to-top">
        Scroll to top ↑
      </button>

      <script type="text/javascript">
        {`
          requestAnimationFrame(() => {
            const btn = document.getElementById("scrollToTopButton")
            if (!btn) return

            btn.addEventListener("click", (e) => {
              e.preventDefault()

              const scrollTarget =
                document.querySelector(".page") ||
                document.getElementById("quartz-body") ||
                document.documentElement ||
                document.body

              scrollTarget?.scrollTo({ top: 0, behavior: "smooth" })
            })
          })
        `}
      </script>
    </>
  )
}

export default ScrollToTopButton satisfies QuartzComponentConstructor
