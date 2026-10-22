// Preview the real responsive document in a narrow viewport, without recursive frames.
if(window.self===window.top){
  const style=document.createElement('link');style.rel='stylesheet';style.href='device-preview.css?v=7';document.head.append(style);
  const switcher=document.createElement('div');switcher.className='device-switcher';switcher.setAttribute('role','group');switcher.setAttribute('aria-label','Device preview');
  const svg=path=>`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">${path}</svg>`;
  switcher.innerHTML=`<button aria-label="Desktop layout" title="Desktop layout" aria-pressed="true">${svg('<rect x="3" y="3" width="18" height="13" rx="2"/><path d="M12 16v5M7 21h10"/>')}</button><button aria-label="Mobile layout" title="Mobile layout" aria-pressed="false">${svg('<rect x="6" y="2" width="12" height="20" rx="3"/><path d="M10 18h4"/>')}</button>`;
  const overlay=document.createElement('section');overlay.className='device-preview-overlay';overlay.hidden=true;overlay.setAttribute('aria-label','Mobile device preview');
  const frame=document.createElement('iframe');frame.title='Mobile storefront preview';overlay.append(frame);
  const buttons=switcher.querySelectorAll('button');
  buttons[1].addEventListener('click',()=>{if(!frame.getAttribute('src'))frame.src=location.href;overlay.hidden=false;document.body.classList.add('previewing-mobile');[...document.body.children].filter(el=>el!==overlay&&el!==switcher&&el.tagName!=='SCRIPT').forEach(el=>el.inert=true);buttons[0].setAttribute('aria-pressed','false');buttons[1].setAttribute('aria-pressed','true');});
  buttons[0].addEventListener('click',()=>{overlay.hidden=true;document.body.classList.remove('previewing-mobile');[...document.body.children].forEach(el=>el.inert=false);buttons[0].setAttribute('aria-pressed','true');buttons[1].setAttribute('aria-pressed','false');});
  document.body.append(overlay,switcher);
}
