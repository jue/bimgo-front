import type {
  SliderEmits,
  SliderMethods,
  SliderProps,
} from 'types/slider/prop'
import Slider from '../components/slider/index.vue'
import { withInstall } from '../utils/install'
import { Variables } from '../constants/vars'

const XGanttSlider = withInstall<SliderProps, SliderMethods, SliderEmits>(
  Variables.name.slider,
  Slider,
)

export default XGanttSlider
