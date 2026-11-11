# Git & GitHub — ورقة غش (للطلاب)

**Node.js Track · Session 1**

---

## المناطق الثلاثة

```
تعديل ملفات  →  git add  →  git commit  →  (تاريخ)
 Working           Staging      History
```

**قاعدة ذهبية:** `git status` قبل كل commit.

---

## أوامر يومية

| الأمر | المعنى |
|--------|--------|
| `git init` | بداية repo محلي |
| `git clone <url>` | نسخ repo من GitHub |
| `git status` | إيه اللي اتغير؟ |
| `git add <file>` | حط في staging |
| `git add .` | كل التغييرات (احذر) |
| `git commit -m "msg"` | حفظ snapshot |
| `git log --oneline` | تاريخ مختصر |
| `git push` | إرسال لـ GitHub |
| `git pull` | جلب من GitHub |

---

## أول ربط بـ GitHub (مرة واحدة)

```bash
git remote add origin <url>
git branch -M main
git push -u origin main
```

---

## Branch & PR

```bash
git checkout -b feature/my-feature
# ... edit ...
git add .
git commit -m "feat: describe change"
git push -u origin feature/my-feature
```

→ على GitHub: **Open Pull Request** → Review → Merge.

```bash
git checkout main
git pull
```

---

## تراجع آمن (مبتدئ)

| الموقف | أمر |
|--------|-----|
| رجّع ملف قبل add | `git restore <file>` |
| شيل من staging | `git restore --staged <file>` |

⚠️ تجنب `git reset --hard` على شغل مش متأكد منه.

---

## `.gitignore` لـ Node (الحد الأدنى)

```
node_modules/
.env
dist/
```

---

## رسالة commit جيدة

- `docs: add readme`
- `feat: add login route`
- `fix: typo in error message`

---

## عالق؟

1. اقرأ رسالة الخطأ من فوق لتحت  
2. `git status`  
3. اكتب **1** في شات السيشن (auth/install)

---

## روابط

- https://docs.github.com/en/get-started  
- https://learngitbranching.js.org/  

*Adham Ahmed Galal — Mentor*
