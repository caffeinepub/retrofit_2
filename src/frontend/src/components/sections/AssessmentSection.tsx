import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AlertTriangle,
  Anchor,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Columns,
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
    };
  if (rn >= 30)
    return {
      label: "Good",
      color: "text-emerald-400",
      bg: "bg-emerald-400/10 border-emerald-400/30",
      level: 3,
    };
  if (rn >= 20)
    return {
      label: "Fair",
      color: "text-yellow-400",
      bg: "bg-yellow-400/10 border-yellow-400/30",
      level: 2,
    };
  return {
    label: "Poor",
    color: "text-red-400",
    bg: "bg-red-400/10 border-red-400/30",
    level: 1,
  };
}

function analyzeUPV(v: number) {
  if (v >= 4.5)
    return {
      label: "Excellent",
      color: "text-green-400",
      bg: "bg-green-400/10 border-green-400/30",
      level: 4,
    };
  if (v >= 3.5)
    return {
      label: "Good",
      color: "text-emerald-400",
      bg: "bg-emerald-400/10 border-emerald-400/30",
      level: 3,
    };
  if (v >= 3.0)
    return {
      label: "Medium",
      color: "text-yellow-400",
      bg: "bg-yellow-400/10 border-yellow-400/30",
      level: 2,
    };
  return {
    label: "Poor",
    color: "text-red-400",
    bg: "bg-red-400/10 border-red-400/30",
    level: 1,
  };
}

function analyzeHalfCell(mv: number) {
  if (mv > -200)
    return {
      label: "90% No Corrosion",
      color: "text-green-400",
      bg: "bg-green-400/10 border-green-400/30",
      level: 3,
    };
  if (mv >= -350)
    return {
      label: "Uncertain",
      color: "text-yellow-400",
      bg: "bg-yellow-400/10 border-yellow-400/30",
      level: 2,
    };
  return {
    label: "90% Corrosion",
    color: "text-red-400",
    bg: "bg-red-400/10 border-red-400/30",
    level: 1,
  };
}

function analyzeCarbonation(depth: number, cover: number) {
  if (depth < cover)
    return {
      label: "Safe",
      color: "text-green-400",
      bg: "bg-green-400/10 border-green-400/30",
      level: 3,
    };
  if (depth === cover)
    return {
      label: "At Risk",
      color: "text-yellow-400",
      bg: "bg-yellow-400/10 border-yellow-400/30",
      level: 2,
    };
  return {
    label: "High Risk",
    color: "text-red-400",
    bg: "bg-red-400/10 border-red-400/30",
    level: 1,
  };
}

interface Results {
  rebound?: ReturnType<typeof analyzeRebound>;
  upv?: ReturnType<typeof analyzeUPV>;
  halfcell?: ReturnType<typeof analyzeHalfCell>;
  carbonation?: ReturnType<typeof analyzeCarbonation>;
}

