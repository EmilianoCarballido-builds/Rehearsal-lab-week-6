# Rehearsal Lab - Business Bending Week 6

A privacy-first browser rehearsal for measuring earthquake-response decisions without presenting completion as preparedness.

## Live prototype

https://rehearsal-lab-week6.ecarba27.chatgpt.site

## Declared vacuum

**Behavior measurement:** capture the participant's decision, chosen action, response time, input mode, and cue use, then adapt the next fictional rehearsal moment.

## Dragon Stack

- **Simulation / 3D / VR:** labeled browser video-simulation using an original fictional campus corridor.
- **Adaptive logic:** transparent prototype rules change the next cue based on action, delay, and support use.
- **Voice signal:** optional browser speech recognition maps a spoken response to the same event structure as the equal button fallback.

The technologies are multiplicative: the simulation produces the behavior signal, voice or buttons capture it, and the adaptive rules change the next simulation and private debrief.

## Safety and evidence boundaries

- No real tragedy, fatal location, or identifiable victim is reconstructed.
- The participant receives a private trauma check, intensity preview, visible exit, and equal non-VR option.
- No biometric, facial, emotional, or stored audio capture.
- Records remain in browser session storage and can be deleted by the participant.
- Completion is never presented as competence, legal compliance, building safety, or proof of survival.
- Transfer to real-earthquake behavior remains unverified and requires a later physical-drill comparison.

## Documentation

- [Packet before code](docs/PACKET.md)
- [Implementation prompt](docs/IMPLEMENTATION_PROMPT.md)
- [Mechanical test log](docs/TEST_LOG.md)
- [Persona test log](docs/PERSONA_TEST.md)
- [Decision log](DECISIONS.md)

## Test-fix-redeploy evidence

The first deployed version contained a real measurement bug: changing the motion preference re-rendered the active moment, resetting its timer and cue-use state. The final version changes only the animation class, preserving the evidence record. The synthetic persona test also led to clearer adaptive-support language so the change does not feel like a hidden grade.

Every scenario, place, and person in this prototype is fictional.
