/* RecipeHub image loader: real food photos for every recipe. */
(function(){
const I={
'biryani':'https://commons.wikimedia.org/wiki/Special:Redirect/file/Chicken%20Biryani%20%2801%29.jpg',
'karahi-gosht':'https://commons.wikimedia.org/wiki/Special:Redirect/file/Chicken%20Karahi%20in%20Pakistan.jpg',
'daal-chawal':'https://commons.wikimedia.org/wiki/Special:Redirect/file/C8-DPPxXsAEeCOy.jpg',
'nihari':'https://commons.wikimedia.org/wiki/Special:Redirect/file/Nihari.JPG',
'palak-paneer':'https://commons.wikimedia.org/wiki/Special:Redirect/file/Palakpaneer.jpg',
'butter-chicken':'https://commons.wikimedia.org/wiki/Special:Redirect/file/ButterChicken.jpg',
'chicken-tikka':'https://commons.wikimedia.org/wiki/Special:Redirect/file/Chicken-Tikka.jpg',
'gulab-jamun':'https://commons.wikimedia.org/wiki/Special:Redirect/file/Gulab%20jamun.jpg',
'chana-masala':'https://commons.wikimedia.org/wiki/Special:Redirect/file/Chana%20masala.jpg',
'seekh-kebab':'https://commons.wikimedia.org/wiki/Special:Redirect/file/Seekh%20Kebab.JPG',
'daal-makhani':'https://commons.wikimedia.org/wiki/Special:Redirect/file/Dal-Makhani.jpg',
'chicken-pulao':'https://commons.wikimedia.org/wiki/Special:Redirect/file/Chicken%20Pulao.jpg',
'butter-naan':'https://commons.wikimedia.org/wiki/Special:Redirect/file/Butter%20Naan.jpg',
'aloo-gobi':'https://commons.wikimedia.org/wiki/Special:Redirect/file/Aloo%20gobi.jpg',
'rajma-masala':'https://commons.wikimedia.org/wiki/Special:Redirect/file/Rajma%20Masala.jpg',
'kheer':'https://commons.wikimedia.org/wiki/Special:Redirect/file/Kheer.jpg',
'chicken-handi':'https://commons.wikimedia.org/wiki/Special:Redirect/file/Chicken%20Handi.JPG'
};
const N={'biryani':'Chicken Biryani','karahi-gosht':'Karahi Gosht','daal-chawal':'Daal Chawal','nihari':'Nihari','palak-paneer':'Palak Paneer','butter-chicken':'Butter Chicken','chicken-tikka':'Chicken Tikka','gulab-jamun':'Gulab Jamun','chana-masala':'Chana Masala','seekh-kebab':'Seekh Kebab','daal-makhani':'Daal Makhani','chicken-pulao':'Chicken Pulao','butter-naan':'Butter Naan','aloo-gobi':'Aloo Gobi','rajma-masala':'Rajma Masala','kheer':'Kheer','chicken-handi':'Chicken Handi'};
function keyFromUrl(){return new URLSearchParams(location.search).get('r')||location.pathname.split('/').pop().replace('.html','')}
function keyForPhoto(el){let k=el.dataset.recipe||null;const direct=el.closest('a');if(!k&&direct){try{k=new URL(direct.href,location.href).searchParams.get('r')}catch(e){}}
if(!k){const card=el.closest('.card,.recipe-card');const link=card&&card.querySelector('a[href*="?r="]');if(link){try{k=new URL(link.href,location.href).searchParams.get('r')}catch(e){}}}
return k}
function mount(el,k){if(!el||!I[k]||el.dataset.rhImageMounted)return;el.dataset.rhImageMounted='1';el.style.backgroundImage='none';const img=document.createElement('img');img.src=I[k];img.alt=N[k]+' recipe';img.loading='lazy';img.decoding='async';img.style.cssText='display:block;width:100%;height:100%;object-fit:cover;object-position:center;border:0';img.onerror=function(){this.onerror=null;el.dataset.rhImageMounted='';el.style.backgroundImage='url("'+I[k]+'")'};el.innerHTML='';el.appendChild(img)}
function fix(){const pageKey=keyFromUrl();document.querySelectorAll('.photo').forEach(el=>{const k=keyForPhoto(el)||pageKey;if(I[k])mount(el,k)});document.querySelectorAll('#photo,.heroimg').forEach(el=>{const k=el.dataset.recipe||pageKey;if(I[k])mount(el,k)});document.querySelectorAll('img[data-recipe]').forEach(img=>{const k=img.dataset.recipe;if(I[k]){img.src=I[k];img.alt=N[k]+' recipe'}})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',fix);else fix();setTimeout(fix,100);setTimeout(fix,700);setTimeout(fix,1800);
})();