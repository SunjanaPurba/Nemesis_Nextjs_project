"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const features = [
  {
    title: "Product CRUD Operations",
    description:
      "Create, view, update, and delete products with elegant forms and dynamic App Router routing.",
    icon: "M11 5h2m-1-1v2m-7 4h14M5 12h14M5 16h14",
    span: "md:col-span-6 lg:col-span-4 row-span-1",
  },
  {
    title: "Google & Credentials Login",
    description:
      "Secure sign-in via Google OAuth or email/password — powered by NextAuth.js v5.",
    icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
    span: "md:col-span-6 lg:col-span-4 row-span-1",
  },
  {
    title: "Protected Dashboard Routes",
    description:
      "Middleware-protected routes — only authenticated users access the dashboard.",
    icon: "M9 12l2 2 4-4M7 12a5 5 0 1110 0 5 5 0 01-10 0z",
    span: "md:col-span-6 lg:col-span-4 row-span-1",
  },
  {
    title: "Server Components & API Routes",
    description:
      "Next.js Server Components + API routes for fast, secure, and clean data handling.",
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
    span: "md:col-span-12 lg:col-span-8 row-span-2 bg-gradient-to-br from-purple-500/10 to-indigo-500/10",
  },
];

const testimonials = [
  {
    quote:
      "Clean protected routes and solid auth flow — perfect CRUD architecture example.",
    author: "Imran Hossain",
    role: "Full Stack Developer",
  },
  {
    quote:
      "App Router + API structure is very clear. Public/private separation is on point.",
    author: "Tanjila Akter",
    role: "Frontend Developer",
  },
  {
    quote:
      "Google + credentials login feels production-grade. Great base for e-commerce.",
    author: "Mahmudul Karim",
    role: "Software Engineer",
  },
];

// Animation variants
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const wordReveal = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.5 },
  }),
};

export default function Home() {
  return (
    <main className="min-h-screen text-white relative overflow-hidden">
      {/* Background overlay */}
      <div className="fixed inset-0 bg-black/60 z-[-2]" />

      {/* Blurred product background */}
      <div
        className="fixed inset-0 z-[-3] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://thumbs.dreamstime.com/b/shopping-cart-digital-screen-technology-background-displayed-interface-high-tech-representing-e-commerce-online-368582361.jpg')`,
          filter: 'blur(8px) brightness(0.7)',
          transform: 'scale(1.1)',
        }}
      />

      {/* Animated blobs */}
      <div className="absolute inset-0 pointer-events-none z-[-1]">
        <div className="absolute -left-20 top-20 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute right-10 bottom-40 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
        <div className="absolute left-1/3 top-1/2 w-64 h-64 bg-pink-500/15 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
      </div>

      {/* Hero Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="relative py-32 md:py-48 lg:py-64 text-center border-b border-white/5"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
          <div className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-tight">
            {"Secure Product".split(" ").map((word, idx) => (
              <motion.span
                key={`secure-${idx}`}
                custom={idx}
                variants={wordReveal}
                className="inline-block bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient-x"
              >
                {word}&nbsp;
              </motion.span>
            ))}
            <br />
            {"Management".split(" ").map((word, idx) => (
              <motion.span
                key={`manage-${idx}`}
                custom={idx + 4}
                variants={wordReveal}
                className="inline-block bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 bg-clip-text text-transparent animate-gradient-x animation-delay-3000"
              >
                {word}&nbsp;
              </motion.span>
            ))}
          </div>

          <motion.p
            variants={fadeUp}
            className="mt-8 text-xl md:text-2xl text-zinc-300 max-w-3xl mx-auto"
          >
            Full-stack Next.js App Router app with NextAuth, protected routes, and complete product CRUD.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-12 flex flex-col sm:flex-row gap-6 justify-center"
          >
            <Link
              href="/products"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 px-8 py-4 text-lg font-semibold text-white shadow-lg hover:shadow-purple-500/30 transition-all hover:scale-105"
            >
              Explore Products
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-8 py-4 text-lg font-semibold backdrop-blur-sm hover:bg-white/10 transition-all hover:scale-105"
            >
              Start Now
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <section id="features" className="py-24 md:py-32 relative z-10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold">Core Features</h2>
            <p className="mt-4 text-zinc-400 text-lg">Modern full-stack capabilities built right in</p>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6 auto-rows-fr"
          >
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                variants={fadeUp}
                whileHover={{ scale: 1.04, y: -8, transition: { duration: 0.3 } }}
                className={`group rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 transition-all hover:border-purple-500/30 hover:shadow-xl hover:shadow-purple-500/10 ${feature.span}`}
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500/20 to-indigo-500/20 text-purple-400 mb-6">
                  <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-zinc-400">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 md:py-32 border-y border-white/5 bg-black/30 relative z-10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold">What Developers Say</h2>
            <p className="mt-4 text-zinc-400 text-lg">Real feedback on structure & quality</p>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.author}
                variants={fadeUp}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 hover:border-purple-500/20 transition-all hover:shadow-lg hover:shadow-purple-500/10"
              >
                <p className="text-lg text-zinc-200 mb-6">“{testimonial.quote}”</p>
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-zinc-500">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        viewport={{ once: true }}
        id="about"
        className="py-24 md:py-32 relative z-10"
      >
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-10 md:p-16 text-center">
            <h2 className="text-4xl font-bold mb-8">About This Project</h2>
            <p className="text-lg text-zinc-300 leading-relaxed max-w-3xl mx-auto">
              A production-ready full-stack product management app built with Next.js App Router, NextAuth.js (Google + credentials),
              middleware route protection, Server Components, and clean API routes. Perfect foundation for SaaS, e-commerce, or admin dashboards.
            </p>
          </div>
        </div>
      </motion.section>
    </main>
  );
}