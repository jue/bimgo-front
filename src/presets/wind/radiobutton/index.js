export default {
  root: {
    class: [
      'relative',

      // Flexbox & Alignment
      'inline-flex',
      'align-bottom',

      // Size
      'w-5 h-5',

      // Misc
      'cursor-default',
      'select-none',
    ],
  },
  box: ({ props }) => ({
    class: [
      // Flexbox
      'flex justify-center items-center',

      // Size
      'w-5 h-5',
      'text-sm',
      'font-medium',

      // Shape
      'border-2',
      'rounded-full',

      // Transition
      'transition duration-200 ease-in-out',

      // Colors
      {
        'text-surface-700 dark:text-white/80': props.value !== props.modelValue && props.value !== undefined,
        'bg-surface-0 dark:bg-surface-900': props.value !== props.modelValue && props.value !== undefined,
        'border-surface-300 dark:border-surface-700': props.value !== props.modelValue && props.value !== undefined && !props.invalid,
        'border-primary-500 dark:border-primary-400': props.value == props.modelValue && props.value !== undefined,
      },

      // Invalid State
      { 'border-red-500 dark:border-red-400': props.invalid },

      // States
      {
        'outline-none outline-offset-0': !props.disabled,
        'peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-surface-0 dark:focus-visible:ring-offset-surface-800 peer-focus-visible:ring-primary-500 dark:peer-focus-visible:ring-primary-400':
                    !props.disabled,
        'opacity-60 cursor-default': props.disabled,
      },
    ],
  }),
  input: {
    class: [
      'peer',

      // Size
      'w-full ',
      'h-full',

      // Position
      'absolute',
      'top-0 left-0',
      'z-10',

      // Spacing
      'p-0',
      'm-0',

      // Shape
      'opacity-0',
      'rounded-md',
      'outline-none',
      'border-2 border-surface-300 dark:border-surface-700',

      // Misc
      'appearance-none',
      'cursor-default',
    ],
  },
  icon: ({ props }) => ({
    class: [
      'block',

      // Shape
      'rounded-full',

      // Size
      'w-3 h-3',

      // Conditions
      {
        'bg-surface-0 dark:bg-surface-900': props.value !== props.modelValue,
        'bg-primary-500': props.value === props.modelValue,
        'backface-hidden invisible scale-[0.1]': props.value !== props.modelValue,
        'transform visible translate-z-0 scale-[1,1]': props.value === props.modelValue,
      },

      // Transition
      'transition duration-200',
    ],
  }),
}
