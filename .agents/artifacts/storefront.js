const storyPage=location.pathname.endsWith('storyline.html');
const previewScript=document.createElement('script');previewScript.src='device-preview.js?v=7';document.head.append(previewScript);
const searchStyles=document.createElement('link');searchStyles.rel='stylesheet';searchStyles.href='search.css?v=6';document.head.append(searchStyles);
const browsePage=/category|product/.test(location.pathname);
const icon=name=>`<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">${{search:'<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>',account:'<circle cx="12" cy="8" r="4"/><path d="M4 22v-3a8 8 0 0 1 16 0v3"/>',cart:'<path d="M2 3h3l3 13h11l3-9H6"/><circle cx="9" cy="21" r="1"/><circle cx="19" cy="21" r="1"/>'}[name]}</svg>`;
document.querySelector('#storefront-header').innerHTML=`<div class="shop-announcement">Your local business. Our iconic brands. One connected partnership. <span>Midtown Market / Atlanta, GA</span></div><div class="shop-header"><a class="brand" href="index.html">Coca-Cola<span>BUSINESS PARTNER</span></a><form id="catalog-search" role="search"><label class="sr-only" for="product-search">Search products</label><input id="product-search" type="search" placeholder="Search products, brands and pack sizes"><button aria-label="Search products">${icon('search')}</button></form><div class="shop-tools"><button data-panel="account" aria-label="My Account">${icon('account')}<span>My Account<small>Hi, Jordan</small></span></button><button data-panel="cart" aria-label="My Cart">${icon('cart')}<span>My Cart<small id="cart-count">Demo draft</small></span></button></div></div><nav class="shop-nav" aria-label="Storefront navigation"><a href="storyline.html" ${storyPage?'aria-current="page"':''}>Storyline</a><a href="index.html" ${!storyPage&&!browsePage?'aria-current="page"':''}>Agentic Commerce</a>${catalogCategories.map(category=>`<a href="category.html?category=${encodeURIComponent(category)}" ${location.pathname.endsWith('category.html')&&(new URLSearchParams(location.search).get('category')||'All Products')===category?'aria-current="page"':''}>${category.replace('&','&amp;')}</a>`).join('')}</nav>`;
const storefrontNav=document.querySelector('.shop-nav');
storefrontNav.append(storefrontNav.querySelector('a[href="storyline.html"]'));
const commerceDock=document.createElement('footer');commerceDock.className='commerce-dock';commerceDock.setAttribute('aria-label','Commerce navigation and search');
const dockLabel=document.createElement('div');dockLabel.className='dock-label';dockLabel.innerHTML='<span class="online" aria-hidden="true"></span><strong>Your buying workspace</strong><small>Discover. Ask. Build your next move.</small>';
commerceDock.append(dockLabel,document.querySelector('#catalog-search'),storefrontNav);document.body.append(commerceDock);
document.body.classList.add('has-commerce-dock');
const headerStatus=document.createElement('a');headerStatus.className='header-workspace';headerStatus.href='index.html';headerStatus.innerHTML='<span class="online" aria-hidden="true"></span>Connected commerce <small>Midtown Market / Atlanta</small>';
document.querySelector('.shop-header').insertBefore(headerStatus,document.querySelector('.shop-tools'));
const dockStyles=document.createElement('link');dockStyles.rel='stylesheet';dockStyles.href='commerce-dock.css?v=9';document.head.append(dockStyles);
const visionStyles=document.createElement('link');visionStyles.rel='stylesheet';visionStyles.href='vision.css?v=11';document.head.append(visionStyles);
if(!document.body.classList.contains('conversation-page')){
  const agentStyles=document.createElement('link');agentStyles.rel='stylesheet';agentStyles.href='agent-panel.css?v=12';document.head.append(agentStyles);
  const agentButton=document.createElement('button');agentButton.className='dock-agent-button';agentButton.textContent='Ask my agent';agentButton.setAttribute('aria-expanded','false');agentButton.setAttribute('aria-controls','site-agent-panel');
  document.querySelector('#catalog-search').before(agentButton);
  const panel=document.createElement('section');panel.id='site-agent-panel';panel.className='site-agent-panel';panel.hidden=true;panel.setAttribute('aria-label','Your commerce agent conversation');
  const heading=document.createElement('div');heading.className='agent-panel-heading';heading.innerHTML='<div><strong>Your commerce agent</strong><small>Stay on this page. Keep the conversation moving.</small></div>';
  const close=document.createElement('button');close.className='secondary';close.textContent='Close conversation';heading.append(close);
  const frame=document.createElement('iframe');frame.title='Your commerce agent conversation';panel.append(heading,frame);document.body.append(panel);
  function closeAgent(){panel.hidden=true;agentButton.setAttribute('aria-expanded','false');agentButton.focus();}
  agentButton.addEventListener('click',()=>{if(!panel.hidden){closeAgent();return;}if(!frame.getAttribute('src')){const url=new URL('index.html',location.href);url.searchParams.set('embedded','agent');url.searchParams.set('context',location.pathname.endsWith('product.html')?'Product assortment':'Product discovery');frame.src=url.href;}panel.hidden=false;agentButton.setAttribute('aria-expanded','true');close.focus();});
  close.addEventListener('click',closeAgent);panel.addEventListener('keydown',e=>{if(e.key==='Escape')closeAgent();});
}
if(new URLSearchParams(location.search).get('embedded')==='agent'){
  document.body.classList.add('embedded-agent');
  const embeddedStyles=document.createElement('link');embeddedStyles.rel='stylesheet';embeddedStyles.href='agent-panel.css?v=12';document.head.append(embeddedStyles);
}
const dialog=document.createElement('dialog');dialog.className='shop-dialog';dialog.setAttribute('aria-labelledby','panel-title');dialog.innerHTML='<button class="secondary dialog-close">Close</button><h2 id="panel-title"></h2><div id="panel-content"></div>';document.body.append(dialog);
dialog.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
function openPanel(title,content){dialog.querySelector('#panel-title').textContent=title;dialog.querySelector('#panel-content').replaceChildren(content);dialog.showModal();}
document.querySelector('#catalog-search').addEventListener('submit',e=>{e.preventDefault();location.href=`category.html?q=${encodeURIComponent(document.querySelector('#product-search').value.trim())}`;});
const searchInput=document.querySelector('#product-search');
searchInput.placeholder='Tell me how I can help...';
searchInput.setAttribute('aria-label','Tell me how I can help with your assortment');
searchInput.setAttribute('aria-controls','search-preview');
searchInput.setAttribute('aria-expanded','false');
searchInput.autocomplete='off';
const searchPreview=document.createElement('section');searchPreview.id='search-preview';searchPreview.className='search-preview';searchPreview.hidden=true;searchPreview.setAttribute('aria-label','Search suggestions and product previews');document.querySelector('#catalog-search').append(searchPreview);
function previewSearch(){
  const result=interpretSearch(searchInput.value);searchPreview.replaceChildren();
  const heading=document.createElement('strong');heading.textContent=result.title;searchPreview.append(heading);
  const note=document.createElement('p');note.textContent=result.reason;searchPreview.append(note);
  if(!searchInput.value.trim()){
    const examples=document.createElement('div');examples.className='search-examples';
    ['There is a festival in my neighborhood this weekend, what should I stock up on?','Help me stock up for a heatwave','Show me zero sugar drinks'].forEach(text=>{const button=document.createElement('button');button.type='button';button.textContent=text;button.addEventListener('click',()=>{searchInput.value=text;previewSearch();searchInput.focus();});examples.append(button);});searchPreview.append(examples);
  }
  const picks=document.createElement('div');picks.className='search-picks';
  result.products.slice(0,3).forEach(p=>{const a=document.createElement('a');a.href=`product.html?id=${p.id}`;a.innerHTML=`<div class="search-mini ${p.color}" aria-hidden="true">${p.brand}</div><strong>${p.name}</strong><small>${p.signal}</small>`;picks.append(a);});searchPreview.append(picks);
  if(!result.products.length){const empty=document.createElement('p');empty.textContent='No sample matches yet. Try Coke, water, festival or heatwave.';searchPreview.append(empty);}
  const all=document.createElement('a');all.className='search-view-all';all.href=`category.html?q=${encodeURIComponent(searchInput.value.trim())}`;all.textContent=`View ${result.products.length} recommendations →`;searchPreview.append(all);
  const disclaimer=document.createElement('small');disclaimer.textContent='Demo intent matching / No live AI or local event data';searchPreview.append(disclaimer);
  searchPreview.hidden=false;searchInput.setAttribute('aria-expanded','true');
}
searchInput.addEventListener('focus',previewSearch);searchInput.addEventListener('input',previewSearch);
searchInput.addEventListener('keydown',e=>{if(e.key==='Escape'){searchPreview.hidden=true;searchInput.setAttribute('aria-expanded','false');}if(e.key==='ArrowDown'){const first=searchPreview.querySelector('button,a');if(first){e.preventDefault();first.focus();}}});
document.querySelector('#catalog-search').addEventListener('focusout',e=>{if(!e.currentTarget.contains(e.relatedTarget)){searchPreview.hidden=true;searchInput.setAttribute('aria-expanded','false');}});
searchPreview.addEventListener('keydown',e=>{if(e.key==='Escape'){searchInput.focus();searchPreview.hidden=true;searchInput.setAttribute('aria-expanded','false');}});
function updateCartCount(){document.querySelector('#cart-count').textContent=`${Object.values(readDemoCart()).reduce((n,q)=>n+q,0)} cases / draft`;}
window.addEventListener('cart-updated',updateCartCount);updateCartCount();
function cartContent(){
  const content=document.createElement('div'),cart=readDemoCart();let total=0;
  for(const [sku,qty] of Object.entries(cart)){
    const {p,v}=findSku(sku);total+=qty*v.price;
    const row=document.createElement('p');row.textContent=`${p.name} / ${v.size} / ${qty} cases / ${commerceMoney(qty*v.price)} `;
    const remove=document.createElement('button');remove.className='text-button';remove.textContent='Remove';remove.setAttribute('aria-label',`Remove ${p.name} ${v.size}`);
    remove.addEventListener('click',()=>{
      try{const latest=readDemoCart();delete latest[sku];localStorage.setItem('commerce-demo-cart',JSON.stringify(latest));updateCartCount();dialog.querySelector('#panel-content').replaceChildren(cartContent());dialog.querySelector('.dialog-close').focus();}
      catch{const error=document.createElement('p');error.setAttribute('role','alert');error.textContent='Browser storage is unavailable. The cart could not be updated.';content.append(error);}
    });row.append(remove);content.append(row);
  }
  const summary=document.createElement('p');summary.textContent=total?`Demo subtotal: ${commerceMoney(total)} before tax. Draft saved in this browser. No purchase has been placed.`:'Your demo cart is empty. Add cases with Quick order or build a multi-format assortment.';content.append(summary);
  const link=document.createElement('a');link.className='secondary story-link';link.href='index.html?journey=1';link.textContent='Explore purchasing approval with my agent';content.append(link);return content;
}
document.querySelectorAll('[data-panel]').forEach(b=>b.addEventListener('click',()=>{if(b.dataset.panel==='cart'){openPanel('My demo cart',cartContent());return;}const p=document.createElement('p');p.textContent='Jordan Carter / Owner, Corner & Co. Active location: Midtown Market, Atlanta 30308. This fictional account is already signed in.';openPanel('My Account',p);}));
