import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, ChevronRight, MapPin } from "lucide-react";
import { motion } from "motion/react";

const caseStudies = [
  {
    title: "CSMT Heritage Building, Mumbai",
    year: "2019",
    type: "FRP + RC Jacketing",
    desc: "UNESCO World Heritage site underwent comprehensive structural retrofitting. Carbonation depth exceeded rebar cover in several zones; FRP wrapping applied to all exposed columns with corroded reinforcement replaced.",
    outcome: "Load capacity increased by 40%",
  },
  {
    title: "Howrah Bridge Approach Viaduct, Kolkata",
    year: "2017",
    type: "RC Jacketing",
    desc: "Chloride-induced corrosion of main girders detected via half-cell potential surveys. RC jacketing of 24 approach spans completed with additional stirrups and longitudinal bars to restore design capacity.",
    outcome: "Service life extended by 30 years",
  },
  {
    title: "Multi-storey Residential Block, Pune",
    year: "2021",
    type: "Surface Repair + Coating",
    desc: "Post-earthquake inspection revealed carbonation front within 5mm of rebar cover. Phenolphthalein indicator tests followed by polymer mortar repair and silane-siloxane protective coating applied over entire facade.",
    outcome: "Carbonation barrier restored",
  },
  {
    title: "Industrial Plant, Ahmedabad",
    year: "2020",
    type: "Footing Jacketing",
    desc: "Settlement-induced cracking in isolated footings under heavy machinery bays. UPV tests confirmed poor concrete quality (< 3.0 km/s). Footing jacketing with micro-piles carried out to increase bearing capacity.",
    outcome: "Settlement halted, capacity doubled",
  },
  {
    title: "Government Hospital, Chennai",
    year: "2022",
    type: "Column FRP",
    desc: "Rebound hammer survey showed RN values of 18–22 indicating inadequate column strength in ground floor lobby. CFRP sheets wrapped around 48 columns in one week without interrupting hospital operations.",
    outcome: "Ductility improved significantly",
  },
];

const techniques = [
  {
    title: "RC Column Jacketing",
    tag: "Strength",
    steps: [
      "Assess existing column dimensions and reinforcement",
      "Chip concrete cover to expose longitudinal bars",
      "Provide additional longitudinal and transverse steel",
      "Apply bonding agent to existing concrete surface",
      "Cast micro-concrete or SCC jacket around column",
      "Cure for minimum 28 days, test with rebound hammer",
    ],
    code: "IS 456:2000",
  },
  {
    title: "RC Beam Jacketing",
    tag: "Flexure + Shear",
    steps: [
      "Perform flexural and shear capacity calculations",
      "Expose existing beam reinforcement at critical sections",
      "Install U-shaped stirrups for shear enhancement",
      "Add longitudinal bars in tension/compression zones",
      "Shore existing structure before casting new concrete",
      "Apply SCC jacket; monitor crack widths post-cure",
    ],
    code: "IS 456:2000",
  },
  {
    title: "CFRP / GFRP Wrapping",
    tag: "Confinement",
    steps: [
      "Surface preparation — grind to remove laitance",
      "Fill voids with epoxy filler; round corners ≥ 25mm",
      "Apply saturating resin to substrate",
      "Lay FRP fabric and consolidate with roller",
      "Apply second coat of resin over wet fabric",
      "Inspect bond with acoustic tap testing after cure",
    ],
    code: "ACI 440.2R-17",
  },
  {
    title: "Footing Jacketing",
    tag: "Foundation",
    steps: [
      "Excavate around existing footing perimeter",
      "Perform soil bearing capacity verification",
      "Drill and install dowel bars into existing footing",
      "Place new reinforcement cage around existing footing",
      "Cast new concrete monolithically or with epoxy bonding",
      "Backfill in layers and compact to 95% proctor density",
    ],
    code: "IS 1904:1986",
  },
];

export default function KnowledgeHubSection() {
  return (
    <div className="min-h-full px-6 lg:px-12 py-10">
      {/* Intro */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mb-12"
      >
        <h1 className="font-display text-3xl font-bold mb-3">Knowledge Hub</h1>
        <p className="text-muted-foreground text-base leading-relaxed mb-6">
          A comprehensive reference on structural retrofitting — why it matters,
          how it's done, and real-world applications across India.
        </p>
        <div className="bg-card border border-border/60 rounded-lg p-6">
          <h2 className="font-display text-lg font-semibold mb-3">
            Why Retrofitting Matters
          </h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {[
              "India has over 8 million existing reinforced concrete structures, many built before modern seismic codes",
              "Carbonation and chloride-induced corrosion reduce structural life by 20–40% in coastal and industrial zones",
              "Retrofitting costs 30–50% less than demolition and rebuilding, with less environmental impact",
              "IS 1893:2016 requires seismic evaluation of all critical infrastructure built before 2002",
              "Proactive NDT assessment can detect degradation 5–10 years before visible cracking appears",
              "Heritage buildings and hospitals cannot be demolished — retrofitting is the only viable option",
            ].map((point) => (
              <li key={point} className="flex gap-2">
                <ChevronRight className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

      {/* Case Studies */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="mb-12"
      >
        <h2 className="font-display text-2xl font-bold mb-2">Case Studies</h2>
        <p className="text-muted-foreground mb-6">
          Real retrofitting projects from across India.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {caseStudies.map((cs, i) => (
            <motion.div
              key={cs.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i + 0.2 }}
            >
              <Card
                className="bg-card border-border/60 h-full hover:border-primary/30 transition-colors"
                data-ocid={`knowledge.case_study.item.${i + 1}`}
              >
                <CardContent className="p-5">
                  <div className="flex items-center gap-1.5 mb-3">
                    <MapPin className="w-3.5 h-3.5 text-primary" />
                    <span className="text-xs text-muted-foreground">
                      {cs.year}
                    </span>
                    <Badge
                      variant="outline"
                      className="ml-auto text-xs border-primary/30 text-primary"
                    >
                      {cs.type}
                    </Badge>
                  </div>
                  <h3 className="font-display font-semibold text-sm mb-2">
                    {cs.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                    {cs.desc}
                  </p>
                  <div className="flex items-center gap-1.5 text-xs text-green-400">
                    <Building2 className="w-3.5 h-3.5" />
                    {cs.outcome}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Techniques */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="pb-16"
      >
        <h2 className="font-display text-2xl font-bold mb-2">
          Retrofit Techniques
        </h2>
        <p className="text-muted-foreground mb-6">
          Step-by-step construction processes for the major retrofit methods.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {techniques.map((tech, i) => (
            <motion.div
              key={tech.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i + 0.35 }}
            >
              <Card
                className="bg-card border-border/60 h-full"
                data-ocid={`knowledge.technique.item.${i + 1}`}
              >
                <CardHeader className="pb-2 pt-5 px-5">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-base">{tech.title}</CardTitle>
                    <Badge
                      variant="outline"
                      className="text-xs border-accent/40 text-accent"
                    >
                      {tech.tag}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="text-xs border-border/40 text-muted-foreground ml-auto"
                    >
                      {tech.code}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="px-5 pb-5">
                  <ol className="space-y-2">
                    {tech.steps.map((step, si) => (
                      <li
                        key={step.slice(0, 30)}
                        className="flex gap-3 text-sm text-muted-foreground"
                      >
                        <span className="w-5 h-5 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center shrink-0 font-bold mt-0.5">
                          {si + 1}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
