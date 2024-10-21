window.addEventListener("load",()=>{
    const img = document.querySelectorAll("img");
    const btnFw = document.getElementById("btnFw");
    const btnBack = document.getElementById("btnBack");
    const show = document.getElementById("show");
    const body = document.querySelector(".container");

    let pokemonList =[];
    let type = [];
    let first = 1;
    let last = 20;
    let index = 0;
    let link = "https://pokeapi.co/api/v2/pokemon/?"

    updateImg();

    btnFw.addEventListener("click",()=>{
        link = pokemonList.next;
        updateImg();
    });

    btnBack.addEventListener("click",()=>{
        link = pokemonList.previous;
        updateImg();
    });
    
    function updateImg(){
        fetch(link)
        .then((r)=>{
            if(r.status == 404){
                console.log("Ruta no encontrada");
            }else if(r.ok){
                console.log("Todo esta OK")
            }
            return r.json()
        })
        .then((data=>{
            pokemonList = data;
            showImg(pokemonList.results);
        }))
        .catch((e)=>{
            console.log(e);
        })
    }
    
    function showImg(data){
        for (let i = 0; i < data.length; i++) {
            fetch(data[i].url)
            .then((r)=>{
                if(r.status == 404){
                    console.log("Ruta no encontrada");
                }else if(r.ok){
                    console.log("Todo esta OK")
                }
                return r.json()
            })
            .then((response=>{
                img[i].src = response.sprites.front_shiny;
                type[i] = response.types[0].type.name;
                if(i==0){
                    first = response.id;
                }
                if(i == data.length-1){
                    last = response.id;
                    show.innerText = "Mostrando los pokemon de la posicion " + first + " a la  " + last + " de la pokedex";
                    refresh();
                }
            }))
            .catch((e)=>{
                console.log(e);
            })
        }
    }

    function refresh(){     
        const position = document.querySelector(".slick-current");
        index = position.getAttribute("data-slick-index");
        console.log(type)
        changeBackground(index);
    }

    function changeBackground(index){
        console.log("dentro color");
        if(type[index]=="fire"){
            body.style.backgroundColor = "rgb(245, 73, 84)";
        }
        if(type[index]=="water"){
            body.style.backgroundColor = "rgb(134, 169, 255)";
        }
        if(type[index]=="electric"){
            body.style.backgroundColor = "rgb(250, 249, 111)";
        }
        if(type[index]=="psychic"){
            body.style.backgroundColor = "rgb(231, 36, 139)";
        }
        if(type[index]=="ground"){
            body.style.backgroundColor = "rgb(177, 134, 84)";
        }
        if(type[index]=="grass"){
            body.style.backgroundColor = "rgb(47, 202, 93)";
        }
        if(type[index]=="bug"){
            body.style.backgroundColor = "rgb(62, 150, 81)";
        }
        if(type[index]=="fighting"){
            body.style.backgroundColor = "rgb(228, 95, 59)";
        }
        if(type[index]=="rock"){
            body.style.backgroundColor = "rgb(139, 63, 37)";
        }
        if(type[index]=="dark"){
            body.style.backgroundColor = "rgb(88, 91, 119)";
        }
        if(type[index]=="normal"){
            body.style.backgroundColor = "rgb(201, 155, 168)";
        }
        if(type[index]=="ice"){
            body.style.backgroundColor = "rgb(186, 236, 255)";
        }
        if(type[index]=="steel"){
            body.style.backgroundColor = "rgb(68, 187, 147)";
        }
        if(type[index]=="fairy"){
            body.style.backgroundColor = "rgb(229, 25, 103)";
        }
        if(type[index]=="flying"){
            body.style.backgroundColor = "rgb(149, 178, 202)";
        }
        if(type[index]=="dragon"){
            body.style.backgroundColor = "rgb(104, 189, 202)";
        }
        if(type[index]=="poison"){
            body.style.backgroundColor = "rgb(155, 104, 214)";
        }
        if(type[index]=="ghost"){
            body.style.backgroundColor = "rgb(145, 103, 146)";
        }
    }
    $(document).on('click', '.slick-next', function(){
        refresh();
    });

    $(document).on('click', '.slick-prev', function(){  
        refresh();
    });

    $(".carousel").slick({
        centerMode: true,
        centerPadding: '60px',
        slidesToShow: 5,
        responsive: [
        {
            breakpoint: 768,
            settings: {
                arrows: false,
                centerMode: true,
                centerPadding: '40px',
                slidesToShow: 3
            }
        },
        {
            breakpoint: 480,
            settings: {
                arrows: false,
                centerMode: true,
                centerPadding: '40px',
                slidesToShow: 1
            }
        }
        ]
    });
})