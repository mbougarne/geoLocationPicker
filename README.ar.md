# 🌍 Geo Location Picker

[English](README.md) | **العربية**

<img width="3840" height="1800" alt="preview-ezgif com-optimize" src="https://github.com/user-attachments/assets/df27ef5e-b187-42ff-80da-aca570d93624" />

<img width="724" height="1658" alt="phone" src="https://github.com/user-attachments/assets/a79692d2-9eb4-47b8-8bd1-779ce7498330" />

مكتبة مكوّنات React خفيفة وسهلة الوصول لاختيار البيانات الجغرافية: الدول حسب القارة، وأسماء الدول، ورموز الهاتف الدولية. مبنية بمرونة مع تنسيق افتراضي يعتمد على Tailwind CSS.

## ✨ المميزات

- 🌐 **GeoLocationPicker** – اختيار الدول مجمّعة حسب القارة
- 🗼 **SelectCountry** – قائمة منسدلة للدول قابلة للبحث وسهلة الوصول بقيم ISO 3166-1 alpha-2
- 📞 **SelectPhoneCode** – اختيار رموز الاتصال مع الحفاظ على هوية الدولة (مثل US مقابل CA على ‎+1)
- 🎛️ استخدام مُتحكَّم به (`value`) وغير مُتحكَّم به (`defaultValue`)، مع المسح والتعطيل
- 🌍 نصوص وأسماء دول قابلة للترجمة، وبحث بأي لغة، ودعم كامل للكتابة من اليمين إلى اليسار (RTL)
- 📋 متوافقة مع النماذج: `name` و`required` و`id` ووسوم ARIA، بدون إرسال غير مقصود للنموذج
- 🏳️ أعلام تعمل دون اتصال عبر الإيموجي افتراضيًا، أو عبر `renderFlag` مخصص
- ⚡ أداء سلس أثناء الكتابة بفضل `useDeferredValue`
- 🎨 تنسيق افتراضي مبني على Tailwind، أو استخدم CSS الخاص بك مع `unstyled`
- 📦 بدون أي تبعيات وقت التشغيل

---

## 📦 التثبيت

باستخدام **npm**:

```bash
npm install geo-location-picker
```

باستخدام **yarn**:

```bash
yarn add geo-location-picker
```

باستخدام **pnpm**:

```bash
pnpm add geo-location-picker
```

---

## 🧹 المكوّنات

### 1. `GeoLocationPicker`

```tsx
import { GeoLocationPicker } from 'geo-location-picker';

<GeoLocationPicker onChange={(selected) => console.log(selected)} />;
```

### 2. `SelectCountry`

```tsx
import { SelectCountry } from 'geo-location-picker';

// غير مُتحكَّم به مع رمز ISO محفوظ مسبقًا
<SelectCountry
  defaultValue="MA"
  onChange={(selection) => console.log(selection)}
  // selection: { code: 'MA', name: 'Morocco', displayName: 'Morocco' } | null
/>;

// مُتحكَّم به
<SelectCountry value={country} onChange={(s) => setCountry(s?.code ?? null)} />;
```

تقبل الخاصيتان `value` / `defaultValue` رمز ISO 3166-1 alpha-2 (مثل `'MA'`)،
كما تُقبل أسماء الدول بالإنجليزية للتوافق مع الإصدارات السابقة. مرّر
`value={null}` لمسح الاختيار المُتحكَّم به، أو فعّل `clearable` لإظهار زر مسح.
لا يزال رد النداء القديم `onSelect` يعمل ويُستدعى باسم الدولة بالإنجليزية.

### 3. `SelectPhoneCode`

```tsx
import { SelectPhoneCode } from 'geo-location-picker';

<SelectPhoneCode
  defaultValue="CA"
  onChange={(selection) => console.log(selection)}
  // selection: { code: 'CA', name: 'Canada', displayName: 'Canada', dialCode: '+1' } | null
/>;
```

تُعرَّف الدول برمز ISO، لذلك لا تفقد الدول التي تتشارك رمز اتصال واحدًا
هويتها (مثل الدول الثلاث عشرة على ‎+1). لا يزال رد النداء القديم `onSelect`
يعمل ويُستدعى برمز الاتصال (مثل `'+1'`).

---

## 🌍 الترجمة ودعم RTL

جميع النصوص وأسماء الدول قابلة للتخصيص في `SelectCountry` و`SelectPhoneCode`:

```tsx
const displayNames = new Intl.DisplayNames(['ar'], { type: 'region' });

<SelectCountry
  getCountryName={(code) => displayNames.of(code) ?? code}
  labels={{
    placeholder: 'اختر بلدًا',
    searchPlaceholder: 'ابحث…',
    noResults: 'لا توجد نتائج',
    clear: 'مسح الاختيار',
  }}
/>;
```

- يطابق البحث الاسم المُترجم، والاسم الإنجليزي، ورمز ISO، ورمز الاتصال
  (في `SelectPhoneCode`).
