export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface AssistantRequest {
  message: string;
  locale?: 'ar' | 'en';
  history?: ChatMessage[];
}

export interface AssistantResponse {
  reply: string;
  source: 'google-ai-studio' | 'hrc-grounding-engine';
  suggestions?: string[];
}

/**
 * System Grounding Context for Hadramout Research Center (HRC) - Al-Ahgaff University.
 * Used for Google AI Studio (Gemini) prompt conditioning and internal offline knowledge fallback.
 */
export const HRC_GROUNDING_SYSTEM_PROMPT = `
You are the Official AI Academic Research Assistant of the Hadramout Research Center (مركز بحوث حضرموت / HRC), affiliated with Al-Ahgaff University (جامعة الأحقاف), established in 2013 in Mukalla, Hadramout, Yemen.
You provide precise, polite, academically rigorous, and helpful answers in the language the user speaks (Arabic or English).

Core Institutional Knowledge:
1. About HRC:
   - Established in 2013 under Al-Ahgaff University.
   - Focus: Scholarly research, historical documentation, arbitration (التحكيم العلمي), academic translation, training, community development, and conferences.
   - Location: Mukalla, Hadramout, Republic of Yemen.
   - Affiliation: Al-Ahgaff University (https://ahgaff.edu).

2. Publications & Scholarly Journals:
   - "Al-Ahgaff University Journal" (مجلة جامعة الأحقاف): A prestigious, refereed peer-reviewed academic journal published bi-annually. Covers Sharia & Islamic jurisprudence, humanities, linguistics, administrative & financial sciences, and basic/applied computer sciences.
   - Published Books & Monographs: Includes authoritative works on Hadrami heritage, society, and history, such as "Class and Politics in Hadramout" (الطبقة والسياسة في حضرموت) by Dr. Abdullah Al-Jaidi, investigating historical social stratification, migration, the Qu'aiti and Kathiri sultanates, and political modernization.

3. Professional Training Programs (مركز التدريب والتأهيل):
   - English Language Diploma (دبلوم اللغة الإنجليزية): 4 structured academic levels focusing on spoken fluency, academic writing, and professional communication.
   - AI for Research & Productivity (الذكاء الاصطناعي للإنتاجية والبحث العلمي): Hands-on training on prompt engineering, literature analysis, data automation, and ethical generative AI for scholars and professionals.
   - Motion Graphics & Visual Production (الموشن جرافيك والمحتوى البصري): Professional visual storytelling using industry software (After Effects, Illustrator) for media production and marketing.
   - Soroban Mental Arithmetic (الحساب الذهني - السوروبان): Specialized cognitive training for children and youth to boost focus, mental calculations, and memory.

4. Scientific Conferences & Seminars:
   - Second Scientific Conference (المؤتمر العلمي الثاني): Focus on "The Knowledge Economy and Sustainable Development in Hadramout: Opportunities and Future Horizons".
   - Peer-review policy: Strict double-blind peer review for all conference papers and journal submissions.

5. Guidelines for Answers:
   - Adopt a helpful, academic, and respectful tone.
   - Format answers using clean markdown (headings, bullet points) when appropriate.
   - If a researcher asks about submitting an article or enrolling in a course, guide them to contact the center via the Contact page or email info@hrc-ahgaff.org.
   - If answering in Arabic, use fluent Modern Standard Arabic (فصحى راقية).
`.trim();

/**
 * Curated offline fallback answers for key research inquiries when GEMINI_API_KEY
 * is not yet provided in the environment.
 */
