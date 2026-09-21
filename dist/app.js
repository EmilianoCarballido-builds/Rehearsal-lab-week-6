const gate = document.querySelector('#gate');
const gateForm = document.querySelector('#gateForm');
const previewButton = document.querySelector('#previewButton');
const previewPanel = document.querySelector('#previewPanel');
const exitDialog = document.querySelector('#exitDialog');
const lab = document.querySelector('#lab');
const debrief = document.querySelector('#debrief');
let state = {mode:'simulation',moment:0,startedAt:0,promptUsed:false,records:[],path:'standard',muted:false,reduced:false};

const moments = [
  {
    phase:'Initial cue',
    title:'The floor begins to move',
    scene:'You are in a fictional campus corridor. A low rumble begins. A sturdy desk is within three steps; the exit is farther away.',
    support:'Focus on the first protective action while movement is happening.',
    actions:[
      {id:'protect',label:'Drop, cover, and hold near the desk',evidence:'Protective action during movement',weight:2},
      {id:'exit',label:'Run toward the exit immediately',evidence:'Movement toward exit during shaking',weight:-2},
      {id:'observe',label:'Wait to see what others do',evidence:'Delayed protective action',weight:-1}
    ]
  },
  {
    phase:'Changed condition',
    title:'Your usual route is blocked',
    scene:'The movement has stopped. A fallen cabinet blocks the familiar hallway. A marked alternate route is visible behind you.',
    support:'Reassess the environment. Do not assume the memorized route is still usable.',
    actions:[
      {id:'alternate',label:'Check hazards, then use the alternate route',evidence:'Route adapted to changed cue',weight:2},
      {id:'usual',label:'Climb past the cabinet on the usual route',evidence:'Unsafe attachment to memorized route',weight:-2},
      {id:'freeze',label:'Stay still and wait for someone to lead',evidence:'Coordination delayed',weight:-1}
    ]
  },
  {
    phase:'Coordination',
    title:'A colleague asks for help',
    scene:'At the assembly area, a colleague says someone may still be inside. The fictional building has not been cleared for re-entry.',
    support:'Your role is to coordinate without creating a second emergency.',
    actions:[
      {id:'report',label:'Report the last known location to the brigade lead',evidence:'Information escalated without re-entry',weight:2},
      {id:'reenter',label:'Go back inside to search alone',evidence:'Uncleared re-entry attempted',weight:-2},
      {id:'broadcast',label:'Post an unverified warning to everyone',evidence:'Unverified information broadcast',weight:-1}
    ]
  }
];

function gateReady(){
  const data = new FormData(gateForm);
  previewButton.disabled = !(data.get('trauma') && data.get('mode') && document.querySelector('#consent').checked);
}

gateForm.addEventListener('change', gateReady);
gateForm.addEventListener('submit', event => {
  event.preventDefault();
  gate.classList.add('hidden');
  previewPanel.classList.remove('hidden');
  previewPanel.focus();
});
document.querySelector('#backToGate').addEventListener('click',()=>{previewPanel.classList.add('hidden');gate.classList.remove('hidden')});
document.querySelector('#globalExit').addEventListener('click',()=>exitDialog.showModal());
document.querySelector('#stayButton').addEventListener('click',()=>exitDialog.close());
document.querySelector('#confirmExit').addEventListener('click',()=>{sessionStorage.removeItem('rehearsalLab');location.reload()});
document.querySelector('#startRehearsal').addEventListener('click',()=>{
  state.mode = new FormData(gateForm).get('mode');
  state.reduced = matchMedia('(prefers-reduced-motion: reduce)').matches || state.mode === 'non-vr';
  previewPanel.classList.add('hidden');
  lab.classList.remove('hidden');
  renderMoment();
});

