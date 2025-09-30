import { motion } from "framer-motion";
import { Heart, Shield, Users, TrendingUp } from "lucide-react";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6" data-testid="heading-about">
              About Provision ExperTax
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto" data-testid="text-about-subtitle">
              Your trusted partner in tax preparation, credit repair, and financial freedom
            </p>
          </motion.div>
        </div>
      </section>

      {/* Founder's Bio Section */}
      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-card border border-border rounded-lg p-8 md:p-12"
          >
            <h2 className="text-3xl font-bold mb-6 text-foreground" data-testid="heading-founder">
              Meet Alexandra
            </h2>
            
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
              <p data-testid="text-bio-intro">
                Hi, I'm <span className="font-semibold text-foreground">Alexandra</span> – founder of Provision ExperTax Services, a dedicated tax professional, and a certified credit repair specialist with over 5 years of experience helping individuals and businesses across all 52 states.
              </p>

              <p data-testid="text-bio-services">
                At Provision ExperTax, I specialize in personal and business tax preparation, amendments, bookkeeping, business registration & training, ITIN registration, IRS support, and credit repair. Whether you're filing taxes for the first time or trying to repair your credit and rebuild your financial life, I'm here to guide you with honesty, transparency, and care.
              </p>

              <p data-testid="text-bio-values">
                What sets me apart? <span className="font-semibold text-foreground">I keep it real with my clients.</span> I believe in building trust through clear communication, and my goal is always to create long-term relationships—not just quick fixes. When we work together, you're not just getting a service—you're gaining a partner who truly cares about your financial well-being.
              </p>

              <p data-testid="text-bio-passion">
                My passion comes from seeing people happy and confident—especially when I can play a role in helping them become debt-free, financially secure, and smiling again. When I'm not crunching numbers or coaching clients, you'll find me enjoying life's spontaneous and fun moments—because balance matters.
              </p>

              <p className="text-lg font-semibold text-foreground italic" data-testid="text-bio-cta">
                Let's take control of your financial future—one step, one plan, and one honest conversation at a time.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12" data-testid="heading-values">
            Our Core Values
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center"
              data-testid="card-value-honesty"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mb-4">
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Honesty & Transparency</h3>
              <p className="text-muted-foreground">
                Clear communication and honest guidance every step of the way
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center"
              data-testid="card-value-relationships"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mb-4">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Long-Term Relationships</h3>
              <p className="text-muted-foreground">
                Building partnerships, not just providing quick fixes
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-center"
              data-testid="card-value-care"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mb-4">
                <Heart className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Genuine Care</h3>
              <p className="text-muted-foreground">
                Your financial well-being is our top priority
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-center"
              data-testid="card-value-results"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mb-4">
                <TrendingUp className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Proven Results</h3>
              <p className="text-muted-foreground">
                5+ years of helping clients achieve financial freedom
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