const OFFLINE_KNOWLEDGE_BASE: Array<{
  keywords: string[];
  ar: { reply: string; suggestions: string[] };
  en: { reply: string; suggestions: string[] };
}> = [
  {
    keywords: [
      'مجلة',
      'الأحقاف',
      'journal',
      'ahgaff journal',
      'تحكيم',
      'نشر',
      'publish',
      'peer review',
    ],
    ar: {
      reply: `**مجلة جامعة الأحقاف العلمية المحكّمة:**\n\nتُعد مجلة جامعة الأحقاف إحدى أبرز الدوريات الأكاديمية المحكّمة الصادرة عن الجامعة ومركز البحوث. تصدر الدورية بانتظام وتغطي حقولاً معرفية متعددة تشمل:\n\n* **الدراسات الشرعية والإسلامية:** أبحاث الفقه وأصوله والحديث وعلوم القرآن.\n* **العلوم الإنسانية واللغوية:** دراسات الأدب والتاريخ والتوثيق اللغوي.\n* **العلوم الإدارية والمالية:** بحوث الاقتصاد والمحاسبة وإدارة الأعمال.\n* **العلوم الأساسية والتطبيقية:** علوم الحاسوب والتقنية ونظم المعلومات.\n\nتخضع كافة البحوث المنشورة لإجراءات **التحكيم العلمي الأعمى المزدوج (Double-Blind Peer Review)** من قبل نخبة من الأساتذة والخبراء المعتمدين. للمزيد من المعلومات أو لتقديم بحث للمجلة، يرجى التواصل عبر قسم "اتصل بنا" أو البريد: \`info@hrc-ahgaff.org\`.`,
      suggestions: [
        'ما هي شروط النشر؟',
        'ما هي برامج التدريب؟',
        'عن مركز بحوث حضرموت',
      ],
    },
    en: {
      reply: `**Al-Ahgaff University Refereed Scientific Journal:**\n\nThe Al-Ahgaff University Journal is a premier peer-reviewed scholarly periodical published in coordination with the Hadramout Research Center. It covers multidisciplinary tracks including:\n\n* **Islamic & Sharia Studies:** Jurisprudence, principles of law, and Quranic sciences.\n* **Humanities & Linguistics:** Literature, history, and Hadrami heritage documentation.\n* **Administrative & Financial Sciences:** Economics, management, and finance.\n* **Basic & Applied Sciences:** Computer science and information systems.\n\nAll submissions undergo rigorous double-blind peer review. To submit a paper or inquire about publication deadlines, reach out via our Contact page or email \`info@hrc-ahgaff.org\`.`,
      suggestions: [
        'What are the training programs?',
        'About HRC research axes',
        'Scientific conferences',
      ],
    },
  },
  {
    keywords: [
      'تدريب',
      'دبلوم',
      'سوروبان',
      'ذكاء',
      'training',
      'program',
      'courses',
      'english',
      'soroban',
      'motion graphics',
    ],
    ar: {
      reply: `**البرامج التدريبية المتاحة بمركز بحوث حضرموت:**\n\nيقدم المركز برامج تدريبية وتأهيلية نوعية تلبي متطلبات سوق العمل والبحث الأكاديمي:\n\n1. **دبلوم اللغة الإنجليزية المكثف:** أربعة مستويات منهجية تركز على المحادثة، القواعد، والكتابة الأكاديمية.\n2. **الذكاء الاصطناعي للإنتاجية والبحث العلمي:** تدريب تطبيقي على هندسة الأوامر (Prompt Engineering) وأدوات الذكاء الاصطناعي لتحليل البيانات وإعداد الأوراق العلمية.\n3. **الموشن جرافيك والمحتوى البصري:** مهارات صناعة الرسوم المتحركة والمؤثرات البصرية للإنتاج الإعلامي والإعلاني.\n4. **الحساب الذهني (السوروبان):** برنامج لتنمية الذكاء وسرعة البديهة والتركيز للأطفال والناشئة.\n\nيمكنك التسجيل والاستفسار عن مواعيد الدفعات القادمة عبر نموذج التواصل في الموقع.`,
      suggestions: [
        'عن دبلوم اللغة الإنجليزية',
        'كيف أسجل في دورة؟',
        'مجلة جامعة الأحقاف',
      ],
    },
    en: {
      reply: `**Professional Training Programs at Hadramout Research Center:**\n\nHRC delivers high-impact training programs tailored for scholars, students, and professionals:\n\n1. **English Language Intensive Diploma:** 4 progressive levels emphasizing oral fluency, grammar, and academic writing.\n2. **AI for Research & Productivity:** Applied workflow training on prompt engineering, literature analysis, and generative AI research ethics.\n3. **Motion Graphics & Visual Storytelling:** Production workflows in After Effects and Illustrator for digital media creation.\n4. **Soroban Mental Arithmetic:** Cognitive mathematics program boosting numerical agility and focus for youth.\n\nTo enroll or inquire about upcoming cohorts, please submit an inquiry on our Contact page.`,
      suggestions: [
        'Tell me about English Diploma',
        'How to enroll?',
        'Al-Ahgaff Journal',
      ],
    },
  },
  {
    keywords: [
      'مؤتمر',
      'مؤتمرات',
      'conference',
      'conferences',
      'اقتصاد معرفي',
      'sustainable',
    ],
    ar: {
      reply: `**المؤتمرات والندوات العلمية بمركز بحوث حضرموت:**\n\nينظم المركز مؤتمرات علمية محكّمة تسهم في ربط البحث العلمي باحتياجات التنمية المجتمعية، ومن أبرزها:\n\n* **المؤتمر العلمي الثاني:** بعنوان *"اقتصاد المعرفة والتنمية المستدامة في حضرموت: الفرص والآفاق المستقبلية"*.\n* يشارك في المؤتمرات باحثون وأكاديميون من جامعات يمنية وإقليمية ودولية.\n* تُطبع أوراق المؤتمرات في كتاب أبحاث رسمي معتمد ومفهرس بعد إجازتها من لجان التحكيم العلمي.\n\nنرحب بمشاركات الباحثين وتقديم الأوراق العلمية وفق المعايير الأكاديمية المعلنة في صفحة المؤتمرات.`,
      suggestions: [
        'ما هي شروط المشاركة بالمؤتمر؟',
        'أحدث إصدارات المركز',
        'تواصل مع إدارة المركز',
      ],
    },
    en: {
      reply: `**Scientific Conferences & Symposia:**\n\nHRC hosts major peer-reviewed scientific conferences linking academia with socio-economic development, notably:\n\n* **The Second Scientific Conference:** *"The Knowledge Economy and Sustainable Development in Hadramout: Opportunities and Horizons"*.\n* Features keynote addresses, thematic research panels, and international scholarly participation.\n* All accepted papers are published in peer-reviewed conference proceedings.\n\nVisit our Conferences section for call-for-papers dates and submission guidelines.`,
      suggestions: [
        'Conference submission guidelines',
        'Latest publications',
        'Contact the center',
      ],
    },
  },
];

