
import {useEffect, useState} from "react"
import Image from "next/image"
import Movie from "../typings.d"
import { baseUrl } from "../constants/movie"
import { FaPlay } from 'react-icons/fa'
import { FiInfo } from 'react-icons/fi'


interface Props {
  netflixOriginals: Movie[]
}



function Banner({netflixOriginals}:Props) {

  const handleClick = () => setIsLeft(!isLeft)

  const [movie, setMovie] = useState<Movie | null>(null)
  const [isLeft, setIsLeft] = useState(true)

  useEffect(()=>{
    setMovie(netflixOriginals[Math.floor(Math.random()*netflixOriginals.length)])
  }, [])

  //console.log(movie)
  return (
    <div className="flex flex-col space-y-2 py-30 md:space-y-4 lg:h-[65vh] lg:justify-end">
      <div className="absolute top-0 left-0 -z-10 h-[95vh] w-screen">
        <Image 
          src={`${baseUrl}${movie?.backdrop_path ||movie?.poster_path}`}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <h1 className="text-2xl lg:text-7xl md:text-4xl font-bold">{movie?.title || movie?.name || movie?.original_name}</h1>
      <p className="max-w-xs text-xs md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl">{movie?.overview}</p>
      <div className="flex items-center space-x-6 mt-4">
        <button className="bannerButton bg-white text-black"><FaPlay />Lecture</button>
        <button className="bannerButton bg-[rgba(109,109,110,0.8)]"><FiInfo className="h-4 w-4 items-center" />Plus d'infos</button>      
      </div>
    </div>
  )
}

export default Banner