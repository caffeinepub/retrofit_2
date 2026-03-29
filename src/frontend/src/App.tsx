import AboutUsSection from "@/components/sections/AboutUsSection";
import AssessmentSection from "@/components/sections/AssessmentSection";
import HomeSection from "@/components/sections/HomeSection";
import KnowledgeHubSection from "@/components/sections/KnowledgeHubSection";
import ScanToBIMSection from "@/components/sections/ScanToBIMSection";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import {
  BookOpen,
  ClipboardCheck,
  Home,
  Menu,
  Scan,
  Users,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

type Section = "home" | "assessment" | "knowledge" | "scan" | "about";

const navItems: { id: Section; label: string; icon: React.ReactNode }[] = [
  { id: "home", label: "Home", icon: <Home className="w-5 h-5" /> },
  {
    id: "assessment",
    label: "Start Assessment",
    icon: <ClipboardCheck className="w-5 h-5" />,
  },
  {
    id: "knowledge",
    label: "Knowledge Hub",
    icon: <BookOpen className="w-5 h-5" />,
  },
  { id: "scan", label: "Scan to BIM", icon: <Scan className="w-5 h-5" /> },
  { id: "about", label: "About Us", icon: <Users className="w-5 h-5" /> },
];

export default function App() {
  const [activeSection, setActiveSection] = useState<Section>("home");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderSection = () => {
    switch (activeSection) {
      case "home":
        return (
          <HomeSection onNavigate={(s) => setActiveSection(s as Section)} />
        );
      case "assessment":
        return <AssessmentSection />;
      case "knowledge":
        return <KnowledgeHubSection />;
      case "scan":
        return <ScanToBIMSection />;
      case "about":
        return <AboutUsSection />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar overlay for mobile */}
      {sidebarOpen && (
        <div
          role="presentation"
          className="fixed inset-0 bg-black/60 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          onKeyDown={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-30
          w-64 flex flex-col bg-sidebar border-r border-sidebar-border
          transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-sidebar-border">
          <div className="w-9 h-9 rounded-lg bg-primary/20 flex items-center justify-center border border-primary/30">
            <Zap className="w-5 h-5 text-primary" />
          </div>
          <div>
            <span className="font-display font-700 text-xl text-foreground tracking-tight">
              RetroFit
            </span>
            <p className="text-xs text-muted-foreground leading-none">
              Structural Engineering
            </p>
          </div>
          <button
            type="button"
            className="ml-auto lg:hidden text-muted-foreground hover:text-foreground"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1" data-ocid="sidebar.panel">
          {navItems.map((item) => (
            <button
              type="button"
              key={item.id}
              data-ocid={`nav.${item.id}.link`}
              onClick={() => {
                setActiveSection(item.id);
                setSidebarOpen(false);
              }}
              className={`
                w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium
                transition-all duration-200
                ${
                  activeSection === item.id
                    ? "bg-primary/15 text-primary border border-primary/25"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                }
              `}
            >
              {item.icon}
              {item.label}
              {activeSection === item.id && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
              )}
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-sidebar-border">
          <p className="text-xs text-muted-foreground leading-relaxed">
            This software is developed based on the problem statement of
            structural health assessment and retrofitting of existing RCC
            structures.
          </p>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile top bar */}
        <header className="lg:hidden flex items-center gap-3 px-4 py-3 border-b border-border bg-sidebar">
          <Button
            variant="ghost"
            size="sm"
            className="p-2"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </Button>
          <span className="font-display font-bold text-lg text-foreground">
            RetroFit
          </span>
        </header>

        <main className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="h-full"
            >
              {renderSection()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      <Toaster />
    </div>
  );
}
