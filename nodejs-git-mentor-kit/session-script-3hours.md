# سكربت سيشن Git & GitHub — 3 ساعات (دقيقة بدقيقة)

**المرشد:** Adham Ahmed Galal | **اللغة:** عربي + أوامر/مصطلحات إنجليزية  
**التجهيز على الشاشة:** Terminal بحجم خط 18+، theme داكن، مستودع demo نظيف

---

## قبل الدخول (−15 إلى 0 دقيقة)

| الدقيقة | أنت | الطلاب |
|---------|-----|--------|
| −15 | TAs على القاعة/الزووم؛ تشيك_projection | يفتحوا Terminal |
| −10 | مشاركة رابط `cycle-charter-rules` في الشات | قراءة سريعة |
| −5 | فتح repo فارغ `hello-git-node` جاهز للـ demo | `git --version` |

**على الشاشة:** رابط Cheat sheet + رابط org repo للـ Lab 2.

---

## 0:00 – 0:07 | الافتتاح والتعريف

**[اقرأ بتلاتة:]**

> السلام عليكم، أنا **أدهم أحمد جلال**، Full Stack من القاهرة. النهاردة أول سيشن معاكم في Node track. قبل Git حابب تعرفوا مين اللي قدامكم: شغلت سنين على **Node و MERN** في production — backends لـ mobile، منصات عربي/إنجليزي، وكنت lead وبعمل **mentor** للـ juniors. خريج **إسكندرية MIS** وعديت **ITI** و **Route IT** على Node. يعني فاهم المسار اللي انتوا فيه.

**0:05 – سلّمي على القاعة:** “مين عنده GitHub account؟ ارفعوا إيد.” / “مين استخدم Git قبل كده؟”

> النهاردة مش امتحان. اللي يخرج بـ repo و **PR merged** نجح. أي سؤال في أي وقت.

---

## 0:07 – 0:17 | قواعد المسار (Cycle Charter)

**اقرأ الملخص (الشريحة 4 أو ملحق الوثيقة):**

1. عربي + مصطلحات إنجليزي  
2. Hands-on أولاً  
3. Homework أسبوعي GitHub  
4. لا secrets في repos  
5. إشارات الشات **1 / 2 / 3**

> “القواعد دي لـ 60 واحد يتعلموا سوا. لو حاجة مش عادلة، قولولي أول أسبوعين ونعدّل.”

**اطلب:** react ✅ أو “موافق” في الشات.

---

## 0:17 – 0:27 | Level 0 — ليه Git؟

**[سرد + شريحة 5–7]**

> مين عمل ملف `final_final2.js`؟ Git بيمنع الفوضى دي.  
> **Git** على جهازك = تاريخ المشروع. **GitHub** = المكان اللي الفريق يشوف عليه شغلك.

**ارسم الثلاث مناطق (شريحة 8):**

> **Working** — اللي مفتوح في VS Code.  
> **Staging** — اللي في الصندوق قبل الشحن (`git add`).  
> **History** — الـ commits المحفوظة.

**جملة تثبيت:**

> **`git status`** = `console.log` لعالم Git. اكتبوها قبل كل commit.

---

## 0:27 – 0:32 | Level 0 — Commit و Branch (نظري سريع)

- **Commit:** snapshot + message  
- **Branch:** خط جنب `main`  
- **Merge / PR:** دمج بعد review  

لا تتوسع — الـ demo يثبت.

---

## 0:32 – 1:05 | Live Demo — من صفر لـ GitHub

**قول للقاعة:** “افتحوا terminal جنبكم، هتكرروا بعد ما أخلص كل خطوة.”

### الخطوة 1 — مجلد ومشروع

```bash
mkdir hello-git-node
cd hello-git-node
git init
```

> `git init` عمل مجلد `.git` مخفي — قلب النظام.

### الخطوة 2 — أول ملف

```bash
echo "# Node track — session 1" > README.md
git status
```

**اشرح على الشاشة:** أحمر = untracked / modified.

```bash
git add README.md
git status
```

> أخضر في staging. **مش** في history لسه.

```bash
git commit -m "docs: add readme for node track"
git log --oneline
```

### الخطوة 3 — إعداد الهوية (لو لسه)

```bash
git config --global user.name "Student Name"
git config --global user.email "you@example.com"
```

> الإيميل يفضل نفس GitHub عشان الـ green squares.

### الخطوة 4 — GitHub remote

**(على المتصفح — شارك الشاشة)** إنشاء repo فاضي `hello-git-node` بدون README.

```bash
git remote add origin git@github.com:USERNAME/hello-git-node.git
# أو HTTPS:
# git remote add origin https://github.com/USERNAME/hello-git-node.git

git branch -M main
git push -u origin main
```

> `-u` مرة واحدة — بعدها `git push` لوحدها.

**إذا فشل auth:** “اكتبوا **1** في الشات” — TA يتولى الصف.