function getRecommendation(selected: string[], results: Results) {
  const hasRebound = selected.includes("rebound");
  const hasUPV = selected.includes("upv");
  const hasHalfCell = selected.includes("halfcell");
  const hasCarbonation = selected.includes("carbonation");

  const strengthLevel = Math.min(
    hasRebound ? (results.rebound?.level ?? 4) : 4,
    hasUPV ? (results.upv?.level ?? 4) : 4,
  );

  const corrosionLevel = Math.min(
    hasHalfCell ? (results.halfcell?.level ?? 3) : 3,
    hasCarbonation ? (results.carbonation?.level ?? 3) : 3,
  );

  if (strengthLevel >= 3 && corrosionLevel === 3) {
    return "none";
  }
  if (strengthLevel <= 2 || corrosionLevel === 1) {
    return "jacketing";
  }
  if (strengthLevel >= 3 && corrosionLevel === 1) {
    return "frp";
  }
  return "surface";
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
  const [recommendation, setRecommendation] = useState("");

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
    setRecommendation(getRecommendation(selectedTests, r));
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
    setRecommendation("");
  };

  const steps = ["Select Tests", "Input Values", "Results", "Recommendations"];

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
                  }
                `}
              >
                <span
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold
                  ${step > i + 1 ? "bg-primary/30" : ""}
                `}
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
          {/* Step 1: Select Tests */}
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
                    className={`text-left p-4 rounded-lg border transition-all duration-200
                      ${
                        selectedTests.includes(test.id)
                          ? "bg-primary/10 border-primary/40 glow-teal"
                          : "bg-card border-border/50 hover:border-border"
                      }
                    `}
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
                Next: Input Values
                <ChevronRight className="w-4 h-4" />
              </Button>
            </motion.div>
          )}

          {/* Step 2: Input Values */}
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
                            Rebar Cover (mm)
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
                  Run Analysis
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Results */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              <h2 className="font-display text-xl font-semibold mb-4">
                Analysis Results
              </h2>
              <div
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8"
                data-ocid="assessment.results.panel"
              >
                {results.rebound && (
                  <Card className={`border ${results.rebound.bg}`}>
                    <CardContent className="p-5">
                      <p className="text-xs text-muted-foreground mb-1">
                        Rebound Hammer (IS 13311-2)
                      </p>
                      <p
                        className={`font-display text-2xl font-bold ${results.rebound.color}`}
                      >
                        {results.rebound.label}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Concrete Strength Quality
                      </p>
                    </CardContent>
                  </Card>
                )}
                {results.upv && (
                  <Card className={`border ${results.upv.bg}`}>
                    <CardContent className="p-5">
                      <p className="text-xs text-muted-foreground mb-1">
                        UPV Test (IS 13311-1)
                      </p>
                      <p
                        className={`font-display text-2xl font-bold ${results.upv.color}`}
                      >
                        {results.upv.label}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Concrete Homogeneity
                      </p>
                    </CardContent>
                  </Card>
                )}
                {results.halfcell && (
                  <Card className={`border ${results.halfcell.bg}`}>
                    <CardContent className="p-5">
                      <p className="text-xs text-muted-foreground mb-1">
                        Half Cell Potential (ASTM C876)
                      </p>
                      <p
                        className={`font-display text-2xl font-bold ${results.halfcell.color}`}
                      >
                        {results.halfcell.label}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Corrosion Probability
                      </p>
                    </CardContent>
                  </Card>
                )}
                {results.carbonation && (
                  <Card className={`border ${results.carbonation.bg}`}>
                    <CardContent className="p-5">
                      <p className="text-xs text-muted-foreground mb-1">
                        Carbonation Test (IS 516)
                      </p>
                      <p
                        className={`font-display text-2xl font-bold ${results.carbonation.color}`}
                      >
                        {results.carbonation.label}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Carbonation vs Cover
                      </p>
                    </CardContent>
                  </Card>
                )}
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
                  View Recommendations
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 4: Recommendations */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              <h2 className="font-display text-xl font-semibold mb-4">
                Retrofit Recommendations
              </h2>

              {recommendation === "none" && (
                <Card className="bg-green-400/10 border-green-400/30 mb-6">
                  <CardContent className="p-6 flex items-start gap-4">
                    <CheckCircle2 className="w-8 h-8 text-green-400 shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-display text-xl font-bold text-green-400 mb-1">
                        No Retrofitting Required
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        Structure is in good condition. Minor surface repairs
                        and preventive maintenance may be carried out as a
                        precaution. Schedule re-assessment in 3–5 years.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {recommendation === "jacketing" && (
                <div className="space-y-4 mb-6">
                  <Card className="bg-red-400/10 border-red-400/30">
                    <CardContent className="p-6 flex items-start gap-4">
                      <XCircle className="w-8 h-8 text-red-400 shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-display text-xl font-bold text-red-400 mb-1">
                          RC Jacketing Recommended
                        </h3>
                        <p className="text-muted-foreground text-sm mb-4">
                          Structural strength is below acceptable limits and/or
                          significant corrosion detected. RC jacketing of
                          columns, beams, or footings is recommended to restore
                          structural integrity.
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <a
                            href={TOOL_URLS.columnJacket}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Button
                              size="sm"
                              className="gap-2 bg-primary text-primary-foreground"
                              data-ocid="assessment.column_jacket.button"
                            >
                              <LayoutGrid className="w-4 h-4" /> Column
                              Jacketing
                            </Button>
                          </a>
                          <a
                            href={TOOL_URLS.beamJacket}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Button
                              size="sm"
                              className="gap-2 bg-primary text-primary-foreground"
                              data-ocid="assessment.beam_jacket.button"
                            >
                              <Layers className="w-4 h-4" /> Beam Jacketing
                            </Button>
                          </a>
                          <a
                            href={TOOL_URLS.footingJacket}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Button
                              size="sm"
                              className="gap-2 bg-primary text-primary-foreground"
                              data-ocid="assessment.footing.button"
                            >
                              <Anchor className="w-4 h-4" /> Footing Design
                            </Button>
                          </a>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {recommendation === "frp" && (
                <div className="space-y-4 mb-6">
                  <Card className="bg-yellow-400/10 border-yellow-400/30">
                    <CardContent className="p-6 flex items-start gap-4">
                      <AlertTriangle className="w-8 h-8 text-yellow-400 shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-display text-xl font-bold text-yellow-400 mb-1">
                          FRP Wrapping Recommended
                        </h3>
                        <p className="text-muted-foreground text-sm mb-4">
                          Structural strength is adequate but high corrosion
                          potential detected. Fibre Reinforced Polymer (FRP)
                          wrapping is recommended to arrest corrosion and
                          provide confinement.
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <a
                            href={TOOL_URLS.frpColumn}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Button
                              size="sm"
                              className="gap-2 bg-primary text-primary-foreground"
                              data-ocid="assessment.frp_column.button"
                            >
                              <Columns className="w-4 h-4" /> Column FRP
                            </Button>
                          </a>
                          <a
                            href={TOOL_URLS.frpBeam}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Button
                              size="sm"
                              className="gap-2 bg-primary text-primary-foreground"
                              data-ocid="assessment.frp_beam.button"
                            >
                              <Layers className="w-4 h-4" /> Beam FRP
                            </Button>
                          </a>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {recommendation === "surface" && (
                <Card className="bg-yellow-400/10 border-yellow-400/30 mb-6">
                  <CardContent className="p-6 flex items-start gap-4">
                    <AlertTriangle className="w-8 h-8 text-yellow-400 shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-display text-xl font-bold text-yellow-400 mb-1">
                        Surface Repair + Protective Coating
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        Moderate structural condition with initial corrosion
                        signs. Surface repair using polymer-modified mortar
                        followed by application of anti-carbonation protective
                        coating is recommended. Monitor annually.
                      </p>
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
