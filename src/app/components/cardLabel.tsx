import TagIcon from "../../../public/Tag.svg"
import { tv, VariantProps } from 'tailwind-variants';

const cardLabelVariants = tv({
    base: "flex items-center gap-2 border cursor-pointer hover:opacity-80",

    variants: {
        color: {
            primary: "text-purple-100 border-purple-100",
            secondary: "text-purple-200 border-purple-200"
        },

        size: {
            small: "w-fit px-3 py-1 rounded-lg",
            large: "w-[200px] p-3 rounded-xl"
        },

        iconSize: {
            small: "w-5 h-5",
            large: "w-6 h-6"
        } 
    },

    defaultVariants: {
        color: 'primary',
        size: 'large',
        // iconSize: 'large'
    }
})

interface CardLabelProps extends VariantProps<typeof cardLabelVariants> {
    name: string 
    id: number
}

export default function CardLabel ({name, id, color, size, iconSize}:CardLabelProps) {
    return (
        <div className={cardLabelVariants({color, size})}>
            <TagIcon/>
            <p>{name}</p>
        </div>
    )
}