# Git & GitHub — من صفر لشغل الفريق
### Node.js Track | المرشد: Adham Ahmed Galal

> **ملاحظة للمرشد:** كل شريحة = عنوان + نقاط. المصطلحات التقنية بالإنجليزي كما في الشغل.

---

## الشريحة 1 — العنوان

**Git & GitHub: Zero → Team-Ready**  
Node.js Track — أول سيشن عملي مع الـ Mentor  
Adham Ahmed Galal · Full Stack Developer · Cairo

---

## الشريحة 2 — أهداف اليوم

- نفهم **ليه** Git مش “نسخة على Google Drive”
- نعمل **3 zones**: Working → Staging → History
- أوامر: `status` · `add` · `commit` · `push`
- **Branch** + **Pull Request** + **Merge**
- نخرج بـ **repo حقيقي** على GitHub

---

## الشريحة 3 — من أنا؟ (تعريف سريع)

- **Adham Ahmed Galal** — Full Stack Developer
- Stack: **React / Next.js** · **Node / Express / Nest**
- شغل production: e-commerce، real-estate، MERN backends
- **Lead + mentoring** juniors في FedExperience
- ITI · Alexandria Uni (MIS) · Route IT Node Diploma

---

## الشريحة 4 — قواعد المسار (ملخص)

- عربي في الشرح · إنجليزي في المصطلحات (`commit`, `branch`, …)
- **Hands-on** أهم من النوتس
- أسئلة مرحب بيها · مفيش سؤال غبي
- **Homework** أسبوعي على GitHub
- لا **API keys** في الـ repos (`.env` في `.gitignore`)

*(التفاصيل الكاملة في وثيقة Cycle Charter)*

---

## الشريحة 5 — المشكلة اللي Git بيحلها

- “النسخة النهائية 2” · “final_real” · “backup_old”
- overwrite بالغلط
- شغل جماعي على نفس الملف
- **Git = time machine** لكل تغيير في الكود

---

## الشريحة 6 — Git vs GitHub

| Git | GitHub |
|-----|--------|
| على جهازك | على السيرفر (السحابة) |
| التاريخ والفروع | التعاون: PR, Issues, Review |
| يشتغل offline | مشاركة مع الفريق |

**Git** = الأداة · **GitHub** = مكان الاجتماع

---

## الشريحة 7 — Repository

- **Repo** = مجلد المشروع + تاريخ كل الـ commits
- `git init` → repo جديد محلي
- `git clone` → نسخة من remote موجودة
- مجلد `.git/` مخفي — قلب النظام

---

## الشريحة 8 — المناطق الثلاثة (أهم شريحة)

```
Working Directory  →  Staging  →  Repository (commits)
     (تعديل)            (تجهيز)         (تاريخ محفوظ)
```

- **Working:** اللي بتكتبه في VS Code
- **Staging:** اللي هيدخل في الـ commit الجاي (`git add`)
- **History:** commits محفوظة

---

## الشريحة 9 — الالتزام Commit

- Snapshot + **message** واضحة
- Message لـ **future you** والفريق
- سيء: `fix` · `update`
- جيد: `docs: add readme with track goals`

---

## الشريحة 10 — Branch

- خط تطوير موازي لـ `main`
- تجربة feature من غير ما تكسر الإنتاج
- أسماء: `feature/login` · `fix/typo-readme`

---

## الشريحة 11 — Remote Sync

- `git remote` → ربط GitHub
- `git push` → إرسال commits
- `git pull` → جلب تغييرات الفريق
- أول مرة: `push -u origin main`

---

## الشريحة 12 — Pull Request (PR)

- “اعمل merge لشغلي بعد **review**”
- Title: إيه اللي اتغير
- Body: ليه + إزاي نختبر
- Review: comment · approve · request changes

---

## الشريحة 13 — أدوات النهاردة

- Terminal (Git Bash / zsh / PowerShell)
- **VS Code** + Source Control
- حساب **GitHub**
- `git --version` للتأكد

---

## الشريحة 14 — الإعداد الأول (مرة واحدة)

```bash
git config --global user.name "Your Name"
git config --global user.email "you@email.com"
```

- نفس الإيميل اللي على GitHub (للـ contributions)

---

## الشريحة 15 — سير العمل اليومي

1. `git status`
2. `git add <file>`
3. `git commit -m "message"`
4. `git push`

**قاعدة:** `status` قبل كل commit

---

## الشريحة 16 — `.gitignore` لـ Node

```
node_modules/
.env
dist/
.DS_Store
```

- **node_modules** = ملايين الملفات — لا ترفعها أبدًا
- **.env** = أسرار — استخدم `.env.example`

---

## الشريحة 17 — Undo (بدون ذعر)

| الموقف | أمر |
|--------|-----|
| لم أضف بعد | `git restore <file>` |
| أضفت بالغلط | `git restore --staged <file>` |
| على shared branch | `git revert` (لاحقًا) |

⚠️ ممنوع `reset --hard` في الشغل الجماعي من غير فهم

---

## الشريحة 18 — Lab 1: Mentor Card

Repo: `node-mentor-card`  
- `README.md` + `package.json` + `.gitignore`
- **3 commits** على الأقل
- `push` على GitHub — public

---

## الشريحة 19 — Lab 2: PR في فصل المنصة

- Clone org repo: `class-git-lab`
- Branch من issue
- تعديل صغير → PR → review شريك → **squash merge**

---

## الشريحة 20 — Merge Conflict (لمحة)

```
<<<<<<< HEAD
=======
>>>>>>> branch
```

- Git بيقول: “السطر اتعدّل في مكانين”
- اختار النص الصح · احذف العلامات · `add` · `commit`

---

## الشريحة 21 — Issues على GitHub

- عنوان + وصف + labels
- في PR: `Fixes #12`
- ربط الشغل بالمهام — عادة الشركات

---

## الشريحة 22 — مستوى Hero (بعدين)

- `stash` · `revert` · `fetch`
- **GitHub Actions** — CI على كل push
- Branch protection على `main`
- Learn Git Branching (homework)

---

## الشريحة 23 — إشارات الشات (كل السيشنز)

- **1** = install / auth عالق
- **2** = فهمت جزئي
- **3** = خلصت اللاب

---

## الشريحة 24 — Homework الأسبوع

- PR واحدة merged (شخصي أو org)
- `LICENSE` (MIT) على mentor card
- سؤال واحد + إجابة لزميل في الجروب
- اختياري: Learn Git Branching — القسم الأول

---

## الشريحة 25 — الختام

> “من النهاردة: أي مشروع Node هتعمله — **branch, commit, PR**.  
> GitHub بتاعكم = بداية الـ portfolio.  
> شكرًا — نكمل المسار سوا.”

**روابط:** git-scm.com/book · docs.github.com · learngitbranching.js.org

---

*نهاية العرض — أسئلة؟*
