# Mechanical Test Log

## Pass 1 - Before first deployment

**Date:** 2026-09-21  
**Build:** Commit 5 candidate

| Check | Result | Evidence |
|---|---|---|
| JavaScript parses | Pass | `node --check dist/app.js` returned no error |
| Static entrypoint and local assets exist | Pass | HTML, CSS, JavaScript, and fictional corridor asset resolved in the build tree |
| No repository secrets | Pass | Pattern scan found no API key, secret, token, or password assignment |
| Safeguard gate | Pass by code inspection | Trauma choice, equal mode choice, consent, disabled start, and intensity preview are present |
| Adaptive branch | Pass by code inspection | Action weight, elapsed time, and prompt use determine support/challenge path |
| Behavioral evidence | Pass by code inspection | Decision, action, elapsed time, input mode, prompt use, and next branch are logged locally |
| Claims boundary | Pass | Debrief rejects competence, compliance, survival, and building-safety claims |
| Delete action | Pass by code inspection | Participant can remove the session record from browser session storage |

### Bug-hunt target after Deploy 1

Use the motion toggle during an active decision and verify that the timer and evidence state remain stable. This interaction crosses simulation and measurement state and is therefore the highest-risk mechanical path.

### Evidence limitation

The managed static-site environment did not provide an interactive local browser preview. Syntax, asset, state-flow, and copy checks were completed before deployment; the production walkthrough is reserved for the submitted demo and persona screenshots.

## Pass 2 - Bug found, fixed, and prepared for redeployment

**Observed bug:** Toggling `Reduce motion` during a decision re-rendered the entire moment. That reset the decision timer and cleared whether the participant had requested a procedural cue, corrupting the very behavior evidence the product is meant to measure.

**Fix:** The toggle now changes only the scene's motion class and button label. It no longer calls the moment renderer, so the original start time, current choices, and cue-use state remain intact.

**Additional adaptive verification:** The next moment now visibly changes: a supported path pre-displays one procedural cue, while an independent path reduces guidance. The interface explains the change without presenting it as a score.

**Regression checks:** JavaScript syntax passes; timer ownership remains in the active moment; the motion toggle contains no call to `renderMoment`; the adaptive branch label and support visibility derive from the prior decision path.

