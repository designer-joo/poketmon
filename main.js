//API 를 이용한 검색기능, 페이지네이션 구연

let list = []
let poketmonInfo = []
let poketType =[]
let poketCharactoer =[]
let poketability =[]
let url 
let start = 0
let frontImg = document.getElementsByClassName("front")
let backImg = document.getElementsByClassName("back")
let data



let searchButton = document.getElementById("search-button")
let searchInput = document.getElementById("search-input")

let nextBtn = document.getElementById("next")
let previousBtn = document.getElementById("previous")



const getPoketmon = async()=>{

    
    
    url = new URL(`https://pokeapi.co/api/v2/pokemon/?offset=10&limit=10`)
    let response = await fetch(url) ;
    data = await response.json()
  
    list = data.results
    
    console.log(list)
    
    
    // //list 안에 있는 ulr정보를 가지고옴.   
    // list.forEach(element => {
    //     poketmons.push(element.url)

    
    
    // });

    // 정확한 캐릭터 관련 주소를 다시 들고 poketmonInfo 배열에 넣어줌
    for(let i=1; i<=list.length; i++ ){

    let formurls = new URL('https://pokeapi.co/api/v2/pokemon-form/'+(i+start))
    let responses = await fetch(formurls) ;
    let datas = await responses.json()
        
    poketmonInfo.push(datas)
   
    
      // let charactoerurl = new URL('https://pokeapi.co/api/v2/characteristic/'+(i))
      // let charactoerResponse = await fetch(charactoerurl);
      // let charactoerData = await charactoerResponse.json()
      // poketCharactoer.push(charactoerData.descriptions[1])
      


      let abilityUrl = new URL('https://pokeapi.co/api/v2/ability/'+(i+start))
      let abilityResponse = await fetch(abilityUrl);
      let abilityData = await abilityResponse.json()
      poketability.push(abilityData.flavor_text_entries[10])
      

      

     
      
 
    render()
    
  }
  
  backGroundColor(poketmonInfo);
  console.log(poketmonInfo)
   
  
}

//카드를 선택
//카드선택된 아이템[i]의 값이 모달창으로 뜸




function render(){
    
    let pokethtml = ""

    
    for(let i = 0; i<poketmonInfo.length; i++){
      
        pokethtml +=
        `<div class="item-box col">
           
            
         <div class="poketmon-img">
         <div class="poketmon-intro"> 
         <span>NO.${poketmonInfo[i].id}</span>
            <button id="change-text-button" onclick="Click(event)" value ="basic">Basic</button>
              <div id="basic-img" class="">
                <img src="${poketmonInfo[i].sprites.front_default}" class="front">
                <img src="${poketmonInfo[i].sprites.back_default}" class="back">
              </div> 
              <div id="shiny-img" class="display">
                <img src="${poketmonInfo[i].sprites.front_shiny}" class="front">
                <img src="${poketmonInfo[i].sprites.back_shiny}" class="back">
                </div> 
                <p class="poke-name">${poketmonInfo[i].name}</p>
            </div>
            </div>
           <div class="poke-detail-info">
           
            <span class="">${poketability[i].flavor_text}</span>
            <span class="type-button">${poketmonInfo[i].types[0].type.name}</span>
           
         </div>

        </div>`
        
        ;
        
    
 
      
     
        // <div>${poketmonInfo[i].types[0].type.name}</div>
        // <div>${poketmonInfo[i].types[1].type.name}</div>    
    // console.log(poketmonInfo[i].types)

    
}
   
    document.getElementById("poketmon-board").innerHTML = pokethtml
   
}

// 이벤트가 일어난 버튼에서 변경이 필요했음

function Click(event){
    
    let ClickButton = event.target
      
    // let Shiny = document.querySelector("#shiny-img")
    // let Basic = document.querySelector("#basic-img")
       // 처음엔 이미지를 선택해서 가져왔더니 첫번째 카드만 바뀌는 상태가 됨
       //이벤트가 일어난 곳!을 정확하게 짚고! 거기서 변화를 주기로 생각함
       //event 에 대한것을 찾아보게됨.
       //button에 value 값을 주고 클릭시 value 값을 변경하게 하면 토글 기능을 쉽게 넣을 수 있었음

    let BasicImg = event.target.parentElement.children[2]
    
    let ShinyImg = event.target.parentElement.children[3]
   
    
  
   
//  1갠 클릭 반응됨 // 근데 아래꺼부터는 안되는거 해결해야함

  
      
  if (event.target.value == "basic"){

    BasicImg.classList.add("display")
    ShinyImg.classList.remove("display")
    ClickButton.innerHTML = "Shiny"
    event.target.value = "shiny"

   
  } else if (event.target.value == "shiny"){
      
    BasicImg.classList.remove("display")
    ShinyImg.classList.add("display")
    ClickButton.innerHTML = "Basic"
    event.target.value = "basic"

  }
    }

    
