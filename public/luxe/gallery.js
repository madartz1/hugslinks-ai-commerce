// Preview-only catalog. The repository intentionally contains NO Swan artwork or AI-generated art assets yet.
// Connect an authorized asset catalog and validated print SKUs before enabling purchases.
const catalog=[
  {id:"swan-catalog",collection:"swan",eyebrow:"ARTIST COLLECTION",name:"Swan the Artist",description:"Original works from Swan's authorized fine-art catalog.",status:"Catalog upload pending",symbol:"S",tone:"swan"},
  {id:"hugs-ai-catalog",collection:"hugs-ai",eyebrow:"HUGSLINKS STUDIO",name:"HUGS AI Creations",description:"Original visual collections produced by HUGSLinks.",status:"Art selection pending",symbol:"H",tone:"ai"}
];
const el=document.querySelector("#gallery");
const buttons=[...document.querySelectorAll("[data-filter]")];
function draw(value="all"){
  buttons.forEach(b=>{const on=b.dataset.filter===value;b.classList.toggle("active",on);b.setAttribute("aria-pressed",String(on));});
  el.replaceChildren();
  for(const item of catalog.filter(x=>value==="all"||x.collection===value)){
    const card=document.createElement("article");card.className="piece";
    const art=document.createElement("div");art.className="placeholder "+item.tone;art.setAttribute("aria-label","Artwork placeholder, not an actual painting");
    const frame=document.createElement("div");frame.className="frame";frame.textContent=item.symbol;
    const label=document.createElement("span");label.className="watermark";label.textContent="ARTWORK COMING SOON";art.append(frame,label);
    const info=document.createElement("div");info.className="piece-info";
    const over=document.createElement("div");over.className="overline";over.textContent=item.eyebrow;
    const title=document.createElement("h3");title.textContent=item.name;
    const para=document.createElement("p");para.textContent=item.description;
    const status=document.createElement("div");status.className="status";status.textContent=item.status;
    const button=document.createElement("a");button.href="/luxe/artwork.html?collection="+encodeURIComponent(item.id);button.className="preview-link";button.textContent="Preview formats & frames →";
    info.append(over,title,para,status,button);card.append(art,info);el.append(card);
  }
}
buttons.forEach(button=>button.addEventListener("click",()=>draw(button.dataset.filter)));
draw();