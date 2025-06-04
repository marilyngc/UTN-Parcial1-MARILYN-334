

// =========== LISTA PRODUCTOS ==================
let listaProductos = [
    {
      id: 1,
      titulo: "Arandano",
      precio: 5000,
      imagen: "img/arandano.jpg",
      cantidad: 1,
      categoria: "Baya"
    },
    {
      id: 2,
      titulo: "Banana",
      precio: 1000,
      imagen: "img/banana.jpg",
      cantidad: 1,
      categoria: "Tropical"
    },
    {
      id: 3,
      titulo: "Frambuesa",
      precio: 4000,
      imagen: "img/frambuesa.png",
      cantidad: 1,
      categoria: "Baya"
    },
    {
      id: 4,
      titulo: "Frutilla",
      precio: 3000,
      imagen: "img/frutilla.jpg",
      cantidad: 1,
      categoria: "Baya"
    },
    {
      id: 5,
      titulo: "Kiwi",
      precio: 2000,
      imagen: "img/kiwi.jpg",
      cantidad: 1,
      categoria: "Tropical"
    },
    {
      id: 6,
      titulo: "Mandarina",
      precio: 800,
      imagen: "img/mandarina.jpg",
      cantidad: 1,
      categoria: "Cítrica"
    },
    {
      id: 7,
      titulo: "Manzana",
      precio: 1500,
      imagen: "img/manzana.jpg",
      cantidad: 1,
      categoria: "Pomar"
    },
    {
      id: 8,
      titulo: "Naranja",
      precio: 9000,
      imagen: "img/naranja.jpg",
      cantidad: 1,
      categoria: "Cítrica"
    },
    {
      id: 9,
      titulo: "Pera",
      precio: 2500,
      imagen: "img/pera.jpg",
      cantidad: 1,
      categoria: "Pomar"
    },
    {
      id: 10,
      titulo: "Anana",
      precio: 3000,
      imagen: "img/anana.jpg",
      cantidad: 1,
      categoria: "Tropical"
    },
    {
      id: 11,
      titulo: "Pomelo-amarillo",
      precio: 2000,
      imagen: "img/pomelo-amarillo.jpg",
      cantidad: 1,
      categoria: "Cítrica"
    },
    {
      id: 12,
      titulo: "Pomelo-rojo",
      precio: 2000,
      imagen: "img/pomelo-rojo.jpg",
      cantidad: 1,
      categoria: "Cítrica"
    }
  ];
  

const contenedorProductos = document.getElementById("listado-productos");

// ================= MOSTRAR PRODCUTOS ==========================
function mostrarProductos(listaProductos) {
    let htmlProductos = "";

    listaProductos.forEach( producto => {
        htmlProductos += `              <li class="li-producto">
                    <img class="img-producto" src="${producto.imagen}" alt="imagen de una fruta">
                    <h3 class="nombre-producto">${producto.titulo}</h3>
                    <p class="precio-producto">$${producto.precio}</p>

                     <button  onClick="agregarAlCarrito(${producto.id}) " class="boton-agregar"> Agregar al carrito</button>
                    
                   
                </li>`
    })

    contenedorProductos.innerHTML = htmlProductos;
}


// =============== IMPRIMIR NOMBRE DEL ALUMNO ===================
function imprimirDatosAlumno(alumno) {
    console.log(`Alumno: ${alumno.nombre} ${alumno.apellido} - DNI: ${alumno.dni}`);

    const contenedorNombre = document.querySelector(".nombreAlumno");
    if (contenedorNombre) {
        contenedorNombre.textContent = `${alumno.nombre} ${alumno.apellido}`;
    }
}



// ======================== FILTRAR PRODUCTOS =================
let inputBuscar = document.querySelector(".barra-busqueda");
inputBuscar.addEventListener("keyup", filtrarProductos); // lo escuchamos

function filtrarProductos () {
    let valorInput = inputBuscar.value;

    // guarda el producto con el mismo titulo en un array nuevo
    let listarProductosFiltrador = listaProductos.filter(producto =>  producto.titulo.toLowerCase().includes(valorInput.toLowerCase()));

    mostrarProductos(listarProductosFiltrador);
}

// EXTRA 🥸
// ======================= FILTRAR POR CATEGORIAS  =========================
function filtrarPorCategoria(categoria) {
    if (categoria === 'todos') {
        mostrarProductos(listaProductos);  // Muestra todo
       
    } else {
      const filtrados = listaProductos.filter(producto => producto.categoria === categoria);
      
      mostrarProductos(filtrados);
    }
  }


// ============================== AGREGAR AL CARRITO ===========================
let carrito = [];
function agregarAlCarrito( id){
    let objetoEncontrado = listaProductos.find( producto => producto.id == id);

    const enCarrito = carrito.find(p => p.id == id);

    // En caso de que ya estè en el carrito, sume la cantidad en 1
    if (enCarrito) {
        enCarrito.cantidad++;
    } else {
        // En caso que no estè en el carrito, lo agrega 
        carrito.push({ ...objetoEncontrado, cantidad: 1 });
    }

    console.log("CARRITO", carrito);

    // mostramos el carrito
    mostrarCarrito(carrito);

}

// =========== GUARDAR CARRITO EN LOCALSTORAGE ==========
function guardarCarritoEnLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }

  
//============ CARGAR CARRITO EN LOCALSTORAGE ===============
function cargarCarritoDeLocalStorage() {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
      carrito = JSON.parse(carritoGuardado);
      mostrarCarrito(carrito);
    }
  }
  

