import { useState } from "react";
import TagIcon from "../../public/Tag.svg"
import { tv, VariantProps } from 'tailwind-variants';
import Modal from "./modal";
import Input from "./input";
import Button from "./button";
import { useApi } from "@/hooks/useApi";

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
    id: number
    name: string
    onClick?: () => void
}

export default function CardLabel({ name, id, color, onClick, size }: CardLabelProps) {
    const [labelName, setLabelName] = useState<string>(name)
    const [editLabelName, setEditLabelName] = useState<string>("")

    const [isOpenEditLabelModal, setIsOpenEditLabelModal] = useState(false)

    const handleEditLabelName = async () => {
        if (editLabelName.trim() && editLabelName != name) {
            await useApi.editLabelName(id, editLabelName)

            setLabelName(editLabelName)
            setIsOpenEditLabelModal(false)
        }
    }

    return (
        <div>
            <div onClick={() => setIsOpenEditLabelModal(true)} className={cardLabelVariants({ color, size })}>
                <TagIcon />

                <p>{labelName}</p>

            </div>

            {
                isOpenEditLabelModal && (
                    <Modal title="Editar etiqueta" onClose={() => setIsOpenEditLabelModal(false)}>
                        <Input type="text" value={setEditLabelName} label="Editar nome" placeholder={labelName} />

                        <div className="mx-auto">
                            <Button onClick={handleEditLabelName}>Salvar</Button>
                        </div>
                    </Modal>
                )
            }
        </div>
    )
}