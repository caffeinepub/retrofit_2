import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  AlertTriangle,
  Anchor,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Columns,
  ExternalLink,
  Info,
  Layers,
  LayoutGrid,
  RefreshCw,
  XCircle,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const TOOL_URLS = {
  columnJacket:
    "https://rcc-column-jacketing-design-wvr.caffeine.xyz/#caffeineAdminToken=1358873c86e7482fd371a1097e821c4e7ad6ac75b1853dbc69f74e1a2616843f",
  beamJacket:
    "https://rcc-beam-jacketing-design-xg0.caffeine.xyz/#caffeineAdminToken=ea488fba4da1086d81197995c439ffa847f9da1f65994ae12a4daef60b0b00e1",
  footingJacket: "https://is456-footing-designer-cvy.caffeine.xyz",
  frpColumn: "https://frp-confinement-calculator-6by.caffeine.xyz",
  frpBeam: "https://frp-beam-designer-e4j.caffeine.xyz",
};

const ndtTests = [
  {
    id: "rebound",
    label: "Rebound Hammer Test",
    code: "IS 13311 Part 2",
    desc: "Measures surface hardness to estimate concrete compressive strength",
  },
  {
    id: "upv",
    label: "UPV Test",
    code: "IS 13311 Part 1",
    desc: "Ultrasonic Pulse Velocity — assesses concrete homogeneity and quality",
  },
  {
    id: "halfcell",
    label: "Half Cell Potential",
    code: "ASTM C876",
    desc: "Evaluates probability of rebar corrosion in reinforced concrete",
  },
  {
    id: "carbonation",
    label: "Carbonation Test",
    code: "IS 516",
    desc: "Measures depth of carbonation front relative to rebar cover",
  },
];

function analyzeRebound(rn: number) {
  if (rn >= 40)
    return {
      label: "Very Good",
      color: "text-green-400",
      bg: "bg-green-400/10 border-green-400/30",
      level: 4,
      reason:
        "A Rebound Number ≥ 40 indicates a dense, well-hydrated cement matrix with high surface hardness. This correlates with a compressive strength typically exceeding 40 MPa (M40 or above), signifying excellent structural performance.",
    };
  if (rn >= 30)
    return {
      label: "Good",
      color: "text-emerald-400",
      bg: "bg-emerald-400/10 border-emerald-400/30",
      level: 3,
      reason:
        "RN of 30–40 reflects a moderately strong concrete matrix, typically corresponding to M25–M40 grade. Surface integrity is satisfactory, though minor internal micro-cracking may be present. Structural capacity is generally adequate.",
    };
  if (rn >= 20)
    return {
      label: "Fair",
      color: "text-yellow-400",
      bg: "bg-yellow-400/10 border-yellow-400/30",
      level: 2,
      reason:
        "RN between 20–30 suggests reduced compressive strength, likely below M20 grade. The concrete may have experienced degradation, poor curing, or carbonation-induced softening. Structural load capacity may be compromised and warrants further investigation.",
    };
  return {
    label: "Poor",
    color: "text-red-400",
    bg: "bg-red-400/10 border-red-400/30",
    level: 1,
    reason:
      "RN below 20 indicates severely deteriorated or very weak concrete (below M15). This level of surface hardness suggests extensive internal cracking, advanced carbonation, or significant chemical/physical degradation. Immediate structural intervention is warranted.",
  };
}

function analyzeUPV(v: number) {
  if (v >= 4.5)
    return {
      label: "Excellent",
      color: "text-green-400",
      bg: "bg-green-400/10 border-green-400/30",
      level: 4,
      reason:
        "UPV ≥ 4.5 km/s indicates a dense, homogeneous, and void-free concrete structure. Sound wave travels at maximum speed confirming absence of internal cracks, delamination, or honeycombing. The concrete is in excellent condition.",
    };
  if (v >= 3.5)
    return {
      label: "Good",
      color: "text-emerald-400",
      bg: "bg-emerald-400/10 border-emerald-400/30",
      level: 3,
      reason:
        "UPV of 3.5–4.5 km/s shows good concrete uniformity with minor imperfections. Some micro-voids or hairline cracks may exist but overall structural integrity is maintained. Routine monitoring is advisable.",
    };
  if (v >= 3.0)
    return {
      label: "Medium",
      color: "text-yellow-400",
      bg: "bg-yellow-400/10 border-yellow-400/30",
      level: 2,
      reason:
        "UPV between 3.0–3.5 km/s suggests moderate concrete quality with visible internal discontinuities such as cracks or voids. This indicates a reduction in structural stiffness and possible moisture ingress pathways.",
    };
  return {
    label: "Poor",
    color: "text-red-400",
    bg: "bg-red-400/10 border-red-400/30",
    level: 1,
    reason:
      "UPV below 3.0 km/s points to severely cracked, honeycombed, or delaminated concrete with significant internal discontinuities. Sound pulse is severely attenuated, indicating loss of structural cohesion. Major retrofitting is required.",
  };
}

