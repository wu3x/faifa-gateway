# فيفاوي — Cloudflare Workers AI

هذا البديل مستقل عن Gemini وSupabase. يحتفظ بالنص المرجعي الأصلي للهجة فيفاء داخل `src/index.js`.

## النشر لأول مرة
1. افتح Cloudflare Dashboard → Workers & Pages → Create → Worker.
2. اختر Import a repository إذا كان متاحاً واربط GitHub، أو استخدم Wrangler من الكمبيوتر.
3. من مجلد `cloudflare/faifawi` شغّل `npx wrangler login` ثم `npx wrangler deploy`.
4. تأكد من إضافة Workers AI binding باسم `AI` (موجود في `wrangler.toml`).
5. افتح `https://faifa-ai.<your-subdomain>.workers.dev/health` وتأكد من `ok:true`.
6. جرّب POST إلى `/api/chat` مع JSON: `{"messages":[{"role":"user","content":"السلام عليكم"}]}`.

## قبل توصيل الموقع
- انسخ رابط الـ Worker النهائي، ثم حدّث واجهة الموقع لاستخدامه بدلاً من `supabase.functions.invoke('chat')`.
- لا تضع أي مفتاح API في كود المتصفح.
- Cloudflare Workers AI له حصص مجانية وحدود استخدام؛ ليس خدمة غير محدودة. الموقع العام يحتاج مراقبة الاستهلاك وضوابط منع إساءة الاستخدام.
- تحقق من جودة الردود باللهجة قبل تحويل الزوار إليه. بقي المساعد الحالي دون تغيير.

## نشر التحديث على الـWorker الذي اختبرناه سابقاً

اسم الـWorker الذي استُخدم في الاختبار: `faifa-gateway`، بينما `wrangler.toml` في هذا المجلد يسميه `faifa-ai`. لتحديث العنوان السابق تحديداً (بعد التأكد أنه هو واجهة الذكاء وليس موقعاً مستقلاً)، نفّذ من جذر المستودع:

```bash
cd cloudflare/faifawi
npx wrangler login
npx wrangler deploy --name faifa-gateway
```

اختبار الصحة:
```text
https://faifa-gateway.a-alfaifi771.workers.dev/health
```

**تنبيه:** حفظ الملفات في GitHub لا ينشر هذا الـWorker تلقائياً ما لم يُعدّ مسار نشر منفصل. لا تستخدم إعداد نشر واجهة Vite لهذا الملف. يتطلب النشر صلاحية Cloudflare وتفعيل Workers AI binding باسم `AI`.

## اختبار الاستجابة
- `وش تعني زقر؟` ينبغي أن يفسرها بأنها «نادى/صاح».
- `وش تعني بالهون؟` ينبغي أن يفسرها بأنها «ببطء/على مهلك».
- `وش تعني حيفة؟` ينبغي أن يفسرها بأنها «مزرعة صغيرة».
- جرب رسالة تصحيح ثم سؤالاً تابعاً في نفس المحادثة؛ تصحيحات الزائر مؤقتة في سياق الرسائل وليست تدريباً دائماً للنموذج.
