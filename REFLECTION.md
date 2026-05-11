# REFLECTION.md — Бие даалт 14 Эргэцүүлэл

## 1. Аль assertion хамгийн их үнэ цэнэтэй санагдсан вэ? Яагаад?

Хамгийн их үнэ цэнэтэй нь **schema + property validation** assertion байсан. Status code нь ердөө "хариу ирсэн" гэдгийг л баталгаажуулдаг бол schema тест нь "зөв бүтэцтэй хариу ирсэн" гэдгийг шалгана. API-ийн contract гэдэг нь яг schema. Жишээлбэл, `pm.expect(d).to.have.property('id')` гэж бичихэд хэрэв ирэдэйд API-ийн хөгжүүлэгч `id`-г `bookId` болгон өөрчилвөл тест шууд fail болно. Энэ нь "алдааг эрт илрүүлэх" зарчмын цэвэр жишээ — production-д хүрэхийн өмнө CI дотор гацна.

## 2. Negative test-ийн нэг жишээг дэлгэрэнгүй тайлбарла

**POST /books — title дутуу payload** тест:

Хүсэлт явуулахдаа `{ "year": 2024 }` гэж зөвхөн `year` талбар бүхий JSON явуулсан. Энэ тест нь серверийн **body validation logic**-ийг шалгана. Хэрэв сервер 201 буцаавал аюултай — бүтэлгүй мэдээлэл бүртгэлд орно. Сервер 400 буцаах ёстой, мөн `error` талбар агуулсан JSON буцаах ёстой.

Энэ тест "хэвийн ажиллах"-ын нөгөө тал. API-ийн contract нь зөвхөн амжилттай замыг биш, алдааны замыг ч тодорхойлно. Client-уудын хувьд 400 response авсны дараа яах вэ гэдгийг мэдэх нь чухал.

## 3. Postman дотор амжилттай ажилласан тест Newman-д fail болсон уу?

Тийм байж болно. Хамгийн түгээмэл шалтгаан: Postman GUI дотор environment variable-уудыг гараар бөглөсөн байдаг, харин Newman-д `env.json` файлаас уншина. Хэрэв `env.json`-д `newBookId` хоосон байвал chain хийсэн PUT, DELETE тестүүд fail болно. Шийдэл: pre-request скрипт болон chain script-уудыг collection дотор байрлуулж, env файлд зөвхөн `baseUrl` зэрэг статик утгуудыг хадгалах.

## 4. Token/Secret-ыг хэрхэн зохицуулсан вэ?

Энэ API auth шаардахгүй тул token байхгүй. Гэхдээ token-той API-д environment variable-ын соёлыг дагах шаардлагатай:

- `env.dev.json` — `REPLACE_WITH_YOUR_TOKEN` гэж placeholder бичнэ
- `env.ci.json` — `${{ secrets.API_TOKEN }}` гэж GitHub Secrets-аас авна
- `.gitignore`-д real token агуулсан файлыг нэмнэ
- `README.md`-д "REPLACE_THIS" гэж тодорхой бичнэ

Гол дүрэм: **secret-ийг commit хийхгүй**. Git history-г цэвэрлэхэд маш хэцүү.

## 5. API өөрчлөгдвөл collection-ийн аль хэсэг хамгийн их эвдрэх вэ?

**Chain хийсэн request-ууд** хамгийн эмзэг. POST → PUT → DELETE гэсэн chain дотор POST-ийн response бүтэц өөрчлөгдвөл (жишээ нь `id` → `bookId`) бүх дараагийн request-ууд cascade байдлаар fail болно. Нэг цэг эвдэрснээс олон тест нурна.

**Бууруулах арга:**
- Schema assertion-уудыг тодорхой бичих — тэд эвдрэлийг эрт илрүүлнэ
- Collection-ийн эхэнд "contract check" folder нэмэх
- Env variable-уудыг chain-ийн эхэнд шалгах pre-request script бичих
