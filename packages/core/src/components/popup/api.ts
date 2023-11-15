import { PropType } from 'vue'
import type { PopupPlacement } from './types'

export const Props = {
  /*
   * 制定挂载节点
   */
  attach: {
    type: String,
    default: 'body'
  },
  /**
   * 浮层出现位置, 详情参考 https://popper.js.org/docs/
   *  ["top","left","right","bottom","top-left","top-right","bottom-left","bottom-right","left-top","left-bottom","right-top","right-bottom"]
   */
  placement: {
    type: String as PropType<PopupPlacement>,
    default: 'top'
  },
  /*
   * 触发浮层显示的方式
   * ["hover","click","focus","mousedown","contextmenu"]
   */
  trigger: {
    type: String,
    default: 'hover'
  }
}

export type Emits = {
  // /*
  //  * 点击时触发, 参数为MouseEvent对象
  //  */
  // click: [e: MouseEvent]
}
