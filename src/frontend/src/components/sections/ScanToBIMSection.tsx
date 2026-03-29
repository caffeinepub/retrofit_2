import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChevronRight,
  Cpu,
  CuboidIcon,
  File,
  Ruler,
  ScanLine,
  Upload,
  X,
} from "lucide-react";
import { motion } from "motion/react";
import { useRef, useState } from "react";
import { toast } from "sonner";

const workflow = [
  {
    icon: <ScanLine className="w-6 h-6" />,
    title: "3D Laser Scanning",
    desc: "High-density point cloud acquisition using terrestrial LiDAR scanners (Leica, FARO, Trimble)",
  },
  {
    icon: <Cpu className="w-6 h-6" />,
    title: "Point Cloud Processing",
    desc: "Registration, noise filtering, and segmentation of raw scan data using Recap Pro or CloudCompare",
  },
  {
    icon: <CuboidIcon className="w-6 h-6" />,
    title: "BIM Model Generation",
    desc: "Semi-automated geometry extraction and Revit family placement from processed point cloud",
  },
  {
    icon: <Ruler className="w-6 h-6" />,
    title: "Retrofit Design",
    desc: "Overlay NDT results on BIM model, clash detection, and retrofit element design within BIM environment",
  },
];

const technologies = [
  {
    title: "Terrestrial LiDAR",
    spec: "Leica RTC360 / FARO Focus",
    detail: "Range: 0.5–130m, Accuracy: ±2mm, Speed: 1M pts/sec",
  },
  {
    title: "Photogrammetry",
    spec: "Reality Capture / Metashape",
    detail: "GSD: 2–5mm, Overlap: 80/60%, RGB + thermal capable",
  },
  {
    title: "BIM Software",
    spec: "Autodesk Revit 2024",
    detail: "IFC 4.0 export, COBie data, BCF issue tracking",
  },
  {
    title: "Supported Formats",
    spec: ".rcp .rcs .e57 .las .pts",
    detail: "Also: .dwg .dxf .rvt .ifc .fbx for BIM exchange",
  },
];

const ACCEPTED_EXTS = [".rcp", ".rcs", ".e57", ".dwg", ".dxf", ".rvt"];

export default function ScanToBIMSection() {
  const [dragOver, setDragOver] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const dropped = Array.from(e.dataTransfer.files);
    addFiles(dropped);
  };

  const addFiles = (incoming: File[]) => {
    const valid = incoming.filter((f) =>
      ACCEPTED_EXTS.some((ext) => f.name.toLowerCase().endsWith(ext)),
    );
    if (valid.length < incoming.length) {
      toast.error(
        `Some files were skipped. Accepted formats: ${ACCEPTED_EXTS.join(", ")}`,
      );
    }
    if (valid.length > 0) {
      setFiles((prev) => [...prev, ...valid]);
      toast.success(`${valid.length} file(s) added successfully`);
    }
  };

  return (
    <div className="min-h-full px-6 lg:px-12 py-10">
      {/* Intro */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mb-12"
      >
        <h1 className="font-display text-3xl font-bold mb-3">Scan to BIM</h1>
        <p className="text-muted-foreground text-base leading-relaxed">
          Transform 3D laser scan data into accurate Building Information Models
          for precise retrofit design. Our workflow integrates LiDAR point
          clouds with Revit BIM environment to enable clash-free retrofit
          detailing.
        </p>
      </motion.div>

      {/* Workflow */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="mb-12"
      >
        <h2 className="font-display text-2xl font-bold mb-6">Workflow</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {workflow.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i + 0.2 }}
            >
              <div className="relative">
                <Card className="bg-card border-border/60 h-full">
                  <CardContent className="p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center text-primary">
                        {step.icon}
                      </div>
                      <span className="text-2xl font-display font-bold text-muted-foreground/30">
                        0{i + 1}
                      </span>
                    </div>
                    <h3 className="font-display font-semibold text-sm mb-2">
                      {step.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {step.desc}
                    </p>
                  </CardContent>
                </Card>
                {i < workflow.length - 1 && (
                  <ChevronRight className="hidden lg:block absolute -right-2.5 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/40 z-10" />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Technology Details */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mb-12"
      >
        <h2 className="font-display text-2xl font-bold mb-6">Technology</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {technologies.map((tech, i) => (
            <Card
              key={tech.title}
              className="bg-card border-border/60"
              data-ocid={`scan.tech.item.${i + 1}`}
            >
              <CardContent className="p-4">
                <h3 className="font-display font-semibold text-sm mb-1">
                  {tech.title}
                </h3>
                <p className="text-primary text-xs font-medium mb-2">
                  {tech.spec}
                </p>
                <p className="text-muted-foreground text-xs leading-relaxed">
                  {tech.detail}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.section>

      {/* File Upload */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.45 }}
        className="pb-16 max-w-2xl"
      >
        <h2 className="font-display text-2xl font-bold mb-2">
          Upload Scan Files
        </h2>
        <p className="text-muted-foreground text-sm mb-4">
          Drag & drop your scan or BIM files for processing. Accepted: .rcp .rcs
          .e57 .dwg .dxf .rvt
        </p>

        <button
          type="button"
          data-ocid="scan.dropzone"
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
          className={`
            border-2 border-dashed rounded-xl p-12 text-center cursor-pointer
            transition-all duration-200
            ${
              dragOver
                ? "border-primary/60 bg-primary/10"
                : "border-border/50 bg-card hover:border-primary/30 hover:bg-card"
            }
          `}
        >
          <Upload
            className={`w-10 h-10 mx-auto mb-3 transition-colors ${dragOver ? "text-primary" : "text-muted-foreground"}`}
          />
          <p className="text-sm font-medium mb-1">Drag & drop files here</p>
          <p className="text-xs text-muted-foreground mb-4">
            or click to browse
          </p>
          <Button
            data-ocid="scan.upload_button"
            size="sm"
            variant="outline"
            className="border-border/60"
            onClick={(e) => {
              e.stopPropagation();
              inputRef.current?.click();
            }}
          >
            Browse Files
          </Button>
          <input
            ref={inputRef}
            type="file"
            multiple
            accept=".rcp,.rcs,.e57,.dwg,.dxf,.rvt"
            className="hidden"
            onChange={(e) =>
              e.target.files && addFiles(Array.from(e.target.files))
            }
          />
        </button>

        {files.length > 0 && (
          <div className="mt-4 space-y-2">
            {files.map((f, i) => (
              <div
                key={f.name}
                className="flex items-center gap-3 bg-card border border-border/60 rounded-lg px-4 py-2.5"
              >
                <File className="w-4 h-4 text-primary shrink-0" />
                <span className="text-sm flex-1 truncate">{f.name}</span>
                <Badge
                  variant="outline"
                  className="text-xs border-border/40 text-muted-foreground"
                >
                  {(f.size / 1024).toFixed(0)} KB
                </Badge>
                <button
                  type="button"
                  onClick={() =>
                    setFiles((prev) => prev.filter((_, fi) => fi !== i))
                  }
                  className="text-muted-foreground hover:text-destructive transition-colors"
                  data-ocid={`scan.file.delete_button.${i + 1}`}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </motion.section>
    </div>
  );
}
