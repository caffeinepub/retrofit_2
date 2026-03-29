# RetroFit - Structural Engineering Software

## Current State
New project with scaffolding only. No existing app files.

## Requested Changes (Diff)

### Add
- Full RetroFit app: sidebar navigation, Home, Assessment, Knowledge Hub, Scan to BIM, About Us sections
- NDT-based structural assessment module (4 tests → results → retrofit recommendations)
- Design tool buttons that open external calculators in new tab

### Modify
- Design tool URLs updated to new Caffeine-hosted links:
  - Column Jacketing: https://rcc-column-jacketing-design-wvr.caffeine.xyz/#caffeineAdminToken=1358873c86e7482fd371a1097e821c4e7ad6ac75b1853dbc69f74e1a2616843f
  - Beam Jacketing: https://rcc-beam-jacketing-design-xg0.caffeine.xyz/#caffeineAdminToken=ea488fba4da1086d81197995c439ffa847f9da1f65994ae12a4daef60b0b00e1
  - Footing Jacketing: https://is456-footing-designer-cvy.caffeine.xyz
  - Column FRP: https://frp-confinement-calculator-6by.caffeine.xyz
  - Beam FRP: https://frp-beam-designer-e4j.caffeine.xyz

### Remove
- Nothing

## Implementation Plan
1. Build React frontend replicating the RetroFit HTML app
2. Implement sidebar navigation with section switching
3. Implement assessment module (step-by-step NDT test selection, input, analysis, recommendations)
4. Wire retrofit buttons to open new design tool URLs in new tabs
5. Implement Knowledge Hub, Scan to BIM, About Us sections