/**
 * Ask Google AI Studio (Gemini) or use grounded academic fallback.
 */
export async function askResearchAssistant(
  req: AssistantRequest,
): Promise<AssistantResponse> {
  const locale = req.locale === 'en' ? 'en' : 'ar';
  const userMessage = req.message.trim();
  const apiKey = process.env.GEMINI_API_KEY;

  if (apiKey && apiKey.trim().length > 0) {
    try {
      const model = process.env.GEMINI_MODEL || 'gemini-2.5-flash';
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

      const contents = [
        ...(req.history || []).map((msg) => ({
          role: msg.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: msg.content }],
        })),
        {
          role: 'user',
          parts: [{ text: userMessage }],
        },
      ];

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: HRC_GROUNDING_SYSTEM_PROMPT }],
          },
          contents,
          generationConfig: {
            temperature: 0.3,
            maxOutputTokens: 1200,
          },
        }),
      });

      if (response.ok) {
        const data = (await response.json()) as {
          candidates?: Array<{
            content?: {
              parts?: Array<{ text?: string }>;
            };
          }>;
        };

        const replyText =
          data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

        if (replyText) {
          const suggestions =
            locale === 'ar'
              ? [
                  'ما هي أعداد مجلة جامعة الأحقاف؟',
                  'ما هي برامج التدريب المتوفرة؟',
                  'كيف أقدم بحثاً للمؤتمر العلمي؟',
                ]
              : [
                  'Al-Ahgaff Journal issues',
                  'Available training programs',
                  'Conference submission guidelines',
                ];

          return {
            reply: replyText,
            source: 'google-ai-studio',
            suggestions,
          };
        }
      } else {
        const errText = await response.text();
        console.warn(
          '[gemini-assistant] Google AI Studio API non-200:',
          errText,
        );
      }
    } catch (err) {
      console.error(
        '[gemini-assistant] Error connecting to Google AI Studio:',
        err,
      );
    }
  }

  // Offline grounded fallback engine
  const queryLower = userMessage.toLowerCase();
  for (const entry of OFFLINE_KNOWLEDGE_BASE) {
    if (entry.keywords.some((kw) => queryLower.includes(kw.toLowerCase()))) {
      const match = entry[locale];
      return {
        reply: match.reply,
        source: 'hrc-grounding-engine',
        suggestions: match.suggestions,
      };
    }
  }

  // General academic institutional response
  if (locale === 'ar') {
    return {
      reply: `مرحباً بك في **مركز بحوث حضرموت** بجامعة الأحقاف.\n\nيسعدنا تقديم الاستشارات والرد على استفساراتك الأكاديمية والبحثية والتدريبية.\n\n* **الأبحاث والمجلات:** تصدر عن المركز وجامعة الأحقاف *مجلة جامعة الأحقاف العلمية المحكّمة* بالإضافة إلى نشر الكتب والدراسات التاريخية.\n* **البرامج والتدريب:** دبلوم اللغة الإنجليزية، الذكاء الاصطناعي للإنتاجية، الموشن جرافيك، وحساب السوروبان الذهني.\n* **المؤتمرات:** تنظيم مؤتمرات متخصصة في اقتصاد المعرفة والتنمية المستدامة.\n\nلطلب استشارة مخصصة أو التواصل مع إدارة المركز، يُرجى استخدام صفحة **اتصل بنا** أو إرسال رسالة إلى \`info@hrc-ahgaff.org\`.`,
      source: 'hrc-grounding-engine',
      suggestions: [
        'ما هي أعداد مجلة جامعة الأحقاف؟',
        'ما هي برامج التدريب المتاحة؟',
        'شروط النشر والمؤتمرات',
      ],
    };
  }

  return {
    reply: `Welcome to the **Hadramout Research Center** at Al-Ahgaff University.\n\nWe provide academic research consultations, peer-reviewed publications, and certified professional training.\n\n* **Research & Journals:** We publish the refereed *Al-Ahgaff University Journal* alongside historical and societal monographs.\n* **Training Programs:** English Language Diploma, AI for Productivity, Motion Graphics, and Soroban Mental Arithmetic.\n* **Conferences:** Scholarly symposia addressing the knowledge economy and sustainable development.\n\nFor customized inquiries or to submit research, please visit our **Contact** page or write to \`info@hrc-ahgaff.org\`.`,
    source: 'hrc-grounding-engine',
    suggestions: [
      'Al-Ahgaff Journal issues',
      'Available training courses',
      'Conference submission policies',
    ],
  };
}
