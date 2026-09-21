# Implementation Prompt

Build a single-page, responsive browser product called **Rehearsal Lab** from `docs/PACKET.md`.

## Features and acceptance criteria

1. **Safeguard gate** - private trauma question, intensity preview, fictional-scenario notice, equal simulation/non-VR choice, and consent checkbox. Start is disabled until required choices are made. A visible exit is always available.
2. **Three-moment rehearsal** - original fictional campus setting; no real tragedy, campus, victim, or identifying data. Each moment has a short animated/video-sim scene, audio toggle, timer, and three actions.
3. **Voice signal** - use browser speech recognition when available; constrain matching to the visible action vocabulary. Provide button input as equal fallback and never upload or retain audio.
4. **Adaptive logic** - use transparent weighted rules over action, response time, prompt use, and prior hesitation. The next moment changes in difficulty/support. Label it `Prototype adaptive logic - not trained ML`.
5. **Behavioral evidence** - store decision, chosen action, elapsed seconds, input mode, prompt use, and adaptive consequence. Do not compute a preparedness, survival, or compliance score.
6. **Private debrief** - show an evidence timeline, one strength, two practice priorities, uncertainty statement, and recommendation for a later physical-drill comparison. Include delete, restart, and print/save controls.
7. **Accessibility and safety** - keyboard operable, mobile responsive, readable at 200%, reduced-motion support, mute, calm exit, and no flashing. Red is reserved for urgent state.
8. **Security floor** - no secrets, no external services, no raw unbounded input, no real personal data, and no server-side storage.

## Commit plan

1. `docs: add packet and generated mockup`
2. `feat: add safeguard gate and fictional scenario shell`
3. `feat: add timed rehearsal and adaptive branching`
4. `feat: add voice signal and private behavioral debrief`
5. `test: document mechanical pass and first deployment`
6. `fix: resolve observed interaction bug and persona confusion`
7. `docs: close session and finalize submission artifacts`

Deploy after commit 5. Then reproduce and document one bug, apply the fix in commit 6, and deploy again.

