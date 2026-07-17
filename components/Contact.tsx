"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, AlertCircle, Download } from "lucide-react";
import { personalInfo, socialLinks } from "@/data/portfolioData";
import SectionTitle from "./SectionTitle";
import SocialLinks from "./SocialLinks";
import { useLanguage } from "@/context/LanguageContext";

type FormStatus = "idle" | "sending" | "success" | "error";

// Crie seu formulário em https://formspree.io para matheuspc3@hotmail.com e cole o ID abaixo
const FORMSPREE_ENDPOINT = "https://formspree.io/f/mkodjevl";

export default function Contact() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { t } = useLanguage();

  const validate = (form: HTMLFormElement) => {
    const errs: Record<string, string> = {};
    const name = (form.elements.namedItem("name") as HTMLInputElement)?.value.trim();
    const email = (form.elements.namedItem("email") as HTMLInputElement)?.value.trim();
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement)?.value.trim();

    if (!name) errs.name = t("contact.validation.nameRequired");
    if (!email) errs.email = t("contact.validation.emailRequired");
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = t("contact.validation.emailInvalid");
    if (!message) errs.message = t("contact.validation.messageRequired");
    else if (message.length < 10) errs.message = t("contact.validation.messageShort");

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
    <section id="contact" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          label={t("contact.label")}
          title={t("contact.title")}
          description={t("contact.description")}
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
              <label htmlFor="name" className="block text-sm font-medium text-white mb-1.5">
                {t("contact.name")}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                autoComplete="name"
                className={`w-full px-4 py-3 rounded-xl border bg-white text-[#001030] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#003070] focus:border-transparent transition-shadow ${
                  errors.name ? "border-red-400" : "border-gray-300"
                }`}
                placeholder={t("contact.namePlaceholder")}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle size={14} /> {errors.name}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white mb-1.5">
                {t("contact.email")}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                className={`w-full px-4 py-3 rounded-xl border bg-white text-[#001030] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#003070] focus:border-transparent transition-shadow ${
                  errors.email ? "border-red-400" : "border-gray-300"
                }`}
                placeholder={t("contact.emailPlaceholder")}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle size={14} /> {errors.email}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-white mb-1.5">
                {t("contact.message")}
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                className={`w-full px-4 py-3 rounded-xl border bg-white text-[#001030] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#003070] focus:border-transparent transition-shadow resize-y ${
                  errors.message ? "border-red-400" : "border-gray-300"
                }`}
                placeholder={t("contact.messagePlaceholder")}
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
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-[#003070] rounded-xl hover:bg-[#003060] transition-colors disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-[#003070] focus-visible:ring-offset-2"
            >
              {status === "sending" ? (
                t("contact.sending")
              ) : (
                <>
                  <Send size={16} />
                  {t("contact.send")}
                </>
              )}
            </button>

            {status === "success" && (
              <p className="flex items-center gap-2 text-sm text-emerald-600">
                <CheckCircle size={16} /> {t("contact.success")}
              </p>
            )}
            {status === "error" && (
              <p className="flex items-center gap-2 text-sm text-red-500">
                <AlertCircle size={16} /> {t("contact.error")}
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
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="font-semibold text-[#001030] mb-4">{t("contact.directChannels")}</h3>
              <div className="space-y-3">
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="block p-3 rounded-xl hover:bg-gray-50 transition-colors text-sm text-gray-600 hover:text-[#003070]"
                >
                  <span className="font-medium text-[#001030]">{t("contact.emailLabel")}</span>
                  <br />
                  {personalInfo.email}
                </a>
                <div className="p-3">
                  <span className="font-medium text-[#001030] text-sm">{t("contact.socialLabel")}</span>
                  <div className="mt-2">
                    <SocialLinks links={socialLinks} />
                  </div>
                </div>
              </div>
            </div>

            <a
              href={personalInfo.resumeUrl}
              className="flex items-center justify-center gap-2 w-full px-4 py-3 text-sm font-semibold text-[#003070] bg-blue-50 rounded-xl hover:bg-[#003070] hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#003070] focus-visible:ring-offset-2"
            >
              <Download size={16} />
              {t("contact.downloadResume")}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
