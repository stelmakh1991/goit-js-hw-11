import{S as p,i as m}from"./assets/vendor-7659544d.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function r(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(e){if(e.ep)return;e.ep=!0;const s=r(e);fetch(e.href,s)}})();const d="/goit-js-hw-11/assets/iconClose-75a7952d.svg",h="/goit-js-hw-11/assets/iconSuccess-55aec323.svg",c=document.querySelector(".gallery"),l=document.querySelector(".search-form"),u=document.querySelector(".loader"),f="gallery-link";l.addEventListener("submit",function(t){t.preventDefault();const o=t.target.elements.query.value.trim();o!==""&&(c.innerHTML="",u.style.display="block",L(o).then(function({hits:r,total:a}){if(Array.isArray(r)&&r.length>0){const e=r.map(v).join("");c.innerHTML=e,y(`Was found: ${a} images`),new p(`.${f}`).refresh()}else n("Sorry, there are no images matching your search query. Please try again!")}).catch(function(r){n(`Error fetching images: ${r}`)}).finally(function(){l.reset(),u.style.display="none"}))});const g={titleColor:"#FFFFFF",messageColor:"#FFFFFF",messageSize:"16px",position:"topRight",displayMode:"replace",closeOnEscape:!0,pauseOnHover:!1,maxWidth:432,messageSize:"16px",messageLineHeight:"24px"};function n(t){m.show({message:t,backgroundColor:"#EF4040",progressBarColor:"#FFE0AC",iconUrl:d,...g})}function y(t){m.show({message:t,backgroundColor:"#59A10D",progressBarColor:"#B5EA7C",iconUrl:h,...g})}const F="https://pixabay.com/api/";function L(t){const r=`?${new URLSearchParams({key:"42384558-f7a36ff8eb6bf2b4054c0114f",q:t,image_type:"photo",orientation:"horizontal",safeSearch:!0})}`,a=F+r;return fetch(a).then(e=>e.json()).catch(e=>{throw n(`Error fetching images: ${e}`),e})}function v({largeImageURL:t,tags:o,webformatURL:r,likes:a,views:e,comments:s,downloads:i}){return`
  <a href="${t}" class="${f}">
     <figure>
      <img src="${r}" alt="${o}" class="gallery-image">
      <figcaption class="gallery__figcaption">
        <div class="image-item">Likes <span class="image-elem">${a}</span></div>
        <div class="image-item">Views <span class="image-elem">${e}</span></div>
        <div class="image-item">Comments <span class="image-elem">${s}</span></div>
        <div class="image-item">Downloads <span class="image-elem">${i}</span></div>
  </figcaption>
  </figure>
</a>
`}
//# sourceMappingURL=commonHelpers.js.map
