# Бие даалт 14 — Books API Testing

F.CSM311 Программ хангамжийн бүтээлт · Integration & API Testing

## API тайлбар

**Books REST API** — номын бүртгэлийн жижиг Express.js сервер.

| Method | Path | Тайлбар | Status |
|--------|------|---------|--------|
| GET | `/books` | Бүх номын жагсаалт | 200 |
| GET | `/books/:id` | Нэг ном | 200 / 404 |
| POST | `/books` | Шинэ ном нэмэх | 201 / 400 |
| PUT | `/books/:id` | Ном шинэчлэх | 200 / 400 / 404 |
| DELETE | `/books/:id` | Ном устгах | 204 / 404 |
| GET | `/health` | Health check | 200 |

## Локал ажиллуулах

### 1. Сервер эхлүүлэх

```bash
npm install
npm start
# Сервер http://localhost:3000 дээр ажиллана
```

Шалгах:
```bash
curl http://localhost:3000/health
# {"status":"ok","timestamp":"..."}
```

### 2. Newman суулгах

```bash
npm install -g newman newman-reporter-htmlextra
```

### 3. Newman ажиллуулах

```bash
newman run postman/collection.json -e postman/env.dev.json
```

### 4. HTML report үүсгэх

```bash
newman run postman/collection.json \
  -e postman/env.dev.json \
  --reporters cli,htmlextra \
  --reporter-htmlextra-export reports/api.html
```

Тайлан: `reports/api.html` файлыг browser-т нээнэ.

## Postman GUI-аар ажиллуулах

1. Postman Desktop нээнэ
2. `postman/collection.json` import хийнэ (File → Import)
3. `postman/env.dev.json` import хийнэ (Environment дотор)
4. **dev** environment-ыг идэвхжүүлнэ
5. Collection ажиллуулна (Run collection товч)

## Collection бүтэц

```
Gankhuyag — Books API
├── Books/
│   ├── Happy GET — List all books         (5 assertion)
│   ├── GET by id — Existing book          (4 assertion)
│   ├── POST create — Valid book            (5 assertion + pre-request + chain)
│   ├── PUT update — Use chained newBookId (4 assertion)
│   └── DELETE — Use chained newBookId     (3 assertion)
├── Errors/
│   ├── GET by id — Not found 404          (3 assertion, negative)
│   ├── POST create — Missing fields 400   (4 assertion, negative)
│   └── PUT — Not found 404                (2 assertion, negative)
└── Health/
    └── GET /health — Server status        (4 assertion)
```

**Нийт: 9 request, 34 assertion, 3 negative test, 1 pre-request script, 1 chain**

## GitHub Actions

Push хийх бүрт автоматаар Newman ажиллана. Actions tab → workflow run → api-test-report artifact.

## Хавтасны бүтэц

```
bie-daalt-14/
├── README.md
├── REFLECTION.md
├── package.json
├── partA/
│   ├── SETUP.md
│   └── screenshot.png
├── postman/
│   ├── collection.json
│   ├── env.dev.json
│   └── env.ci.json
├── .github/workflows/
│   └── api-tests.yml
├── reports/
│   └── api.html
└── server/
    └── index.js
```