function backGroundColor(poketmonInfo){
  //타입을 정하고 타입에 따라
  //해당 타입이 있는 카드의 배경색을 변경한다.
 
  


  for(let i = 0; i<poketmonInfo.length; i++){


  // console.log(poketmonInfo[i].types[0].type.name)
   
    let Ptype = poketmonInfo[i].types[0].type.name
    let card = document.querySelectorAll(".item-box")
    let typeButton = document.querySelectorAll(".type-button")
    
    if(Ptype === "grass"){
      card[i].style.backgroundColor = "#cfe3db"
      card[i].style.border = "1px #99cdb7 Solid"
      typeButton[i].style.backgroundColor = "#104a39"
    
    } else if (Ptype === "fire"){
      card[i].style.backgroundColor = "#ffb983"
      card[i].style.border = "1px #ffa45d Solid"
      typeButton[i].style.backgroundColor = "#ff6d52"
    }  
    else if (Ptype === "water"){
      card[i].style.backgroundColor = "#b4e6ee"
      card[i].style.border = "1px #70c3cf Solid"
      typeButton[i].style.backgroundColor = "#2062ac"
    }    
    else if (Ptype === "bug"){
      card[i].style.backgroundColor = "#dede"
      card[i].style.border = "1px #9cd18c Solid"
      typeButton[i].style.backgroundColor = "#69b569"
    }    
    else if (Ptype === "normal"){
      card[i].style.backgroundColor = "#e9e9e9ee"
      card[i].style.border = "1px #c7c7c7ee Solid"
      typeButton[i].style.backgroundColor = "#8f8f8f"
    } 
    
    else if (Ptype === "poison"){
      card[i].style.backgroundColor = "#e2dbf7ee"
      card[i].style.border = "1px #b6a9ddee Solid"
      typeButton[i].style.backgroundColor = "#6c5ba5ee"
    } 
    
    else if (Ptype === "ground"){
      card[i].style.backgroundColor = "#e1cab9"
      card[i].style.border = "1px #b6870f Solid"
      typeButton[i].style.backgroundColor = "#795548"
    } 
      

    else if (Ptype === "electric"){
      card[i].style.backgroundColor = "#fffacb"
      card[i].style.border = "1px #ffeb3b Solid"
      typeButton[i].style.backgroundColor = "#ffc107"
    } 

    else if (Ptype === "fairy"){
      card[i].style.backgroundColor = "#ffe3da"
      card[i].style.border = "1px #ffc5b4 Solid"
      typeButton[i].style.backgroundColor = "#ee9494"
    } 
    
    else if (Ptype === "fighting"){
      card[i].style.backgroundColor = "#ababab"
      card[i].style.border = "1px #6c757d Solid"
      typeButton[i].style.backgroundColor = "#2e2e2e"
    }

    else if (Ptype === "rock"){
      card[i].style.backgroundColor = "#c8c8a6"
      card[i].style.border = "1px #68685c Solid"
      typeButton[i].style.backgroundColor = "#68685c"
    }
    else if (Ptype === "psychic"){
      card[i].style.backgroundColor = "#ffffbd"
      card[i].style.border = "1px #cab515 Solid"
      typeButton[i].style.backgroundColor = "#cab515"
    } 
      
      
    }
    
  }
  

  
  const search = async() => {
    let card = document.querySelectorAll(".item-box")
    let keyword = searchInput.value.toUpperCase();
    let nopoket = document.getElementById('nopoket')
  
   

    for (let i = 0; i < poketmonInfo.length; i++){
     let searchName = document.getElementsByClassName("poke-name")

     if(searchName[i].innerHTML.toUpperCase().indexOf(keyword) != -1) {
       card[i].style.display = "block"
       nopoket.style.display = "none"
      
      
     } else {
      
      card[i].style.display = "none"
      
     

      
  }
   
   
}
 
}



nextBtn.addEventListener("click",gotopage)


function gotopage(){
start = start+10
getPoketmon()

}



// previousBtn.addEventListener("click",function(){

//   start = start-10
//   getPoketmon()
  
// })

window.addEventListener('scroll', function(){

  if (scrollY >= this.innerHeight*1.65){
    console.log(" 크다")
   
    
    
  }
  console.log(this.innerHeight,scrollY)

})




getPoketmon()
