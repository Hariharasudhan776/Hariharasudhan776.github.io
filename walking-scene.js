import * as THREE from './assets/three.module.min.js';

// Procedural articulated avatar: each leg has a hip, knee and ankle pivot.
// The portrait remains available when WebGL cannot be initialized.
const canvas = document.querySelector('#developer-scene');
try {
  const renderer = new THREE.WebGLRenderer({canvas, alpha:true, antialias:true, powerPreference:'low-power'});
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.6));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.45;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(29, 1, .1, 40);
  camera.position.set(0, 2.5, 10.3); camera.lookAt(0, 1.8, 0);
  scene.add(new THREE.HemisphereLight(0xdce8ff, 0x6d5128, 2.8));
  const key = new THREE.DirectionalLight(0xffe7bb, 4); key.position.set(-3,6,5); scene.add(key);
  const rim = new THREE.DirectionalLight(0xc4d5ff, 3); rim.position.set(3,4,-3); scene.add(rim);
  const gold = new THREE.PointLight(0xe6ba56, 13, 10); gold.position.set(2,1.2,1); scene.add(gold);
  const material = (color, roughness=.6, metalness=0) => new THREE.MeshStandardMaterial({color,roughness,metalness});
  const navy=material(0x182338), navyLight=material(0x24334b), skin=material(0xb47c59), hair=material(0x211b1b), white=material(0xe9e5dc), shoe=material(0x17191d,.28), brass=material(0xc9ab5c,.28,.7);
  const sphere = new THREE.SphereGeometry(1,24,18);
  const limb = new THREE.CapsuleGeometry(1,1,6,16);
  function ellipsoid(parent,mat,position,scale,geo=sphere){const mesh=new THREE.Mesh(geo,mat);mesh.position.set(...position);mesh.scale.set(...scale);parent.add(mesh);return mesh;}
  function segment(parent,mat,length,radius){return ellipsoid(parent,mat,[0,-length/2,0],[radius,length/3,radius],limb);}
  const avatar=new THREE.Group();scene.add(avatar);avatar.rotation.y=-.22;
  const pelvis=new THREE.Group();pelvis.position.y=1.62;avatar.add(pelvis);
  ellipsoid(pelvis,navy,[0,0,0],[.34,.26,.23]);
  const torso=new THREE.Group();torso.position.y=.22;pelvis.add(torso);
  ellipsoid(torso,navyLight,[0,.38,0],[.46,.57,.25]);
  ellipsoid(torso,white,[0,.58,.223],[.17,.34,.045]);
  const leftLapel=ellipsoid(torso,navy,[.155,.58,.263],[.065,.32,.035]);leftLapel.rotation.z=-.32;
  const rightLapel=ellipsoid(torso,navy,[-.155,.58,.263],[.065,.32,.035]);rightLapel.rotation.z=.32;
  for(const y of [.17,.30])ellipsoid(torso,brass,[.03,y,.265],[.025,.025,.016]);
  const head=new THREE.Group();head.position.set(0,1.1,0);torso.add(head);
  ellipsoid(head,skin,[0,.12,0],[.34,.43,.30]);
  ellipsoid(head,skin,[0,-.27,0],[.13,.19,.14]);
  ellipsoid(head,hair,[0,-.04,.12],[.31,.27,.23]);
  ellipsoid(head,skin,[0,.13,.24],[.255,.235,.11]);
  ellipsoid(head,skin,[0,.06,.34],[.065,.095,.07]);
  for(const side of [-1,1]){
    ellipsoid(head,skin,[side*.33,.1,0],[.065,.11,.05]);
    ellipsoid(head,white,[side*.126,.215,.323],[.072,.035,.015]);
    ellipsoid(head,hair,[side*.126,.215,.338],[.025,.027,.009]);
    const brow=ellipsoid(head,hair,[side*.125,.285,.31],[.085,.018,.02]);brow.rotation.z=side*-.10;
  }
  ellipsoid(head,hair,[0,.008,.344],[.13,.026,.014]);
  for(let i=0;i<21;i++){
    const a=i*2.39996,r=.25*Math.sqrt((i+.5)/21);
    ellipsoid(head,hair,[Math.cos(a)*r,.43+(.11-r*.2),Math.sin(a)*r*.74],[.105,.11,.105]);
  }
  const arms=[],legs=[];
  for(const side of [-1,1]){
    const arm=new THREE.Group();arm.position.set(side*.43,.73,0);torso.add(arm);arm.rotation.z=side*.11;
    segment(arm,navyLight,.53,.12);
    const elbow=new THREE.Group();elbow.position.y=-.53;arm.add(elbow);segment(elbow,navy,.47,.10);
    ellipsoid(elbow,white,[0,-.45,0],[.105,.055,.105]);ellipsoid(elbow,skin,[0,-.56,0],[.105,.15,.09]);
    arms.push({arm,elbow,side});
    const hip=new THREE.Group();hip.position.set(side*.19,-.05,0);pelvis.add(hip);segment(hip,navy,.72,.145);
    const knee=new THREE.Group();knee.position.y=-.72;hip.add(knee);segment(knee,navyLight,.68,.115);
    const ankle=new THREE.Group();ankle.position.y=-.69;knee.add(ankle);ellipsoid(ankle,shoe,[0,-.03,.115],[.145,.115,.27]);
    legs.push({hip,knee,ankle,side});
  }
  const platform=new THREE.Mesh(new THREE.CylinderGeometry(1.16,1.25,.055,80),material(0x1d2028,.4,.4));platform.position.y=.05;scene.add(platform);
  const ring=new THREE.Mesh(new THREE.TorusGeometry(1.17,.009,8,96),brass);ring.rotation.x=Math.PI/2;ring.position.y=.09;scene.add(ring);
  const shadowCanvas=document.createElement('canvas');shadowCanvas.width=128;shadowCanvas.height=128;
  const ctx=shadowCanvas.getContext('2d'),gradient=ctx.createRadialGradient(64,64,1,64,64,64);gradient.addColorStop(0,'#000a');gradient.addColorStop(1,'#0000');ctx.fillStyle=gradient;ctx.fillRect(0,0,128,128);
  const shadow=new THREE.Mesh(new THREE.PlaneGeometry(1.5,1.1),new THREE.MeshBasicMaterial({map:new THREE.CanvasTexture(shadowCanvas),transparent:true,depthWrite:false}));shadow.rotation.x=-Math.PI/2;shadow.position.y=.084;scene.add(shadow);
  const media=matchMedia('(prefers-reduced-motion: reduce)');
  let visible=true,frame=0,last=0,time=0,paused=false;
  const resize=()=>{const rect=canvas.getBoundingClientRect();if(!rect.width||!rect.height)return;renderer.setSize(rect.width,rect.height,false);camera.aspect=rect.width/rect.height;camera.updateProjectionMatrix();};
  new ResizeObserver(resize).observe(canvas);resize();
  function pose(t){
    const p=t*3.3;
    pelvis.position.y=1.69+Math.cos(p*2)*.035;pelvis.rotation.y=Math.sin(p)*.035;
    torso.rotation.y=-Math.sin(p)*.05;torso.rotation.z=Math.cos(p)*.017;
    head.rotation.y=Math.sin(t*.5)*.10;head.rotation.z=-torso.rotation.z;
    legs.forEach(({hip,knee,ankle,side})=>{const phase=p+(side===1?Math.PI:0);hip.rotation.x=Math.sin(phase)*.44;knee.rotation.x=Math.max(0,-Math.sin(phase))*.76;ankle.rotation.x=-hip.rotation.x*.35-knee.rotation.x*.4;});
    arms.forEach(({arm,elbow,side})=>{const phase=p+(side===1?Math.PI:0);arm.rotation.x=-Math.sin(phase)*.34;elbow.rotation.x=-.16-Math.max(0,Math.sin(phase))*.18;});
  }
  function draw(now){frame=0;const dt=Math.min(.05,(now-last)/1000||0);last=now;if(!paused&&!media.matches)time+=dt;pose(time);renderer.render(scene,camera);if(visible&&!paused&&!media.matches&&!document.hidden)frame=requestAnimationFrame(draw);}
  function start(){if(!frame&&visible&&!document.hidden){last=performance.now();frame=requestAnimationFrame(draw);}}
  const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible)start();else{cancelAnimationFrame(frame);frame=0;}});observer.observe(canvas);
  const stateObserver=new MutationObserver(()=>{paused=document.body.classList.contains('pause-motion');if(paused){cancelAnimationFrame(frame);frame=0;}else start();});stateObserver.observe(document.body,{attributes:true,attributeFilter:['class']});
  media.addEventListener('change',()=>{cancelAnimationFrame(frame);frame=0;start();});
  document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(frame);frame=0;}else start();});
  canvas.addEventListener('webglcontextlost',()=>{cancelAnimationFrame(frame);document.body.classList.remove('has-avatar');});
  renderer.render(scene,camera);document.body.classList.add('has-avatar');start();
} catch(error) { console.info('3D character unavailable; showing portrait.', error.message); }
