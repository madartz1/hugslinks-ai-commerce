// Approved local preview assets only. Do not load unverified external artwork.
const artworks=[
 {id:"golden",name:"Golden Reflections — Swan Collection",image:"/luxe/golden-reflections-web.jpg",available:true},
 {id:"swan-next",name:"Other Swan paintings — awaiting approved images",image:null,available:false},
 {id:"ai-next",name:"HUGS AI Creations — awaiting approved images",image:null,available:false}
];
for(const card of document.querySelectorAll("[data-room]")){
 const artwork=card.querySelector(".art-select"),finish=card.querySelector(".finish-select"),frame=card.querySelector(".hung-frame"),mat=card.querySelector(".mat"),img=card.querySelector("img"),status=card.querySelector(".room-status");
 for(const item of artworks){const opt=document.createElement("option");opt.value=item.id;opt.textContent=item.name;artwork.append(opt)}
 const update=()=>{const item=artworks.find(x=>x.id===artwork.value);frame.dataset.finish=finish.value;
 if(item.available){img.src=item.image;img.alt=item.name+" in "+card.querySelector("h3").textContent;img.hidden=false;mat.classList.remove("empty");mat.removeAttribute("data-placeholder");status.textContent="Art preview available · print options pending";}
 else{img.hidden=true;mat.classList.add("empty");mat.dataset.placeholder="Artwork asset pending";status.textContent="The original artwork has not yet been uploaded.";}};
 artwork.addEventListener("change",update);finish.addEventListener("change",update);update();
}
