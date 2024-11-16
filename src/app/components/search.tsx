import Image from "next/image";
import SearchIcon from "../../../public/SearchIcon.svg"
import PlusCircleFill from "../../../public/PlusCircleFillWhite.svg"
import { Dispatch, SetStateAction } from "react";

interface SearchProps {
    placeholder: string
    addItem: () => void
    searchItem: Dispatch<SetStateAction<string>>
}

export default function Search ({placeholder, addItem, searchItem}:SearchProps) {
    return (
        <div className="flex gap-6">
            <div className="w-[568px] flex items-center justify-between gap-2 px-10 py-3 rounded-[30px] border border-purple-100">
                <input type="text" placeholder={placeholder} className="w-full text-white-100 placeholder:text-xl placeholder:text-white-100 font-light bg-transparent outline-none" 
                onChange={(event) => {
                    const value = event.target.value.trim()
                    searchItem (value)
                }}/>

                <Image src={SearchIcon} alt="search icon" className="cursor-pointer"/>
            </div>
            <Image src={PlusCircleFill} alt="plus circle fill" className="hover:opacity-80 cursor-pointer" onClick={addItem}/>
        </div>
    )
}