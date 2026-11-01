const contenedor = document.getElementById('contenedor')  // guardamos elementos del html , acordemonos de los nombres, Busca en el html 
// la caja de las cards y la guarda para usarla después, recordamos que const son las variables, qu eno se van a reemplazar, nosotros ya le pusimos el nombre 
// de contenedor ,guardamos en todo lo que representa la pagina y busca o entra a lo que te voy a poner y lo buscamos por su etiqueta de cada div
const modalTitulo = document.getElementById('modalTitulo')
const modalCuerpo = document.getElementById('modalCuerpo')
const modal = new bootstrap.Modal(document.getElementById('modalProducto')) 
// Busca la ventana del modal y crea como el control para abrirla , Bootstrap, créame un control para la ventana modalProducto y guárdalo en modal”. 
// Después, con modal.show() la abrimos.

const obtenerProductos = async() => { // toda esta funcion es para traer todos los productos de aqui pa abajo jaja, variable, nombre propio  
// async avisa que adentro vamos a esperar cosas que tardan (pedir datos a internet), aquí irían datos que recibe la función; esta no recibe nada,
// por eso no va nada dentro de los parentesis, 
    try { // intenta hacer tal cosa 
        const respuesta = await fetch('https://fakestoreapi.com/products') // Le pide los productos a la API.
        // await, esperar para recibir la respuesta de la API, fetch hace la peticion de internet , y pues la url le digo a la api que me traiga exactament
        // lo que le pido o sea productos. 
        const data = await respuesta.json() 
        // voy a guardar en una variable llamada data pero vamos a esperar por que convertirlo se puede demorar , y la respuesta de lo que me llego de la
        // API, , .js convierte esos datos de texto a los datos de js  

        console.log(data) // esto muestra en la consola del navegador (F12) todo lo que me llegó de la API, es como para chismosear y revisar
        // que sí llegaron los productos y ver cómo vienen, esto no sale en la página, solo lo vemos nosotros


        contenedor.innerHTML = '' // acordémonos que contenedor es la caja de las cards, innerHTML es todo lo que hay adentro de esa caja,
        // y le ponemos comillas vacías o sea la dejamos limpiecita, vacía, por si había algo antes, para empezar de cero

        data.forEach(producto => { // data es la lista con todos los productos que llegaron, forEach es como decir "para cada uno",
        // o sea recorre la lista uno por uno, y mientras está con cada uno le dice producto, como un apodo mientras trabaja con él
            let card = '' // creamos una variable vacía donde vamos a ir armando la card pedacito por pedacito, es let y no const
            // porque la vamos a ir cambiando, le vamos sumando cosas. el html va entre comillas sencillas y las variables las pegamos con el +

            card += '<div class="col-md-4 col-lg-3 text-center">' // cada card va en su columna, acordémonos que bootstrap divide la fila en 12 partes,
            // col-md-4 en pantallas medianas ocupa 4 de 12 o sea 3 por fila, col-lg-3 en grandes ocupa 3 de 12 o sea 4 por fila, y text-center centradito

            card += '<div class="card h-100" onclick="verProducto(' + producto.id + ')">' // la tarjetica de bootstrap, h-100 para que todas queden
            // del mismo alto, y el onclick es que al darle clic llame a verProducto y le mande el id, para que sepa cuál abrir

            card += '<img src="' + producto.image + '" alt="' + producto.title + '" class="card-img-top">' // la foto que mandó la API, alt es el
            // texto si no carga, y card-img-top es la clase que arreglamos arriba en el style, la de los 200px y el contain

            card += '<div class="card-body">' // la parte de abajo de la card donde va el texto, bootstrap ya le da su espacio por dentro

            card += '<h6>' + producto.title + '</h6>' // el nombre del producto, en h6 porque es chiquito, acordémonos de la jerarquía

            card += '<p class="card-text fw-bold">$' + producto.price + '</p>' // el precio en negrita (fw-bold), el signo pesos va dentro de
            // las comillas porque es el signo de plata que se ve en la página, y después pegamos el precio con el +

            card += '</div>' // cierra el card-body
            card += '</div>' // cierra la card
            card += '</div>' // cierra la columna

            contenedor.innerHTML += card // y ya con la card armadita la metemos en la caja. el += es para ir sumando, o sea le agrega una card
            // más a las que ya hay, si pusiéramos solo el igual borraría la anterior y solo quedaría la última
        }) // aquí cierra el forEach, o sea ya pasó por todos los productos y ya hizo todas las cards
    } catch(error) { // y si algo falló allá en el try, por ejemplo que no hay internet o que la API se cayó, se viene para acá en vez de
    // que se dañe toda la página. error trae la información de qué fue lo que pasó
        contenedor.innerHTML = '<span class="text-danger text-center">Ocurrió un error: ' + error + '</span>' // en vez de las cards, en la caja
        // ponemos un mensajito avisando que hubo un error, text-danger es que salga en rojo
        console.error(error) // y esto lo muestra en la consola también en rojo, para nosotros poder revisar qué pasó
    } // cierra el catch
} // y aquí cierra toda la función obtenerProductos


