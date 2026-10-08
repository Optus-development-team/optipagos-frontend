"use client";

import { useActionState } from "react";
import { joinBeta, type BetaField, type BetaState } from "@/app/actions/beta";
import { Sparkle, Star } from "@/components/doodles";
import { DoodleIcon } from "@/components/icons";
import { NotchCard } from "@/components/ui/NotchCard";
import { Reveal } from "@/components/ui/Reveal";
import type { Dictionary } from "@/i18n/dictionaries";

const initial: BetaState = {
  status: "idle",
  errors: [],
  values: { name: "", email: "", phone: "", use: "" },
};

/** Formulario de registro para la beta cerrada (acción del servidor: funciona sin JavaScript). */
export function BetaSignup({ t }: { t: Dictionary["beta"] }) {
  const [state, action, pending] = useActionState(joinBeta, initial);
  const error = (field: BetaField) => state.errors.includes(field);

  return (
    <section id={t.id} className="scroll-mt-8">
      <Reveal effect="pop">
        <NotchCard
          corner="tl"
          tone="honey"
          notch={[92, 92]}
          chip={
            <span className="chip-tile tone-ink boil">
              <DoodleIcon name="list" className="h-11 w-11" />
            </span>
          }
        >
          <div className="relative px-6 pb-10 pt-8 sm:px-12 sm:pb-12">
            <Sparkle className="absolute right-6 top-6 hidden h-8 w-8 animate-twinkle sm:block" />
            <Star className="absolute bottom-6 right-10 hidden h-6 w-6 text-ink-600 md:block" />
            <div className="pl-[88px] sm:pl-[72px]">
              <p className="hand text-2xl text-ink-600">{t.eyebrow}</p>
              <h2 className="display text-5xl sm:text-7xl">{t.title}</h2>
            </div>
            <p className="mt-5 max-w-2xl text-xl leading-snug">{t.text}</p>

            {state.status === "ok" ? (
              <div role="status" className="alert mt-8 max-w-xl">
                <p className="display text-3xl">{t.successTitle}</p>
                <p className="mt-1 text-lg">{t.successText}</p>
              </div>
            ) : (
              <form action={action} noValidate className="mt-8 grid max-w-3xl gap-5 sm:grid-cols-2">
                {state.errors.includes("generic") && (
                  <p role="alert" className="alert sm:col-span-2">
                    {t.errors.generic}
                  </p>
                )}

                <Field label={t.nameLabel} error={error("name") ? t.errors.name : undefined}>
                  <input
                    name="name"
                    autoComplete="name"
                    required
                    maxLength={120}
                    placeholder={t.namePlaceholder}
                    defaultValue={state.values.name}
                    aria-invalid={error("name")}
                    className="field"
                  />
                </Field>
                <Field label={t.emailLabel} error={error("email") ? t.errors.email : undefined}>
                  <input
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    maxLength={200}
                    placeholder={t.emailPlaceholder}
                    defaultValue={state.values.email}
                    aria-invalid={error("email")}
                    className="field"
                  />
                </Field>
                <Field label={t.phoneLabel} error={error("phone") ? t.errors.phone : undefined}>
                  <input
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    required
                    maxLength={30}
                    placeholder={t.phonePlaceholder}
                    defaultValue={state.values.phone}
                    aria-invalid={error("phone")}
                    className="field"
                  />
                </Field>
                <Field label={t.useLabel} error={error("use") ? t.errors.use : undefined}>
                  <select
                    name="use"
                    required
                    defaultValue={state.values.use}
                    aria-invalid={error("use")}
                    className="field"
                  >
                    <option value="" disabled />
                    <option value="personal">{t.uses.personal}</option>
                    <option value="business">{t.uses.business}</option>
                    <option value="both">{t.uses.both}</option>
                  </select>
                </Field>

                {/* Trampa para robots: una persona nunca lo ve ni lo llena. */}
                <input
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="absolute -left-[9999px] h-0 w-0 opacity-0"
                />

                <div className="sm:col-span-2">
                  <label className="flex items-start gap-3 text-lg leading-snug">
                    <input
                      type="checkbox"
                      name="consent"
                      required
                      aria-invalid={error("consent")}
                      className="mt-1.5 h-5 w-5 flex-none accent-[var(--color-ink)]"
                    />
                    {t.consent}
                  </label>
                  {error("consent") && (
                    <p role="alert" className="mt-1 font-semibold text-clay">
                      {t.errors.consent}
                    </p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <button type="submit" disabled={pending} className="btn btn-primary">
                    {pending ? t.sending : t.submit}
                  </button>
                </div>
              </form>
            )}
          </div>
        </NotchCard>
      </Reveal>
    </section>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="hand text-xl">{label}</span>
      {children}
      {error && (
        <span role="alert" className="font-semibold text-clay">
          {error}
        </span>
      )}
    </label>
  );
}
