# А хэсэг — Setup

## Сонгосон API

**Хувилбар 3 — Өөрийн Express.js сервер**

### API товч тайлбар

Books REST API — номын бүртгэлийн жижиг сервер. Хэрэглэгч ном нэмэх, харах, засах, устгах боломжтой.

### Base URL

```
http://localhost:3000
```

### Auth

Байхгүй (auth шаардахгүй — энгийн public API)

### Endpoint-ууд

| Method | Path | Тайлбар |
|--------|------|---------|
| GET | /books | Бүх номын жагсаалт |
| GET | /books/:id | Нэг номын дэлгэрэнгүй (404 боломжтой) |
| POST | /books | Шинэ ном нэмэх (400: validation) |
| PUT | /books/:id | Ном шинэчлэх (404 боломжтой) |
| DELETE | /books/:id | Ном устгах (204) |
| GET | /health | Серверийн амьд эсэх |

### Rate limit

Байхгүй (өөрийн local сервер)

### Сервер ажиллуулах

```bash
npm install
npm start
```
