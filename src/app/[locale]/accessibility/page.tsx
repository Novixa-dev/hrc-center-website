import type { Metadata } from 'next';
import { hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { PageHeader } from '@/components/sections/page-header';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { Container } from '@/components/ui/container';
import { Prose } from '@/components/ui/prose';
import { Link } from '@/components/ui/link';
import { locales, routing, type Locale } from '@/i18n/routing';
import { breadcrumbSchema, jsonLdScript } from '@/lib/schema';
import { buildMetadata } from '@/lib/seo';

type PageProps = { params: Promise<{ locale: string }> };
const PATH = '/accessibility';

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const l = (
    hasLocale(locales, locale) ? locale : routing.defaultLocale
  ) as Locale;
  const t = await getTranslations({
    locale: l,
    namespace: 'accessibility.meta',
  });
  return buildMetadata({
    locale: l,
    path: PATH,
    title: t('title'),
    description: t('description'),
  });
}

export default async function AccessibilityPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const l = locale as Locale;

  const t = await getTranslations('accessibility');
  const tb = await getTranslations('breadcrumb');
  const tFooter = await getTranslations('footer');

  const isAr = l === 'ar';

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript([
            breadcrumbSchema(
              [{ name: tFooter('accessibility'), path: PATH }],
              l,
            ),
          ]),
        }}
      />

      <article className="py-(--space-8)">
        <Container>
          <Breadcrumbs
            label={tb('label')}
            items={[{ label: tFooter('accessibility') }]}
          />

          <PageHeader
            eyebrow={t('header.eyebrow')}
            title={t('header.title')}
            lede={t('header.lede')}
          />

          <div className="mt-10 max-w-(--prose-measure)">
            <Prose>
              {isAr ? (
                <>
                  <h2>{t('commitmentTitle')}</h2>
                  <p>{t('commitmentBody')}</p>

                  <h2>المعايير والمزايا التقنية المطبقة</h2>
                  <ul>
                    <li>
                      <strong>التباين اللوني:</strong> اعتماد درجات تباين معتمدة
                      تحقق نسبة 4.5:1 على الأقل للنصوص العادية لتسهيل القراءة
                      لضعاف البصر.
                    </li>
                    <li>
                      <strong>التنقل بلوحة المفاتيح:</strong> إمكانية الوصول إلى
                      كافة العناصر التفاعلية والروابط والنماذج بواسطة مفتاح Tab،
                      مع إبراز مؤشر التركيز البصري بوضوح.
                    </li>
                    <li>
                      <strong>التوافق مع قارئات الشاشة:</strong> استخدام عناصر
                      HTML5 الدلالية وتسميات ARIA المعيارية ومناطق الإعلان
                      الهادئة (aria-live) للتنبيهات.
                    </li>
                    <li>
                      <strong>احترام تفضيلات تقليل الحركة:</strong> تعطيل
                      التحريك الانتقالي عند تفعيل خيار{' '}
                      <code>prefers-reduced-motion</code> في نظام التشغيل.
                    </li>
                    <li>
                      <strong>التكبير وتغيير الحجم:</strong> دعم التكبير حتى
                      200% دون فقدان للمحتوى أو تداخل في العناصر.
                    </li>
                  </ul>

                  <h2>{t('feedbackTitle')}</h2>
                  <p>{t('feedbackBody')}</p>
                  <p>
                    تفضل بالتواصل معنا عبر{' '}
                    <Link href="/contact">صفحة التواصل</Link> مع ذكر تفاصيل
                    الصعوبة التي واجهتها والمتصفح المستخدم لنتمكن من معالجتها.
                  </p>
                </>
              ) : (
                <>
                  <h2>{t('commitmentTitle')}</h2>
                  <p>{t('commitmentBody')}</p>

                  <h2>Key Technical Measures</h2>
                  <ul>
                    <li>
                      <strong>Color Contrast:</strong> Verified minimum contrast
                      ratios of 4.5:1 across all body and interactive copy.
                    </li>
                    <li>
                      <strong>Keyboard Operability:</strong> Complete keyboard
                      traversal with visible focus rings and logical tab order.
                    </li>
                    <li>
                      <strong>Screen Reader Support:</strong> Semantic HTML5
                      landmarks, proper heading hierarchy, and polite ARIA live
                      regions for form notifications.
                    </li>
                    <li>
                      <strong>Reduced Motion:</strong> Full respect for the{' '}
                      <code>prefers-reduced-motion</code> system preference.
                    </li>
                    <li>
                      <strong>Zoom and Scaling:</strong> Layout flexibility
                      supporting up to 200% zoom without clipping or horizontal
                      overflow.
                    </li>
                  </ul>

                  <h2>{t('feedbackTitle')}</h2>
                  <p>{t('feedbackBody')}</p>
                  <p>
                    Please reach out through our{' '}
                    <Link href="/contact">Contact Page</Link> with details of
                    any accessibility barrier encountered.
                  </p>
                </>
              )}
            </Prose>
          </div>
        </Container>
      </article>
    </>
  );
}