- هوية الدولة (`code` و`name`) مستقلة عن لغة العرض.
- يعتمد التخطيط على خصائص CSS المنطقية، فيتبع اتجاه `dir="rtl"` المحيط
  تلقائيًا — لا حاجة إلى أي إعداد إضافي للعربية.

---

## 📋 النماذج

```tsx
<form onSubmit={handleSubmit}>
  <SelectCountry name="country" required aria-labelledby="country-label" />
  <SelectPhoneCode name="phoneCode" formValue="dialCode" />
  <button type="submit">حفظ</button>
</form>
```

- زر الفتح من النوع `type="button"`، لذا لا يؤدي فتح القائمة أبدًا إلى إرسال
  النموذج.
- عند تحديد `name`، يُرسَل رمز ISO المُختار مع النموذج (ويمكن لـ
  `SelectPhoneCode` إرسال رمز الاتصال بدلًا منه عبر `formValue="dialCode"`).
- تمنع `required` إرسال النموذج فارغًا عبر التحقق الأصلي للنماذج.
- تُدعم `disabled` و`id` و`aria-label` و`aria-labelledby` و`aria-describedby`
  و`aria-invalid` لربط التسميات ورسائل الأخطاء.
- النسخ المتعددة في الصفحة الواحدة مستقلة تمامًا عن بعضها.

---

## 🎨 التنسيق

المظهر الافتراضي مبني على أدوات **Tailwind CSS**، لكن المستهلكين **لا**
يحتاجون إلى Tailwind. استورد ملف الأنماط المُجمَّع مسبقًا:

```ts
import 'geo-location-picker/styles.css';
// (المسار السابق 'geo-location-picker/dist/src/index.css' لا يزال يعمل)
```

يحتوي الملف على متغيرات الألوان والأدوات التي تستخدمها المكوّنات فقط —
**بدون Tailwind preflight/reset** — فلا يغيّر أبدًا الأنماط العامة لتطبيقك.

### استخدام CSS الخاص بك (بدون Tailwind)

فعّل `unstyled` لإسقاط كل الأصناف المدمجة وتنسيق الأجزاء من نظام التصميم
الخاص بك:

```tsx
<SelectCountry
  unstyled
  classNames={{
    trigger: 'my-input',
    dropdown: 'my-popover',
    country: 'my-option',
    selectedCountry: 'my-option my-option--selected',
  }}
/>
```

تتوفر خطافات الحالة لـ CSS العادي كسمات بيانات: `data-state="open|closed"`
و`data-disabled` على زر الفتح، و`data-selected` و`data-active` على الخيارات.

### الأعلام

تُعرض الأعلام كإيموجي افتراضيًا، وهو ما يعمل دون اتصال وبلا طلبات صور ولا
تبعيات. لاستخدام أصولك الخاصة (مثل أعلام SVG):

```tsx
<SelectCountry renderFlag={(code) => <img src={`/flags/${code}.svg`} alt="" />} />
```

### تخصيص الأجزاء (Slots)

يدعم المكوّنان أصناف Tailwind وأنماط React المباشرة عبر الخاصيتين
`classNames` و`styles`.

**الجزء (Slot)** هو قسم مرئي مُسمّى من المكوّن. مثلًا `root` هو الغلاف
الخارجي، و`trigger` هو زر فتح القائمة، و`selectedCountry` هو صف الدولة
المختارة. تتيح أسماء الأجزاء تنسيق قسم معيّن دون الاعتماد على بنية HTML
الداخلية.

الأجزاء المتاحة حسب المكوّن:

- `GeoLocationPicker`: ‏`root`، `searchContainer`، `searchInput`، `selectAll`، `selectAllLabel`، `content`، `tabs`، `activeTab`، `inactiveTab`، `countryList`، `country`، `selectedCountry`
- `SelectCountry` و`SelectPhoneCode`: ‏`root`، `container`، `trigger`، `dropdown`، `searchInput`، `list`، `country`، `selectedCountry`، `clearButton`، `noResults`

---

## 🧠 الخصائص (Props)

### `GeoLocationPicker`

| الخاصية      | النوع                                                   | الوصف                                  |
| ------------ | ------------------------------------------------------- | --------------------------------------- |
| `onChange`   | `(value: Record<string, Set<string>>) => void`          | تُستدعى عند تغيّر اختيار الدول          |
| `classNames` | `Partial<Record<GeoLocationPickerSlot, string>>`        | أصناف مفهرسة باسم الجزء                 |
| `styles`     | `Partial<Record<GeoLocationPickerSlot, CSSProperties>>` | أنماط مباشرة مفهرسة باسم الجزء          |

### `SelectCountry` و`SelectPhoneCode`

