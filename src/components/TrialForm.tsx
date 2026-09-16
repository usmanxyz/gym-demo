"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { AUDIENCE_LABELS, site } from "@/content/site";
import { formatPKR } from "@/lib/format";
import { formatPkMobile, parsePkMobile } from "@/lib/phone";
import { waLink } from "@/lib/wa";
import { Reveal } from "./Reveal";
import { WhatsAppIcon } from "./WhatsAppIcon";

const form = site.trialForm;

/** Of the three audiences, only two are floors you can book yourself onto. */
type Floor = "ladies" | "gents";
const FLOORS: readonly Floor[] = ["ladies", "gents"];

type BatchOption = { readonly key: string; readonly label: string; readonly window: string };

/** The fields that can fail, in the order the eye moves down the form. */
const REQUIRED = ["name", "phone", "programme", "floor", "batch"] as const;
type FieldKey = (typeof REQUIRED)[number];
type Errors = Partial<Record<FieldKey, string>>;

/**
 * The conversion moment. There is no backend and nothing is stored: a valid
 * form composes a WhatsApp message, opens wa.me in a new tab and hands the
 * visitor a success state that still holds the message, in case the tab was
 * blocked or closed by accident.
 *
 * Errors appear inline under the field they belong to, and only after a first
 * submit — validating while someone is still typing their name is nagging.
 * After that first submit the field clears its own error as soon as it becomes
 * valid, so the form stops complaining the moment it's fixed.
 */
