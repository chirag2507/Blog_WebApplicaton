document.addEventListener('DOMContentLoaded', ()=>{
  if(typeof gsap === 'undefined') return;
  gsap.registerPlugin && gsap.registerPlugin();

  // Entrance
  const tl = gsap.timeline();
  tl.from('.eyebrow',{y:8,opacity:0,duration:0.36})
    .from('.landing-title',{y:28,opacity:0,duration:0.9,ease:'power3.out'})
    .from('.landing-sub',{y:16,opacity:0,duration:0.6},'-=0.5')
    .from('.landing-ctas .btn',{y:10,opacity:0,stagger:0.08,duration:0.4},'-=0.42')
    .from('.hero-right .card-visual',{scale:0.98,opacity:0,duration:0.9},'-=0.8');

  // Blobs subtle float
  gsap.to('.blob-1',{y:20,x:12,rotation:6,duration:8,repeat:-1,yoyo:true,ease:'sine.inOut'});
  gsap.to('.blob-2',{y:-18,x:-18,rotation:-8,duration:10,repeat:-1,yoyo:true,ease:'sine.inOut',delay:0.6});
  gsap.to('.blob-3',{y:14,x:6,rotation:4,duration:12,repeat:-1,yoyo:true,ease:'sine.inOut',delay:0.9});

  // Scroll-triggered blob and globe motion
  if (gsap.ScrollTrigger) {
    gsap.to('.blob-1', {
      y: -60,
      x: -20,
      scale: 1.05,
      ease: 'none',
      scrollTrigger: { trigger: '.landing-features', start: 'top bottom', end: 'bottom top', scrub: 0.8 }
    });

    gsap.to('.blob-2', {
      y: 80,
      x: 30,
      scale: 1.08,
      ease: 'none',
      scrollTrigger: { trigger: '#authors', start: 'top bottom', end: 'bottom top', scrub: 0.9 }
    });

    gsap.to('.globe', {
      rotation: 360,
      scale: 1.08,
      ease: 'none',
      scrollTrigger: { trigger: '#tags', start: 'top bottom', end: 'bottom top', scrub: 1 }
    });

    // reveal authors and tags
    gsap.utils.toArray('.author-card').forEach((el, i) => {
      gsap.from(el, { y: 20, opacity: 0, duration: 0.6, delay: i * 0.06, scrollTrigger: { trigger: el, start: 'top 92%' } });
    });
    gsap.from('.tag-cloud', { y: 12, opacity: 0, duration: 0.6, scrollTrigger: { trigger: '.tag-cloud', start: 'top 92%' } });
  }

  // sliding phrases animation (left-to-right loop)
  const phrases = document.querySelectorAll('.sliding-phrases .phrase');
  if (phrases && phrases.length){
    const wrap = document.querySelector('.sliding-phrases');
    // duplicate nodes to create infinite loop feel
    phrases.forEach(p => wrap.appendChild(p.cloneNode(true)));
    gsap.to('.sliding-phrases', { xPercent: -50, duration: 12, ease: 'none', repeat: -1 });
  }

  // loader: hide after entrance
  const loader = document.getElementById('pageLoader');
  if (loader){
    gsap.to(loader, { opacity: 0, y: -20, duration: 0.6, delay: 0.6, onComplete: ()=> loader.remove() });
  }

  // CTA hover micro
  document.querySelectorAll('.btn.primary').forEach(b=>{
    b.addEventListener('mouseenter',()=>gsap.to(b,{scale:1.02,duration:0.12}))
    b.addEventListener('mouseleave',()=>gsap.to(b,{scale:1,duration:0.12}))
  });

  // scroll reveal for features
  if(gsap.ScrollTrigger){
    gsap.utils.toArray('.feature').forEach((el,i)=>{
      gsap.from(el,{y:18,opacity:0,duration:0.6,delay:i*0.08,scrollTrigger:{trigger:el,start:'top 88%'}})
    })
  }
});
