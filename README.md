# Бэкенд Mesto.
Бэкенд проекта Mesto социальной сети где можно делится фотографиями.

Приложение запускается на адресе http://localhost:3000

## API
POST /signin - авторизация. пример body { "email": "test@mail.ru", "password": "test" } \
POST /signup - регистрация. пример body { "email": "test@mail.ru","password": "test" } необязательные параметры name, about, avatar 

Запросы ниже возможны только после авторизации \
GET /users — возвращает всех пользователей \
GET /users/:userId - возвращает пользователя по _id \
GET /users/me - возвращает информацию о текущем пользователе \
PATCH /users/me — обновляет профиль. пример body  { "name":"renamed2","about":"rewrited" }\
PATCH /users/me/avatar — обновляет аватар. пример body {"avatar": "http://link.ru" }

GET /cards — возвращает все карточки \
POST /cards — создаёт карточку. пример body { "name":"test", "link":"http://ya.ru/image/as.png" } \
DELETE /cards/:cardId — удаляет карточку по идентификатору \
PUT /cards/:cardId/likes — поставить лайк карточке \
DELETE /cards/:cardId/likes — убрать лайк с карточки 

## Используемые технологии и решения
- Typescript в качестве основного языка проекта
- Mongodb и ODM Mongoose для хранения данных пользователей
- Node.js в качестве среды выполнения


## Команды
В этой директории, вы можете запустить:

### `npm run dev`
Запускает приложение в режиме разработчика.
Запросы направлять по адресу http://localhost:3000/ .

Также приложение перезагружается если делать изменения в коде.

### `npm start`
Запускает бэкенд по адресу http://localhost:3000/

### `npm test`
Запускает тесты.
На данный момент тесты для приложения не написаны, это в планах на будущее.

### `npm run lint`
Зупускает линтер для проверки кода

### `npm run build`
Собирает приложение для продакшана в папку build.

### `npm run deploy`
Собирает приложение и выгружает на GitHub Pages
