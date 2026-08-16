# 🖼 Kategoriya rasmlari

Har bir kategoriya uchun bitta haqiqiy foto. Mahsulotning **o'z** rasmi
bo'lmasa (`public/images/<id>.png` yo'q bo'lsa), do'konda shu rasm ko'rinadi.
Shuning uchun ilovada hech qayerda emoji qolmadi.

Fayl nomi = kategoriya `id` si (`src/data/products.js` dagi `categories`):

| fayl | kategoriya |
|---|---|
| `muzqaymoq.jpg` | Muzqaymoq |
| `sut.jpg` | Sut mahsulotlari |
| `ichimlik.jpg` | Ichimliklar |
| `kofe_choy.jpg` | Kofe va choy |
| `souslar.jpg` | Souslar va yog'lar |
| `shirinlik.jpg` | Shirinliklar |
| `snack.jpg` | Chips va gazaklar |
| `yongoq.jpg` | Yong'oq va quruq meva |
| `bakaleya.jpg` | Bakaleya |
| `non_tuxum.jpg` | Non va tuxum |
| `meva.jpg` | Meva-sabzavot |
| `kolbasa.jpg` | Kolbasa va go'sht |
| `gigiena.jpg` | Gigiena |
| `uy_kimyo.jpg` | Uy-ro'zg'or |
| `bolalar.jpg` | Bolalar uchun |
| `idish.jpg` | Bir martalik idish |
| `boshqa.jpg` | Boshqa |
| `parfumeriya.jpg` | Parfumeriya |

## Rasmni almashtirmoqchi bo'lsangiz

Yangi rasmni **xuddi shu nom** bilan saqlang (`.jpg`, kvadrat, 400x400 px).
Kod fayl nomiga qarab topadi — boshqa hech narsani o'zgartirish shart emas.

Yangi kategoriya qo'shsangiz: rasmni shu papkaga tashlang va uning `id` sini
`src/data/photos.js` dagi `CATEGORY_IDS` ro'yxatiga qo'shing. Ro'yxatda
bo'lmasa, `boshqa.jpg` ko'rinadi.

## Rasmlar qayerdan olingan?

[Pexels](https://www.pexels.com) — bepul, tijorat uchun ham ruxsat etilgan,
muallifni ko'rsatish (attribution) shart emas.
Litsenziya: https://www.pexels.com/license/