**1:00:** “Stop. مين وصل لـ push؟ react 3. اللي على 1 استنى TA.”

---

## 1:05 – 1:12 | `.gitignore` لـ Node

```bash
cat >> .gitignore << 'EOF'
node_modules/
.env
dist/
.DS_Store
EOF

git add .gitignore
git commit -m "chore: add node gitignore"
git push
```

> **node_modules** ممنوع يرفع — حجم ووقت. **.env** فيه keys — خطر أمني.

---

## 1:12 – 1:35 | Lab 1 — `node-mentor-card` (فردي)

**اقرأ التعليمات (من `labs-and-homework.md`):**

- Repo جديد على GitHub: `node-mentor-card`
- ملفات: `README.md` (اسم، هدف من Node track، لينك GitHub)، `package.json` بسيط، `.gitignore`
- **3 commits** على الأقل برسائل واضحة
- Public repo

**أنت:** دور بين الصفوف / breakouts.  
**TAs:** صف الـ auth والـ Windows path issues.

**إشارة 3:** يملوا خانة في Google Sheet (اسم + لينك repo).

---

## 1:35 – 1:45 | بريك

> “ما تقفلوش Terminal. اشربوا مية. راجعوا `git status` على مشروعكم.”

---

## 1:45 – 2:05 | Branches + Pull Request (Demo)

**على نفس `hello-git-node` أو مشروعك:**

```bash
git checkout -b feature/add-mentor-line
echo "Mentor: Adham Galal" >> README.md
git status
git add README.md
git commit -m "docs: add mentor credit line"
git push -u origin feature/add-mentor-line
```

**(متصفح)** Compare & pull request → main.

**اسكربت PR:**

> العنوان يقول **إيه**. الوصف يقول **ليه** و **إزاي نختبر** — افتح README وشوف السطر.  
> في الشركات الـ reviewer مش بيفتح دماغه — بيقرأ الـ PR.

**Merge:** اختار **Squash and merge** (موصى به للمبتدئين).

```bash
git checkout main
git pull
git branch -d feature/add-mentor-line
```

---

## 2:05 – 2:12 | Issues + ربط PR (نظري قصير)

- Issue في org: “Fix typo in resources”  
- في body الـ PR: `Fixes #5`  
- Label اختياري

---

## 2:12 – 2:15 | Merge conflict — مسرحية 3 دقائق

**(اختياري: فريقين يعدّلوا نفس السطر — أو ملف جاهز فيه conflict)**

> شوفوا `<<<<<<<` — مش خطأ، ده Git بيطلب قرارك. احذفوا العلامات، احفظوا، `add`, `commit`. في الشغل زوّد زميل.

---

## 2:15 – 2:50 | Lab 2 — مساهمة في `class-git-lab`

**تعليمات:**

1. Clone: `git clone https://github.com/ORG/class-git-lab.git`
2. اختار issue (أو ملف `STUDENTS.md` حرف من اسمك)
3. Branch: `fix/issue-N-yourname`
4. تعديل سطر واحد → commit → push → PR
5. **شريك** يعمل comment review (جملة واحدة)
6. Squash merge

**زوجوا الطلاب** (لو 60: 30 زوج). كل واحد PR واحدة على الأقل.

**2:45:**

> “3 في الشات لما الـ PR تبقى **merged**.”

---

## 2:50 – 2:57 | Level 3–4 — ماذا بعد؟

**سرعة — بدون أوامر:**

- `git stash` عند تبديل مهمة  
- `git revert` على shared branches  
- GitHub Actions: test على كل push (السيشن الجاي في Node)  
- Homework: Learn Git Branching

---

## 2:57 – 3:00 | الختام والواجب

**[اقرأ شريحة 25]**

> من النهاردة أي feature في Node: branch، commit، PR. GitHub بتاعكم portfolio.  
> واجب الأسبوع في `labs-and-homework.md`.  
> شكراً — أسئلة؟

**ابعث في الجروب فوراً:** لينك Cheat sheet + Charter + Sheet تسليم اللabs.

---

## ملحق المرشد — Troubleshooting سريع

| المشكلة | الحل في السيشن |
|---------|----------------|
| `Author identity unknown` | `git config` name/email |
| `Permission denied (publickey)` | HTTPS + PAT أو `ssh-keygen` |
| `rejected non-fast-forward` | `git pull` قبل push |
| رفع `node_modules` بالغلط | احذف من GitHub، أضف `.gitignore`، `git rm -r --cached node_modules` |
| conflict في Lab 2 | TA يقعد مع الزوج 5 دقائق |

---

## توقيت احتياطي (لو تأخرتوا)

- اختصر conflict theater  
- Lab 2: مساهمة README فقط بدون review إلزامي  
- لا تدخل `rebase` أو `cherry-pick`

---

*نهاية السكربت*
