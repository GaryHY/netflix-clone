import { Movie } from "../typings"
import Image from "next/image"
import { baseUrl } from "../constants/movie"
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline"
import Thumbnail from "./Thumbnail"
import { useRef, useState } from "react"

interface Props {
    title:string
    movies:Movie[]
    //Lorque l'on va utiliser firebase tout-à-l'heure : 
    //movies : Movie[] | DocumentData[]
}

function Row({title, movies}:Props) {

  const rowRef = useRef<HTMLDivElement>(null)
  const [isMoved, setIsMoved] = useState<boolean>(false)

  const handleClick = (direction:string) => {
    setIsMoved(true)
    if(rowRef.current){
      const {scrollLeft, clientWidth} = rowRef.current
      const scrollTo = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth
      rowRef.current.scrollTo({left :scrollTo, behavior: "smooth"})
    }
  }

  return (
    <div className="space-y-0.5s h-40 group">
      <h2 className="font-semibold text-sm md:text-2xl w-56 curosor-pointer text-[#e5e5e5] transition duration-200 hover:text-white">{title}</h2>
      <div>
        <div className="relative md:-ml-2">
          {isMoved && <ChevronLeftIcon onClick={() => handleClick("left")} className="absolute cursor-pointer top-14 left-2 h-9 w-9 opacity-0 z-40 m-auto transition hover:scale-125 group-hover:opacity-100"/>}
          <div ref={rowRef} className="flex items-center space-x-0.5 overflow-x-scroll scrollbar-hide md:space-x-2.5 md:p-2">
            {movies.map((movie) => (
              <Thumbnail key={movie.id} movie={movie} />
            ))}   
          </div>
          <ChevronRightIcon onClick={() => handleClick("right")} className="absolute cursor-pointer top-14 right-2 h-9 w-9 opacity-0 z-40 m-auto transtition hover:scale-125 group-hover:opacity-100"/>
        </div>

      </div>
    </div>
  )
}

export default Row