export function TrialForm() {
  const uid = useId();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [programme, setProgramme] = useState("");
  const [floor, setFloor] = useState<Floor | "">("");
  const [batch, setBatch] = useState("");
  const [plan, setPlan] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [sent, setSent] = useState<string | null>(null);

  const batches: readonly BatchOption[] = floor ? form.batches[floor] : [];
  const fieldId = (field: string) => `${uid}-${field}`;
  const errorId = (field: FieldKey) => `${uid}-${field}-error`;

  /** Re-checks a single field, but only once the form has been submitted. */
  const revalidate = (next: Partial<Record<FieldKey, boolean>>) => {
    if (!submitted) return;
    setErrors((prev) => {
      const cleared = { ...prev };
      for (const [field, ok] of Object.entries(next)) {
        if (ok) delete cleared[field as FieldKey];
      }
      return cleared;
    });
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);

    const national = parsePkMobile(phone);
    const found: Errors = {};
    if (!name.trim()) found.name = form.errors.name;
    if (!national) found.phone = form.errors.phone;
    if (!programme) found.programme = form.errors.programme;
    if (!floor) found.floor = form.errors.floor;
    else if (!batch) found.batch = form.errors.batch;
    setErrors(found);

    const firstBad = REQUIRED.find((field) => found[field]);
    if (firstBad || !national || !floor) {
      // Land the caret on the first thing that needs fixing.
      document.getElementById(fieldId(firstBad ?? "name"))?.focus();
      return;
    }

    // Tidy the number up as we send it, however it was typed.
    const message = composeMessage({
      name: name.trim(),
      phone: formatPkMobile(national),
      programme,
      floor,
      batch,
      plan,
    });
    window.open(waLink(message), "_blank", "noopener,noreferrer");
    setSent(message);
  };

  const reset = () => {
    setName("");
    setPhone("");
    setProgramme("");
    setFloor("");
    setBatch("");
    setPlan("");
    setErrors({});
    setSubmitted(false);
    setSent(null);
  };

  return (
    <section id="book" className="border-t border-iron-line py-20 md:py-28">
      {/* Same max-w-7xl measure as the hero and the board. On max-w-3xl this
          section started 256px to the right of every other left edge on the
          page — not aligned with them and not centred on the page either. */}
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <h2 className="display text-3xl text-bone md:text-5xl">{form.heading}</h2>
          <p className="mt-4 max-w-xl text-smoke md:text-lg">{form.subhead}</p>
        </Reveal>

        {/* The panel itself moves, not the fields inside it. This is the
            conversion moment — nothing here is allowed to be still arriving
            while someone is trying to type into it. */}
        <Reveal delay={90} className="mt-10 max-w-3xl md:mt-12">
          <div className="rounded-ui border border-iron-line bg-iron p-5 md:p-8">
            {sent ? (
              <Sent message={sent} onReset={reset} />
            ) : (
              <form onSubmit={onSubmit} noValidate className="grid gap-7">
                <Field
                  label={form.fields.name.label}
                  htmlFor={fieldId("name")}
                  error={errors.name}
                  errorId={errorId("name")}
                >
                  <input
                    id={fieldId("name")}
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder={form.fields.name.placeholder}
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      revalidate({ name: e.target.value.trim() !== "" });
                    }}
                    aria-invalid={errors.name ? true : undefined}
                    aria-describedby={errors.name ? errorId("name") : undefined}
                    className={control(!!errors.name)}
                  />
                </Field>

                <Field
                  label={form.fields.phone.label}
                  htmlFor={fieldId("phone")}
                  hint={form.fields.phone.hint}
                  hintId={fieldId("phone-hint")}
                  error={errors.phone}
                  errorId={errorId("phone")}
                >
                  <input
                    id={fieldId("phone")}
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder={form.fields.phone.placeholder}
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      revalidate({ phone: parsePkMobile(e.target.value) !== null });
                    }}
                    onBlur={() => {
                      // Settle a valid number into the local spelling.
                      const national = parsePkMobile(phone);
                      if (national) setPhone(formatPkMobile(national));
                    }}
                    aria-invalid={errors.phone ? true : undefined}
                    aria-describedby={
                      errors.phone ? errorId("phone") : fieldId("phone-hint")
                    }
                    className={`${control(!!errors.phone)} tabular-nums tracking-wide`}
                  />
                </Field>

                <Field
                  label={form.fields.programme.label}
                  htmlFor={fieldId("programme")}
                  error={errors.programme}
                  errorId={errorId("programme")}
                >
                  <Select
                    id={fieldId("programme")}
                    name="programme"
                    value={programme}
                    invalid={!!errors.programme}
                    describedBy={errors.programme ? errorId("programme") : undefined}
                    onChange={(value) => {
                      setProgramme(value);
                      revalidate({ programme: value !== "" });
                      // The ladies' programme only runs on the ladies' floor, so
                      // picking it answers the next question too.
                      const picked = site.programmes.find((p) => p.slug === value);
                      if (picked?.audience === "ladies" && floor !== "ladies") {
                        setFloor("ladies");
                        setBatch("");
                        revalidate({ floor: true });
                      }
                    }}
                  >
                    <option value="">{form.fields.programme.placeholder}</option>
                    {site.programmes.map((p) => (
                      <option key={p.slug} value={p.slug}>
                        {p.name}
                      </option>
                    ))}
                  </Select>
                </Field>

                <div>
                  <p id={fieldId("floor-label")} className="text-sm font-medium text-bone">
                    {form.fields.floor.label}
                  </p>
                  <div
                    role="radiogroup"
                    aria-labelledby={fieldId("floor-label")}
                    aria-invalid={errors.floor ? true : undefined}
                    aria-describedby={errors.floor ? errorId("floor") : undefined}
                    className="mt-2.5 grid grid-cols-2 gap-2"
                  >
                    {FLOORS.map((key, index) => (
                      <Choice
                        key={key}
                        id={index === 0 ? fieldId("floor") : undefined}
                        name="floor"
                        label={AUDIENCE_LABELS[key]}
                        checked={floor === key}
                        invalid={!!errors.floor}
                        onSelect={() => {
                          setFloor(key);
                          // The two floors keep different hours, so a batch
                          // chosen for one means nothing on the other.
                          setBatch("");
                          revalidate({ floor: true });
                        }}
                      />
                    ))}
                  </div>
                  <ErrorText id={errorId("floor")} message={errors.floor} />
                </div>

                <div>
                  <p id={fieldId("batch-label")} className="text-sm font-medium text-bone">
                    {form.fields.batch.label}
                  </p>
                  {floor ? (
                    <div
                      role="radiogroup"
                      aria-labelledby={fieldId("batch-label")}
                      aria-invalid={errors.batch ? true : undefined}
                      aria-describedby={errors.batch ? errorId("batch") : undefined}
                      className="mt-2.5 grid gap-2 sm:grid-cols-2"
                    >
                      {batches.map((option, index) => (
                        <Choice
                          key={option.key}
                          id={index === 0 ? fieldId("batch") : undefined}
                          name="batch"
                          label={option.label}
                          detail={option.window}
                          checked={batch === option.key}
                          invalid={!!errors.batch}
                          onSelect={() => {
                            setBatch(option.key);
                            revalidate({ batch: true });
                          }}
                        />
                      ))}
                    </div>
                  ) : (
                    <p className="mt-2.5 text-sm text-smoke">
                      Pick a floor and its timings appear here.
                    </p>
                  )}
                  <ErrorText id={errorId("batch")} message={errors.batch} />
                </div>

                <Field
                  label={form.fields.plan.label}
                  htmlFor={fieldId("plan")}
                  optional={form.fields.plan.optional}
                  hint={form.fields.plan.hint}
                  hintId={fieldId("plan-hint")}
                >
                  <Select
                    id={fieldId("plan")}
                    name="plan"
                    value={plan}
                    describedBy={fieldId("plan-hint")}
                    onChange={setPlan}
                  >
                    <option value="">{form.fields.plan.placeholder}</option>
                    {site.membership.plans.map((p) => (
                      <option key={p.slug} value={p.slug}>
                        {p.name} — {formatPKR(p.pricePKR)}
                      </option>
                    ))}
                  </Select>
                </Field>

                <div>
                  {/* Full width, so the floating WhatsApp bubble in the corner
                      can never sit on top of the way to book. */}
                  <button
                    type="submit"
                    className="on-action flex min-h-14 w-full items-center justify-center gap-2.5 rounded-ui bg-wrap px-6 text-base font-semibold text-white transition-colors hover:bg-wrap-deep"
                  >
                    <WhatsAppIcon className="size-5 shrink-0" aria-hidden />
                    {form.submit}
                  </button>
                  <p className="mt-3 text-center text-sm text-smoke">{form.submitNote}</p>
                </div>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/** The panel that replaces the form once the message is on its way. */
