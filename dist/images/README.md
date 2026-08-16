# 📸 Mahsulot rasmlari shu yerga qo'yiladi

## Qoida juda oddiy

Har bir mahsulotning **id** raqami bor. Rasmni o'sha raqam bilan nomlab shu papkaga tashlang:

- id `242` → `242.png`
- id `1` → `1.png`
- id `1500` → `1500.png`

Rasm bor bo'lsa — do'konda shu rasm ko'rinadi.
Rasm yo'q bo'lsa — o'sha mahsulotning **kategoriya rasmi** ko'rinadi
(`public/categories/` papkasidan). Xato chiqmaydi, emoji ham chiqmaydi.

## Qaysi id qaysi mahsulot?

`_RASMLAR_RUYXATI.csv` faylini Excel'da oching. Unda:

| rasm_fayl_nomi | id | kategoriya | mahsulot_nomi |
|---|---|---|---|
| 242.png | 242 | Ichimliklar | Chortoq kuchli gazli 1.0 |

Ya'ni "Chortoq kuchli gazli 1.0" mahsuloti uchun rasmni `242.png` deb saqlang.

## Maslahatlar

- Format: **`.png`** tavsiya etiladi. `.jpg`, `.jpeg`, `.webp` ham ishlaydi —
  kod avtomatik topadi. Nomi faqat `<id>` bo'lsin.
- Rasm kvadrat bo'lsa chiroyli chiqadi (masalan 400x400 px).
- Hammasini birdan qilish shart emas — 20-30 ta mashhur mahsulotdan boshlang,
  qolganlari kategoriya rasmi bilan turaveradi.
- Rasm qo'shgandan keyin do'konni qayta joylang:
  `cd mini-app` → `vercel --prod`

## Kod qanday ishlaydi?

Har bir mahsulot uchun kod shu tartibda qidiradi:
`images/<id>.png` → `.jpg` → `.jpeg` → `.webp` → topilmasa `categories/<kategoriya>.jpg`.
Shuning uchun qaysi format bo'lishidan qat'i nazar ishlaydi.
