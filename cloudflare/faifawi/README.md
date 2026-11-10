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
