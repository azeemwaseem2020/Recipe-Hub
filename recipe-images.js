/* RecipeHub recipe sync: keep English/Urdu recipe pages on the same recipe slug. */
(function(){
const I={'biryani':'https://commons.wikimedia.org/wiki/Special:Redirect/file/Chicken%20Biryani.jpg','karahi-gosht':'https://images.deliveryhero.io/image/global-menu-service/FP_PK/vendor/u3wr/product/41eb2355-1435-4e2a-a63a-242e20312a12.jpg?width=900','daal-chawal':'https://commons.wikimedia.org/wiki/Special:Redirect/file/The%20Dal%20Chawal.jpg','nihari':'https://commons.wikimedia.org/wiki/Special:Redirect/file/Nihari.JPG','palak-paneer':'https://commons.wikimedia.org/wiki/Special:Redirect/file/Palak%20Paneer.JPG','butter-chicken':'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=1400&q=85','chicken-tikka':'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=1400&q=85','gulab-jamun':'https://images.unsplash.com/photo-1593701461250-d7b22dfd3a77?auto=format&fit=crop&w=1400&q=85','chana-masala':'https://indianhealthyrecipe.com/wp-content/uploads/2024/01/2023_01_25_creamy_chana_masala_1.jpg','seekh-kebab':'https://commons.wikimedia.org/wiki/Special:Redirect/file/Seekh%20Kabab%202.JPG','daal-makhani':'https://images.pexels.com/photos/37182514/pexels-photo-37182514/free-photo-of-delicious-indian-dal-makhani-in-metal-bowl.jpeg?auto=compress&dpr=1&h=750&w=1260','chicken-pulao':'https://images.deliveryhero.io/image/fd-pk/Products/76532734.jpg?width=900','butter-naan':'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy%2Cf_auto%2Cq_auto%2Cw_900%2Ch_700%2Cc_fit/FOOD_CATALOG/IMAGES/CMS/2025/12/10/f4a8a2cb-959c-47c5-a6b0-d2e82f249efd_d8b3f273-049d-4d03-8c10-52eb127063cf.jpg','aloo-gobi':'https://kababcurryalbuquerque.com/pluto-images/funnel/images/95c1175e-200e-44ae-b125-c6c73c8e9263?fit=cover&w=900','rajma-masala':'https://images.squarespace-cdn.com/content/v1/65903c4616345c144c2ac699/c8734e44-7bcc-4ae9-b2d9-7959952d1824/RajmaMasala.jpg','kheer':'https://upload.wikimedia.org/wikipedia/commons/6/6d/Kheer_Special.JPG','chicken-handi':'https://commons.wikimedia.org/wiki/Special:Redirect/file/Punjabi%20Chicken%20Handi.JPG'};
const N={'biryani':'Chicken Biryani','karahi-gosht':'Karahi Gosht','daal-chawal':'Daal Chawal','nihari':'Nihari','palak-paneer':'Palak Paneer','butter-chicken':'Butter Chicken','chicken-tikka':'Chicken Tikka','gulab-jamun':'Gulab Jamun','chana-masala':'Chana Masala','seekh-kebab':'Seekh Kebab','daal-makhani':'Daal Makhani','chicken-pulao':'Chicken Pulao','butter-naan':'Butter Naan','aloo-gobi':'Aloo Gobi','rajma-masala':'Rajma Masala','kheer':'Kheer','chicken-handi':'Chicken Handi'};
function englishKey(){const m=location.pathname.match(/\/recipes\/([^/]+)\.html$/);return m&&I[m[1]]?m[1]:null}
function pageKey(){
 const direct=new URLSearchParams(location.search).get('r');
 if(direct&&I[direct])return direct;
 const en=englishKey();if(en)return en;
 if(location.pathname.includes('/ur/recipe.html')){
  if(document.referrer){try{const ref=new URL(document.referrer);const m=ref.pathname.match(/\/recipes\/([^/]+)\.html$/);if(m&&I[m[1]])return m[1]}catch(e){}}
  try{const stored=sessionStorage.getItem('recipehubRecipe');if(stored&&I[stored])return stored}catch(e){}
 }
 return null;
}
function syncUrduLink(k){
 if(!k||!location.pathname.includes('/recipes/'))return;
 let found=false;
 document.querySelectorAll('a[href]').forEach(a=>{try{const u=new URL(a.href,location.href);if(u.pathname.endsWith('/ur/recipe.html')){u.searchParams.set('r',k);a.href=u.href;found=true}}catch(e){}});
 if(!found){
  const host=document.querySelector('.navlinks')||document.querySelector('.navin')||document.querySelector('.top .wrap');
  if(host){const a=document.createElement('a');a.href='../ur/recipe.html?r='+encodeURIComponent(k);a.textContent='اردو';a.setAttribute('aria-label','Read this recipe in Urdu');a.style.marginLeft='10px';host.appendChild(a)}
 }
}
function setText(id,value){const el=document.getElementById(id);if(el&&value)el.textContent=value}
function syncUrduPage(k){
 if(!location.pathname.includes('/ur/recipe.html')||!window.D||!window.D[k])return;
 const d=window.D[k];
 setText('title',d.t);setText('intro',d.i);setText('time',d.time);setText('idea',d.idea);setText('serve',d.serve);
 const ingredients=document.getElementById('ingredients');if(ingredients&&Array.isArray(d.a))ingredients.innerHTML=d.a.map(x=>'<li>'+x+'</li>').join('');
 const steps=document.getElementById('steps');if(steps&&Array.isArray(d.s))steps.innerHTML=d.s.map(x=>'<li>'+x+'</li>').join('');
 const tips=document.getElementById('tips');if(tips&&Array.isArray(d.tips))tips.innerHTML=d.tips.map(x=>'<li>'+x+'</li>').join('');
 const photo=document.getElementById('photo');if(photo)photo.style.backgroundImage="url('"+d.p+"')";
 const english=document.getElementById('englishLink');if(english)english.href='../recipes/'+k+'.html';
 document.title='RecipeHub | '+d.t;
}
function mount(el,k){if(!el||!I[k])return;const img=document.createElement('img');img.alt=N[k]+' recipe';img.loading='lazy';img.decoding='async';img.style.cssText='display:block;width:100%;height:100%;object-fit:cover;object-position:center;border:0';img.onload=function(){el.style.backgroundImage='none';el.innerHTML='';el.appendChild(img)};img.src=I[k]}
function fix(){const k=pageKey();if(!k)return;try{sessionStorage.setItem('recipehubRecipe',k)}catch(e){};syncUrduLink(k);syncUrduPage(k);document.querySelectorAll('.photo,#photo,.heroimg').forEach(el=>{if(!el.dataset.rhImageFixed){el.dataset.rhImageFixed='1';mount(el,k)}});document.querySelectorAll('img[data-recipe]').forEach(img=>{const x=img.dataset.recipe;if(I[x]){img.src=I[x];img.alt=N[x]+' recipe'}})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',fix);else fix();
setTimeout(fix,300);setTimeout(fix,1000);setTimeout(fix,2500);
})();