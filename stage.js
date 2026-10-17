(() => {
  'use strict';
  document.getElementById('year').textContent = new Date().getFullYear();
  const motionQuery = matchMedia('(prefers-reduced-motion: reduce)');
  if ('IntersectionObserver' in window && !motionQuery.matches) {
    document.body.classList.add('motion-ready');
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
  Object.assign(cases, {"android": {"label": "MOBILE / ENTERPRISE", "title": "Android Erp Access", "tags": ["Java / Android", "C# / ASP.NET", "HTML / CSS / JS"], "problem": "Access operational workflows from a phone without recreating the entire ERP as a separate native application.", "approach": "Build a Java WebView shell around mobile-friendly ERP pages, with C# / ASP.NET services for device registration and activation.", "decisions": ["Keep mobile access connected to the existing business system.", "Design pages around touch, readable forms and smaller screens.", "Treat device activation and access checks as application behavior."], "boundary": "Enterprise work summarized at a functional level. No private code, financial records, customer data or internal infrastructure are published. Features and deployment vary by module.", "link": null}, "reports": {"label": "DATA / COST & MANAGEMENT REPORTING", "title": "Cost & Business Intelligence", "tags": ["SQL / PL/SQL", "ASP.NET", "JavaScript", "Power BI"], "problem": "Teams need a usable view of costs and business performance across data maintained by different workflows.", "approach": "Build cost reporting and department-specific analytical views; investigate the underlying costing rules and data quality when totals need explanation.", "decisions": ["Keep cost, sales, profit and income definitions explicit in each report.", "Trace reported totals to source transactions and filtering rules.", "Investigate costing and data-quality issues before interpreting a chart."], "boundary": "Enterprise work summarized at a functional level. No private code, financial records, customer data or internal infrastructure are published. Features and deployment vary by module.", "link": null}, "departments": {"label": "OPERATIONS / DEPARTMENT DASHBOARDS", "title": "One Business. Many Lenses.", "tags": ["C# / ASP.NET", "Oracle", "JavaScript"], "problem": "A generic dashboard does not answer the different questions asked by finance, quality, safety and project teams.", "approach": "Create department-oriented dashboard views with relevant filters, reporting context and access controls. QA/QC and HSE work sit alongside finance, purchase, HR and QS reporting.", "decisions": ["Shape the view around the department\u2019s operational questions.", "Apply existing access boundaries to underlying data.", "Make selected dates, filters and reporting context visible."], "boundary": "Enterprise work summarized at a functional level. No private code, financial records, customer data or internal infrastructure are published. Features and deployment vary by module.", "link": null}, "notifications": {"label": "WORKFLOW / APPROVAL NOTIFICATIONS", "title": "Approvals That Reach People.", "tags": ["C# / .NET", "Python", "HTML email"], "problem": "Approvers need enough context to understand a material request and return to the ERP to act.", "approach": "Build an approval notification service, following a Python prototype, with role-based recipients and requisition details in the message.", "decisions": ["Keep the ERP as the place where approval actions are recorded.", "Support variable item counts and different mail-client layouts.", "Show the current approval context and relevant request details."], "boundary": "Enterprise work summarized at a functional level. No private code, financial records, customer data or internal infrastructure are published. Features and deployment vary by module.", "link": null}, "credit": {"label": "BUSINESS RULES / CUSTOMER CREDIT", "title": "Credit Controls In The Flow.", "tags": ["Oracle PL/SQL", "ERP workflows"], "problem": "Credit rules need to apply consistently as customer transactions move through the business.", "approach": "Connect database checks and ERP workflows to credit limits, transaction conditions and exception approvals.", "decisions": ["Enforce business checks beyond the visual interface.", "Keep ordinary processing separate from exception authority.", "Make the reason for a held transaction understandable."], "boundary": "Enterprise work summarized at a functional level. No private code, financial records, customer data or internal infrastructure are published. Features and deployment vary by module.", "link": null}, "government": {"label": "ENTERPRISE / PREVIOUS EXPERIENCE", "title": "Government Workflow Systems", "tags": ["Enterprise applications", "SQL", "Reporting"], "problem": "Administrative teams need structured workflows to monitor commitments, projects and decisions.", "approach": "Contribute application modules, database reporting, onboarding data loads and support for government workflow systems.", "decisions": ["Translate operational requirements into forms and workflow states.", "Align reports with the underlying records.", "Support deployment, maintenance and changing client requirements."], "boundary": "Enterprise work summarized at a functional level. No private code, financial records, customer data or internal infrastructure are published. Features and deployment vary by module.", "link": null}});
  const dialog = document.getElementById('case-dialog');
  const content = document.getElementById('case-content');
  let trigger, expandedCard, closing = false;
  const text = (tag, value, className) => { const el = document.createElement(tag); el.textContent = value; if (className) el.className = className; return el; };
  document.querySelectorAll('[data-open]').forEach(button => button.addEventListener('click', () => {
    const item = cases[button.dataset.open]; if (!item) return;
    content.replaceChildren();
    expandedCard=button.closest('.bento-card');
    dialog.classList.toggle('bento-expanded',Boolean(expandedCard));
    if(expandedCard){const visual=expandedCard.querySelector('.bento-visual').cloneNode(true);visual.classList.add('bento-dialog-visual');content.append(visual);}
    content.append(text('p', item.label, 'eyebrow'));
    const title = text('h2', item.title); title.id = 'case-title'; content.append(title);
    const tags = document.createElement('div'); tags.className = 'tags'; item.tags.forEach(tag => tags.append(text('span', tag))); content.append(tags);
    content.append(text('h3', 'The problem'), text('p', item.problem), text('h3', 'The approach'), text('p', item.approach), text('h3', 'Engineering decisions'));
    const list = document.createElement('ul'); item.decisions.forEach(decision => list.append(text('li', decision))); content.append(list, text('h3', 'Context & boundaries'), text('p', item.boundary));
    if (item.link) { const link = text('a', 'Explore the repository ↗', 'button primary'); link.href = item.link; link.target = '_blank'; link.rel = 'noopener'; content.append(link); }
    trigger = button; button.setAttribute('aria-expanded','true'); dialog.showModal(); document.body.style.overflow = 'hidden';
    if(expandedCard&&!motionQuery.matches&&!document.body.classList.contains('pause-motion')){
      const from=expandedCard.getBoundingClientRect(), to=dialog.getBoundingClientRect();
      dialog.animate([{transform:`translate(${from.left+from.width/2-to.left-to.width/2}px,${from.top+from.height/2-to.top-to.height/2}px) scale(${from.width/to.width},${from.height/to.height})`,opacity:.5},{transform:'none',opacity:1}],{duration:480,easing:'cubic-bezier(.2,.8,.2,1)'});
    }
  }));
  const restore = () => { document.body.style.overflow = ''; trigger?.setAttribute('aria-expanded','false'); trigger?.focus({ preventScroll: true }); dialog.classList.remove('bento-expanded'); expandedCard=null; closing=false; };
  async function closeCase(){
    if(closing||!dialog.open)return; closing=true;
    if(expandedCard&&!motionQuery.matches&&!document.body.classList.contains('pause-motion')){
      const from=dialog.getBoundingClientRect(),to=expandedCard.getBoundingClientRect();
      try{await dialog.animate([{transform:'none',opacity:1},{transform:`translate(${to.left+to.width/2-from.left-from.width/2}px,${to.top+to.height/2-from.top-from.height/2}px) scale(${to.width/from.width},${to.height/from.height})`,opacity:0}],{duration:260,easing:'cubic-bezier(.4,0,1,1)'}).finished;}catch{}
    }
    dialog.close();
  }
  dialog.querySelector('.dialog-close').addEventListener('click',closeCase);
  dialog.addEventListener('cancel',event=>{event.preventDefault();closeCase();});
  dialog.addEventListener('close',restore);
  dialog.addEventListener('click', event => { if(event.target===dialog){const rect=dialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)closeCase();} });


  // Small, bounded motion tied to the actual page rather than an endless render loop.
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const motionButton=document.getElementById('motion-toggle');
  let motionPaused=false;
  if(motionButton){motionButton.addEventListener('click',()=>{motionPaused=!motionPaused;document.body.classList.toggle('pause-motion',motionPaused);motionButton.setAttribute('aria-pressed',String(motionPaused));motionButton.textContent=motionPaused?'PLAY MOTION ▷':'PAUSE MOTION Ⅱ';queue();});}
  const stage = document.querySelector('.portrait-stage');
  const opening = document.querySelector('.opening');
  const cards = [...document.querySelectorAll('.project-card')];
  const career = document.querySelector('.career-line');
  let scrollFrame = 0;
  function updatePosition() {
    scrollFrame = 0;
    const range = Math.max(1, document.documentElement.scrollHeight - innerHeight);
    document.documentElement.style.setProperty('--reading', String(scrollY/range));
    if (career) {
      const r = career.getBoundingClientRect();
      career.style.setProperty('--career-progress', String(Math.max(0,Math.min(1,(innerHeight*.75-r.top)/Math.max(1,r.height)))));
    }
    if (!reduced.matches && !motionPaused && innerWidth > 720) {
      cards.forEach((card,index) => {
        const next=cards[index+1];
        const overlap=next ? Math.max(0,Math.min(1,(innerHeight*.78-next.getBoundingClientRect().top)/(innerHeight*.62))) : 0;
        card.style.transform=`scale(${1-overlap*.035})`;
        card.style.filter="";
      });
    } else cards.forEach(card=>{card.style.transform='';card.style.filter='';});
  }
  const queue = () => { if(!scrollFrame)scrollFrame=requestAnimationFrame(updatePosition); };
  addEventListener('scroll',queue,{passive:true});
  addEventListener('resize',queue,{passive:true});
  reduced.addEventListener('change',queue);
  updatePosition();
  if(opening && stage) {
    opening.addEventListener('pointermove',event=>{
      if(reduced.matches||motionPaused||event.pointerType==='touch')return;
      const r=opening.getBoundingClientRect();
      stage.style.setProperty('--px',String((event.clientX-r.left)/r.width*2-1));
      stage.style.setProperty('--py',String((event.clientY-r.top)/r.height*2-1));
    },{passive:true});
    opening.addEventListener('pointerleave',()=>{stage.style.setProperty('--px','0');stage.style.setProperty('--py','0');});
  }
  cards.forEach(card=>card.addEventListener('pointermove',event=>{
    if(reduced.matches||motionPaused||event.pointerType==='touch')return;
    const r=card.getBoundingClientRect();card.style.setProperty('--cx',`${(event.clientX-r.left)/r.width*100}%`);card.style.setProperty('--cy',`${(event.clientY-r.top)/r.height*100}%`);
  },{passive:true}));
  document.querySelectorAll('.mobile-menu a').forEach(link=>link.addEventListener('click',()=>{const menu=link.closest('details');if(menu)menu.open=false;}));
})();

document.getElementById('copy-portfolio')?.addEventListener('click', async () => {
  const button=document.getElementById('copy-portfolio'), status=document.getElementById('copy-status');
  try { await navigator.clipboard.writeText('https://hariharasudhan776.github.io/'); button.textContent='LINK COPIED ✓'; status.textContent='Personal portfolio link copied.'; }
  catch { status.textContent='Copy this address: https://hariharasudhan776.github.io/'; }
});
