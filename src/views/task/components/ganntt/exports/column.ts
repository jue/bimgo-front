import type {
  ColumnEmits,
  ColumnMethods,
  ColumnProps,
} from 'types/column/prop'
import { withInstall } from '../utils/install'
import { Variables } from '../constants/vars'
import Column from '../components/column/index.vue'

const XGanttColumn = withInstall<ColumnProps, ColumnMethods, ColumnEmits>(
  Variables.name.column,
  Column,
)

export default XGanttColumn
