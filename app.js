(() => {
  'use strict';
  document.getElementById('year').textContent = new Date().getFullYear();
  const motionQuery = matchMedia('(prefers-reduced-motion: reduce)');
  if ('IntersectionObserver' in window && !motionQuery.matches) {
    document.body.classList.add('animate-ready');
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('in-view'); observer.unobserve(entry.target); }
    }), { threshold: 0.08 });
    document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
  }
  const cases = {
    budget: { label: 'ENTERPRISE / BUDGET CONTROL', title: 'A business rule that reaches the approval workflow.', tags: ['C# / .NET', 'JavaScript', 'Oracle PL/SQL'], problem: 'A purchase order needs to be checked against its BOQ budget before approval. An over-budget request also needs a legitimate way forward without bypassing the control.', approach: 'Connect budget checks to the transaction workflow, hold approval when the budget is exceeded, and provide a controlled revision path for authorized users. Keep revision history available for review.', decisions: ['Enforce the control behind the interface, so a hidden or disabled button is not the only protection.', 'Keep revision authority separate from ordinary approval activity.', 'Retain previous values and reasons so changes can be understood later.'], boundary: 'Enterprise work described at a functional level. The visual is a reconstruction; no customer records, financial amounts, internal code or private infrastructure are published.', link: null },
    postgres: { label: 'PERSONAL PROJECT / DATABASE PERFORMANCE', title: 'A performance claim you can inspect.', tags: ['PostgreSQL', 'Node.js', 'EXPLAIN ANALYZE'], problem: 'A query can be slow for very different reasons. Adding an index without understanding the execution plan can miss the actual problem.', approach: 'Build a repeatable lab with eight performance problems, their fixes, and generated before-and-after EXPLAIN ANALYZE evidence. Some cases use indexes; others change the query while retaining the same indexes.', decisions: ['Generate benchmark results from a harness instead of hand-writing performance figures.', 'Include query rewrites, date filtering, pagination and access-path choices.', 'Keep the environment and execution plans available so readers can reproduce the work.'], boundary: 'A personal benchmark project. Lab results are not claims about production speed improvements.', link: 'https://github.com/Hariharasudhan776/pg-perf-lab' },
    jobs: { label: 'PERSONAL PROJECT / FULL-STACK APPLICATION', title: 'Finding opportunities without inventing qualifications.', tags: ['Next.js', 'TypeScript', 'PostgreSQL', 'GitHub Actions'], problem: 'Job hunting involves repetitive collection and comparison, but a useful assistant must distinguish a genuine fit from a keyword match and keep generated claims honest.', approach: 'Collect postings, score them against a structured profile, explain relevant gaps, and prepare application documents using evidence from the candidate profile. Separate deterministic collection from optional document generation.', decisions: ['Keep visa sponsorship as yes, no or unknown rather than turning missing information into a promise.', 'Separate shared job data from individual profiles and application records.', 'Make matching explainable and restrict generated claims to supported evidence.'], boundary: 'Personal project. Job availability and employer requirements change; a match is a recommendation, not a hiring or visa guarantee.', link: 'https://github.com/Hariharasudhan776/eurojob-assistant' },
    stock: { label: 'ERP APPLICATION / DATA ACCESS', title: 'An answer is more useful when you can trace it.', tags: ['Python', 'Oracle', 'SQL', 'Tool-based interface'], problem: 'Stock questions often require navigating reports or understanding database structures. A natural-language interface should still show where its numbers came from.', approach: 'Use a tool-based interface to query Oracle stock information through a read-only layer, expose the generated SQL and result set, and respect the user’s ERP roles.', decisions: ['Make the query and results visible alongside the explanation.', 'Apply access and query restrictions below the language interface.', 'Keep company-specific schema knowledge and conversations out of public source.'], boundary: 'Described without exposing live stock, schema details or credentials. Current deployment and access depend on the organization’s environment.', link: null },
    pos: { label: 'RETAIL / DESKTOP APPLICATION', title: 'A connected workflow behind the checkout.', tags: ['Electron', 'Node.js', 'PostgreSQL'], problem: 'A point-of-sale interface connects checkout actions to inventory and business data. It needs to remain understandable while the underlying records stay consistent.', approach: 'Build desktop retail workflows with Electron and Node.js, backed by PostgreSQL. Work spans sales interactions, inventory, schemas, queries and deployment support.', decisions: ['Treat transaction correctness as part of the checkout experience.', 'Design schemas and indexes for the reports and workflows the product needs.', 'Consider failure cases and support needs alongside successful user actions.'], boundary: 'This case summarizes retail application experience and personal POS work. It does not imply that every feature exists in each version.', link: 'https://github.com/Hariharasudhan776/pos-desktop' }
  };
  const dialog = document.getElementById('case-dialog');
  const content = document.getElementById('case-content');
  let trigger;
  const text = (tag, value, className) => { const el = document.createElement(tag); el.textContent = value; if (className) el.className = className; return el; };
  document.querySelectorAll('[data-open]').forEach(button => button.addEventListener('click', () => {
    const item = cases[button.dataset.open]; if (!item) return;
    content.replaceChildren(); content.append(text('p', item.label, 'eyebrow'));
    const title = text('h2', item.title); title.id = 'case-title'; content.append(title);
    const tags = document.createElement('div'); tags.className = 'tags'; item.tags.forEach(tag => tags.append(text('span', tag))); content.append(tags);
    content.append(text('h3', 'The problem'), text('p', item.problem), text('h3', 'The approach'), text('p', item.approach), text('h3', 'Engineering decisions'));
    const list = document.createElement('ul'); item.decisions.forEach(decision => list.append(text('li', decision))); content.append(list, text('h3', 'Context & boundaries'), text('p', item.boundary));
    if (item.link) { const link = text('a', 'Explore the repository ↗', 'button primary'); link.href = item.link; link.target = '_blank'; link.rel = 'noopener'; content.append(link); }
    trigger = button; dialog.showModal(); document.body.style.overflow = 'hidden';
  }));
  const restore = () => { document.body.style.overflow = ''; trigger?.focus({ preventScroll: true }); };
  dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', restore);
  dialog.addEventListener('click', event => { if (event.target === dialog) { const rect = dialog.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close(); } });

  // A native-scroll film: each beat changes the composition, not the scroll behavior.
  const film = document.querySelector('.film');
  let storyProgress = 0, visualStoryProgress = 0, storyRedraw = () => {}, storyFrame = 0, activeBeat = 0;
  const beats = [
    {act:'ACT I',kicker:'UNDERSTAND THE PROBLEM',title:['First, a','real problem.'],description:'I’m Hariharasudhan. I build business software, starting with the people who need it and the problems worth solving.'},
    {act:'ACT II',kicker:'ENGINEER THE FOUNDATION',title:['Then, the','hard questions.'],description:'Who can change a budget? What happens when a transaction fails? I work through the rules, the data, and the exceptions.'},
    {act:'ACT III',kicker:'MAKE THE COMPLEXITY DISAPPEAR',title:['Make complexity','feel simple.'],description:'A clear interface is the visible part. Behind it: permissions, validation, queries, and the decisions that make a workflow usable.'},
    {act:'ACT IV',kicker:'FOLLOW THROUGH',title:['Build it.','Own the outcome.'],description:'From implementation and testing to documentation and support. Below are the projects, and the reasoning behind them.'}
  ];
  if (film) {
    const filmStage=film.querySelector('.film-stage'),filmText=film.querySelector('.film-text');
    function updateStory(){storyFrame=0;const box=film.getBoundingClientRect();storyProgress=motionQuery.matches?0:Math.max(0,Math.min(1,-box.top/Math.max(1,film.offsetHeight-innerHeight)));filmStage.style.setProperty('--film-progress',storyProgress.toFixed(4));const next=Math.min(3,Math.floor(storyProgress*4));if(next!==activeBeat){activeBeat=next;const beat=beats[next];film.querySelector('.film-act').textContent=beat.act;film.querySelector('.film-kicker').textContent=beat.kicker;const title=film.querySelector('.film-title');title.replaceChildren(document.createTextNode(beat.title[0]),document.createElement('br'),text('em',beat.title[1]));film.querySelector('.film-description').textContent=beat.description;film.querySelectorAll('.film-step').forEach((el,i)=>el.classList.toggle('active',i===next));if(!motionQuery.matches)filmText.animate([{opacity:.2,transform:'translateY(12px)'},{opacity:1,transform:'translateY(0)'}],{duration:650,easing:'cubic-bezier(.2,.7,.3,1)'});}storyRedraw();}
    const queueStory=()=>{if(!storyFrame)storyFrame=requestAnimationFrame(updateStory);};
    addEventListener('scroll',queueStory,{passive:true});addEventListener('resize',queueStory,{passive:true});motionQuery.addEventListener('change',queueStory);updateStory();
  }
  // A small original WebGL sculpture. No 3D downloads or framework runtime.
  const canvas = document.getElementById('sculpture');
  const control = document.getElementById('motion-toggle');
  const fallback = () => { canvas.hidden = true; document.querySelector('.scene-fallback').hidden = false; document.querySelector('.scene-state').textContent = 'STATIC STUDY'; control.hidden = true; document.querySelector('.drag-hint').textContent = 'SYSTEMS / STRUCTURE / CONNECTION'; };
  const gl = canvas.getContext('webgl', { alpha: true, antialias: true, powerPreference: 'low-power' });
  if (!gl) { fallback(); return; }
  let paused = motionQuery.matches, visible = true, frame = 0, last = 0, elapsed = 0, yaw = -.25, pitch = -.18, drag = false, lastX = 0, lastY = 0;
  const vertex = `attribute vec3 aPosition;attribute vec3 aNormal;uniform mat4 uModel;uniform mat4 uProjection;uniform mat4 uView;varying vec3 vNormal;varying vec3 vPosition;void main(){vec4 p=uModel*vec4(aPosition,1.0);vPosition=p.xyz;vNormal=mat3(uModel)*aNormal;gl_Position=uProjection*uView*p;}`;
  const fragment = `precision mediump float;varying vec3 vNormal;varying vec3 vPosition;uniform vec3 uColor;void main(){vec3 n=normalize(vNormal);vec3 light=normalize(vec3(-3.,5.,4.)-vPosition);vec3 eye=normalize(vec3(0.,0.,6.)-vPosition);float diffuse=max(dot(n,light),0.);float rim=pow(1.-max(dot(n,eye),0.),3.);float spec=pow(max(dot(n,normalize(light+eye)),0.),65.);vec3 c=uColor*(.36+.62*diffuse)+vec3(.78,.83,.68)*spec*.5+vec3(.24,.28,.18)*rim*.35;gl_FragColor=vec4(c,1.);}`;
  const shader = (type, source) => { const s = gl.createShader(type); gl.shaderSource(s, source); gl.compileShader(s); if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error('Sculpture shader unavailable'); return s; };
  let program;
  try { program = gl.createProgram(); gl.attachShader(program, shader(gl.VERTEX_SHADER, vertex)); gl.attachShader(program, shader(gl.FRAGMENT_SHADER, fragment)); gl.linkProgram(program); if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error('Sculpture program unavailable'); } catch { fallback(); return; }
  gl.useProgram(program); gl.enable(gl.DEPTH_TEST); gl.enable(gl.CULL_FACE); gl.clearColor(0,0,0,0);
  const identity = () => new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]);
  const multiply = (a,b) => { const out = new Float32Array(16); for(let c=0;c<4;c++) for(let r=0;r<4;r++) for(let k=0;k<4;k++) out[c*4+r]+=a[k*4+r]*b[c*4+k]; return out; };
  const rotateX = angle => { const m=identity(),c=Math.cos(angle),s=Math.sin(angle);m[5]=c;m[6]=s;m[9]=-s;m[10]=c;return m; };
  const rotateY = angle => { const m=identity(),c=Math.cos(angle),s=Math.sin(angle);m[0]=c;m[2]=-s;m[8]=s;m[10]=c;return m; };
  const rotateZ = angle => { const m=identity(),c=Math.cos(angle),s=Math.sin(angle);m[0]=c;m[1]=s;m[4]=-s;m[5]=c;return m; };
  const perspective = aspect => { const f=1/Math.tan(.65/2),near=.1,far=100;return new Float32Array([f/aspect,0,0,0,0,f,0,0,0,0,(far+near)/(near-far),-1,0,0,2*far*near/(near-far),0]); };
  const torus = (radius,tube) => {
    const positions=[],normals=[],segments=128,sides=20;
    const point=(i,j)=>{const u=i/segments*Math.PI*2,v=j/sides*Math.PI*2;return {p:[(radius+tube*Math.cos(v))*Math.cos(u),(radius+tube*Math.cos(v))*Math.sin(u),tube*Math.sin(v)],n:[Math.cos(v)*Math.cos(u),Math.cos(v)*Math.sin(u),Math.sin(v)]};};
    for(let i=0;i<segments;i++)for(let j=0;j<sides;j++){const a=point(i,j),b=point(i+1,j),c=point(i+1,j+1),d=point(i,j+1);for(const q of [a,b,c,a,c,d]){positions.push(...q.p);normals.push(...q.n);}}
    const p=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,p);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(positions),gl.STATIC_DRAW);const n=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,n);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(normals),gl.STATIC_DRAW);return {p,n,count:positions.length/3};
  };
  const rings=[{mesh:torus(1.35,.18),color:film?[.49,.57,.42]:[.19,.25,.18],x:.25,y:.25,z:-.28},{mesh:torus(1.10,.13),color:[.68,.83,.30],x:1.20,y:.75,z:.28},{mesh:torus(.84,.17),color:[.62,.27,.17],x:.55,y:1.35,z:-.1}];
  const locations={position:gl.getAttribLocation(program,'aPosition'),normal:gl.getAttribLocation(program,'aNormal'),model:gl.getUniformLocation(program,'uModel'),projection:gl.getUniformLocation(program,'uProjection'),view:gl.getUniformLocation(program,'uView'),color:gl.getUniformLocation(program,'uColor')};
  gl.enableVertexAttribArray(locations.position);gl.enableVertexAttribArray(locations.normal);
  const view=identity();view[14]=-5.85;view[13]=-.05;gl.uniformMatrix4fv(locations.view,false,view);
  function resize(){ const rect=canvas.getBoundingClientRect(),ratio=Math.min(devicePixelRatio||1,1.6);const w=Math.round(rect.width*ratio),h=Math.round(rect.height*ratio);if(canvas.width!==w||canvas.height!==h){canvas.width=w;canvas.height=h;const aspect=w/Math.max(h,1);gl.viewport(0,0,w,h);gl.uniformMatrix4fv(locations.projection,false,perspective(aspect));view[14]=-Math.max(5.85,1.68/(Math.tan(.325)*aspect)*1.08);gl.uniformMatrix4fv(locations.view,false,view);} }
  function draw(time){frame=0;resize();if(last && !paused)elapsed+=Math.min((time-last)/1000,.05);last=time;gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);const t=elapsed;visualStoryProgress=motionQuery.matches?storyProgress:visualStoryProgress+(storyProgress-visualStoryProgress)*.075;const progress=film?visualStoryProgress:0;const separation=Math.sin(progress*Math.PI)*.72;const root=multiply(rotateY(yaw+t*.055+progress*1.6),rotateX(pitch+progress*.35));rings.forEach((ring,i)=>{let model=multiply(root,multiply(rotateZ(ring.z+Math.sin(t*.14+i)*.12+progress*(i-1)*.4),multiply(rotateY(ring.y+Math.sin(t*.19+i)*.16),rotateX(ring.x+Math.cos(t*.15+i)*.13))));model[12]=(i-1)*separation*.45;model[13]=Math.sin(t*.35)*.045+.08+(i-1)*separation*.65;model[14]=(i-1)*separation*.3;gl.uniformMatrix4fv(locations.model,false,model);gl.uniform3fv(locations.color,ring.color);gl.bindBuffer(gl.ARRAY_BUFFER,ring.mesh.p);gl.vertexAttribPointer(locations.position,3,gl.FLOAT,false,0,0);gl.bindBuffer(gl.ARRAY_BUFFER,ring.mesh.n);gl.vertexAttribPointer(locations.normal,3,gl.FLOAT,false,0,0);gl.drawArrays(gl.TRIANGLES,0,ring.mesh.count);});if((!paused||Math.abs(storyProgress-visualStoryProgress)>.001) && visible && !document.hidden)frame=requestAnimationFrame(draw);}
  function requestDraw(){if(!frame){last=0;frame=requestAnimationFrame(draw);}}
  storyRedraw=requestDraw;
  function updateControl(){control.setAttribute('aria-pressed',String(paused));control.replaceChildren(document.createTextNode(paused?'Play motion ':'Pause motion '));const icon=document.createElement('span');icon.textContent=paused?'▷':'Ⅱ';control.append(icon);}
  control.addEventListener('click',()=>{paused=!paused;updateControl();requestDraw();});
  motionQuery.addEventListener('change',event=>{paused=event.matches;updateControl();requestDraw();});
  canvas.addEventListener('pointerdown',event=>{if(event.pointerType==='touch')return;drag=true;lastX=event.clientX;lastY=event.clientY;canvas.setPointerCapture(event.pointerId);});
  canvas.addEventListener('pointermove',event=>{if(!drag)return;yaw+=(event.clientX-lastX)*.008;pitch=Math.max(-1,Math.min(1,pitch+(event.clientY-lastY)*.006));lastX=event.clientX;lastY=event.clientY;requestDraw();});
  canvas.addEventListener('pointerup',()=>{drag=false;});canvas.addEventListener('pointercancel',()=>{drag=false;});
  canvas.addEventListener('keydown',event=>{if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(event.key))return;event.preventDefault();yaw+=event.key==='ArrowLeft'?-.14:event.key==='ArrowRight'?.14:0;pitch+=event.key==='ArrowUp'?-.14:event.key==='ArrowDown'?.14:0;requestDraw();});
  canvas.addEventListener('webglcontextlost',event=>{event.preventDefault();if(frame)cancelAnimationFrame(frame);frame=0;fallback();});
  if('IntersectionObserver'in window)new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible)requestDraw();else if(frame){cancelAnimationFrame(frame);frame=0;}},{rootMargin:'80px'}).observe(canvas);
  document.addEventListener('visibilitychange',()=>{if(document.hidden&&frame){cancelAnimationFrame(frame);frame=0;}else if(visible)requestDraw();});
  addEventListener('resize',requestDraw,{passive:true});updateControl();requestDraw();
})();
