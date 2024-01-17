import{i as c,S as w,a as h}from"./assets/vendor-89feecc5.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const e of t)if(e.type==="childList")for(const l of e.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&a(l)}).observe(document,{childList:!0,subtree:!0});function s(t){const e={};return t.integrity&&(e.integrity=t.integrity),t.referrerpolicy&&(e.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?e.credentials="include":t.crossorigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function a(t){if(t.ep)return;t.ep=!0;const e=s(t);fetch(t.href,e)}})();const f=document.querySelector(".gallery"),y=document.querySelector(".searchform"),S=document.querySelector(".search-form"),g=document.querySelector(".spinner"),u=document.querySelector(".load_more");u.addEventListener("click",async()=>{p(),d(),n+=1,i.page=n;try{await L()}catch(a){console.log(a)}const s=document.querySelector(".gallery-item").getBoundingClientRect().height;window.scrollBy({top:s*2,behavior:"smooth"})});S.addEventListener("submit",r=>{r.preventDefault(),n=1,I(),p();const o=y.value.trim();if(o.length===0){c.error({title:"Error",position:"topCenter",message:"Sorry, Please choose a topic."});return}d(),i.q=o,L(),y.value=""});let b=40,n=1,m=0,v=new w(".gallery a",{captionDelay:250,captionsData:"alt",close:!0,className:"modal-style"});v.on("show.simplelightbox",function(){});h.defaults.baseURL="https://pixabay.com/api";const q="41618210-7d4eb9e03ab25b6c1f3452a1d",i={key:q,q:"",image_type:"photo",orientation:"horizontal",safesearch:"true",per_page:b,page:n};async function L(){d(),p();try{i.page=n;const r=await h.get("/",{params:i}),{totalHits:o,hits:s}=r.data;if(m=Math.ceil(o/b),s.length===0)return c.error({title:"Error",position:"topCenter",message:"Sorry, there are no images matching your search query. Please try again!"}),console.log(r.data);let a=s.reduce((t,e)=>t+`<li class="gallery-item">
                        <a class="gallery-link" href="${e.largeImageURL}">
                            <img class="gallery-image" data-source="${e.largeImageURL}" src="${e.webformatURL}" alt="${e.tags}" width="360" height="200"/>
                        </a>
                        <div class='title'>
                            <p>Likes:<span class="value">${e.likes}</span></p>
                            <p>Views:<span class="value">${e.views}</span></p>
                            <p>Comments:<span class="value">${e.comments}</span></p>
                            <p>Downloads:<span class="value">${e.downloads}</span></p>
                        </div>
                </li>`,"");f.insertAdjacentHTML("beforeend",a),v.refresh(),P(),n>=m?c.info({position:"topCenter",message:"We're sorry, there are no more posts to load"}):$()}catch(r){console.error(r)}}function I(){f.replaceChildren()}function P(){g.style.visibility="hidden"}function d(){g.style.visibility="visible"}function $(){u.style.visibility="visible"}function p(){u.style.visibility="hidden"}
//# sourceMappingURL=commonHelpers.js.map
