import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, Send, User } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

const team = [
  {
    name: "Manas Bichadu",
    email: "mbichadu@gmail.com",
    role: "Structural Engineer",
    initials: "MB",
  },
  {
    name: "Shubham Dhole",
    email: "dholeshubham58@gmail.com",
    role: "Structural Engineer",
    initials: "SD",
  },
  {
    name: "Nitish Bandi",
    email: "nitishbandi3@gmail.com",
    role: "Structural Engineer",
    initials: "NB",
  },
];

export default function AboutUsSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! We'll get back to you within 24 hours.");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-full px-6 lg:px-12 py-10">
      {/* About */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mb-12"
      >
        <h1 className="font-display text-3xl font-bold mb-3">About RetroFit</h1>
        <p className="text-muted-foreground text-base leading-relaxed mb-4">
          RetroFit is a structural engineering platform developed by a team of
          passionate civil engineers to democratize access to advanced NDT
          assessment tools and retrofit design calculators.
        </p>
        <p className="text-muted-foreground text-base leading-relaxed">
          Our mission is to make India's aging infrastructure safer through
          data-driven structural assessment and code-compliant retrofit design —
          accessible to every practicing engineer, not just large consulting
          firms.
        </p>
      </motion.div>

      {/* Team */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="mb-12"
      >
        <h2 className="font-display text-2xl font-bold mb-6">Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i + 0.2 }}
            >
              <Card
                className="bg-card border-border/60 hover:border-primary/30 transition-colors"
                data-ocid={`about.team.item.${i + 1}`}
              >
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/20 border-2 border-primary/30 flex items-center justify-center mx-auto mb-4">
                    <span className="font-display font-bold text-xl text-primary">
                      {member.initials}
                    </span>
                  </div>
                  <h3 className="font-display font-semibold text-base mb-0.5">
                    {member.name}
                  </h3>
                  <p className="text-xs text-primary mb-3">{member.role}</p>
                  <a
                    href={`mailto:${member.email}`}
                    className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Mail className="w-3 h-3" />
                    {member.email}
                  </a>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Contact + Form */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="pb-16"
      >
        <h2 className="font-display text-2xl font-bold mb-6">Contact Us</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div>
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Email</p>
                  <a
                    href="mailto:mbichadu@gmail.com"
                    className="text-sm font-medium hover:text-primary transition-colors"
                  >
                    mbichadu@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Phone</p>
                  <a
                    href="tel:+918623026760"
                    className="text-sm font-medium hover:text-primary transition-colors"
                  >
                    +91 8623026760
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center">
                  <User className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Lead Engineer</p>
                  <p className="text-sm font-medium">Manas Bichadu</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-4"
            data-ocid="contact.modal"
          >
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Name</Label>
                <Input
                  required
                  value={form.name}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, name: e.target.value }))
                  }
                  placeholder="Your name"
                  data-ocid="contact.name.input"
                  className="bg-input border-border/60"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Email</Label>
                <Input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, email: e.target.value }))
                  }
                  placeholder="your@email.com"
                  data-ocid="contact.email.input"
                  className="bg-input border-border/60"
                />
              </div>
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Subject</Label>
              <Input
                required
                value={form.subject}
                onChange={(e) =>
                  setForm((p) => ({ ...p, subject: e.target.value }))
                }
                placeholder="Inquiry subject"
                data-ocid="contact.subject.input"
                className="bg-input border-border/60"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Message</Label>
              <Textarea
                required
                value={form.message}
                onChange={(e) =>
                  setForm((p) => ({ ...p, message: e.target.value }))
                }
                placeholder="Describe your project or query..."
                data-ocid="contact.message.textarea"
                rows={5}
                className="bg-input border-border/60 resize-none"
              />
            </div>
            <Button
              type="submit"
              data-ocid="contact.submit_button"
              className="w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Send className="w-4 h-4" />
              Send Message
            </Button>
          </form>
        </div>
      </motion.section>
    </div>
  );
}
