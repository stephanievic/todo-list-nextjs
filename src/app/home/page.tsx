import Image from "next/image";
import Menu from "../components/menu";
import SearchIcon from "../../../public/SearchIcon.svg"
import PerfilIcon from "../../../public/PerfilIconEx.png"
import PlusCircleFill from "../../../public/PlusCircleFillWhite.svg"
import CardList from "../components/cardList";

export default function Home () {
    const dateNow = new Date()

    return (
        <div className='min-h-screen flex bg-black-200'>
            <Menu/>

            <main className='w-full p-[60px] space-y-20'>
                <div className="flex flex-col w-fit">
                    <div className="flex gap-5 items-center">
                        <Image src={PerfilIcon} alt="exemplo de foto de perfil" className="rounded-full" width={70} height={70}/>
                        <h1 className="text-4xl text-white-100 font-bold">Olá, Stephanie 👋</h1>
                    </div>
                    <p className="ml-[92px] text-xl text-purple-100">Quarta-feira, {dateNow.toLocaleDateString()}</p>
                </div>

                <div className="flex gap-6 items-center justify-center">
                    <div className="w-[568px] flex items-center justify-between gap-2 px-10 py-3 rounded-[30px] border border-purple-100">
                        <input type="text" placeholder="Buscar lista" className="w-full text-white-100 placeholder:text-xl placeholder:text-white-100 font-light bg-transparent outline-none"/>
                        <Image src={SearchIcon} alt="search icon" className="cursor-pointer"/>
                    </div>

                    <Image src={PlusCircleFill} alt="plus circle fill" className="hover:opacity-80 cursor-pointer"/>
                </div>

                <section className="space-y-10">
                    <h2 className="text-3xl font-medium text-white-100">Listas Favoritadas</h2>
                    <div className="flex flex-wrap gap-10">
                        <CardList icon={"👩"} title={"Rotina"} />
                        <CardList icon={"👩"} title={"Rotina"} />
                        <CardList icon={"👩"} title={"Rotina"} />
                        <CardList icon={"👩"} title={"Rotina"} />
                        <CardList icon={"👩"} title={"Rotina"} />
                        <CardList icon={"👩"} title={"Rotina"} />
                    </div>

                </section>

                <section className="space-y-10">
                    <h2 className="text-3xl font-medium text-white-100">Todas as suas listas</h2>
                    <div className="flex flex-wrap gap-10">
                        <CardList icon={"👩"} title={"Rotina"} />
                        <CardList icon={"👩"} title={"Rotina"} />
                        <CardList icon={"👩"} title={"Rotina"} />
                        <CardList icon={"👩"} title={"Rotina"} />
                        <CardList icon={"👩"} title={"Rotina"} />
                        <CardList icon={"👩"} title={"Rotina"} />
                        <CardList icon={"👩"} title={"Rotina"} />
                        <CardList icon={"👩"} title={"Rotina"} />
                        <CardList icon={"👩"} title={"Rotina"} />
                        <CardList icon={"👩"} title={"Rotina"} />
                    </div>
                </section>
            </main>
        </div>
    )
}