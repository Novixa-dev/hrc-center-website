import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';

export default function LocaleNotFound() {
  const t = useTranslations('notFound');
  return (
    <Container as="section" className="py-(--section-gap) text-center">
      <p className="text-sm font-(--font-mono) text-text-muted">404</p>
      <h1 className="mt-3 text-3xl">{t('title')}</h1>
      <p className="mx-auto mt-4 max-w-[46ch] text-text-muted">
        {t('description')}
      </p>
      <div className="mt-6 flex justify-center">
        <Button as="link" href="/">
          {t('cta')}
        </Button>
      </div>
    </Container>
  );
}
