# Labs + Homework — سيشن Git

---

## Lab 1: `node-mentor-card` (أثناء السيشن · ~40 دقيقة)

### الهدف

أول **portfolio repo** عام على GitHub يعرفك في المسار.

### المتطلبات

1. **Repository** اسم مقترح: `node-mentor-card` (public).
2. **README.md** يحتوي:
   - الاسم
   - سطر واحد: هدفك من Node.js track
   - لينك لـ GitHub profile
   - اختياري: مدينة (Cairo, Alexandria, …)
3. **package.json** (حد أدنى):

```json
{
  "name": "node-mentor-card",
  "version": "1.0.0",
  "description": "Node track student card",
  "main": "index.js",
  "scripts": {},
  "license": "MIT"
}
```

4. **`.gitignore`:** على الأقل `node_modules/`, `.env`, `dist/`.
5. **Commits:** 3 على الأقل، أمثلة:
   - `docs: add readme`
   - `chore: add package.json`
   - `chore: add gitignore`

### معايير “تم”

- [ ] `main` على GitHub فيه الملفات الثلاثة
- [ ] لا `node_modules` ولا `.env` مرفوعين
- [ ] الرابط مُسجَّل في Google Sheet السيشن

### أوامر مرجعية

```bash
mkdir node-mentor-card && cd node-mentor-card
git init
# أنشئ الملفات ثم:
git add .
git commit -m "docs: add readme"
# ... باقي commits
# أنشئ repo على GitHub ثم:
git remote add origin <url>
git push -u origin main
```

---

## Lab 2: مساهمة في `class-git-lab` (أثناء السيشن · ~35 دقيقة)

### الهدف

تجربة **team workflow**: clone → branch → PR → merge.

### الخطوات

1. `git clone https://github.com/<ORG>/class-git-lab.git`
2. `cd class-git-lab`
3. اختار **Issue** (أو تعليمات المرشد: أضف سطراً في `docs/STUDENTS.md` تحت الحرف الأول من اسمك).
4. `git checkout -b fix/issue-NN-yourname`
5. عدّل سطراً واحداً (تصحيح typo أو إضافة اسمك + لينك GitHub).
6. `git add` → `commit` → `push -u origin <branch>`
7. افتح **Pull Request** إلى `main`.
8. **شريكك** يكتب تعليق review واحد (مثال: “واضح، شكراً”).
9. **Squash and merge** (المرشد أو صاحب الـ PR بعد موافقة).

### معايير “تم”

- [ ] PR **merged** يظهر على حسابك في GitHub
- [ ] react **3** في الشات

---

## تجهيز المرشد لـ `class-git-lab` (قبل السيشن)

هيكل مقترح:

```
class-git-lab/
├── README.md          # هدف المستودع + قواعد PR
├── CONTRIBUTING.md    # fork/clone + branch naming
├── .gitignore
├── docs/
│   ├── resources.md   # فيه أخطاء إملائية مقصودة للـ issues
│   └── STUDENTS.md    # أقسام A-Z لإضافة الأسماء
└── .github/
    └── ISSUE_TEMPLATE/
        └── fix-typo.yml
```

**Issues جاهزة (أمثلة):**

- `#1` Fix typo in resources.md — “repostiory” → “repository”
- `#2` Add your name under letter M in STUDENTS.md
- … (10 issues كافية لـ 60 طالب — يتوزعون)

---

## Homework — الأسبوع 1 (بعد السيشن)

### إلزامي

1. **PR واحدة merged** (مشروع شخصي أو تحسين على `node-mentor-card`):
   - مثال: `docs: add learning goals for week 1`
2. أضف **`LICENSE`** (MIT) للـ `node-mentor-card`.
3. في جروب المسار: **سؤال واحد** طرحته + **إجابة لزميل** (copy لينك أو screenshot).

### اختياري (موصى به)

- [Learn Git Branching](https://learngitbranching.js.org/) — مستوى Introduction + Ramping Up
- شاهد: `git log --oneline --graph --all` على مشروعك بعد branchين

### تسليم

- لينك الـ PR المدمج في ثريد الواجب أو Sheet أسبوعي قبل موعد السيشن القادم.

---

## Rubric مبسط للمرشد (لا تُعرض كدرجات للطلاب إلا إذا البرنامج يطلب)

| معيار | ممتاز | كافٍ | يحتاج تحسين |
|-------|-------|------|-------------|
| Lab 1 structure | 3+ commits واضحة + README كامل | repo موجود ناقص تفاصيل | لا push أو لا gitignore |
| Lab 2 collaboration | PR merged + review | PR مفتوح | لم يحاول |
| Homework أسبوع 1 | PR + LICENSE + مساعدة زميل | PR فقط | لم يسلم |

---

*Adham Ahmed Galal*
