'use client';

import { useActionState, useState } from 'react';
import { useTranslations } from 'next-intl';
import { CheckCircle2, AlertCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Field } from '@/components/ui/field';
import { Input, Textarea } from '@/components/ui/input';
import { cn } from '@/lib/cn';
import {
  CONTACT_SUBJECTS,
  type ContactSubject,
  isContactSubject,
} from '@/lib/contact';
import {
  submitContactAction,
  type ContactFormState,
} from '@/app/[locale]/contact/actions';

const selectBase =
  'w-full rounded-md border border-border-interactive bg-surface px-(--space-4) py-(--space-3) text-base text-text focus-visible:outline-none focus-visible:shadow-(--focus-ring) aria-[invalid=true]:border-danger min-h-(--control-min-h)';

type ContactFormProps = {
  defaultSubject?: string | undefined;
  locale: string;
};

const initialState: ContactFormState = {
  ok: false,
};

export function ContactForm({ defaultSubject, locale }: ContactFormProps) {
  const t = useTranslations('contact');
  const [state, formAction, isPending] = useActionState(
    submitContactAction,
    initialState,
  );

  const [renderedAt, setRenderedAt] = useState<number>(() => Date.now());
  const [selectedSubject, setSelectedSubject] = useState<string>(() => {
    if (defaultSubject && isContactSubject(defaultSubject)) {
      return defaultSubject;
    }
    return 'general';
  });

  const [resetKey, setResetKey] = useState<number>(0);

  if (state.ok) {
    return (
      <div
        className="bg-surface-elevated flex flex-col items-center gap-4 rounded-xl border border-border p-8 text-center shadow-sm"
        role="status"
        aria-live="polite"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
          <CheckCircle2 className="h-7 w-7" aria-hidden="true" />
        </div>
        <h2 className="text-xl font-bold text-heading">
          {t('form.successTitle')}
        </h2>
        <p className="max-w-md text-base leading-relaxed text-text-muted">
          {t('form.successMessage')}
        </p>
        <Button
          variant="secondary"
          className="mt-2"
          onClick={() => {
            setRenderedAt(Date.now());
            setResetKey((k) => k + 1);
          }}
        >
          {t('form.sendAnother')}
        </Button>
      </div>
    );
  }

  const fieldErrors = state.fieldErrors ?? {};
  const hasErrors =
    Boolean(state.message) || Object.keys(fieldErrors).length > 0;

  return (
    <form
      key={resetKey}
      action={formAction}
      noValidate
      className="bg-surface-elevated flex flex-col gap-6 rounded-xl border border-border p-6 shadow-sm sm:p-8"
    >
      {/* Honeypot field for anti-bot trap */}
      <div
        className="pointer-events-none absolute -z-10 h-0 w-0 overflow-hidden opacity-0"
        aria-hidden="true"
      >
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* Hidden inputs for tracking & locale */}
      <input type="hidden" name="renderedAt" value={renderedAt} />
      <input type="hidden" name="locale" value={locale} />

      {/* Polite Live Region for status & errors */}
      <div
        aria-live="polite"
        aria-atomic="true"
        className={cn(
          hasErrors
            ? 'flex items-start gap-3 rounded-md border border-danger/30 bg-danger/10 p-4 text-sm text-danger'
            : 'sr-only',
        )}
      >
        {hasErrors ? (
          <>
            <AlertCircle
              className="mt-0.5 h-5 w-5 shrink-0"
              aria-hidden="true"
            />
            <div>
              <p className="font-semibold">{t('form.errorTitle')}</p>
              <p className="mt-0.5">
                {state.message
                  ? t(`errors.${state.message}` as const)
                  : t('errors.generic')}
              </p>
            </div>
          </>
        ) : null}
      </div>

      {/* Name Field */}
      <Field
        id="contact-name"
        label={t('form.nameLabel')}
        required
        error={
          fieldErrors.name
            ? t(`errors.${fieldErrors.name}` as const)
            : undefined
        }
      >
        {(props) => (
          <Input
            {...props}
            name="name"
            placeholder={t('form.namePlaceholder')}
            defaultValue={state.submittedValues?.name}
            autoComplete="name"
          />
        )}
      </Field>

      {/* Email Field */}
      <Field
        id="contact-email"
        label={t('form.emailLabel')}
        required
        error={
          fieldErrors.email
            ? t(`errors.${fieldErrors.email}` as const)
            : undefined
        }
      >
        {(props) => (
          <Input
            {...props}
            type="email"
            name="email"
            placeholder={t('form.emailPlaceholder')}
            defaultValue={state.submittedValues?.email}
            autoComplete="email"
            dir="ltr"
          />
        )}
      </Field>

      {/* Subject Field */}
      <Field
        id="contact-subject"
        label={t('form.subjectLabel')}
        required
        error={
          fieldErrors.subject
            ? t(`errors.${fieldErrors.subject}` as const)
            : undefined
        }
      >
        {(props) => (
          <select
            {...props}
            name="subject"
            className={selectBase}
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
          >
            {CONTACT_SUBJECTS.map((sub: ContactSubject) => (
              <option key={sub} value={sub}>
                {t(`subjects.${sub}`)}
              </option>
            ))}
          </select>
        )}
      </Field>

      {/* Message Field */}
      <Field
        id="contact-message"
        label={t('form.messageLabel')}
        required
        error={
          fieldErrors.message
            ? t(`errors.${fieldErrors.message}` as const)
            : undefined
        }
      >
        {(props) => (
          <Textarea
            {...props}
            name="message"
            rows={5}
            placeholder={t('form.messagePlaceholder')}
            defaultValue={state.submittedValues?.message}
          />
        )}
      </Field>

      {/* Submit Button */}
      <div className="pt-2">
        <Button
          type="submit"
          variant="primary"
          className="w-full min-w-44 sm:w-auto"
          disabled={isPending}
        >
          {isPending ? t('form.submitting') : t('form.submit')}
        </Button>
      </div>

      <p className="text-xs leading-relaxed text-text-muted">
        {t('info.privacyNote')}
      </p>
    </form>
  );
}
