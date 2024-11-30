import { useEffect, useRef } from "react";

interface PrioritySelectProps {
    handlePriority: (value: number) => void
    onClose: () => void
}

export default function PrioritySelect({ handlePriority, onClose }: PrioritySelectProps) {
    const prioritySelect = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        const handleClickOutsidePrioritySelect = (event: MouseEvent) => {
            if (prioritySelect.current && !prioritySelect.current.contains(event.target as Node)) {
                onClose()
            }
        };

        document.addEventListener('mousedown', handleClickOutsidePrioritySelect);
        return () => {
            document.removeEventListener('mousedown', handleClickOutsidePrioritySelect);
        };
    }, [])

    return (
        <div ref={prioritySelect} className="z-10 absolute w-24 top-8 right-0 h-max flex flex-col divide-y divide-gray bg-black-200 border border-gray rounded-lg">
            <button onClick={() => handlePriority(0)} className="py-3 font-bold text-green-400 hover:opacity-75 hover:bg-black-100 rounded-t-lg">Baixa</button>
            <button onClick={() => handlePriority(1)} className="py-3 font-bold text-yellow-400 hover:opacity-75 hover:bg-black-100">Média</button>
            <button onClick={() => handlePriority(2)} className="py-3 font-bold text-red-400 hover:opacity-75 hover:bg-black-100 rounded-b-lg">Alta</button>
        </div>
    )
};
