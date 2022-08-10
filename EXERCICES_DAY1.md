Ici je vais découper le tutoriel en exercice à réaliser afin de vérifier quelles sont les choses acquises de celles qui ne le sont pas ! 

Je repète ici que je fais la réplqiue de la version française de netflix.  

###################### Homepage UI, REST API, Next.js, Typescript, Tailwind ######################

1) Comment créer un projet avec tailwind css en utlisant le terminal qui s'appelle "netflix-clone" ? 
2) Comment démarrer un serveur ?
3) Quelle est la première chose pour se donner une idée du projet ? 
4) Faire le header basique sans l'option mystique en cas de scrolling en utilisant cette image : 
            <img 
                src="https://rb.gy/ulxxee"
                alt="netflix-logo"
                width={100}
                height={100}
                className="cursor-pointer object-contain"
            />

            On aura un menu avec les éléments suivants :Accueil, Séries, Films, Nouveautés les plus regardés, Ma Liste
            Puis un certain nombre d'icones à aller chercher sur heroicons: il  faut se rappler de la nomenclature 
Ne pas publier d'utiliser le html sémantique. 
    a) Il faudra utiliser une classe personnalisée tailwind pour les link du header, comment on organise ça ? Même question pour react icons ! 

    b) Comment on utilise les icones de heroicons react ? 

    c) Est-ce que tu peux ecpliquer avec les mains pourquoi useEffect prend en premier argument une fonction et retourne une fonction ?  

5) Rajouter ce qu'il faut pour que le background du header change en scrollant. On veut que le background soit : #141414 (comment faire des background personalisés sur tailwindcss ?)

6) Comment naviguer à travers les fichiers dès lors que l'on connait leur nom ? 
7) Comment gérer la clé de l'API de TMDB ?
8) Comment sont gérés les requests dans le projet ? 
9) QU'est-ce que le server side rendering et en quoi peut-il être intéressant ? 
10) Comment faire du server side rendering pour mes requests ? 
11) Comment sont gérés les définitions de type (typescript) ?
12) Comment configurer une image de next/Image ? (Question importante car je dois me la poser normalement si je fais la question 13, sauf que je ne repars d'un fichier vide.)
13) COnstruire l'élément Banner. On doit pouvoir récupérer en pros les éléments de NetFlix Originals puis display une random image en bannnière et enfin rajouter les deux boutons ainsi que le texte associé au film choisi. Faire tout ça de façon responsive. On pensera notamment à comment rendre l'image responsive.
14) COnstruire les row, on verra à utiliser un sous-élément thumbnail pour construire les rows. Comment gèrer le scroll du carousel (penser au hook useRef)
