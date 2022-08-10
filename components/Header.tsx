import { AnnotationIcon, BellIcon, SearchIcon } from "@heroicons/react/outline"
import Link from "next/link"
import {useState, useEffect} from 'react'

function Header() {

    //Les fonctions dont je vais avoir besoin ! 
    const handleScroll = () => {
        if(window.scrollY>0){
            setIsScrolled(true)        
        } else {
            setIsScrolled(false)        
        }
    }


    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(()=>{
        window.addEventListener("scroll", handleScroll)
        return (()=>{
            window.removeEventListener("scroll", handleScroll)
        })
    }, []);


  return (
    <header className={`${isScrolled && 'bg-[#141414]'}`}>

        <div className="flex space-x-10 items-center">
            <img 
                src="https://rb.gy/ulxxee"
                alt="netflix-logo"
                width={80}
                height={80}
                className="cursor-pointer object-contain"
            />
            <div>
                <ul className="hidden md:flex space-x-4 text-sm">
                    <li>Accueil</li>
                    <li>Séries</li>
                    <li>Films</li>
                    <li>Nouveautés les plus regardés</li>
                    <li>Ma Liste</li>
                </ul>
            </div>
        </div>
        <div className="flex space-x-3">
            <SearchIcon className="h-6 w-6 hiddem sm:inline"/>
            <p className="hidden md:inline text-white text-sm">DIRECT</p>
            <p className="hidden md:inline text-white text-sm">Jeunesse</p>
            <BellIcon className="h-6 w-6" />
            <Link href="/account">
                <img
                    src="https://rb.gy/g1pwyx"
                    alt="Lien profil"
                    className="cursor-pointer rounded"
                />
            </Link>
        </div>
    </header>
  )
}

export default Header