function Sent({ message, onReset }: { message: string; onReset: () => void }) {
  const heading = useRef<HTMLHeadingElement>(null);

  // The form it replaced is gone from the page; move focus here so a screen
  // reader and a keyboard both land on the confirmation.
  useEffect(() => {
    heading.current?.focus();
  }, []);

  return (
    <div>
      <span
        aria-hidden
        className="grid size-12 place-items-center rounded-full bg-whatsapp text-ink"
      >
        <Check className="size-7" strokeWidth={3} />
      </span>

      {/* The ring is deliberately left on. Focus lands here by script rather
          than by tabbing, and a keyboard visitor who pressed Enter on Submit
          needs to see where the page moved them to. */}
      <h3
        ref={heading}
        tabIndex={-1}
        className="display-tight mt-5 text-2xl text-bone md:text-3xl"
      >
        {form.success.heading}
      </h3>
      <p className="mt-3 text-smoke">{form.success.body}</p>

      <div className="mt-6 rounded-ui border border-iron-line bg-ink p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-smoke">
          {form.success.sentLabel}
        </p>
        <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-bone/85">
          {message}
        </p>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <a
          href={waLink(message)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-12 items-center justify-center gap-2.5 rounded-ui bg-whatsapp px-6 font-semibold text-ink transition-colors hover:bg-whatsapp-hot"
        >
          <WhatsAppIcon className="size-5 shrink-0" aria-hidden />
          {form.success.retry}
        </a>
        <button
          type="button"
          onClick={onReset}
          className="min-h-12 rounded-ui border border-iron-line px-6 font-medium text-bone transition-colors hover:border-bone/40"
        >
          {form.success.reset}
        </button>
      </div>
    </div>
  );
}

function Field({
  label,
  htmlFor,
  optional,
  hint,
  hintId,
  error,
  errorId,
  children,
}: {
  label: string;
  htmlFor: string;
  optional?: string;
  hint?: string;
  hintId?: string;
  error?: string;
  errorId?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="flex items-baseline gap-2 text-sm font-medium text-bone">
        {label}
        {optional ? <span className="font-normal text-smoke">{optional}</span> : null}
      </label>
      <div className="mt-2.5">{children}</div>
      {hint && !error ? (
        <p id={hintId} className="mt-2 text-sm text-smoke">
          {hint}
        </p>
      ) : null}
      <ErrorText id={errorId} message={error} />
    </div>
  );
}

function ErrorText({ id, message }: { id?: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-2 text-sm font-medium text-wrap-hot">
      {message}
    </p>
  );
}

/** A native select, restyled — the chevron is ours, the behaviour isn't. */
function Select({
  id,
  name,
  value,
  invalid,
  describedBy,
  onChange,
  children,
}: {
  id: string;
  name: string;
  value: string;
  invalid?: boolean;
  describedBy?: string;
  onChange: (value: string) => void;
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <select
        id={id}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={invalid ? true : undefined}
        aria-describedby={describedBy}
        className={`${control(!!invalid)} cursor-pointer appearance-none pr-12 ${
          value === "" ? "text-smoke" : ""
        }`}
      >
        {children}
      </select>
      <ChevronDown
        aria-hidden
        className="pointer-events-none absolute right-4 top-1/2 size-5 -translate-y-1/2 text-smoke"
      />
    </div>
  );
}

/**
 * A radio dressed as a chip. The input stays in the DOM and keeps its keyboard
 * behaviour — arrow keys walk the group — and the visible chip picks up its
 * focus ring off the peer.
 */
function Choice({
  id,
  name,
  label,
  detail,
  checked,
  invalid,
  onSelect,
}: {
  id?: string;
  name: string;
  label: string;
  detail?: string;
  checked: boolean;
  /** Only styling: the error itself is announced on the group. */
  invalid?: boolean;
  onSelect: () => void;
}) {
  return (
    <label className="block">
      <input
        id={id}
        type="radio"
        name={name}
        checked={checked}
        onChange={onSelect}
        // The chip reads "Morning" beside "5 – 11 am" with no space between
        // them in the tree; spell the pair out for a screen reader.
        aria-label={detail ? `${label}, ${detail}` : undefined}
        className="peer sr-only"
      />
      <span
        className={`flex min-h-12 cursor-pointer items-center justify-between gap-3 rounded-ui border px-4 text-[0.95rem] transition-colors peer-focus-visible:outline-2 peer-focus-visible:outline-offset-[3px] peer-focus-visible:outline-wrap-hot ${
          checked
            ? "border-bone bg-bone font-semibold text-ink"
            : `bg-ink/40 font-medium text-bone/85 hover:border-bone/50 hover:bg-ink/70 ${
                invalid ? "border-wrap-hot/60" : "border-bone/25"
              }`
        }`}
      >
        {label}
        {detail ? (
          <span className={`numeral text-sm ${checked ? "text-ink/70" : "text-amber"}`}>
            {detail}
          </span>
        ) : null}
      </span>
    </label>
  );
}

/** Shared skin for the text inputs and selects. */
function control(invalid: boolean): string {
  return `min-h-12 w-full rounded-ui border bg-ink px-4 text-bone transition-colors placeholder:text-smoke placeholder:font-normal hover:border-bone/40 ${
    invalid ? "border-wrap-hot/60" : "border-iron-line"
  }`;
}

/**
 * The message that lands in WhatsApp: a greeting, the booking as labelled
 * lines a human can read at a glance, and the ask. The plan line is left out
 * entirely when nobody picked one, rather than sent as "Plan: none".
 */
function composeMessage(booking: {
  name: string;
  phone: string;
  programme: string;
  floor: Floor;
  batch: string;
  plan: string;
}): string {
  const { labels } = form.message;
  const programme = site.programmes.find((p) => p.slug === booking.programme);
  const batches: readonly BatchOption[] = form.batches[booking.floor];
  const slot = batches.find((option) => option.key === booking.batch);
  const plan = site.membership.plans.find((p) => p.slug === booking.plan);

  const lines = [
    `${labels.name}: ${booking.name}`,
    `${labels.phone}: ${booking.phone}`,
    `${labels.programme}: ${programme?.name ?? ""}`,
    `${labels.batch}: ${AUDIENCE_LABELS[booking.floor]} floor, ${slot?.label ?? ""} (${slot?.window ?? ""})`,
  ];
  if (plan) {
    lines.push(`${labels.plan}: ${plan.name} (${formatPKR(plan.pricePKR)})`);
  }

  return [form.message.intro, "", ...lines, "", form.message.outro].join("\n");
}
