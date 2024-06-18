export default {
  root: {
    class: [
      // Shape
      'rounded-md',

      // Size
      'min-w-[12rem]',
      'p-1',

      // Colors
      'bg-surface-0 dark:bg-surface-700',
      'ring-1 ring-gray-200 dark:ring-surface-700',
    ],
  },
  menu: {
    class: [
      // Spacings and Shape
      'list-none',
      'm-0',
      'p-0',
      'outline-none',
    ],
  },
  menuitem: {
    class: ['relative first:mt-0 mt-1 hover:bg-[#f4f4f5] rounded-md cursor-pointer'],
  },
  content: ({ context }) => ({
    class: [
      //  Colors
      //   {
      //     'text-surface-500 dark:text-white/70': !context.focused && !context.active,
      //     'text-surface-500 dark:text-white/70 bg-surface-200 dark:bg-black/70': context.focused && !context.active,
      //     'text-surface-900 dark:text-surface-0/80 bg-surface-50 dark:bg-black/70': context.focused && context.active,
      //     'text-surface-900 dark:text-surface-0/80 bg-surface-50 dark:bg-black/70': !context.focused && context.active,
      //   },

      // Hover States
      //   {
      //     'hover:bg-surface-50 dark:hover:bg-surface-800': !context.active,
      //     'hover:bg-surface-100 dark:hover:bg-black/40 text-surface-900 dark:text-surface-0/80': context.active,
      //   },

      // Transitions
      'transition-shadow',
      'duration-200',
    ],
  }),

  action: {
    class: [
      'relative',

      // Flexbox
      'flex',
      'items-center',

      // Spacing
      'py-1.5',
      'px-2',

      // Misc
      'no-underline',
      'overflow-hidden',
      'cursor-pointer',
      'select-none',
    ],
  },
  icon: {
    class: [
      // Spacing
      'mr-2',
    ],
  },
  label: {
    class: ['text-sm'],
  },
  submenuicon: {
    class: [
      // Position
      'ml-auto',
    ],
  },
  submenu: {
    class: [
      // Size
      'w-full sm:w-48',

      // Spacing
      'p-1.5',
      'm-0 mx-1.5',
      'list-none',

      // Shape
      'shadow-none sm:shadow-md',
      'border-0',

      // Position
      'static sm:absolute',
      'z-10',

      // Color
      'bg-surface-0 dark:bg-surface-700',
    ],
  },
  separator: {
    class: 'bg-[#e7e5e4] h-px dark:border-surface-600 my-1 -mx-1',
  },
}
