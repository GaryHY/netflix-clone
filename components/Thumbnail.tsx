import { Movie } from "../typings"
import Image from "next/image"

interface Props {
    movie: Movie
//  movie: Movie | DocumentData : il a dit que l'on va utiliser ça pour firebase !

}

function Thumbnail({movie}: Props) {
  return (
    <div className="relative h-28 min-w-[180px] md:h-36 md:min-w-[260px] cursor-pointer transition duration-200 ease-out md:hover:scale-105">
        <Image 
          src={`https://image.tmdb.org/t/p/w500${movie?.backdrop_path || movie?.poster_path}`}
          layout="fill"
          className="rounded-sm object-cover md:rounded "
        />
    </div>
  )
}

export default Thumbnail