const verProducto = async(id) => { // esta función es para ver el detalle de un producto cuando le dan clic a una card. también es async
// porque otra vez vamos a esperar a la API. y esta sí recibe algo entre los paréntesis: el id, que es el número del producto que
// le dieron clic, acordémonos que se lo mandamos desde el onclick de la card
    try { // intenta hacer esto
        const respuesta = await fetch('https://fakestoreapi.com/products/' + id) // igual que antes le pedimos a la API, pero ahora a la url
        // le pegamos el id al final con el +, o sea ya no le pedimos todos los productos sino solo ese
        const producto = await respuesta.json() // lo mismo de antes, esperamos y convertimos lo que llegó a datos de js. aquí ya no es una
        // lista sino un solo producto, por eso le pusimos producto y no data

        console.log(producto) // otra vez chismoseamos en la consola qué nos llegó

        modalTitulo.textContent = producto.title // al título del modal (el h5 que dice Producto) le cambiamos el texto por el nombre del
        // producto. usamos textContent porque aquí solo va texto, no html

        let detalle = '' // igual que con la card, una variable vacía donde vamos armando el contenido del modal pedacito por pedacito

        detalle += '<div class="row">' // una fila para poner la foto y la información una al lado de la otra

        detalle += '<div class="col-md-5 text-center">' // la columna de la izquierda para la foto, ocupa 5 de las 12 partes

        detalle += '<img src="' + producto.image + '" alt="' + producto.title + '" class="img-fluid" style="max-height: 300px;">' // la foto,
        // img-fluid hace que se encoja si no cabe para que no se salga del modal, y máximo 300px de alto para que no quede gigante

        detalle += '</div>' // cierra la columna de la foto

        detalle += '<div class="col-md-7">' // la columna de la derecha para la información, ocupa las 7 que quedan, 5 más 7 son las 12

        detalle += '<p><strong>Categoría:</strong> ' + producto.category + '</p>' // strong es negrita, la palabra Categoría en negrita
        // y al lado la categoría que mandó la API

        detalle += '<p><strong>Precio:</strong> $' + producto.price + '</p>' // el precio, con el signo pesos dentro de las comillas igual que en las cards

        detalle += '<p><strong>Calificación:</strong> ' + producto.rating.rate + ' ⭐ (' + producto.rating.count + ' opiniones)</p>' // rating es
        // como una cajita dentro del producto, adentro tiene rate que es la nota y count que es cuántas personas opinaron,
        // por eso va con dos puntos seguidos: producto, luego rating, luego lo que necesitamos

        detalle += '<p>' + producto.description + '</p>' // la descripción del producto

        detalle += '</div>' // cierra la columna de la información
        detalle += '</div>' // cierra la fila

        modalCuerpo.innerHTML = detalle // y ya con todo armado lo metemos en el cuerpo del modal, que estaba vacío en el html.
        // aquí va solo el igual, sin el más, porque cada vez que abran un producto queremos reemplazar lo que había, no sumarle

        modal.show() // acordémonos que modal es el control que creamos arriba con bootstrap, y show es abrirlo. lo abrimos de último
        // porque primero lo llenamos con todo, si no se abriría vacío
    } catch(error) { // si algo falla, se viene para acá
        console.error(error) // y lo muestra en rojo en la consola para revisar
    } // cierra el catch
} // y aquí cierra la función verProducto

obtenerProductos() // y esta es la línea que arranca todo. hasta aquí solo habíamos creado las funciones, pero una función no hace nada
// hasta que la llamamos, es como tener la receta pero no cocinar. aquí la llamamos y ahí sí trae los productos y hace las cards.
// verProducto no la llamamos aquí porque esa se llama sola cuando le dan clic a una card