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
const PATH = '/privacy';

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const l = (
    hasLocale(locales, locale) ? locale : routing.defaultLocale
  ) as Locale;
  const t = await getTranslations({ locale: l, namespace: 'privacy.meta' });
  const meta = buildMetadata({
    locale: l,
    path: PATH,
    title: t('title'),
    description: t('description'),
  });
  return {
    ...meta,
    robots: {
      index: false,
      follow: true,
    },
  };
}

export default async function PrivacyPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const l = locale as Locale;

  const t = await getTranslations('privacy');
  const tb = await getTranslations('breadcrumb');
  const tFooter = await getTranslations('footer');

  const isAr = l === 'ar';

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdScript([
            breadcrumbSchema([{ name: tFooter('privacy'), path: PATH }], l),
          ]),
        }}
      />

      <article className="py-(--space-8)">
        <Container>
          <Breadcrumbs
            label={tb('label')}
            items={[{ label: tFooter('privacy') }]}
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
                  <p className="rounded-md border border-border bg-surface p-4 text-sm text-text-muted">
                    {t('note')}
                  </p>

                  <h2>1. جمع البيانات الشخصية</h2>
                  <p>
                    يحرص مركز بحوث حضرموت بجامعة الأحقاف على احترام خصوصية زوار
                    موقعه الإلكتروني. الموقع متاح للتصفح العام دون اشتراط تسجيل
                    حساب مسبق. نقوم بجمع البيانات الشخصية فقط عند قيامك بإرسال
                    استفسار عبر نموذج التواصل، وتقتصر البيانات على:
                  </p>
                  <ul>
                    <li>الاسم الكامل.</li>
                    <li>عنوان البريد الإلكتروني.</li>
                    <li>موضوع الاستفسار وتفاصيل الرسالة.</li>
                  </ul>

                  <h2>2. الغرض من استخدام البيانات</h2>
                  <p>
                    تُستخدم البيانات التي تقدمها حصراً للرد على استفسارك ومتابعة
                    طلبك الأكاديمي، البحثي، أو الاستشاري. لا نستخدم بيانات
                    التواصل لأي أغراض دعائية غير مرغوبة أو حملات تسويقية تجارية.
                  </p>

                  <h2>3. ملفات تعريف الارتباط والتحليلات (Cookies)</h2>
                  <p>
                    لا يستخدم هذا الموقع أي ملفات تعريف ارتباط (Cookies) لأغراض
                    الإعلانات أو التتبع التجاري للزوار. التصفح مباشر وخالٍ من
                    أدوات المراقبة الخارجية.
                  </p>

                  <h2>4. عدم مشاركة البيانات مع أطراف ثالثة</h2>
                  <p>
                    يلتزم المركز بعدم بيع أو تأجير أو مشاركة أي بيانات شخصية مع
                    أي طرف تجاري ثالث. تُحفظ المراسلات وفقاً لسياسات الأرشفة
                    المعتمدة بجامعة الأحقاف.
                  </p>

                  <h2>5. الاستفسارات والتواصل</h2>
                  <p>
                    إذا كانت لديك أي استفسارات أو طلبات تخص خصوصية بياناتك أو
                    تعديلها، يمكنك التواصل معنا مباشرة عبر{' '}
                    <Link href="/contact">صفحة التواصل</Link>.
                  </p>
                </>
              ) : (
                <>
                  <p className="rounded-md border border-border bg-surface p-4 text-sm text-text-muted">
                    {t('note')}
                  </p>

                  <h2>1. Information We Collect</h2>
                  <p>
                    Hadramout Research Center respects the privacy of all
                    website visitors. The website can be browsed freely without
                    account registration. We only collect personal details
                    submitted voluntarily through our contact form:
                  </p>
                  <ul>
                    <li>Your full name.</li>
                    <li>Your email address.</li>
                    <li>Enquiry subject and message body.</li>
                  </ul>

                  <h2>2. How Information Is Used</h2>
                  <p>
                    Information submitted is used solely to respond to your
                    enquiry, evaluate research proposals, or process training
                    requests. We do not use your contact information for
                    unsolicited marketing.
                  </p>

                  <h2>3. Cookies and Tracking</h2>
                  <p>
                    This website does not employ commercial tracking or
                    advertising cookies. Browsing is private, secure, and clean
                    from third-party behavioural ad networks.
                  </p>

                  <h2>4. Third-Party Sharing</h2>
                  <p>
                    We do not sell, rent, or trade your personal information.
                    Messages are handled strictly by the authorized staff within
                    Hadramout Research Center and Al-Ahgaff University.
                  </p>

                  <h2>5. Contact & Inquiries</h2>
                  <p>
                    For any privacy questions or requests regarding your
                    submitted communications, please reach out via our{' '}
                    <Link href="/contact">Contact Page</Link>.
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
