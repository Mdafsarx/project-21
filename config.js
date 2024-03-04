function search(){
loading(false)
const searchInput=getId('searchInput').value;
const url=` https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchInput}`;
fetch(url).then(res=>res.json()).then(data=>
    setTimeout(()=>{
        display(data.posts)
    },2000)
    )
}


const url='https://openapi.programming-hero.com/api/retro-forum/posts'
fetch(url).then(res=>res.json()).then(data=>display(data.posts))

function display(data){
    getId('cardContainer').innerHTML=''
    data.forEach(D => {
        // console.log(D)
const dCard=document.createElement('div')
dCard.classList='bg-[#797DFC1A]  w-full rounded-2xl flex  px-4 py-6'
dCard.innerHTML=`<div class="w-[10%] px-2 relative">
<img src="${D.image}" alt="" class='rounded-xl'>
</div>

<!-- information -->
<div class="w-[90%]  space-y-1">
<div class="flex text-black gap-5">
    <p>${D.category}</p>
    <p class='font-semibold'>Author : ${D.author.name}</p>
</div>
<h1 class="text-2xl font-bold text-balance">${D.title}</h1>
<p class="border-b-2 border-dashed pb-5 text-balance">${D.description}</p>
<!-- img and email click -->
<div class="flex justify-between items-center py-4">

 <!-- images -->
<div class="flex items-center gap-6">
    <div class="flex items-center gap-3"><img src="Vector.png" alt=""><span>${D.comment_count}</span></div>
    <div class="flex items-center gap-3"><img src="Vector2.png" alt=""><span>${D.view_count}</span></div>
    <div class="flex items-center gap-3"><img src="Vector3.png" alt=""><span>${D.posted_time}</span></div>
</div>

<!-- message click button -->
<div>
<img src="email 1.png" alt="" onclick="Email('${D?.title}','${D?.view_count}')">
</div>

</div>

</div>`
getId('cardContainer').appendChild(dCard)
    });
        loading(true) 
}


let ViewCount=0
function Email(title,view){

const markCard=document.createElement('div')
markCard.innerHTML=`<div class="flex bg-[#ffffff] p-5 rounded-2xl shadow-2xl">
<p class="font-bold px-2">${title}</p>
<div class="flex items-center gap-1 pr-3"><img src="Vector2.png" alt=""><span>${view}</span></div>
</div>`;
getId('ReadContainer').appendChild(markCard)
ViewCount++
getId('readCount').innerText=ViewCount;
}


async function latestPost(){

const res=await fetch(' https://openapi.programming-hero.com/api/retro-forum/latest-posts')
const data=await res.json();

for(const D of data){
    console.log(D)
const latestCard=document.createElement('div')
latestCard.classList='bg-slate-300 p-5 space-y-2 rounded-2xl py-6 border-black border-2'
latestCard.innerHTML=`
<figure><img src="${D.cover_image}" alt="" class="rounded-2xl"></figure>
<div class="flex items-center gap-2"><img src="date.png" alt=""><span>${D.author.posted_date}</span></div>
<h1 class="font-bold">${D.title}</h1>
<p class='pr-16'>${D.description}</p>

<div class="flex items-center gap-4">
    <img src="${D.profile_image}" class="w-[15%] rounded-full" alt="">
    <div>
        <p class="font-bold ">${D.author.name}</p>
        <p>${D.author?.designation||'Unknown'}</p>
    </div>
</div>
`
getId('latestCardContiner').appendChild(latestCard)


}


}
latestPost()



function loading(isLoad){
    if(isLoad){
getId('loadingSpin').classList.add('hidden')
    }else{
        getId('loadingSpin').classList.remove('hidden')
    }
}