"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, AlertCircle, Mail, Linkedin, Instagram } from "lucide-react";
import { contato } from "@/data/wolfData";
import SectionTitle from "./SectionTitle";

type FormStatus = "idle" | "sending" | "success" | "error";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xdaqwryy";

export default function Contact() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (form: HTMLFormElement) => {
    const errs: Record<string, string> = {};
    const name = (form.elements.namedItem("name") as HTMLInputElement)?.value.trim();
    const email = (form.elements.namedItem("email") as HTMLInputElement)?.value.trim();
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement)?.value.trim();

    if (!name) errs.name = "O nome é obrigatório";
    if (!email) errs.email = "O email é obrigatório";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = "Email inválido";
    if (!message) errs.message = "A mensagem é obrigatória";
    else if (message.length < 10) errs.message = "Mensagem muito curta (mín. 10 caracteres)";

    return errs;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setStatus("sending");
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contato" className="py-24 bg-wolf-light-gray/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          label="Contato"
          title="Entre em contato"
          description="Tem interesse em saber mais ou fazer parte da Wolf Finance?"
        />

        <div className="max-w-4xl mx-auto grid lg:grid-cols-5 gap-10">
          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit}
            noValidate
            className="lg:col-span-3 space-y-5"
          >
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-wolf-navy mb-1.5">
                Nome
              </label>
              <input
                type="text"
                id="name"
                name="name"
                autoComplete="name"
                className={`w-full px-4 py-3 rounded-xl border bg-white text-wolf-navy placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-wolf-blue focus:border-transparent transition-shadow ${
                  errors.name ? "border-red-400" : "border-gray-300"
                }`}
                placeholder="Seu nome"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle size={14} /> {errors.name}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-wolf-navy mb-1.5">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                className={`w-full px-4 py-3 rounded-xl border bg-white text-wolf-navy placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-wolf-blue focus:border-transparent transition-shadow ${
                  errors.email ? "border-red-400" : "border-gray-300"
                }`}
                placeholder="seu@email.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle size={14} /> {errors.email}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-wolf-navy mb-1.5">
                Mensagem
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                className={`w-full px-4 py-3 rounded-xl border bg-white text-wolf-navy placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-wolf-blue focus:border-transparent transition-shadow resize-y ${
                  errors.message ? "border-red-400" : "border-gray-300"
                }`}
                placeholder="Sua mensagem"
              />
              {errors.message && (
                <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle size={14} /> {errors.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-wolf-blue rounded-xl hover:bg-[#254a7d] transition-colors disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-wolf-blue focus-visible:ring-offset-2"
            >
              {status === "sending" ? (
                "Enviando..."
              ) : (
                <>
                  <Send size={16} />
                  Enviar mensagem
                </>
              )}
            </button>

            {status === "success" && (
              <p className="flex items-center gap-2 text-sm text-emerald-600">
                <CheckCircle size={16} /> Mensagem enviada com sucesso!
              </p>
            )}
            {status === "error" && (
              <p className="flex items-center gap-2 text-sm text-red-500">
                <AlertCircle size={16} /> Erro ao enviar. Tente novamente.
              </p>
            )}
          </motion.form>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="bg-white rounded-2xl border border-wolf-light-gray p-6">
              <h3 className="font-semibold text-wolf-navy mb-4">Canais diretos</h3>
              <div className="space-y-4">
                <a
                  href={`mailto:${contato.email}`}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-wolf-light-gray/50 transition-colors text-sm text-wolf-navy/70 hover:text-wolf-blue"
                >
                  <Mail size={18} className="text-wolf-blue" />
                  {contato.email}
                </a>
                <a
                  href={contato.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-wolf-light-gray/50 transition-colors text-sm text-wolf-navy/70 hover:text-wolf-blue"
                >
                  <Instagram size={18} className="text-wolf-blue" />
                  Instagram
                </a>
                <a
                  href={contato.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-wolf-light-gray/50 transition-colors text-sm text-wolf-navy/70 hover:text-wolf-blue"
                >
                  <Linkedin size={18} className="text-wolf-blue" />
                  LinkedIn
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
