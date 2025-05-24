export default (() => {
  function TagsLink(props: QuartzComponentProps) {
    return (
      <nav class="tagslink-container">
          <div class="tags-link">
          <a href="/tags/">🏷️ tags</a>
          </div>
      </nav>
    )
  }

  return TagsLink
}) satisfies QuartzComponentConstructor