| الخاصية          | النوع                                            | الوصف                                                                                   |
| ---------------- | ------------------------------------------------ | ---------------------------------------------------------------------------------------- |
| `value`          | `string \| null`                                 | رمز ISO 3166-1 alpha-2 مُتحكَّم به (`null` يمسح الاختيار)                                 |
| `defaultValue`   | `string`                                         | رمز ISO ابتدائي غير مُتحكَّم به (تُقبل الأسماء الإنجليزية)                                |
| `onChange`       | `(selection: TCountrySelection \| null) => void` | اختيار مُهيكل: ‏`code` و`name` و`displayName` ‏(+ `dialCode` في `SelectPhoneCode`)       |
| `onSelect`       | `(value: string) => void`                        | رد نداء قديم: الاسم الإنجليزي (`SelectCountry`) أو رمز الاتصال (`SelectPhoneCode`)        |
| `getCountryName` | `(code: string, name: string) => string`         | الاسم المعروض المُترجم؛ يُطابَق أيضًا عند البحث                                           |
| `renderFlag`     | `(code: string, name: string) => ReactNode`      | عرض مخصص للعلم (الافتراضي إيموجي)                                                         |
| `labels`         | `Partial<TSelectLabels>`                         | ‏`placeholder` و`searchPlaceholder` و`noResults` و`clear`                                 |
| `clearable`      | `boolean`                                        | إظهار زر مسح عند وجود اختيار                                                              |
| `disabled`       | `boolean`                                        | تعطيل المكوّن                                                                             |
| `name`           | `string`                                         | اسم حقل النموذج؛ يُرسل رمز ISO المختار                                                    |
| `formValue`      | `'code' \| 'dialCode'`                           | في `SelectPhoneCode` فقط: القيمة التي يرسلها النموذج (الافتراضي `'code'`)                 |
| `required`       | `boolean`                                        | يشارك في التحقق الأصلي للنماذج                                                            |
| `id`             | `string`                                         | مُعرِّف زر الفتح                                                                          |
| `unstyled`       | `boolean`                                        | إسقاط جميع الأصناف المدمجة                                                                |
| `aria-*`         | `string`                                         | ‏`aria-label` و`aria-labelledby` و`aria-describedby` و`aria-invalid` على زر الفتح         |
| `classNames`     | `Partial<Record<Slot, string>>`                  | أصناف مفهرسة باسم الجزء (يضيف جزأي `clearButton` و`noResults`)                            |
| `styles`         | `Partial<Record<Slot, CSSProperties>>`           | أنماط مباشرة مفهرسة باسم الجزء                                                            |

---

## ♿ سهولة الوصول

يطبّق `SelectCountry` و`SelectPhoneCode` نمط combobox/listbox:

- زر فتح مع `aria-haspopup="listbox"` و`aria-expanded`
- حقل بحث مع `role="combobox"` و`aria-controls` و`aria-autocomplete="list"`
  و`aria-activedescendant` لتتبّع الخيار المُظلَّل
- الخيارات عناصر حقيقية بـ `role="option"` مع `aria-selected`
- لوحة المفاتيح: الأسهم تفتح القائمة وتحرّك التظليل، وHome/End للقفز، وEnter
  للاختيار، وEscape للإغلاق وإعادة التركيز إلى زر الفتح، وTab للإغلاق
- تُعلَن نتائج البحث الفارغة عبر عنصر `role="status"`

## 🚚 الانتقال من الإصدار 1.x

ردود النداء العامة وأسماء الأجزاء لم تتغير، لكن الإصدار 2.0 يتضمن تغييرات
جذرية في البنية والقيم الافتراضية:

- تُعرض الأعلام **كإيموجي** افتراضيًا بدلًا من صور SVG تُجلب من CDN (أُزيلت
  تبعية `react-country-flag`). مرّر `renderFlag` لمواصلة استخدام أصول SVG.
- أصبحت الخيارات عناصر `li[role="option"]` بدلًا من تسميات تغلّف أزرار راديو
  مخفية. يجب تحديث أي CSS أو اختبارات تستهدف تلك الأزرار؛ أجزاء
  `classNames`/`styles` هي واجهة التنسيق المدعومة.
- لم يعد ملف الأنماط المُرفق يتضمن Tailwind preflight. إن كان تطبيقك يعتمد
  عليه فأضف reset خاصًا بك.
- تعرض صفوف خيارات `SelectPhoneCode` الآن اسم الدولة بجانب رمز الاتصال، ولم
  تعد أزرار الراديو المخفية تُسرِّب حقل `country` إلى النماذج المحيطة
  (استخدم الخاصية `name` للمشاركة في النماذج).

## التطوير

راجع [CONTRIBUTING.md](CONTRIBUTING.md) للمتطلبات والإعداد المحلي وأوامر
التطوير وتوقعات طلبات الدمج.

بداية سريعة:

```bash
corepack enable
pnpm install
pnpm build
pnpm --filter dev dev
```

يعمل العرض التجريبي في مساحة العمل `dev/` ويستهلك المكتبة عبر رابط مساحة
عمل pnpm. أمر `build` في الجذر ينشئ ملفات التوزيع في `dist/`.

## وثائق المشروع

- [المساهمة والتطوير المحلي](CONTRIBUTING.md)
- [قواعد البرمجة بالذكاء الاصطناعي](docs/AGENTIC_RULES.md)
- [حزمة React Native](native/README.md)
- [تطبيق تطوير React Native](native-dev/README.md)

---

## 🪪 الرخصة

**ISC**