// ================== MOSTAR CARRITO ================
let contenedorCarrito = document.getElementById("items-carrito");
function mostrarCarrito (carrito) {
    let htmlCarrito = "";

    carrito.forEach(producto => {
        htmlCarrito +=
        `                
        <li>
            <div class="item-carrito">
                <img src="${producto.imagen}" alt="Producto" class="img-producto-carrito">
              
                <div class="detalle-producto">
                  <p class="titulo-producto">${producto.titulo}</p>
                  
                  <p class="precio-actual"> $${producto.precio}</p>
                </div>
              
                <div class="cantidad-control">
                  <button onClick="disminuirCantidad(${producto.id})" class="btn-cantidad">-</button>
                  <span class="cantidad">${producto.cantidad}</span>
                  <button onClick="aumentarCantidad(${producto.id})" class="btn-cantidad">+</button>
                </div>
              
    
                <div class="eliminar-item">
                  <button onClick="eliminarProducto(${producto.id})" class="btn-eliminar">🗑️</button>
                </div>
              </div>
        </li> 
        
        `
    });

    contenedorCarrito.innerHTML = htmlCarrito;

    // Actualizar el total cada vez que se renderiza el carrito
    actualizarTotal(carrito);

    // Actualizar la vista del boton vaciar carrito
    actualizarBotonVaciar();

    // Actualiza el total de la cantindad de productos
    actualizarCantidadTotal(carrito);

    // LOCALSTORAGE
    guardarCarritoEnLocalStorage();
}


// ==================== ACTUALIZAR PRECIOS ===============
function actualizarTotal(productos) {
    let total = 0;

    for (let i = 0; i < productos.length; i++) {
      total += productos[i].precio * productos[i].cantidad;
    }
  
    document.getElementById("precio-total").textContent = ` $${total}`;
  }


  // ========================== ELIMINAR PRODUCTO  ===========================
function eliminarProducto(id){
    console.log("Eliminar producto con id:", carrito);
    carrito = carrito.filter(producto => producto.id !== id);
    console.log("ver productos no elimnados:", carrito);
    mostrarCarrito(carrito);

    // LOCALSTORAGE
    guardarCarritoEnLocalStorage();

}


// ====================== VISIBILIDAD DEL BOTON VACIAR CARRITO ==============
const botonVaciar = document.getElementById('vaciar-carrito-btn');
function actualizarBotonVaciar() {
    if (carrito.length > 0) {
      botonVaciar.style.display = 'inline-block';  
    } else {
      botonVaciar.style.display = 'none';  
    }
  }
  

// ====================== VACIAR CARRITO ==============
function vaciarCarrito() {
    // Vaciar el array del carrito
    carrito = [];

    // Eliminar todos los nodos del contenedor del carrito
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }

   // Aui reiniciamos todo en 0
    const precioTotal = document.getElementById("precio-total");
    if (precioTotal) {
        precioTotal.textContent = "$0";
        }
    
    
    const cantidadTotal = document.getElementById("cantidad-total");
    if (cantidadTotal) {
        cantidadTotal.textContent = "0";
    }
    alert("El carrito ha sido vaciado.");

    localStorage.removeItem('carrito');  // Limpiar localStorage
    // Muestra el boton
    actualizarBotonVaciar();


}


// ============= DISMINUIR PRODUCTO ==================
function disminuirCantidad(id) {
    carrito.forEach(producto => {
        if (producto.id === id) {
          if (producto.cantidad > 1) {
            producto.cantidad -= 1;
          } else {
            producto.cantidad = 0;
          }
        }
      });
      
      // Eliminar los productos con cantidad 0
      carrito = carrito.filter(producto => producto.cantidad > 0);
  
    // Actualizar visualización
    mostrarCarrito(carrito);

    // LOCALSTORAGE
    guardarCarritoEnLocalStorage();
  }

// ============================ SUMAR PRODUCTO =====================
function aumentarCantidad(id) {
    carrito.forEach(producto => {
      if (producto.id === id) {
        producto.cantidad += 1;
      }
    });
  
    // Actualizar visualización
    mostrarCarrito(carrito);

    // LOCALSTORAGE
    guardarCarritoEnLocalStorage();
  }


// ============================== CANTINDAD DEL CARRITO =========================
function actualizarCantidadTotal(productos) {
    let cantidadTotal = 0;
  
    for (let i = 0; i < productos.length; i++) {
      cantidadTotal += productos[i].cantidad;
    }
  
    document.getElementById("contador-carrito").textContent = cantidadTotal;
  }




// ============================ ORDENAR POR NOMBRE=====================
function ordenarPorNombre() {
    const ordenados = [...listaProductos].sort((a, b) =>
      a.titulo.localeCompare(b.titulo)
    );
    mostrarProductos(ordenados);
  }
  
 // ============================ ORDENAR POR PRECIO =====================
  function ordenarPorPrecio() {
    const ordenados = [...listaProductos].sort((a, b) => a.precio - b.precio);
    mostrarProductos(ordenados);
  }


// =================== INICIAR FUNCIONES ======================
function init() {

    const alumno = {
        dni: "95439396",
        nombre: "Marilyn",
        apellido: "Celis"
    };

    imprimirDatosAlumno(alumno);
    mostrarProductos(listaProductos);
    
}

init()

document.addEventListener('DOMContentLoaded', () => {
    cargarCarritoDeLocalStorage();
  });
  