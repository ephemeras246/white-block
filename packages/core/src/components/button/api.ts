import { PropType } from 'vue'
import { ButtonType, ButtonShape, ButtonSize } from './types'

export const Props = {
  /*
   * 按钮类型。
   * ["primary", "default"]
   */
  type: {
    type: String as PropType<ButtonType>,
    default: () => 'default'
  },
  /*
   * 是否为块级元素。
   */
  block: {
    type: Boolean,
    default: false
  },
  /*
   * 按钮形状，有 4 种：长方形、正方形、圆角长方形、圆形。
   * ["rectangle", "square", "rounded", "circle"]
   */
  shape: {
    type: String as PropType<ButtonShape>,
    default: 'rectangle'
  },
  /*
   * 组件尺寸。
   * ["small", "medium", "large"]
   */
  size: {
    type: String as PropType<ButtonSize>,
    default: 'medium'
  },
  /*
   * 是否为加载状态。
   */
  loading: {
    type: Boolean,
    default: false
  },
  /*
   * 是否为禁用状态。
   */
  disabled: {
    type: Boolean,
    default: false
  },
  /*
   * 默认按钮文本。
   */
  text: {
    type: String,
    default: ''
  }
}

export type Emits = {
  /*
   * 点击时触发, 参数为 `MouseEvent` 对象。
   */
  click: [e: MouseEvent]
}
