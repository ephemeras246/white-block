import { PropType } from 'vue'
import { SpaceAlignEnum, SpaceGapSizeEnum } from './types'

export const Props = {
  /*
   * 是否主轴方向改为垂直方向，默认为水平方向。
   */
  vertical: {
    type: Boolean,
    default: false
  },
  /*
   * 子元素对齐方式。
   * ["start","center","end"]
   */
  align: {
    type: String as PropType<SpaceAlignEnum>,
    default: 'start'
  },
  /*
   * 子元素间距。
   * ["small","medium","large"]
   */
  gap: {
    type: String as PropType<SpaceGapSizeEnum>,
    default: 'medium'
  }
}
