export default {
  root: {
    class: [
      // Sizing and Shape
      'min-w-[12rem]',
      'rounded-md',
      // Spacing
      'p-1',
      // Colors
      'bg-surface-0 dark:bg-surface-700',
      'text-surface-700 dark:text-white/80',
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
      'space-y-0.5',
    ],
  },
  menuitem: {
    class: [
      // Space
    ],
  },
  content: ({ context }) => ({
    class: [
      'flex',
      'items-center',
      'w-full',
      // Shape
      'rounded-md',

      // Colors
      {
        'dark:text-surface-0': !context.focused,
        'bg-stone-100 dark:bg-surface-300/10 dark:text-primary-400': context.focused,
      },

      // Transitions
      'transition-shadow',
      'duration-200',

      // States
      'hover:bg-surface-100 dark:hover:bg-surface-400/10',
    ],
  }),
  action: {
    class: [
      'relative',
      'w-full',

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
    class: [
      '',
    ],
  },
  submenuheader: {
    class: [
      // Font
      'text-xs',
      'font-medium',

      // Spacing
      'm-0',
      'py-1',
      'px-2',

      // Shape
      'rounded-tl-none',
      'rounded-tr-none',

      // Colors
      'bg-surface-0 dark:bg-surface-700',
      'text-zinc-600 dark:text-surface-0/60',
    ],
  },
  transition: {
    enterFromClass: 'opacity-0 scale-y-[0.8]',
    enterActiveClass: 'transition-[transform,opacity] duration-[120ms] ease-[cubic-bezier(0,0,0.2,1)]',
    leaveActiveClass: 'transition-opacity duration-100 ease-linear',
    leaveToClass: 'opacity-0',
  },
}
