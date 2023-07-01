import type { HTMLElement } from 'node-html-parser'

interface NodeHeading {
  value: string
  depth: number
  id: string
}

const slugify = (text: string) =>
  text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')

export function headfy(node: HTMLElement): NodeHeading[] {
  const headings: NodeHeading[] = []
  for (const el of node.querySelectorAll('h1, h2, h3, h4, h5, h6')) {
    const id = slugify(el.innerHTML).replaceAll('-', '')
    el.setAttribute('id', id)
    headings.push({
      depth: parseInt(el.tagName.split('')[1] || '0'),
      value: el.innerHTML,
      id
    })
  }

  return headings
}
