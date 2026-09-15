/* RecipeHub image map: stable HTTPS image endpoints, one correct image per recipe. */
(function(){
const I={
'biryani':'https://commons.wikimedia.org/wiki/Special:Redirect/file/Special%20Chicken%20biryani.jpg',
'karahi-gosht':'https://commons.wikimedia.org/wiki/Special:Redirect/file/Karahi.JPG',
'daal-chawal':'https://commons.wikimedia.org/wiki/Special:Redirect/file/The%20Dal%20Chawal.jpg',
'nihari':'https://commons.wikimedia.org/wiki/Special:Redirect/file/Nihari.JPG',
'palak-paneer':'https://commons.wikimedia.org/wiki/Special:Redirect/file/Palak%20Paneer.JPG',
'butter-chicken':'https://commons.wikimedia.org/wiki/Special:Redirect/file/Butter%20Chicken.jpg',
'chicken-tikka':'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=1400&q=85',
'gulab-jamun':'https://commons.wikimedia.org/wiki/Special:Redirect/file/Gulab%20Jamun.jpg',
'chana-masala':'https://commons.wikimedia.org/wiki/Special:Redirect/file/Chana%20masala.jpg',
'seekh-kebab':'https://commons.wikimedia.org/wiki/Special:Redirect/file/Seekh%20Kebab.JPG',
'daal-makhani':'https://commons.wikimedia.org/wiki/Special:Redirect/file/Dal%20Makhani.jpg',
'chicken-pulao':'https://commons.wikimedia.org/wiki/Special:Redirect/file/Chicken%20Pulao.jpg',
'butter-naan':'https://commons.wikimedia.org/wiki/Special:Redirect/file/Butter%20Naan.jpg',
'aloo-gobi':'https://commons.wikimedia.org/wiki/Special:Redirect/file/Aloo%20gobi.jpg',
'rajma-masala':'https://commons.wikimedia.org/wiki/Special:Redirect/file/Rajma%20Masala.jpg',
'kheer':'https://commons.wikimedia.org/wiki/Special:Redirect/file/Kheer%20Special.JPG',
'chicken-handi':'https://commons.wikimedia.org/wiki/Special:Redirect/file/Chicken%20Handi.JPG'
};
function keyFromUrl(){return new URLSearchParams(location.search).get('r')||location.pathname.split('/').pop().replace('.html','')}
function setBg(el,url){el.style.backgroundImage=`url("${url}")`;el.dataset.recipeImage=url}
function fix(){
 const pageKey=keyFromUrl();
 const photo=document.querySelector('#photo');
 if(photo&&I[pageKey]) setBg(photo,I[pageKey]);
 const hero=document.querySelector('.heroimg');
 if(hero&&I[pageKey]) setBg(hero,I[pageKey]);
 document.querySelectorAll('[style*="background-image"]').forEach(el=>{
   const a=el.closest('a');
   const href=a?.getAttribute('href')||'';
   const m=href.match(/[?&]r=([^&]+)/);
   if(m&&I[m[1]]) setBg(el,I[m[1]]);
 });
 document.querySelectorAll('img[data-recipe]').forEach(img=>{const k=img.dataset.recipe;if(I[k]){img.src=I[k];img.onerror=null;}});
}
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',fix); else fix();
setTimeout(fix,600);
})();