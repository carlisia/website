export default (() => {
  function TagsLink(props: QuartzComponentProps) {
    return (
      <nav class="tagslink-container">
          <div class="tags-link">
            <a href="/tags/">🏷️ tags</a>
          </div>

          <div class="thoughts-link">
            <a href="/thoughts/">🧠 thoughts</a>
          </div>
      </nav>
    )
  }

  return TagsLink
}) satisfies QuartzComponentConstructor
