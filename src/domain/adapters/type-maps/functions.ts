export function union(...typs: any[]) {
  return { unionMembers: typs }
}

export function arrayItem(typ: any) {
  return { arrayItems: typ }
}

export function r(name: string) {
  return { ref: name }
}

export function o(props: any[], additional: any) {
  return { props, additional }
}

export function m(additional: any) {
  return { props: [], additional }
}
