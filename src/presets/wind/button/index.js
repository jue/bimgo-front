export default {
  root: ({ props, context, parent }) => ({
    class: [
      'relative',

      // Alignments
      'items-center justify-center inline-flex text-center align-bottom',

      'active:opacity-75',

      // Sizes & Spacing
      {
        'px-2 py-1.5 text-sm': props.size === null,
        'px-1 py-1 text-xs': props.size === 'small',
        'px-3 py-2 text-sm': props.size === 'large',
      },
      {
        '!h-6 !w-6 !p-0': props.label == null && props.icon !== null && props.size === 'small',
        '!h-9 !w-9 !p-0': props.label == null && props.icon !== null && props.size === 'large',
        'h-8 w-8 !p-0': props.label == null && props.icon !== null,
      },

      // Shapes
      { 'shadow-sm': !props.raised && !props.link && !props.text, 'shadow-lg': props.raised },
      { 'rounded-md': !props.rounded, 'rounded-full': props.rounded },
      { 'rounded-none first:rounded-l-md last:rounded-r-md self-center': parent.instance.$name === 'InputGroup' },

      // Link Button
      { 'text-primary-600 bg-transparent ring-transparent': props.link },

      // Plain Button
      { 'text-surface-800 bg-gray-100': props.plain && !props.outlined && !props.text },
      // Plain Text Button
      { 'text-surface-800': props.plain && props.text },
      // Plain Outlined Button
      { 'text-surface-800': props.plain && props.outlined },

      // Text Button
      { 'bg-transparent': props.text && !props.plain },

      // Outlined Button
      { 'bg-transparent ring-1 ring-gray-200': props.outlined && !props.plain },

      // --- Severity Buttons ---

      // Primary Button
      {
        'text-white bg-zinc-900': !props.link && props.severity === null && !props.text && !props.outlined && !props.plain,
      },
      // Primary Text Button
      { 'text-zinc-900 dark:text-primary-400': props.text && props.severity === null && !props.plain },
      // Primary Outlined Button
      { 'text-zinc-900 ring-zinc-900 hover:bg-primary-300/20': props.outlined && props.severity === null && !props.plain },

      // Secondary Button
      {
        'text-zinc-900 bg-zinc-100': props.severity === 'secondary' && !props.text && !props.outlined && !props.plain,
      },
      // Secondary Text Button
      { 'text-zinc-900 dark:text-zinc-400': props.text && props.severity === 'secondary' && !props.plain },
      // Secondary Outlined Button
      { 'text-zinc-900 ring-zinc-400 hover:bg-zinc-300/20': props.outlined && props.severity === 'secondary' && !props.plain },

      // Success Button
      {
        'text-white': props.severity === 'success' && !props.text && !props.outlined && !props.plain,
        'bg-green-500': props.severity === 'success' && !props.text && !props.outlined && !props.plain,
      },
      // Success Text Button
      { 'text-green-500 dark:text-green-400': props.text && props.severity === 'success' && !props.plain },
      // Success Outlined Button
      { 'text-green-500 ring-green-200 hover:bg-green-300/20': props.outlined && props.severity === 'success' && !props.plain },

      // Danger Button
      {
        'text-white dark:text-surface-900': props.severity === 'danger' && !props.text && !props.outlined && !props.plain,
        'bg-red-500 dark:bg-red-400': props.severity === 'danger' && !props.text && !props.outlined && !props.plain,
      },
      // Danger Text Button
      { 'text-red-500 dark:text-red-400': props.text && props.severity === 'danger' && !props.plain },
      // Danger Outlined Button
      { 'text-red-500 ring-red-300 hover:bg-red-300/20': props.outlined && props.severity === 'danger' && !props.plain },

      // --- Severity Button States ---
      'focus:outline-none focus:outline-offset-0',

      // Link

      // Plain
      { 'hover:bg-surface-300/20': props.plain && !props.outlined && !props.text },
      // Text & Outlined Button
      { 'hover:bg-surface-300/20': props.plain && (props.text || props.outlined) },

      // Primary
      { 'hover:bg-zinc-700': !props.link && props.severity === null && !props.text && !props.outlined && !props.plain },
      // Text & Outlined Button
      { 'hover:bg-primary-300/20': (props.text || props.outlined) && props.severity === null && !props.plain },

      // Secondary
      { 'hover:bg-zinc-200 dark:hover:bg-surface-300': props.severity === 'secondary' && !props.text && !props.outlined && !props.plain },
      // Text & Outlined Button
      { 'hover:bg-surface-300/20': (props.text || props.outlined) && props.severity === 'secondary' && !props.plain },

      // Success
      { 'hover:bg-green-600': props.severity === 'success' && !props.text && !props.outlined && !props.plain },
      // Text & Outlined Button
      { 'hover:bg-green-300/20': (props.text || props.outlined) && props.severity === 'success' && !props.plain },

      // Danger
      { 'hover:bg-red-600 dark:hover:bg-red-300': props.severity === 'danger' && !props.text && !props.outlined && !props.plain },
      // Text & Outlined Button
      { 'hover:bg-red-300/20': (props.text || props.outlined) && props.severity === 'danger' && !props.plain },

      // Disabled
      { 'opacity-60 pointer-events-none cursor-default': context.disabled },

      // Transitions
      'transition duration-200 ease-in-out',

      // Misc
      'cursor-pointer overflow-hidden select-none',
    ],
  }),
  label: ({ props }) => ({
    class: [
      'duration-200',
      {
        'hover:underline': props.link,
      },
      { 'flex-1': props.label !== null, 'invisible w-0': props.label == null },
    ],
  }),
  icon: ({ props }) => ({
    class: [
      'mx-0',
      {
        'mr-1': props.iconPos == 'left' && props.label != null,
        'ml-2 order-1': props.iconPos == 'right' && props.label != null,
        'mb-2': props.iconPos == 'top' && props.label != null,
        'mt-2': props.iconPos == 'bottom' && props.label != null,
      },
    ],
  }),
  loadingicon: ({ props }) => ({
    class: [
      'h-3 w-3',
      'mx-0',
      {
        'mr-2': props.iconPos == 'left' && props.label != null,
        'ml-2 order-1': props.iconPos == 'right' && props.label != null,
        'mb-2': props.iconPos == 'top' && props.label != null,
        'mt-2': props.iconPos == 'bottom' && props.label != null,
      },
      'animate-spin',
    ],
  }),
  badge: ({ props }) => ({
    class: [{ 'ml-2 w-4 h-4 leading-none flex items-center justify-center': props.badge }],
  }),
}
