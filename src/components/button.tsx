import { ComponentProps } from 'react';
import { tv, VariantProps } from 'tailwind-variants';

const buttonVariants = tv({
    base: "w-[180px] h-12 font-bold text-2xl text-white-100 flex items-center justify-center gap-5 rounded-[36px] hover:opacity-80",

    variants: {
        variant: {
            primary: "bg-purple-300",
            secondary: "bg-transparent border border-purple-300 text-purple-300"
        },
    },

    defaultVariants: {
        variant: 'primary',
    }
})

interface ButtonProps extends ComponentProps<'button'>, VariantProps<typeof buttonVariants> {
    children: React.ReactNode
}

export default function Button({ children, variant, ...props }: ButtonProps) {
    return (
        <button {...props} className={buttonVariants({ variant })}>
            {children}
        </button>
    )
}