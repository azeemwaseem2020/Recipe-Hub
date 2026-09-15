/* RecipeHub image loader: remote photo first, guaranteed local SVG fallback if remote host fails. */
(function(){
const I={
'biryani':'https://commons.wikimedia.org/wiki/Special:Redirect/file/Special%20Chicken%20biryani.jpg',
'karahi-gosht':'https://commons.wikimedia.org/wiki/Special:Redirect/file/Karahi.JPG',
'daal-chawal':'https://commons.wikimedia.org/wiki/Special:Redirect/file/The%20Dal%20Chawal.jpg',
'nihari':'https://commons.wikimedia.org/wiki/Special:Redirect/file/Nihari.JPG',
'palak-paneer':'https://commons.wikimedia.org/wiki/Special:Redirect/file/Palak%20Paneer.JPG',
'butter-chicken':'https://commons.wikimedia.org/wiki/Special:Redirect/file/Butter%20Chicken.jpg',
'chicken-tikka':'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=1200&q=80',
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
const N={'biryani':'Chicken Biryani','karahi-gosht':'Karahi Gosht','daal-chawal':'Daal Chawal','nihari':'Nihari','palak-paneer':'Palak Paneer','butter-chicken':'Butter Chicken','chicken-tikka':'Chicken Tikka','gulab-jamun':'Gulab Jamun','chana-masala':'Chana Masala','seekh-kebab':'Seekh Kebab','daal-makhani':'Daal Makhani','chicken-pulao':'Chicken Pulao','butter-naan':'Butter Naan','aloo-gobi':'Aloo Gobi','rajma-masala':'Rajma Masala','kheer':'Kheer','chicken-handi':'Chicken Handi'};
const E={'biryani':'🍛','karahi-gosht':'🍲','daal-chawal':'🍚','nihari':'🥘','palak-paneer':'🥬','butter-chicken':'🍗','chicken-tikka':'🍢','gulab-jamun':'🍮','chana-masala':'🫘','seekh-kebab':'🍢','daal-makhani':'🥣','chicken-pulao':'🍚','butter-naan':'🫓','aloo-gobi':'🥔','rajma-masala':'🫘','kheer':'🍚','chicken-handi':'🍲'};
function keyFromUrl(){return new URLSearchParams(location.search).get('r')||location.pathname.split('/').pop().replace('.html','')}
function fallback(k){const title=N[k]||'RecipeHub';const emoji=E[k]||'🍽️';const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800"><rect width="1200" height="800" fill="#eef5ef"/><circle cx="600" cy="350" r="235" fill="#fff" stroke="#073f2f" stroke-width="14"/><text x="600" y="390" text-anchor="middle" font-size="150">${emoji}</text><text x="600" y="625" text-anchor="middle" font-family="Georgia,serif" font-size="54" font-weight="700" fill="#073f2f">${title}</text><text x="600" y="685" text-anchor="middle" font-family="Arial,sans-serif" font-size="26" fill="#66736d">RecipeHub</text></svg>`;return 'data:image/svg+xml;charset=UTF-8,'+encodeURIComponent(svg)}
function mount(el,k){if(!el||!I[k]||el.dataset.rhImageMounted)return;el.dataset.rhImageMounted='1';el.style.position='relative';el.style.overflow='hidden';el.style.backgroundImage='none';const img=document.createElement('img');img.src=I[k];img.alt=N[k]+' recipe';img.loading='lazy';img.decoding='async';img.style.cssText='display:block;width:100%;height:100%;object-fit:cover;object-position:center;border:0;';img.onerror=function(){this.onerror=null;this.src=fallback(k)};el.innerHTML='';el.appendChild(img)}
function fix(){const pageKey=keyFromUrl();document.querySelectorAll('.photo').forEach(el=>{let k=null;const a=el.closest('a');if(a){try{k=new URL(a.href,location.href).searchParams.get('r')}catch(e){}}if(!k)k=el.dataset.recipe||pageKey;if(I[k])mount(el,k)});document.querySelectorAll('#photo,.heroimg').forEach(el=>mount(el,pageKey));document.querySelectorAll('img[data-recipe]').forEach(img=>{const k=img.dataset.recipe;if(I[k]){img.src=I[k];img.alt=N[k]+' recipe';img.onerror=function(){this.onerror=null;this.src=fallback(k)}}})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',fix);else fix();setTimeout(fix,100);setTimeout(fix,700);
})();