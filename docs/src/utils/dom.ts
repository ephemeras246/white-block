export function getElementBySelector(selector: any) {
  if (typeof selector === 'string') {
    return document.querySelector(selector)
  }
  return selector instanceof HTMLElement ? selector : null
}

function serializeHeader(h: Element) {
  let ret = ''
  for (const node of h.childNodes) {
    ret += node.textContent
  }
  return ret.trim()
}
export function getHeaders(api = false) {
  const queryString = `${
    api ? '.doc-api' : '.doc-demo'
  } :where(h1,h2,h3,h4,h5,h6)`
  const headers = [...document.querySelectorAll(queryString)]
    .filter(el => el.id && el.hasChildNodes())
    .map(el => {
      const level = Number(el.tagName[1])
      return {
        title: serializeHeader(el),
        link: `#${el.id}`,
        level
      }
    })
  return headers
}

export function clickDelegate(
  e: MouseEvent | any,
  className: string,
  // eslint-disable-next-line no-unused-vars
  handler: (dataset: any) => void
) {
  const domList = e.path ?? (e.composedPath && e.composedPath())
  const target = domList.find(
    (dom: HTMLElement) => dom.className && dom.className.includes(className)
  )
  if (target) {
    handler(target.dataset)
  }
}

// eslint-disable-next-line consistent-return
export async function copyToClipboard(text: string) {
  try {
    return navigator.clipboard.writeText(text)
  } catch {
    const element = document.createElement('textarea')
    const previouslyFocusedElement = document.activeElement

    element.value = text

    // Prevent keyboard from showing on mobile
    element.setAttribute('readonly', '')

    element.style.contain = 'strict'
    element.style.position = 'absolute'
    element.style.left = '-9999px'
    element.style.fontSize = '12pt' // Prevent zooming on iOS

    const selection = document.getSelection()
    const originalRange = selection
      ? selection.rangeCount > 0 && selection.getRangeAt(0)
      : null

    document.body.appendChild(element)
    element.select()

    // Explicit selection workaround for iOS
    element.selectionStart = 0
    element.selectionEnd = text.length

    document.execCommand('copy')
    document.body.removeChild(element)

    if (originalRange) {
      selection!.removeAllRanges() // originalRange can't be truthy when selection is falsy
      selection!.addRange(originalRange)
    }

    // Get the focus back on the previously focused element, if any
    if (previouslyFocusedElement) {
      ;(previouslyFocusedElement as HTMLElement).focus()
    }
  }
}
