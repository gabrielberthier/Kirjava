export async function loadFromFile(slug: string, isIndex: boolean = false) {
  const component = isIndex
    ? // vite requires relative paths and explicit file extensions for dynamic imports
      // see https://github.com/rollup/plugins/tree/master/packages/dynamic-import-vars#limitations
      await import(`../../../posts/${slug}/index.md`)
    : await import(`../../../posts/${slug}.md`)

  return component
}
