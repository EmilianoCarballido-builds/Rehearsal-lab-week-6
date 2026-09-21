# Persona Test Log - Rehearsal Lab

**Tester:** Synthetic persona, not a real participant  
**Date:** 2026-09-21  
**Layer:** Persona Test, Layer 1

## Persona

**Marisol, 48**, is a school administrative employee and volunteer brigade member in Mexico City. She uses WhatsApp every day but does not enjoy games, reads slowly under pressure, and may stop silently rather than ask for help. She experienced the 2017 earthquake and wants preparation to feel respectful, not theatrical. She worries that a school could use an individual result against her.

## Walkthrough and narrated reactions

| Screen | What Marisol tries | Where she hesitates | Risk |
|---|---|---|---|
| Private safeguard gate | Reads the trauma question and looks for a consequence to answering honestly | She initially wonders whether choosing `Yes` will disqualify her | She may hide discomfort to avoid looking weak |
| Format choice | Compares video simulation with calm text format | `Non-VR` sounds technical, but the phrase `same decisions in a calm text format` clarifies it | Moderate terminology friction |
| Intensity preview | Checks motion, sound, and time pressure | She wants proof she can still leave once the timer begins | The persistent `Leave rehearsal` control resolves this |
| First decision | Looks at the scene, then reads all three actions | She focuses on the timer and worries that slowness equals failure | The product must say timing is evidence, not a grade |
| Adaptive transition | Reads that the next moment has changed | `Adaptive branch` sounds like a hidden score or algorithmic judgment | This is the worst confusion |
| Voice input | Considers speaking but sees a button fallback | She distrusts whether her voice is saved | The local matching and `audio is not stored` message gives a clear alternative |
| Debrief | Looks for a pass/fail result | She understands the evidence timeline but needs a direct reminder that administrators do not receive an individual score | The private/deletable language and no-score heading address this |

## Worst confusion fixed

**Problem:** Marisol interpreted the adaptive transition as a hidden grade. The system previously said only that a support cue would be added or removed, without showing the change clearly inside the next decision.

**Fix:** The next decision now includes a plain-language label: `More guidance added from the last decision` or `Guidance reduced after the last decision`. When support is added, the procedural cue is already visible. No numeric or categorical readiness score appears.

## What remains after this persona pass

- Replace `Non-VR` with `calm text rehearsal` everywhere in a later localization pass.
- Test with a consenting real adult before treating Marisol's simulated reactions as user evidence.
- Add Spanish copy only after a Mexican civil-protection reviewer checks terminology.
- Preserve a human facilitator for ambiguous decisions and trauma concerns.

## Persona verdict

Marisol can complete the task without surrendering privacy or being forced into immersive content. The interface is respectful enough for a prototype, but the persona test is not field validation. The next responsible step is one consenting adult usability session followed by a separately observed physical drill two to four weeks later.