function analyzeHalfCell(mv: number) {
  if (mv > -200)
    return {
      label: "90% No Corrosion",
      color: "text-green-400",
      bg: "bg-green-400/10 border-green-400/30",
      level: 3,
      reason:
        "A potential more positive than -200 mV (vs CSE) indicates passive oxide film on rebar is intact. The electrochemical environment is non-aggressive and there is a 90% probability that no active corrosion is occurring per ASTM C876.",
    };
  if (mv >= -350)
    return {
      label: "Uncertain",
      color: "text-yellow-400",
      bg: "bg-yellow-400/10 border-yellow-400/30",
      level: 2,
      reason:
        "Potential in the range -200 to -350 mV falls in the uncertain corrosion zone per ASTM C876. The protective passive film on rebar may be partially broken down. Active corrosion cannot be ruled out and further investigation (e.g. resistivity measurement) is recommended.",
    };
  return {
    label: "90% Corrosion",
    color: "text-red-400",
    bg: "bg-red-400/10 border-red-400/30",
    level: 1,
    reason:
      "A potential more negative than -350 mV indicates a 90% probability of active corrosion per ASTM C876. The passive oxide film has broken down, allowing anodic dissolution of rebar steel. This leads to expansive rust products that crack the surrounding concrete cover.",
  };
}

function analyzeCarbonation(depth: number, cover: number) {
  if (depth < cover)
    return {
      label: "Safe",
      color: "text-green-400",
      bg: "bg-green-400/10 border-green-400/30",
      level: 3,
      reason: `Carbonation front (${depth} mm) has not reached the rebar cover (${cover} mm). The alkaline environment (pH > 11) surrounding the reinforcement is preserved, maintaining the passive protective film on rebar surface. No corrosion risk from carbonation at this stage.`,
    };
  if (depth === cover)
    return {
      label: "At Risk",
      color: "text-yellow-400",
      bg: "bg-yellow-400/10 border-yellow-400/30",
      level: 2,
      reason: `Carbonation depth (${depth} mm) has reached the rebar cover level (${cover} mm). The pH at the rebar surface has dropped to ~8.5, destabilising the passive film. Corrosion initiation is imminent. Immediate protective intervention is recommended.`,
    };
  return {
    label: "High Risk",
    color: "text-red-400",
    bg: "bg-red-400/10 border-red-400/30",
    level: 1,
    reason: `Carbonation front (${depth} mm) has penetrated beyond the rebar cover (${cover} mm). The alkalinity at rebar level has been neutralised (pH < 9), depassivating the steel. Active corrosion is highly likely with consequential cover cracking and structural section loss.`,
  };
}

interface Results {
  rebound?: ReturnType<typeof analyzeRebound>;
  upv?: ReturnType<typeof analyzeUPV>;
  halfcell?: ReturnType<typeof analyzeHalfCell>;
  carbonation?: ReturnType<typeof analyzeCarbonation>;
}

