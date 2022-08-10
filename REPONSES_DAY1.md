###################### Homepage UI, REST API, Next.js, Typescript, Tailwind ######################

1) => npx create-next-app --example with-tailwindcss netflix-clone
2) => npm run dev 
3) On peut à l'intérieur de index.tsx placer les différents components en commentaire qui constitueront notre site. 
4) A la fin le code doit ressembler à : 
<header className={`${isScrolled && 'bg-[#141414]'}`}>
    <div className="flex items-center space-x-2 md:space-x-10">
        <img 
            src="https://rb.gy/ulxxee"
            alt="netflix-logo"
            width={100}
            height={100}
            className="cursor-pointer object-contain"
        />
        <ul className="hidden md:flex space-x-4">
            <li className="headerLink">Home</li>
            <li className="headerLink">TV Shows</li>
            <li className="headerLink">Movies</li>
            <li className="headerLink">New & Popular</li>
            <li className="headerLink">MyList</li>
        </ul>
    </div> 
    <div className="flex items-center space-x-4">
        <SearchIcon className="h-6 w-6 hiddem sm:inline"/>
        <p className="hidden lg:inline">Kid</p>
        <BellIcon className="h-6 w-6" />
        <Link href="/account">
            <img
                src="https://rb.gy/g1pwyx"
                alt=""
                className="cursor-pointer rounded"
            />
        </Link>
    </div>
</header>
    a) Pour les classes personnalisées des links du header, on peut ajouter la className="headerLink". Puis on va dans le fichier globals.css et dedans on utilse cette typo pour modifier ce qu'il faut:  
@layer [base/components/utilities]
base : c'est pour les tags natifs, compoments c'est pour les custom components et utilities c'est pour 
Ensuite on sélectionne l'élément commen en CSS classique puis la syntaxe est : 
@layer base {
    body {
        @apply bg-red-500 text-small etc...
    }
}

    b) On utilise les icones de heroicons en les installant premièrement :  
npm install @heroicons/react et ensuite on peut les importer comme de components en récupérant leur nom sur leur site
que l'on typo en camelCase pour que ça marche. L'autocompletion va faire tous les imports nécessaires. Pour react icons on fait npm install react-icons


5) On rajoute cette partie dans le header 
className={`${isScrolled && 'bg-[#141414]'}`}
Puis avant le return on incopore un useEffect : 
const [isScrolled, setIsScrolled] = useState(false);

useEffect(()=>{
    const handleScroll = () => {
        if(window.scrollY > 0){
            setIsScrolled(true)
        }
        else {
            setIsScrolled(false)
        }
    }

    window.addEventListener("scroll", handleScroll)
    return (() => {
        window.removeEventListener("scroll", handleScroll)
    }
    )

}, [])

className= {`${isScrolled && 'bg-[#141414]'}`} 


6) On peut utiliser ctrl + "p"

s7) On peut une fois que l'on a récupéré cette clé la stocké dans un fichier .env.local car cette clé va être exposer au client. Et on aura qu'à poser NEXT_PUBLIC_API_KEY =  [la clé que l'on a récupéré]

8) Une fois que l'on a l'APi key et il a mis dans un objet request toutes les requests qu'il peut ou veut faire avec l'API. Pour cela il a crée un dossier utils et un fichiers requests.ts [ts parce qu'il n'y a pas de jsx dedans] dans lequel il déclare une constante API_KEY = process.env.NEXT_PUBLIC_API_KEY et il donne pour constante la BASE_URL. Puis il construit son objet request avec pour élément chacune des réquests écrites comme des template strings qui utilsent base_url et api_key. Du coup après il peut dans son fichier index faire du server side rendering.

9) Quand notre site fait du rendering, il s'occcupe d'abord du html et du css qui sont assez légers. Ce qui peut être plus compliqué à load c'est la javascript suivant la taille du fichier, le hardware utilisé etc... Ceci peut pose autant de problèmes que notre site rely sur du javascript. C'est là que vient la difficulté d'utiliser des framework jaavscript pour faire nos sites : l'expérience de loading peut vite devenir un enfer [C'est pour ça que dans un html, css js site, il vaut mieux essayer de fournir le plus d'éléments possbiles en html et css et saupoudrer ce qui ne peut être fait autrement par du javascript]. Du coup le server side rendering c'est ce qui permet de générer la partie html du site et de l'envoyer au navigateur qui va faire l'effort de display cette partie html et va ensuite "hydrater" le site avec le javascript dès qu'il sera load. 

10) Dans le ficher index.js on a qu'à : 
export const getServerSideProps = async () =>  {
  const [
    netflixOriginals,
    trendingNow,
    topRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    documentaries,
  ] = await Promise.all([
    fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
    fetch(requests.fetchTrending).then((res) => res.json()),
    fetch(requests.fetchTopRated).then((res) => res.json()),
    fetch(requests.fetchActionMovies).then((res) => res.json()),
    fetch(requests.fetchComedyMovies).then((res) => res.json()),
    fetch(requests.fetchHorrorMovies).then((res) => res.json()),
    fetch(requests.fetchRomanceMovies).then((res) => res.json()),
    fetch(requests.fetchDocumentaries).then((res) => res.json()),
  ])

  return {
    props:{
      netflixOriginals: netflixOriginals.results,
      trendingNow: trendingNow.results,
      topRated: topRated.results,
      actionMovies: actionMovies.results,
      comedyMovies: comedyMovies.results,
      horrorMovies: horrorMovies.results,
      romanceMovies: romanceMovies.results,
      documentaries: documentaries.results,
    },
  }
}
 Les .results dans le return de la fonction vient directement du formattage de la réponse à chaque requete. Dans l'utilisation que l'on va faire de l'API, c'est le seul objet qui nous intéresse donc c'est ce que l'on retourner.
11) Il a crée u nfichier typings.d.ts dans lequel tous les types sont définis. 
12) Dès que l'on utilise notre élément next-image, on va avoir un message d'erreur précisant que le domaine sur lequel on travaille est inconnu. Il faut donc aller dans le fichier next.config et ajouter les lignes suivantes :
  images: {
    domains: ["image.tmdb.org"],
  },
  Sachant que l'on peut rajouter d'autres host name, il suffit de compléter le array ! 
13) On peut faire ça comme ça : 

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
14) De même, on peut faire comme ça : 
Pour le Thumbnail : 
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

Pour le Row: 
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
          {isMoved && <ChevronLeftIcon onClick={() => handleClick("left")} className="absolute cursor-pointer top-10 left-2 h-9 w-9 opacity-0 z-40 m-auto transition hover:scale-125 group-hover:opacity-100"/>}
          <div ref={rowRef} className="flex items-center space-x-0.5 overflow-x-scroll scrollbar-hide md:space-x-2.5 md:p-2">
            {movies.map((movie) => (
              <Thumbnail key={movie.id} movie={movie} />
            ))}   
          </div>
          <ChevronRightIcon onClick={() => handleClick("right")} className="absolute cursor-pointer top-10 right-2 h-9 w-9 opacity-0 z-40 m-auto transtition hover:scale-125 group-hover:opacity-100"/>
        </div>

      </div>
    </div>
  )
}

export default Row
