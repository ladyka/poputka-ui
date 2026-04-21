# Тесты в проекте

В проекте подключены **Unit** и **Component/Integration** тесты на базе **Vitest + Testing Library**.  
Тесты запускаются **в консоли** (без GUI), подходят для GitLab CI.

## Быстрый старт

### Требования
- **Node.js** (рекомендуется LTS)
- **npm**

Установка зависимостей:

```bash
npm ci
```

## Как запускать

### Через Makefile (рекомендуется)

```bash
# запустить unit/component/integration тесты
make unit

# запустить тесты в watch-режиме
make watch

# запустить тесты и собрать coverage
make coverage

# полный прогон (lint + next build + tests)
make verify
```

### Напрямую через npm scripts

```bash
# unit/component/integration (Vitest)
npm run test:unit

# watch-режим
npm run test:watch

# coverage
npm run test:coverage

# полный прогон репозитория
npm run verify
```

## Где лежат тесты и как они именуются

Vitest ищет тесты по шаблону:
- `**/*.{test,spec}.{ts,tsx}`

Примеры, которые уже есть:
- `app/utils/dateFormatters.test.ts` (unit)
- `app/sign-in/SignIn.test.tsx` (component)

## Окружение тестов

- Тесты запускаются в **jsdom** окружении.
- Общие настройки/матчеры находятся в `test/setup.ts`:
  - подключён `@testing-library/jest-dom` (матчеры вроде `toBeInTheDocument()`).

## Coverage

Собрать покрытие:

```bash
make coverage
# или: npm run test:coverage
```

Выходные файлы:
- `coverage/lcov.info` (удобно для CI/отчётов)
- `coverage/index.html`
- `coverage/cobertura-coverage.xml` (для GitLab MR coverage report)

Конфиг coverage находится в `vitest.config.ts`.

## Что гонять в CI (GitLab)

Минимально полезный набор:

```bash
npm ci
npm run lint
npm run test          # next build (уже используется как “build test”)
npm run test:unit     # vitest run
```

Если хотите собирать coverage в CI:

```bash
npm run test:coverage
```

И затем сохранять артефакты:
- `coverage/` (или минимум `coverage/lcov.info`)

### Coverage в GitLab UI (процент + отчёт в MR)

- **Процент coverage в пайплайне/MR**: GitLab может парсить значение из лога job по regex.  
  Для Vitest удобно парсить строку `Statements   : 73.52% ...`:

```yaml
coverage: '/Statements\s*:\s*([0-9.]+)%/'
```

- **Coverage report в Merge Request**: GitLab понимает формат **Cobertura**.
  В проекте Vitest генерирует `coverage/cobertura-coverage.xml`, его можно подключить так:

```yaml
artifacts:
  reports:
    cobertura: coverage/cobertura-coverage.xml
```

## Примечания по мокам

- Для component/integration тестов обычно мокают:
  - сетевые запросы (через MSW или мок функций сервисов)
  - роутинг Next.js (`next/navigation`) — через `vi.mock(...)`

Проект уже содержит пример мока:
- `app/sign-in/SignIn.test.tsx` мокает `useRouter()` и `useLoginService()`.

