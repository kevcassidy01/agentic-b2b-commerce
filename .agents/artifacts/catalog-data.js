// Fictional account pricing, availability and demand signals for the concept demo.
const catalogProducts = [
  {id:'coke',name:'Coca-Cola Original',brand:'Coca-Cola',category:'Soft Drinks',color:'red',signal:'Neighborhood bestseller',score:99,sugar:'Original',description:'The iconic refreshment. Build your shelf mix across cold single-serve, everyday cans and take-home bottles.'},
  {id:'zero',name:'Coca-Cola Zero Sugar',brand:'Coca-Cola',category:'Soft Drinks',color:'black',signal:'Growing local demand',score:97,sugar:'Zero sugar',description:'Great Coca-Cola taste with zero sugar. An essential companion to your Original assortment.'},
  {id:'sprite',name:'Sprite',brand:'Sprite',category:'Soft Drinks',color:'green',signal:'Pairs with your Coke mix',score:92,sugar:'Original',description:'Crisp lemon-lime refreshment for your cooler and take-home shelves.'},
  {id:'fanta',name:'Fanta Orange',brand:'Fanta',category:'Soft Drinks',color:'orange',signal:'Flavor variety opportunity',score:85,sugar:'Original',description:'Bright orange flavor that adds variety to your beverage assortment.'},
  {id:'dasani',name:'DASANI',brand:'DASANI',category:'Water',color:'blue',signal:'Everyday replenishment',score:94,sugar:'Zero sugar',description:'Everyday bottled water for on-the-go customers and take-home occasions.'},
  {id:'smartwater',name:'smartwater',brand:'smartwater',category:'Water',color:'blue',signal:'Premium cooler opportunity',score:88,sugar:'Zero sugar',description:'A premium hydration option to round out your cold-vault assortment.'},
  {id:'powerade',name:'POWERADE Mountain Berry',brand:'POWERADE',category:'Sports & Energy',color:'blue',signal:'Warm-weather favorite',score:91,sugar:'Original',description:'Sports hydration for active shoppers, with single-serve and multipack options.'},
  {id:'powerade-zero',name:'POWERADE Zero',brand:'POWERADE',category:'Sports & Energy',color:'black',signal:'Zero-sugar expansion',score:86,sugar:'Zero sugar',description:'Expand your zero-sugar hydration mix with convenient cooler-ready formats.'},
  {id:'minute-maid',name:'Minute Maid Orange',brand:'Minute Maid',category:'Juice & Tea',color:'orange',signal:'Morning basket companion',score:87,sugar:'Original',description:'A familiar juice option for breakfast and grab-and-go occasions.'},
  {id:'gold-peak',name:'Gold Peak Sweet Tea',brand:'Gold Peak',category:'Juice & Tea',color:'amber',signal:'Regional taste favorite',score:90,sugar:'Original',description:'A tea assortment designed for midday breaks and meal occasions.'}
];
const catalogCategories=['All Products','Soft Drinks','Water','Sports & Energy','Juice & Tea'];
catalogProducts.forEach((p,i)=>{
  const soda=p.category==='Soft Drinks';
  const formats=soda?[[ '12 oz','Can',24,18,240],['20 oz','Bottle',24,24,180],['16.9 oz','Bottle',24,22,120],['2 liter','Bottle',8,16,60],['7.5 oz','Mini can',24,20,0]]:p.category==='Water'?[[ '16.9 oz','Bottle',24,12,300],['20 oz','Bottle',24,18,180],['1 liter','Bottle',12,21,90]]:p.category==='Sports & Energy'?[[ '28 oz','Bottle',12,18,160],['20 oz','Bottle',24,26,100],['12 oz','Bottle',24,22,0]]:[[ '12 oz','Bottle',24,24,140],['18.5 oz','Bottle',12,19,80],['59 oz','Bottle',8,25,30]];
  p.variants=formats.map(([size,format,pack,price,stock],v)=>({sku:`${p.id}-${v}`,size,format,pack,price:price+(i%3),stock, recommended:v===1?12:v===0?8:v===2?4:0}));
});
const commerceMoney=n=>new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(n);
function interpretSearch(query){
  const text=query.trim().toLowerCase();
  const scenarios=[
    [/festival|concert|street fair|block party|event|crowd/,'Festival-ready shelves','Plan for walk-up crowds: prioritize cold single-serve favorites, water for hydration, and zero-sugar choice. Start with a balanced mix; confirm attendance and cooler capacity with your agent.',['coke','zero','dasani','sprite','powerade']],
    [/heat|hot weather|summer|hydration|heatwave/,'Ready for warmer days','Lead with water and sports hydration, then round out the cooler with familiar soft drinks. These are illustrative suggestions, not a weather forecast.',['dasani','smartwater','powerade','powerade-zero','zero']],
    [/breakfast|morning|commut/,'Make the morning stop count','Offer grab-and-go juice, water and familiar refreshment for commuters.',['minute-maid','dasani','smartwater','coke']],
    [/new store|opening|open a store|starter/,'Your opening-store essentials','Build a balanced starting mix, then negotiate your opening-stock quote with the assortment and pricing agents.',['coke','zero','sprite','fanta','dasani']],
    [/zero sugar|sugar free|sugar-free|no sugar|healthy/,'More choice, less sugar','Explore zero-sugar soft drinks and hydration options. Check product details for nutritional information.',['zero','powerade-zero','dasani','smartwater']]
  ];
  const scenario=scenarios.find(([pattern])=>pattern.test(text));
  if(scenario)return {title:scenario[1],reason:scenario[2],products:scenario[3].map(id=>catalogProducts.find(p=>p.id===id)),intent:true};
  const terms=text.replace(/\bcoke\b/g,'coca cola').replace(/[^a-z0-9.\s]/g,' ').split(/\s+/).filter(t=>t&&!['show','me','find','some','please','want','need','buy','stock','up','on','the','a','i','for','my','bottles','products'].includes(t));
  const found=terms.length?catalogProducts.filter(p=>{const words=`${p.name} ${p.brand} ${p.category} ${p.sugar} ${p.variants.map(v=>`${v.size} ${v.format}`).join(' ')}`.toLowerCase().replace(/[^a-z0-9.\s]/g,' ');return terms.every(t=>words.includes(t));}):catalogProducts;
  return {title:text?'Your product matches':'What can we help you stock?',reason:text?'Matching sample products and pack formats. Try describing an occasion, such as a neighborhood festival or a heatwave.':'Describe your business need, or explore your locally inspired recommendations.',products:found,intent:false};
}
function productArt(p){return `<div class="catalog-art ${p.color}" aria-hidden="true"><div class="catalog-bottle"><span>${p.brand}</span><small>${p.sugar==='Zero sugar'?'ZERO SUGAR':'REFRESH YOUR DAY'}</small></div><div class="art-orbit"></div></div>`;}
function findSku(sku){for(const p of catalogProducts){const v=p.variants.find(v=>v.sku===sku);if(v)return {p,v};}return null;}
function readDemoCart(){try{const value=JSON.parse(localStorage.getItem('commerce-demo-cart')||'{}');return Object.fromEntries(Object.entries(value).filter(([sku,qty])=>{const item=findSku(sku);return item&&Number.isInteger(qty)&&qty>0&&qty<=Math.min(item.v.stock,999);}));}catch{return {};}}
function addDemoLines(lines){const cart=readDemoCart(),combined={};for(const {sku,qty} of lines){if(!Number.isInteger(qty)||qty<=0)throw new Error('Enter a positive whole number of cases.');combined[sku]=(combined[sku]||0)+qty;}for(const [sku,qty] of Object.entries(combined)){const item=findSku(sku);if(!item||qty+(cart[sku]||0)>Math.min(item.v.stock,999))throw new Error('Requested quantity exceeds available demo stock.');}for(const [sku,qty] of Object.entries(combined))cart[sku]=(cart[sku]||0)+qty;localStorage.setItem('commerce-demo-cart',JSON.stringify(cart));window.dispatchEvent(new Event('cart-updated'));}
