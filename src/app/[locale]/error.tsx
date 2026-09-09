'use client';

import { useTranslations } from 'next-intl';
import { useEffect } from 'react';

import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';

export default function LocaleError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations('error');

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container as="section" className="py-(--section-gap) text-center">
      <h1 className="text-3xl">{t('title')}</h1>
      <p className="mx-auto mt-4 max-w-[46ch] text-text-muted">
        {t('description')}
      </p>
      <div className="mt-6 flex justify-center">
        <Button onClick={reset}>{t('retry')}</Button>
      </div>
    </Container>
  );
}
