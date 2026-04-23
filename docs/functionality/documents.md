# Документы (UI)

## Где находится

- UI-компоненты: `app/components/documents/`
  - `PersonDocuments.tsx` — контейнер (встраивается в `pages/profile.tsx`)
  - `DocumentsList.tsx` — список документов пользователя
  - `AddDocument.tsx` — форма добавления документа
- API-клиент: `app/services/DocumentsService.tsx`
- Типы: `app/types/UserDocumentDto.tsx`, `app/types/UserDocumentRequestDto.tsx`, `app/types/PersonDocumentType.tsx`

## Сценарии

### Просмотр документов

- **Экран**: Профиль (`pages/profile.tsx`) → вкладка **Документы**
- **Действие**: `DocumentsService.getDocuments()`
- **Запрос**: `GET /api/documents`
- **Результат**: рендерится список (MUI), отображаются:
  - описание (`doc.description`)
  - срок действия (chip `до DD.MM.YYYY`)
  - тип (`doc.type`) и статус (`doc.status`) как chips

### Добавление документа

- **Экран**: Профиль → **Добавить новый документ**
- **Действие**: `DocumentsService.createDocument(dto)`
- **Запрос**: `PUT /api/documents/create`
- **Тело** (`UserDocumentRequestDto`):
  - `type`: строка (обычно значение из `PersonDocumentType`)
  - `description`: строка
  - `expirationDate`: сейчас типизирован как `Dayjs` (см. “TODO” ниже)
- **После успеха**:
  - показывается success-текст
  - форма очищается
  - список документов перезагружается

### Загрузка файлов документа

- **Экран**: Профиль → вкладка **Документы** → форма добавления
- **Действие**: после успешного `createDocument(...)`, если выбраны файлы:
  - `DocumentsService.uploadDocumentFiles(createdDocument.id, files)`
- **Запрос**: `POST /api/documents/upload/{documentId}` (`multipart/form-data`, поле `files`)

## API/сервисные методы

`app/services/DocumentsService.tsx`:

- `getDocuments(): Promise<UserDocumentDto[]>`
- `createDocument(dto: UserDocumentRequestDto): Promise<UserDocumentDto>`
- `updateDocument(documentId: string, dto: UserDocumentRequestDto): Promise<UserDocumentDto>`
- `uploadDocumentFiles(documentId: string, files: File[]): Promise<string[]>`
- `submitDocument(documentId: string): Promise<UserDocumentDto>`

## DTO/типы

`UserDocumentDto`:

- `id: string`
- `type: string`
- `description: string`
- `expirationDate: Dayjs`
- `status: string`

`PersonDocumentType`:

- `PASSPORT`
- `DRIVER_LICENCE`
- `OTHER`

## Ограничения и TODO

- **TODO (контракт даты)**: `expirationDate` типизирован как `Dayjs` и отправляется в API “как есть”.
  - Нужно сверить backend-контракт (скорее всего ожидается ISO-строка) и привести DTO к `string`/`Date` (и сделать явное преобразование `expirationDate.toISOString()`/`expirationDate.format(...)`) в `AddDocument`/`DocumentsService`.
- **TODO (редактирование/submit)**: UI пока не даёт редактировать существующий документ и отправлять на проверку.
  - Методы `updateDocument`, `submitDocument` существуют в сервисе, но не подключены к UI.

