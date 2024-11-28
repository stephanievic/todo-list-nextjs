import EmojiPickerModal from "emoji-picker-react";
import { Dispatch, SetStateAction, useState } from "react";

interface EmojiPickerProps {
    handleIconList: (icon:string) => void
    onClose: () => void
}

export default function EmojiPicker({ handleIconList, onClose }: EmojiPickerProps) {
    return (
        <div onClick={onClose} className="fixed inset-0 h-screen w-screen flex items-center justify-center bg-black-200 bg-opacity-75">
            <div onClick={(event) => event.stopPropagation()}>
                <EmojiPickerModal
                    onEmojiClick={(emoji) => handleIconList(emoji.emoji)}
                    searchDisabled={true} // Desabilita a barra de pesquisa
                    previewConfig={{ showPreview: false }} // Remove o preview
                />
            </div>
        </div>
    )
}