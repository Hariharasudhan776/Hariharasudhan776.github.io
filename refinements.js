(() => {
  'use strict';
  const carousel=document.querySelector('.company-carousel');
  if(carousel){
    const cylinder=carousel.querySelector('.company-cylinder');
    const cards=[...cylinder.children], status=carousel.querySelector('.career-status');
    let turn=0;
    cards.forEach((card,i)=>card.style.setProperty('--angle',`${i*90}deg`));
    function render(){
      const current=((turn%cards.length)+cards.length)%cards.length;
      cylinder.style.setProperty('--turn',`${-turn*90}deg`);
      cards.forEach((card,i)=>{card.classList.toggle('is-current',i===current);card.inert=i!==current;card.setAttribute('aria-hidden',String(i!==current));});
      status.textContent=`0${current+1} / 0${cards.length} · ${cards[current].querySelector('.company-date').textContent}`;
    }
    carousel.classList.add('is-enhanced');
    carousel.querySelector('.carousel-controls').hidden=false;
    carousel.querySelector('[data-career-prev]').addEventListener('click',()=>{turn--;render();});
    carousel.querySelector('[data-career-next]').addEventListener('click',()=>{turn++;render();});
    carousel.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();turn+=e.key==='ArrowRight'?1:-1;render();}});
    let start=null;
    const viewport=carousel.querySelector('.cylinder-window');
    viewport.addEventListener('pointerdown',e=>{if(e.pointerType==='touch')start={x:e.clientX,y:e.clientY};},{passive:true});
    viewport.addEventListener('pointerup',e=>{if(!start)return;const dx=e.clientX-start.x,dy=e.clientY-start.y;if(Math.abs(dx)>45&&Math.abs(dx)>Math.abs(dy)){turn+=dx<0?1:-1;render();}start=null;},{passive:true});
    viewport.addEventListener('pointercancel',()=>start=null);
    render();
  }
  const film=document.querySelector('.scroll-film'), solar=document.querySelector('.solar-scene');
  const reduce=matchMedia('(prefers-reduced-motion: reduce)');
  let frame=0;
  function update(){
    frame=0;
    if(!film)return;
    const rect=film.getBoundingClientRect();
    const progress=reduce.matches||document.body.classList.contains('pause-motion')?1:Math.max(0,Math.min(1,(innerHeight-rect.top)/(innerHeight*.75)));
    film.style.setProperty('--film-progress',String(progress));
  }
  function queue(){if(!frame)frame=requestAnimationFrame(update);}
  addEventListener('scroll',queue,{passive:true});addEventListener('resize',queue,{passive:true});reduce.addEventListener('change',queue);
  document.getElementById('motion-toggle')?.addEventListener('click',queue);update();
  if(solar&&'IntersectionObserver' in window){
    let onScreen=false;
    function sync(){solar.querySelectorAll('.orbit-path').forEach(node=>node.style.animationPlayState=onScreen&&!document.hidden?'':'paused');}
    new IntersectionObserver(entries=>{onScreen=entries[0].isIntersecting;sync();}).observe(solar);
    document.addEventListener('visibilitychange',sync);
  }
})();
