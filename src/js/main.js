var idActual = 0;
var pokeImg, pokeImgShiny;
var ver = 1;
const fetchPokemon = (num) => {
    let pokeId;
    if(num != ""){
        pokeId = idActual + num;
        if(pokeId < 1){
            pokeId = 898;
        }else if(pokeId > 898){
            pokeId = 1;
        }
    }else{
        const pokeIdInput = document.getElementById("pokemonID");
        pokeId = pokeIdInput.value;
    }
    if(pokeId != ""){
        if(isNaN(pokeId)){
            pokeId = pokeId.toLowerCase();
        }else if(pokeId > 898){
            pokeIdentificador("Solo hay 898 pokemones!!")
        }
        const url = `https://pokeapi.co/api/v2/pokemon/${pokeId}`;
        fetch(url).then((res) => {
            if (res.status != "200") {
                pokeImage("./src/assets/error.gif");
                mostrarInfo(0);
            }
            else {
                return res.json();
            }
        }).then((data) => {
            if (data) {
                console.log(data);
                document.getElementById("imgNormal").disabled  = false;
                document.getElementById("imgShiny").disabled = false;
                pokeImg = data.sprites.front_default;
                pokeImgShiny = data.sprites.front_shiny;
                pokeImage(pokeImg);
                let ident = "#" + data.id.toString().padStart(3,0) + "-" + capitalizar(data.name);
                pokeIdentificador(ident);
                pokeDatos(data.height/10, data.weight/10);
                pokeStats(data.stats);
                pokeTipo(data.types);
                pokeHab(data.abilities);
                mostrarInfo(ver);
                activarBotones();
                idActual = data.id;
            }
        });
    }else{
        pokeImage("./src/assets/error.gif");
        mostrarInfo(0);
    }
    
}

const capitalizar = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

const pokeTipo = (tipos) => {
    let tablaTipos = document.getElementById("filaTipos");
    let traductor = {water:"Agua",fire:"Fuego",bug:"Bicho",dark:"Siniestro",dragon:"Dragón",electric:"Eléctrico",
                    fairy:"Hada",fighting:"Lucha",flying:"Volador",ghost:"Fantasma",grass:"Planta",ground:"Tierra",
                    ice:"Hielo",normal:"Normal",poison:"Veneno",psychic:"Psiquico",rock:"Roca",steel:"Acero"};
    let colorTipo = {water:"rgb(86, 161, 222)",fire:"rgb(248, 157, 72)",bug:"rgb(165, 196, 43)",dark:"rgb(97, 99, 112)",
                    dragon:"rgb(4, 115, 200)",electric:"rgb(244, 220, 90)",fairy:"rgb(236, 154, 230)",fighting:"rgb(220, 63, 87)",
                    flying:"rgb(158, 182, 229)",ghost:"rgb(98, 110, 189)",grass:"rgb(94, 189, 99)",ground:"rgb(206, 135, 84)",
                    ice:"rgb(126, 212, 199)",normal:"rgb(153, 158, 162)",poison:"rgb(181, 99, 203)",psychic:"rgb(252, 135, 134)",
                    rock:"rgb(205, 189, 139)",steel:"rgb(226, 244, 232)"};
    if(tipos == ""){
        while(tablaTipos.firstChild){
            tablaTipos.removeChild(tablaTipos.firstChild);
        }
    }else{
        for(let i = 0; i < tipos.length; i++){
            let celdaTipo = document.createElement("td");
            celdaTipo.style.backgroundColor = colorTipo[tipos[i].type.name]
            celdaTipo.textContent = traductor[tipos[i].type.name]
            tablaTipos.appendChild(celdaTipo);
    
        }
    }
}

const pokeHab = (habs) => {
    const abilityList = document.getElementById("ability");
    if(habs == ""){
        while(abilityList.firstChild){
            abilityList.removeChild(abilityList.firstChild);
        }
    }else{
        for(let i = 0; i < habs.length; i++){
            let listItem = document.createElement('li');
            listItem.innerHTML = capitalizar(habs[i].ability.name);
            abilityList.appendChild(listItem);
        }
    }
}

const pokeImage = (url) => {
    const pokePhoto = document.getElementById("pokeImg");
    pokePhoto.src = url;
}

const pokeDatos = (altura, peso) => {
    const pokeAltura = document.getElementById("altura");
    const pokePeso = document.getElementById("peso");
    pokeAltura.innerHTML = "Altura: " + altura + "m";
    pokePeso.innerHTML = "Peso: " + peso + "kg";

}

const pokeStats = (lista) => {
    const listStats = document.getElementById("stats");
    const nameStats = ["Hp: ", "Ataque: ", "Defensa: ", "Ataque especial: ", "Defensa especial: ", "Velocidad: "];
    if(lista == ""){
        while(listStats.firstChild){
            listStats.removeChild(listStats.firstChild);
        }
    }else{
        for(let i = 0; i < 6; i++){
            let listItem = document.createElement('li');
            listItem.innerHTML = nameStats[i] + lista[i].base_stat;
            listStats.appendChild(listItem);
        }
    }
    
}

const pokeIdentificador = (ident) => {
    const Identificador = document.getElementById("identificador");
    Identificador.innerHTML = ident;
}

const cargando = () => {
    const pokePhoto = document.getElementById("pokeImg");
    pokePhoto.src = "./src/assets/loading.gif";
    pokeIdentificador("");
    pokeDatos("", "");
    pokeStats("");
    pokeTipo("");
    pokeHab("");
    desactivarBotones()
}

const buscar = (num) => {
    cargando();
    fetchPokemon(num);
}

const imgNormal = () => {
    const pokePhoto = document.getElementById("pokeImg");
    pokePhoto.src = pokeImg;
}

const imgShiny = () => {
    const pokePhoto = document.getElementById("pokeImg");
    pokePhoto.src = pokeImgShiny;
}

const desactivarBotones = () => {
    document.getElementById("imgNormal").disabled = true;
    document.getElementById("imgShiny").disabled = true;
    document.getElementById("ver1").disabled = true;
    document.getElementById("ver2").disabled = true;
    document.getElementById("ver3").disabled = true;
}

const activarBotones = () => {
    document.getElementById("imgNormal").disabled = false;
    document.getElementById("imgShiny").disabled = false;
    document.getElementById("ver1").disabled = false;
    document.getElementById("ver2").disabled = false;
    document.getElementById("ver3").disabled = false;
}

const mostrarInfo = (num) => {
    for(let i = 1; i < 4; i++){
        if(num == i){
            document.getElementById("Seccion"+i).style.display = "block";
            document.getElementById("ver"+i).style.backgroundColor = "rgba(76, 44, 255, 0.3)";
        }else{
            document.getElementById("Seccion"+i).style.display = "none";
            document.getElementById("ver"+i).style.backgroundColor = "rgba(76, 44, 255, 0)";
        }
    }
    if (num != 0){ver = num;}else{ver = 1;}
}

document.addEventListener("keydown", event => {
    switch(event.key){
        case "Enter":
            buscar('');
            break;
        case "ArrowLeft":
            buscar(-1);
            break;
        case "ArrowRight":
            buscar(1);
            break;
        case "ArrowUp":
            buscar(10);
            break;
        case "ArrowDown":
            buscar(-10);
            break;
        default:
            break;
    }
}); 
