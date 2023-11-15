export function on(element: Node, event: string, handler: any): any {
  if (element && event && handler) {
    element.addEventListener(event, handler)
  }
}

export function off(element: Node, event: string, handler: any): any {
  if (element && event) {
    element.removeEventListener(event, handler)
  }
}
