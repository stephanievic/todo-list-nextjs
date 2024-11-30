import EmojiPickerModal from "emoji-picker-react";

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
                    previewConfig={{ showPreview: false }}
                />
            </div>
        </div>
    )
}