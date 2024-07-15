<br/>
<div align="center">
  <h3 align="center">Sinnoh Pokédex</h3>
  <p align="center">
    Busca, descubre y conoce en detalle a tus pokémon favoritos de la región de Sinnoh
  <br/>
  <br/>
  <a href="https://github.com/mirandiwiis/Sinnoh-Pokedex"><strong>Explora los docs »</strong></a>
  <br/>
  <br/>
  <a href="https://sinnoh-pokedex-green.vercel.app/">Demo »</a>  
  </p>
</div>

 ## Sobre el proyecto

Este proyecto comprende el desarrollo de una aplicación funcional que permite a los usuarios conocer la pokédex de la región de Sinnoh. Explorar entre los pokémon, sus stats e infomación detallada de los mismos. Entre las funcionalidades destacadas se encuentran:  

→ Ver la lista de pokémon (tanto en lista como grid)

→ Acceder a datos detallados de los pokémon

→ Guardar y acceder a los pokémon favoritos 

→ Modo oscuro y claro



 ## Lenguajes y tecnologías
- [React](https://reactjs.org)
- [Vite](https://vitejs.dev/)
- [Typescript](https://www.typescriptlang.org/)
- [SASS](https://sass-lang.com/)

 
## Documentación
## 1. Creación del repositorio
Se crea el repositorio proyecto instalando React + Vite con TypeScript. Se instala SASS para mejorar la escalabilidad y manejo de los ficheros css. Finalmente se vincula con Vercel para poder desplegar la web con facilidad.

## 2. Estructura básica de ficheros
Se establece una estructura sencilla que siga unas pautas. Carpeta de estilos, componentes, páginas, utils y hooks, Se instala react router dom para poder manejar las rutas de navegación. Se crea el archivo de rutas que manejará estas lógicas. 

Para esta parte del proceso me informé sobre como utilizar react router dom ya que no estaba aplicando el router provider de manera adecuada.

**Links:**
- [Understanding react router](https://medium.com/@shruti.latthe/understanding-react-outlet-a-comprehensive-guide-b122b1e5e7ff)
- [Tutorial react router](https://reactrouter.com/en/main/start/tutorial)

## 3. Obtención de datos de la API
Antes de empezar a crear componentes realizo los fetch que necesito para obtener la lista de pokémon. 

Tras leer la documentacióm de la PokeAPI descubrí que existen llamadas para las pokedex según región, por empecé a investigar para encontrar la **url de la pokedex de sinnoh**:

A través de la url de la región de Sinnoh, hago fetch y con console.log descubro el id y la url para llamar a la **pokédex de ‘sinnoh-extended’**.

Con esta url hago la llamada definitiva, creo los interfaces y el mapeo de la información. Guardo en una variable de estado la lista de pokémon (con el nombre y la url del pokémon)

Finalmente creo una función getPokemonNumber para obtener el numero de pokémon que se encuentra en la url. Pensé en utilizar split, slice u otros métodos similares pero finalmente me decanté por una expresión regular.

**Links:**
- [Fetching pokemon](https://medium.com/@sergio13prez/fetching-them-all-poke-api-62ca580981a2)
- [API call para imagenes](https://github.com/PokeAPI/pokeapi/issues/346)
- [Regular expresion](https://stackoverflow.com/questions/8798187/how-do-i-get-the-last-segment-of-url-using-regular-expressions)

## 4. Creación de los primeros componentes
### PokemonCard

Creo el componente PokemonCard para que acepte el pokemonNumber. A través de un mapeo renderizo una tarjeta por cada pokémon de la lista. 
Hago nuevas llamadas que me ayudan a obtener más datos del pokémon (tipos, stats)

### TypeTag

Creo este componente reutilizable que me permite pasar el valor mapeado del nombre del tipo de pokémon. Automaticamente renderiza una tag con en nombre y un color específico.

Ambos los paso posteriormente a componentes como el pokemonList que mapea la lista de pokémon y por cada uno de ellos pinta su información en forma de 'tarjeta'. 

Con este tipo de componentes y otros los stats es donde más me atasco y me surjen problemas debido a el mal tipado o interface incorrectos. Resuelvo estos problemas a base de prueba, error, con la ayuda de varias guías y apoyandome en chatGPT.

**Links:**
- [Interfaces doubts](https://www.reddit.com/r/typescript/comments/vgrdjm/how_do_you_create_an_interface_for_an_api/)
- [Guide interfaces](https://www.dhiwise.com/post/mastering-typescript-array-of-object-a-comprehensive-guide)

## 4. Añadiendo funcionalidades

Una vez tengo la información y los componentes que renderizan la información paso a implementar las funcionalidades básicas. 
### Likes

Investigo sobre el uso de local.Storage ya que no tengo experiencia utilizándolo. Creo un custom hook que me permita obtener, añadir y quitar los pokémon de favoritos. Aquí tuve que dedicar más tiempo ya que me confundí y no estaba actualizando correctamente la lista de favoritos.

**Links:**
- [Tutorial para guardar array de favoritos](https://greg-a-s-wright.medium.com/saving-an-array-of-favorite-objects-using-localstorage-in-javascript-76720bb2e90c)
- [Documentación sobre localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- [Documentación sobre JSON.pase()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse)

### Paginación

Para realizar la paginación consulte guías que explican paso por paso la creación del componente de paginación y a partir de ellas me guie para crear mi componente.

**Links:**
- [Tutorial paginación 1](https://www.educative.io/answers/how-to-implement-pagination-in-reactjs)
- [Tutorial paginación 2](https://dev.to/canhamzacode/how-to-implement-pagination-with-reactjs-2b04)

### Modo oscuro

No sabía como realizar el modo oscuro y claro, tras informarme cree un componente (toggle) que al ser clicado añadía / quitaba al body la clase ‘dark’. 

Mediante el uso de variables añadí los colores que debían alternarse a través de la propiedad dark.

**Links:**
- [Guía dark mode en React](https://blog.logrocket.com/dark-mode-react-in-depth-guide/)
- [SASS y CSS dark mode](https://dev.to/zetareticoli/dark-mode-with-sass-and-css-variables-4f9b)
  

### Layouts

Es donde más tiempo he invertido, quería simplificar el código pero se me fue complicando. Aprovechando que la tarjeta en lista dejaba mucho espacio en el ancho de pantalla quise aprovechar para crear una tarjeta donde de mostrasen detalles a modo de ‘previsualización’ del pokémon. Pensé en hacerlo ya que a nivel de experiencia de usuario permite descubrir pokémon de manera más intuitiva y rápida evitando navegar entre páginas.

Gasté mucho tiempo en crear el componente **Progress Bar** que representa las stats del pokémon. Pero considero fue un tiempo bien dedicado.

**Links:**
- [List and Grid](https://medium.com/@layne_celeste/toggle-between-grid-and-list-view-in-react-731df62b829e)
- [Progress Bar](https://www.geeksforgeeks.org/how-to-create-a-custom-progress-bar-component-in-react-js/)
- [Calculando rangos de stats](https://github.com/PokeAPI/pokeapi/issues/1058)


 ## Documentación variada

 **SASS**:
 - [SASS 1](https://create-react-app.dev/docs/adding-a-sass-stylesheet/)
 - [SASS 2](https://matthewelsom.com/blog/simple-scss-playbook.html)

**Buenas prácticas**:
 - [Commits](https://dev.to/otienorabin/are-you-writing-your-git-commit-messages-properly-54cl)
 - [BEM](https://www.geeksforgeeks.org/understanding-the-css-bem-convention/)
 - [UX/UI](https://blog.logrocket.com/ux-design/all-accessible-touch-target-sizes/#:~:text=Ensuring%20that%20every%20clickable%20element,will%20be%2044px%2C%20not%2024px)
 - [Capitalice interfaces](https://aykhanhuseyn.medium.com/typescript-naming-conventions-crafting-maintainable-code-7d872234fe17#:~:text=Interface%20names%20should%20be%20a,in%20the%20name%20is%20capitalized)

 **Otras dudas y recursos**:
 - [Make upperCase](https://stackoverflow.com/questions/1026069/how-do-i-make-the-first-letter-of-a-string-uppercase-in-javascript)
 - [Prevent bubbling](https://stackoverflow.com/questions/38619981/how-can-i-prevent-event-bubbling-in-nested-react-components-on-click)
 - [PokeApi Images styles](https://unpkg.com/css-chain-test@1.0.8/src/PokeApi-Explorer.html)

Miranda Muñoz - mirandamunllor@gmail.com

Project Link: [https://github.com/mirandiwiis/Sinnoh-Pokedex](https://github.com/mirandiwiis/Sinnoh-Pokedex)