function renderMoment(){
  const item=moments[state.moment];
  state.startedAt=performance.now(); state.promptUsed=false;
  lab.innerHTML=`
    <div class="lab-head"><div><p class="eyebrow">Moment ${state.moment+1} of ${moments.length} · ${item.phase}</p><h2>${item.title}</h2></div><div class="timer" aria-label="Elapsed decision time"><small>Elapsed</small><strong id="timer">00:00</strong></div></div>
    <div class="simulation-grid ${state.mode==='non-vr'?'text-mode':''}">
      <div class="scene ${state.reduced?'reduced':''}" role="img" aria-label="Fictional campus corridor simulation">
        <div class="scene-shade"></div><div class="scene-copy"><span>FICTIONAL VIDEO-SIM</span><p>${item.scene}</p></div>
      </div>
      <aside class="decision-panel">
        <div class="model-note">Prototype adaptive logic - not trained ML</div>
        <h3>Choose your next action</h3>
        <div class="action-list">${item.actions.map(a=>`<button class="action" data-action="${a.id}" type="button"><span>${a.label}</span><b>Choose</b></button>`).join('')}</div>
        <button class="hint" id="hintButton" type="button">Show one procedural cue</button>
        <div class="support hidden" id="support">${item.support}</div>
      </aside>
    </div>
    <div class="lab-footer"><button class="quiet-button" id="motionToggle" type="button">${state.reduced?'Standard motion':'Reduce motion'}</button><button class="quiet-button" id="muteToggle" type="button">${state.muted?'Sound muted':'Mute sound'}</button><span>Only decision, action, timing, and cue use are recorded on this device.</span></div>`;
  const timer=lab.querySelector('#timer');
  const tick=setInterval(()=>{if(!document.body.contains(timer)){clearInterval(tick);return}const s=Math.floor((performance.now()-state.startedAt)/1000);timer.textContent=`00:${String(s).padStart(2,'0')}`},250);
  lab.querySelectorAll('.action').forEach(button=>button.addEventListener('click',()=>chooseAction(button.dataset.action,'button')));
  lab.querySelector('#hintButton').addEventListener('click',()=>{state.promptUsed=true;lab.querySelector('#support').classList.remove('hidden');lab.querySelector('#hintButton').disabled=true});
  lab.querySelector('#motionToggle').addEventListener('click',()=>{state.reduced=!state.reduced;renderMoment()});
  lab.querySelector('#muteToggle').addEventListener('click',()=>{state.muted=!state.muted;lab.querySelector('#muteToggle').textContent=state.muted?'Sound muted':'Mute sound'});
  lab.querySelector('.action').focus();
}

function chooseAction(actionId,inputMode){
  const item=moments[state.moment];
  const action=item.actions.find(a=>a.id===actionId);
  const elapsed=Math.max(1,Math.round((performance.now()-state.startedAt)/1000));
  const signal=action.weight-(elapsed>12?1:0)-(state.promptUsed?0.5:0);
  state.path=signal>=1?'challenge':'support';
  state.records.push({moment:item.phase,decision:item.title,action:action.label,evidence:action.evidence,elapsed,inputMode,promptUsed:state.promptUsed,signal,next:state.path});
  sessionStorage.setItem('rehearsalLab',JSON.stringify(state.records));
  state.moment++;
  if(state.moment<moments.length){renderTransition();}else{finishRehearsal();}
}

function renderTransition(){
  const supportive=state.path==='support';
  lab.innerHTML=`<div class="transition"><p class="eyebrow">Adaptive branch</p><h2>${supportive?'The next moment adds a clearer procedural cue.':'The next moment removes one support cue.'}</h2><p>The prototype used your chosen action, response time, and cue use. It did not infer emotion, panic, personality, or real-world competence.</p><button class="primary" id="nextMoment" type="button">Continue to changed cue</button></div>`;
  lab.querySelector('#nextMoment').addEventListener('click',renderMoment);
  lab.querySelector('#nextMoment').focus();
}

function finishRehearsal(){
  lab.classList.add('hidden');
  debrief.classList.remove('hidden');
  debrief.innerHTML=`<p class="eyebrow">Private behavioral debrief</p><h2>Evidence, not a readiness score.</h2><p>Your three decisions were recorded on this device. A complete session is attendance only; it is not competence, compliance, survival proof, or evidence that this fictional building is safe.</p><div class="evidence-table">${state.records.map((r,i)=>`<article><span>0${i+1}</span><div><b>${r.moment}</b><p>${r.evidence}</p></div><dl><div><dt>Time</dt><dd>${r.elapsed}s</dd></div><div><dt>Prompt</dt><dd>${r.promptUsed?'Used':'Not used'}</dd></div><div><dt>Input</dt><dd>${r.inputMode}</dd></div></dl></article>`).join('')}</div><div class="uncertainty"><b>What remains unverified</b><p>This prototype cannot show whether behavior transfers to a real earthquake. Compare the same rubric in a separate physical drill two to four weeks later before claiming improvement.</p></div><div class="control-row"><button class="secondary" id="deleteRecord" type="button">Delete private record</button><button class="secondary" id="restart" type="button">Practice again</button><button class="primary" id="printDebrief" type="button">Print / save debrief</button></div>`;
  debrief.querySelector('#deleteRecord').addEventListener('click',()=>{sessionStorage.removeItem('rehearsalLab');debrief.querySelector('#deleteRecord').textContent='Record deleted';debrief.querySelector('#deleteRecord').disabled=true});
  debrief.querySelector('#restart').addEventListener('click',()=>location.reload());
  debrief.querySelector('#printDebrief').addEventListener('click',()=>print());
  debrief.querySelector('#deleteRecord').focus();
}
