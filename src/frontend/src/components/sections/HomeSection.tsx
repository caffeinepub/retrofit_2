import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Activity,
  ArrowRight,
  Layers,
  LayoutGrid,
  Scan,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import { motion } from "motion/react";

const features = [
  {
    icon: <Activity className="w-6 h-6" />,
    title: "NDT-Based Assessment",
    desc: "Non-destructive testing analysis including Rebound Hammer, UPV, Half Cell Potential, and Carbonation tests per IS & ASTM codes.",
  },
  {
    icon: <Wrench className="w-6 h-6" />,
    title: "Smart Retrofit Solutions",
    desc: "AI-assisted recommendations for RC Jacketing, FRP Wrapping, and surface repair based on structural condition index.",
  },
  {
    icon: <Scan className="w-6 h-6" />,
    title: "Scan to BIM Integration",
    desc: "Convert 3D laser scan point clouds to accurate BIM models, enabling precise retrofit design and documentation.",
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: "Code Compliant",
    desc: "All assessments and retrofit designs follow IS 456, IS 13311, ASTM C876, and ACI 440 standards.",
  },
];

const tools = [
  {
    title: "Column Jacketing",
    tag: "RC Jacketing",
    desc: "Design RC column jackets per IS 456. Input existing dimensions and loads to get reinforcement details.",
    href: "https://rcc-column-jacketing-design-wvr.caffeine.xyz/#caffeineAdminToken=1358873c86e7482fd371a1097e821c4e7ad6ac75b1853dbc69f74e1a2616843f",
    icon: <LayoutGrid className="w-8 h-8" />,
    color: "from-cyan-500/20 to-teal-500/10",
  },
  {
    title: "Beam Jacketing",
    tag: "RC Jacketing",
    desc: "Strengthen deteriorated beams with RC jacketing. Auto-calculates additional reinforcement requirements.",
    href: "https://rcc-beam-jacketing-design-xg0.caffeine.xyz/#caffeineAdminToken=ea488fba4da1086d81197995c439ffa847f9da1f65994ae12a4daef60b0b00e1",
    icon: <Layers className="w-8 h-8" />,
    color: "from-blue-500/20 to-indigo-500/10",
  },
];

interface Props {
  onNavigate: (section: string) => void;
}

export default function HomeSection({ onNavigate }: Props) {
  return (
    <div className="min-h-full">
      {/* Hero */}
      <section className="relative overflow-hidden px-6 lg:px-12 py-16 lg:py-24">
        {/* Grid background */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(oklch(0.74 0.17 196) 1px, transparent 1px), linear-gradient(90deg, oklch(0.74 0.17 196) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-12 -left-12 w-64 h-64 rounded-full bg-accent/5 blur-3xl" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative max-w-3xl"
        >
          <Badge className="mb-4 bg-primary/15 text-primary border-primary/25 font-medium">
            Structural Retrofit Platform
          </Badge>
          <h1 className="font-display text-4xl lg:text-6xl font-bold leading-tight mb-6">
            Advanced Structural{" "}
            <span className="text-gradient-teal">Retrofitting</span> Software
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl leading-relaxed">
            Comprehensive NDT-based structural assessment and intelligent
            retrofit design platform for civil and structural engineers.
            Analyze, diagnose, and design — all in one place.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button
              data-ocid="hero.primary_button"
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 font-semibold"
              onClick={() => onNavigate("assessment")}
            >
              Start Assessment
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button
              data-ocid="hero.secondary_button"
              size="lg"
              variant="outline"
              className="border-border/50 text-foreground hover:bg-secondary/80"
              onClick={() => onNavigate("knowledge")}
            >
              Knowledge Hub
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Feature Cards */}
      <section className="px-6 lg:px-12 py-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="font-display text-2xl font-bold mb-2">
            Platform Capabilities
          </h2>
          <p className="text-muted-foreground mb-8">
            Everything you need for a complete structural assessment workflow.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i + 0.3 }}
              >
                <Card className="bg-card border-border/60 h-full hover:border-primary/30 transition-colors">
                  <CardContent className="p-5">
                    <div className="w-11 h-11 rounded-lg bg-primary/15 flex items-center justify-center text-primary mb-4">
                      {f.icon}
                    </div>
                    <h3 className="font-display font-semibold text-sm mb-2">
                      {f.title}
                    </h3>
                    <p className="text-muted-foreground text-xs leading-relaxed">
                      {f.desc}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Design Tools Showcase */}
      <section className="px-6 lg:px-12 py-8 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h2 className="font-display text-2xl font-bold mb-2">
            Design Calculators
          </h2>
          <p className="text-muted-foreground mb-6">
            Launch specialized retrofit design tools directly from the platform.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {tools.map((tool) => (
              <Card
                key={tool.title}
                className="relative overflow-hidden bg-card border-border/60 hover:border-primary/40 transition-all duration-300 hover:glow-teal group"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${tool.color} opacity-100`}
                />
                <CardContent className="relative p-6 flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-secondary/80 flex items-center justify-center text-primary shrink-0">
                    {tool.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-display font-bold text-lg">
                        {tool.title}
                      </h3>
                      <Badge
                        variant="outline"
                        className="text-xs border-primary/30 text-primary"
                      >
                        {tool.tag}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                      {tool.desc}
                    </p>
                    <a
                      href={tool.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        size="sm"
                        className="bg-primary text-primary-foreground hover:bg-primary/90 gap-1.5 font-medium"
                      >
                        Open Tool
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
}