function getOverallAssessment(selected: string[], results: Results) {
  const hasStrength = selected.includes("rebound") || selected.includes("upv");
  const hasCorrosion =
    selected.includes("halfcell") || selected.includes("carbonation");

  const strengthLevel = Math.min(
    selected.includes("rebound") ? (results.rebound?.level ?? 4) : 4,
    selected.includes("upv") ? (results.upv?.level ?? 4) : 4,
  );

  const corrosionLevel = Math.min(
    selected.includes("halfcell") ? (results.halfcell?.level ?? 3) : 3,
    selected.includes("carbonation") ? (results.carbonation?.level ?? 3) : 3,
  );

  // Concrete Strength Condition
  let strengthCondition = "Not Assessed";
  let strengthReason = "No strength-related tests were selected.";
  if (hasStrength) {
    if (strengthLevel >= 4) {
      strengthCondition = "Very Good";
      strengthReason =
        "NDT results confirm high surface hardness and excellent concrete homogeneity, indicating the concrete retains its design strength.";
    } else if (strengthLevel === 3) {
      strengthCondition = "Good";
      strengthReason =
        "Test results indicate satisfactory concrete quality with adequate strength for its intended purpose.";
    } else if (strengthLevel === 2) {
      strengthCondition = "Fair";
      strengthReason =
        "Concrete shows signs of degradation. Strength may be below design requirements, warranting structural review.";
    } else {
      strengthCondition = "Poor";
      strengthReason =
        "Concrete is severely degraded. Structural load capacity is significantly compromised and immediate action is required.";
    }
  }

  // Durability Condition
  let durabilityCondition = "Not Assessed";
  let durabilityReason = "No durability-related tests were selected.";
  if (hasCorrosion) {
    if (corrosionLevel === 3) {
      durabilityCondition = "Durable";
      durabilityReason =
        "No significant carbonation or electrochemical corrosion risk detected. The structure is expected to perform adequately over its service life.";
    } else if (corrosionLevel === 2) {
      durabilityCondition = "Marginal";
      durabilityReason =
        "Early-stage corrosion risk detected. The protective environment for rebar is partially compromised. Preventive measures are advisable.";
    } else {
      durabilityCondition = "Poor";
      durabilityReason =
        "Severe corrosion risk confirmed. Rebar depassivation is underway or complete. Structural durability is critically compromised.";
    }
  }

  // Corrosion Status
  let corrosionStatus = "Not Assessed";
  let corrosionReason = "No corrosion tests selected.";
  if (hasCorrosion) {
    if (corrosionLevel === 3) {
      corrosionStatus = "No Active Corrosion";
      corrosionReason =
        "Electrochemical readings and/or carbonation measurements confirm passive rebar conditions. Corrosion is not initiated.";
    } else if (corrosionLevel === 2) {
      corrosionStatus = "Uncertain / Possible";
      corrosionReason =
        "Test results fall in the uncertain corrosion zone. The passive film may be weakening. Active corrosion cannot be excluded and requires monitoring.";
    } else {
      corrosionStatus = "Active Corrosion Probable";
      corrosionReason =
        "Test results confirm a high probability of active corrosion. Expansive corrosion products will cause cracking, cover spalling and loss of rebar cross-section over time.";
    }
  }

  // Overall Health
  const overallLevel = Math.min(strengthLevel, corrosionLevel);
  let overallHealth = "Satisfactory";
  let overallColor = "text-green-400";
  let overallBg = "bg-green-400/10 border-green-400/30";
  let overallReason = "";
  if (overallLevel >= 3) {
    overallHealth = "Satisfactory";
    overallColor = "text-green-400";
    overallBg = "bg-green-400/10 border-green-400/30";
    overallReason =
      "The structure shows good overall health. Routine maintenance and periodic inspection are recommended to sustain performance.";
  } else if (overallLevel === 2) {
    overallHealth = "Moderate Concern";
    overallColor = "text-yellow-400";
    overallBg = "bg-yellow-400/10 border-yellow-400/30";
    overallReason =
      "The structure exhibits signs of deterioration. Prompt remedial action is advised to prevent escalation to a critical condition.";
  } else {
    overallHealth = "Critical";
    overallColor = "text-red-400";
    overallBg = "bg-red-400/10 border-red-400/30";
    overallReason =
      "The structure is in a critical condition with combined strength loss and corrosion damage. Immediate structural intervention is mandatory to ensure safety.";
  }

  // Recommendation
  let recommendation = "none";
  let recJustification = "";
  if (strengthLevel >= 3 && corrosionLevel === 3) {
    recommendation = "none";
    recJustification =
      "Both structural strength and durability indicators are satisfactory. No immediate retrofitting is required. Minor cosmetic or surface repairs can be performed as preventive maintenance. A re-assessment is recommended every 3–5 years.";
  } else if (
    (strengthLevel === 2 || strengthLevel === 1) &&
    (corrosionLevel === 2 || corrosionLevel === 1)
  ) {
    recommendation = "jacketing";
    recJustification =
      "Combined low structural strength and confirmed/probable corrosion indicates that the structure has lost a significant portion of its load-carrying capacity. RC Jacketing (adding reinforced concrete around existing elements) restores both strength and stiffness while encapsulating corroded reinforcement.";
  } else if (strengthLevel <= 1 && corrosionLevel === 3) {
    recommendation = "jacketing";
    recJustification =
      "Very poor concrete strength despite limited corrosion requires full structural restoration. RC Jacketing increases section dimensions and adds fresh reinforcement to restore the designed load capacity.";
  } else if (strengthLevel >= 3 && corrosionLevel === 1) {
    recommendation = "frp";
    recJustification =
      "Structural strength is adequate but severe corrosion is detected. FRP (Fibre Reinforced Polymer) wrapping provides confinement pressure that arrests corrosion-induced cracking, prevents further concrete spalling, and increases ductility without major section enlargement.";
  } else if (strengthLevel >= 2 && corrosionLevel === 2) {
    recommendation = "surface";
    recJustification =
      "Moderate strength with early-stage corrosion risk is best addressed by surface repair — removing carbonated/contaminated concrete, patch repair with polymer-modified mortar, and applying an anti-carbonation protective coating to re-establish a protective barrier over the rebar.";
  } else {
    // fallback
    recommendation = "surface";
    recJustification =
      "Available test results suggest moderate deterioration. Surface repair combined with protective coating treatment is recommended as an initial intervention.";
  }

  return {
    strengthCondition,
    strengthReason,
    durabilityCondition,
    durabilityReason,
    corrosionStatus,
    corrosionReason,
    overallHealth,
    overallColor,
    overallBg,
    overallReason,
    recommendation,
    recJustification,
  };
}

