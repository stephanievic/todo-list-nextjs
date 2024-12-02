import { Dispatch, SetStateAction } from "react";
import { DayPicker } from "react-day-picker";
import { ptBR } from "react-day-picker/locale";
import "react-day-picker/style.css";

interface CalendarProps {
    selected?: Date
    // setSelected?: Dispatch<SetStateAction<Date | undefined>>
    setSelected: (date: Date | undefined) => void
    onClose: () => void
}

export default function Calendar({ selected, setSelected, onClose }: CalendarProps) {
    return (
        <div onClick={onClose} className="z-10 fixed inset-0 h-screen w-screen flex items-center justify-center bg-black-200 bg-opacity-75">
            <div onClick={(event) => event.stopPropagation()}>
                <DayPicker
                    mode="single"
                    locale={ptBR}
                    selected={selected}
                    onSelect={(date) => setSelected(date)}
                    classNames={{
                        day: `text-white`,
                        today: `text-purple-100`,
                        selected: `bg-purple-200 text-black-200 rounded-full`, 
                        chevron: `fill-purple-100` 
                    }}

                    className="bg-black-200 p-4 border border-purple-100 rounded-2xl"
                />
            </div>
        </div>
    )
};