export default function AssessmentSection() {
  const [step, setStep] = useState(1);
  const [selectedTests, setSelectedTests] = useState<string[]>([]);
  const [inputs, setInputs] = useState({
    reboundRN: "",
    upvVelocity: "",
    halfcellMV: "",
    carbonDepth: "",
    carbonCover: "",
  });
  const [results, setResults] = useState<Results>({});
  const [overall, setOverall] = useState<ReturnType<
    typeof getOverallAssessment
  > | null>(null);

  const toggleTest = (id: string) => {
    setSelectedTests((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id],
    );
  };

  const runAnalysis = () => {
    const r: Results = {};
    if (selectedTests.includes("rebound") && inputs.reboundRN) {
      r.rebound = analyzeRebound(Number.parseFloat(inputs.reboundRN));
    }
    if (selectedTests.includes("upv") && inputs.upvVelocity) {
      r.upv = analyzeUPV(Number.parseFloat(inputs.upvVelocity));
    }
    if (selectedTests.includes("halfcell") && inputs.halfcellMV) {
      r.halfcell = analyzeHalfCell(Number.parseFloat(inputs.halfcellMV));
    }
    if (
      selectedTests.includes("carbonation") &&
      inputs.carbonDepth &&
      inputs.carbonCover
    ) {
      r.carbonation = analyzeCarbonation(
        Number.parseFloat(inputs.carbonDepth),
        Number.parseFloat(inputs.carbonCover),
      );
    }
    setResults(r);
    setOverall(getOverallAssessment(selectedTests, r));
    setStep(3);
  };

  const reset = () => {
    setStep(1);
    setSelectedTests([]);
    setInputs({
      reboundRN: "",
      upvVelocity: "",
      halfcellMV: "",
      carbonDepth: "",
      carbonCover: "",
    });
    setResults({});
    setOverall(null);
  };

  const steps = [
    "Select Tests",
    "Input Values",
    "Technical Results",
    "Recommendations",
  ];

  return (
    <div className="min-h-full px-6 lg:px-12 py-10">
      <div className="max-w-3xl">
        <h1 className="font-display text-3xl font-bold mb-2">
          Structural Assessment
        </h1>
        <p className="text-muted-foreground mb-8">
          Multi-step NDT-based evaluation with retrofit recommendations.
        </p>

        {/* Stepper */}
        <div
          className="flex items-center gap-1 mb-10 overflow-x-auto pb-1"
          data-ocid="assessment.panel"
        >
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-1 shrink-0">
              <div
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all
                ${
                  step === i + 1
                    ? "bg-primary/20 text-primary border border-primary/40"
                    : step > i + 1
                      ? "bg-primary/10 text-primary/70 border border-primary/20"
                      : "bg-muted/50 text-muted-foreground border border-border/40"
                }`}
              >
                <span
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${step > i + 1 ? "bg-primary/30" : ""}`}
                >
                  {step > i + 1 ? "✓" : i + 1}
                </span>
                {s}
              </div>
              {i < steps.length - 1 && (
                <ChevronRight className="w-3 h-3 text-border" />
              )}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* Step 1 */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              <h2 className="font-display text-xl font-semibold mb-4">
                Select NDT Tests
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {ndtTests.map((test) => (
                  <button
                    type="button"
                    key={test.id}
                    data-ocid={`assessment.${test.id}.toggle`}
                    onClick={() => toggleTest(test.id)}
                    className={`text-left p-4 rounded-lg border transition-all duration-200 ${
                      selectedTests.includes(test.id)
                        ? "bg-primary/10 border-primary/40 glow-teal"
                        : "bg-card border-border/50 hover:border-border"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <Checkbox
                        checked={selectedTests.includes(test.id)}
                        className="mt-0.5 shrink-0"
                        data-ocid={`assessment.${test.id}.checkbox`}
                      />
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-sm">
                            {test.label}
                          </span>
                          <Badge
                            variant="outline"
                            className="text-xs border-border/40 text-muted-foreground"
                          >
                            {test.code}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground text-xs">
                          {test.desc}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              <Button
                data-ocid="assessment.step1.primary_button"
                disabled={selectedTests.length === 0}
                onClick={() => setStep(2)}
                className="gap-2 bg-primary text-primary-foreground"
              >
                Next: Input Values <ChevronRight className="w-4 h-4" />
              </Button>
            </motion.div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              <h2 className="font-display text-xl font-semibold mb-4">
                Input Test Values
              </h2>
              <div className="space-y-5 mb-8">
                {selectedTests.includes("rebound") && (
                  <Card className="bg-card border-border/60">
                    <CardHeader className="pb-2 pt-4 px-5">
                      <CardTitle className="text-sm font-semibold">
                        Rebound Hammer Test (IS 13311 Part 2)
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="px-5 pb-4">
                      <div className="space-y-1">
                        <Label className="text-xs text-muted-foreground">
                          Rebound Number (RN)
                        </Label>
                        <Input
                          type="number"
                          placeholder="Enter rebound number (0–100)"
                          value={inputs.reboundRN}
                          onChange={(e) =>
                            setInputs((p) => ({
                              ...p,
                              reboundRN: e.target.value,
                            }))
                          }
                          data-ocid="assessment.rebound.input"
                          className="bg-input border-border/60"
                        />
                      </div>
                    </CardContent>
                  </Card>
                )}
                {selectedTests.includes("upv") && (
                  <Card className="bg-card border-border/60">
                    <CardHeader className="pb-2 pt-4 px-5">
                      <CardTitle className="text-sm font-semibold">
                        UPV Test (IS 13311 Part 1)
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="px-5 pb-4">
                      <div className="space-y-1">
                        <Label className="text-xs text-muted-foreground">
                          Pulse Velocity (km/s)
                        </Label>
                        <Input
                          type="number"
                          step="0.1"
                          placeholder="Enter velocity in km/s"
                          value={inputs.upvVelocity}
                          onChange={(e) =>
                            setInputs((p) => ({
                              ...p,
                              upvVelocity: e.target.value,
                            }))
                          }
                          data-ocid="assessment.upv.input"
                          className="bg-input border-border/60"
                        />
                      </div>
                    </CardContent>
                  </Card>
                )}
                {selectedTests.includes("halfcell") && (
                  <Card className="bg-card border-border/60">
                    <CardHeader className="pb-2 pt-4 px-5">
                      <CardTitle className="text-sm font-semibold">
                        Half Cell Potential (ASTM C876)
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="px-5 pb-4">
                      <div className="space-y-1">
                        <Label className="text-xs text-muted-foreground">
                          Potential (mV, typically negative)
                        </Label>
                        <Input
                          type="number"
                          placeholder="e.g. -250"
                          value={inputs.halfcellMV}
                          onChange={(e) =>
                            setInputs((p) => ({
                              ...p,
                              halfcellMV: e.target.value,
                            }))
                          }
                          data-ocid="assessment.halfcell.input"
                          className="bg-input border-border/60"
                        />
                      </div>
                    </CardContent>
                  </Card>
                )}
                {selectedTests.includes("carbonation") && (
                  <Card className="bg-card border-border/60">
                    <CardHeader className="pb-2 pt-4 px-5">
                      <CardTitle className="text-sm font-semibold">
                        Carbonation Test (IS 516)
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="px-5 pb-4">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <Label className="text-xs text-muted-foreground">
                            Carbonation Depth (mm)
                          </Label>
                          <Input
                            type="number"
                            placeholder="Depth (mm)"
                            value={inputs.carbonDepth}
                            onChange={(e) =>
                              setInputs((p) => ({
                                ...p,
                                carbonDepth: e.target.value,
                              }))
                            }
                            data-ocid="assessment.carbonation_depth.input"
                            className="bg-input border-border/60"
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs text-muted-foreground">
                            Concrete Cover (mm)
                          </Label>
                          <Input
                            type="number"
                            placeholder="Cover (mm)"
                            value={inputs.carbonCover}
                            onChange={(e) =>
                              setInputs((p) => ({
                                ...p,
                                carbonCover: e.target.value,
                              }))
                            }
                            data-ocid="assessment.carbonation_cover.input"
                            className="bg-input border-border/60"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
              <div className="flex gap-3">
                <Button
                  data-ocid="assessment.step2.cancel_button"
                  variant="outline"
                  onClick={() => setStep(1)}
                  className="gap-1.5"
                >
                  <ChevronLeft className="w-4 h-4" /> Back
                </Button>
                <Button
                  data-ocid="assessment.step2.primary_button"
                  onClick={runAnalysis}
                  className="gap-2 bg-primary text-primary-foreground"
                >
                  Run Analysis <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Technical Results */}
          {step === 3 && overall && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              <h2 className="font-display text-xl font-semibold mb-2">
                Technical Analysis Results
              </h2>
              <p className="text-muted-foreground text-sm mb-6">
                Individual test findings and technical interpretation.
              </p>

              {/* Individual Test Results */}
              <div className="space-y-4 mb-8">
                {results.rebound && (
                  <Card className={`border ${results.rebound.bg}`}>
                    <CardContent className="p-5">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                          Rebound Hammer — IS 13311 Part 2
                        </p>
                        <Badge
                          className={`${results.rebound.color} border ${results.rebound.bg} text-xs font-bold`}
                        >
                          {results.rebound.label}
                        </Badge>
                      </div>
                      <div className="flex items-start gap-2 mt-2">
                        <Info className="w-3.5 h-3.5 text-muted-foreground shrink-0 mt-0.5" />
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {results.rebound.reason}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}
                {results.upv && (
                  <Card className={`border ${results.upv.bg}`}>
                    <CardContent className="p-5">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                          UPV Test — IS 13311 Part 1
                        </p>
                        <Badge
                          className={`${results.upv.color} border ${results.upv.bg} text-xs font-bold`}
                        >
                          {results.upv.label}
                        </Badge>
                      </div>
                      <div className="flex items-start gap-2 mt-2">
                        <Info className="w-3.5 h-3.5 text-muted-foreground shrink-0 mt-0.5" />
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {results.upv.reason}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}
                {results.halfcell && (
                  <Card className={`border ${results.halfcell.bg}`}>
                    <CardContent className="p-5">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                          Half Cell Potential — ASTM C876
                        </p>
                        <Badge
                          className={`${results.halfcell.color} border ${results.halfcell.bg} text-xs font-bold`}
                        >
                          {results.halfcell.label}
                        </Badge>
                      </div>
                      <div className="flex items-start gap-2 mt-2">
                        <Info className="w-3.5 h-3.5 text-muted-foreground shrink-0 mt-0.5" />
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {results.halfcell.reason}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}
                {results.carbonation && (
                  <Card className={`border ${results.carbonation.bg}`}>
                    <CardContent className="p-5">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                          Carbonation Test — IS 516
                        </p>
                        <Badge
                          className={`${results.carbonation.color} border ${results.carbonation.bg} text-xs font-bold`}
                        >
                          {results.carbonation.label}
                        </Badge>
                      </div>
                      <div className="flex items-start gap-2 mt-2">
                        <Info className="w-3.5 h-3.5 text-muted-foreground shrink-0 mt-0.5" />
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {results.carbonation.reason}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              <Separator className="mb-6" />

              {/* Overall Summary */}
              <h3 className="font-display text-base font-semibold mb-4">
                Overall Structural Evaluation
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                <Card className="bg-card border-border/60">
                  <CardContent className="p-4">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                      Concrete Strength Condition
                    </p>
                    <p className="font-semibold text-sm mb-1">
                      {overall.strengthCondition}
                    </p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {overall.strengthReason}
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-card border-border/60">
                  <CardContent className="p-4">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                      Durability Condition
                    </p>
                    <p className="font-semibold text-sm mb-1">
                      {overall.durabilityCondition}
                    </p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {overall.durabilityReason}
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-card border-border/60">
                  <CardContent className="p-4">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                      Corrosion Status
                    </p>
                    <p className="font-semibold text-sm mb-1">
                      {overall.corrosionStatus}
                    </p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {overall.corrosionReason}
                    </p>
                  </CardContent>
                </Card>
                <Card className={`border ${overall.overallBg}`}>
                  <CardContent className="p-4">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                      Overall Structural Health
                    </p>
                    <p
                      className={`font-bold text-sm mb-1 ${overall.overallColor}`}
                    >
                      {overall.overallHealth}
                    </p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {overall.overallReason}
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setStep(2)}
                  data-ocid="assessment.step3.cancel_button"
                  className="gap-1.5"
                >
                  <ChevronLeft className="w-4 h-4" /> Back
                </Button>
                <Button
                  data-ocid="assessment.step3.primary_button"
                  onClick={() => setStep(4)}
                  className="gap-2 bg-primary text-primary-foreground"
                >
                  View Recommendations <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 4: Recommendations */}
          {step === 4 && overall && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              <h2 className="font-display text-xl font-semibold mb-2">
                Retrofit Recommendation
              </h2>
              <p className="text-muted-foreground text-sm mb-6">
                Based on combined NDT assessment results.
              </p>

              {/* No Retrofit */}
              {overall.recommendation === "none" && (
                <Card className="bg-green-400/10 border-green-400/30 mb-6">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <CheckCircle2 className="w-8 h-8 text-green-400 shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-display text-xl font-bold text-green-400 mb-1">
                          No Retrofitting Required
                        </h3>
                        <Badge className="bg-green-400/15 text-green-400 border-green-400/30 text-xs mb-3">
                          Case 1: Good Strength + No Corrosion
                        </Badge>
                        <p className="text-muted-foreground text-sm">
                          {overall.recJustification}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Surface Repair */}
              {overall.recommendation === "surface" && (
                <Card className="bg-yellow-400/10 border-yellow-400/30 mb-6">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <AlertTriangle className="w-8 h-8 text-yellow-400 shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-display text-xl font-bold text-yellow-400 mb-1">
                          Surface Repair + Protective Coating
                        </h3>
                        <Badge className="bg-yellow-400/15 text-yellow-400 border-yellow-400/30 text-xs mb-3">
                          Case 2: Moderate Strength + Initial Corrosion
                        </Badge>
                        <p className="text-muted-foreground text-sm">
                          {overall.recJustification}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* RC Jacketing */}
              {overall.recommendation === "jacketing" && (
                <Card className="bg-red-400/10 border-red-400/30 mb-6">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4 mb-5">
                      <XCircle className="w-8 h-8 text-red-400 shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-display text-xl font-bold text-red-400 mb-1">
                          RC Jacketing Recommended
                        </h3>
                        <Badge className="bg-red-400/15 text-red-400 border-red-400/30 text-xs mb-3">
                          Case 4: Poor Strength + High Corrosion
                        </Badge>
                        <p className="text-muted-foreground text-sm">
                          {overall.recJustification}
                        </p>
                      </div>
                    </div>
                    <Separator className="mb-5 border-red-400/20" />
                    <p className="text-sm font-semibold mb-3">
                      Select Structural Element for Jacketing Design:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <a
                        href={TOOL_URLS.columnJacket}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                      >
                        <div className="p-4 rounded-lg border border-red-400/30 bg-red-400/5 hover:bg-red-400/10 hover:border-red-400/50 transition-all cursor-pointer group">
                          <LayoutGrid className="w-6 h-6 text-red-400 mb-2" />
                          <p className="font-semibold text-sm mb-1">
                            Column Jacketing
                          </p>
                          <p className="text-xs text-muted-foreground mb-3">
                            RC jacket design for axially loaded columns per IS
                            456
                          </p>
                          <div className="flex items-center gap-1 text-xs text-red-400 font-medium">
                            Open Design Module{" "}
                            <ExternalLink className="w-3 h-3" />
                          </div>
                        </div>
                      </a>
                      <a
                        href={TOOL_URLS.beamJacket}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                      >
                        <div className="p-4 rounded-lg border border-red-400/30 bg-red-400/5 hover:bg-red-400/10 hover:border-red-400/50 transition-all cursor-pointer group">
                          <Layers className="w-6 h-6 text-red-400 mb-2" />
                          <p className="font-semibold text-sm mb-1">
                            Beam Jacketing
                          </p>
                          <p className="text-xs text-muted-foreground mb-3">
                            RC jacket design for flexural beams with full
                            detailing
                          </p>
                          <div className="flex items-center gap-1 text-xs text-red-400 font-medium">
                            Open Design Module{" "}
                            <ExternalLink className="w-3 h-3" />
                          </div>
                        </div>
                      </a>
                      <a
                        href={TOOL_URLS.footingJacket}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                      >
                        <div className="p-4 rounded-lg border border-red-400/30 bg-red-400/5 hover:bg-red-400/10 hover:border-red-400/50 transition-all cursor-pointer group">
                          <Anchor className="w-6 h-6 text-red-400 mb-2" />
                          <p className="font-semibold text-sm mb-1">
                            Footing Jacketing
                          </p>
                          <p className="text-xs text-muted-foreground mb-3">
                            Footing enlargement and reinforcement design per IS
                            456
                          </p>
                          <div className="flex items-center gap-1 text-xs text-red-400 font-medium">
                            Open Design Module{" "}
                            <ExternalLink className="w-3 h-3" />
                          </div>
                        </div>
                      </a>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* FRP */}
              {overall.recommendation === "frp" && (
                <Card className="bg-orange-400/10 border-orange-400/30 mb-6">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4 mb-5">
                      <AlertTriangle className="w-8 h-8 text-orange-400 shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-display text-xl font-bold text-orange-400 mb-1">
                          FRP Wrapping Recommended
                        </h3>
                        <Badge className="bg-orange-400/15 text-orange-400 border-orange-400/30 text-xs mb-3">
                          Case 3: Good Strength + High Corrosion
                        </Badge>
                        <p className="text-muted-foreground text-sm">
                          {overall.recJustification}
                        </p>
                      </div>
                    </div>
                    <Separator className="mb-5 border-orange-400/20" />
                    <p className="text-sm font-semibold mb-3">
                      Select Structural Element for FRP Strengthening Design:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <a
                        href={TOOL_URLS.frpColumn}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                      >
                        <div className="p-4 rounded-lg border border-orange-400/30 bg-orange-400/5 hover:bg-orange-400/10 hover:border-orange-400/50 transition-all cursor-pointer">
                          <Columns className="w-6 h-6 text-orange-400 mb-2" />
                          <p className="font-semibold text-sm mb-1">
                            Column FRP Strengthening
                          </p>
                          <p className="text-xs text-muted-foreground mb-3">
                            FRP confinement design for columns — axial capacity
                            enhancement and ductility improvement
                          </p>
                          <div className="flex items-center gap-1 text-xs text-orange-400 font-medium">
                            Open Design Module{" "}
                            <ExternalLink className="w-3 h-3" />
                          </div>
                        </div>
                      </a>
                      <a
                        href={TOOL_URLS.frpBeam}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                      >
                        <div className="p-4 rounded-lg border border-orange-400/30 bg-orange-400/5 hover:bg-orange-400/10 hover:border-orange-400/50 transition-all cursor-pointer">
                          <Layers className="w-6 h-6 text-orange-400 mb-2" />
                          <p className="font-semibold text-sm mb-1">
                            Beam FRP Strengthening
                          </p>
                          <p className="text-xs text-muted-foreground mb-3">
                            FRP flexural and shear strengthening design for RC
                            beams with full detailing
                          </p>
                          <div className="flex items-center gap-1 text-xs text-orange-400 font-medium">
                            Open Design Module{" "}
                            <ExternalLink className="w-3 h-3" />
                          </div>
                        </div>
                      </a>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setStep(3)}
                  data-ocid="assessment.step4.cancel_button"
                  className="gap-1.5"
                >
                  <ChevronLeft className="w-4 h-4" /> Back
                </Button>
                <Button
                  variant="ghost"
                  onClick={reset}
                  data-ocid="assessment.reset.button"
                  className="gap-1.5 text-muted-foreground hover:text-foreground"
                >
                  <RefreshCw className="w-4 h-4" /> New Assessment
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
