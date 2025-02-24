# Real-Time Chat Application (Ionic Vue 3 + SignalR)

Это приложение для обмена сообщениями в реальном времени, использующее **Ionic + Vue 3**

## Требования

-   **Node.js** (версия 16 и выше)
-   **Ionic CLI** (версия 6 и выше)
-   **npm** (для управления зависимостями)

## Установка и запуск серверной части

### 1. Клонирование репозитория

Необходимо клонировать репозиторий на локальную машину:

```bash
git clone https://github.com/nicksuomi/AzureSignalRService.git
```

### 2. Настройка CORS

Добавьте следующий код в файл Program.cs для настройки CORS:

<pre>
// Add CORS services ()
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins", policy =>
    {
        policy.WithOrigins("http://localhost:8100")
            .AllowCredentials()  // Allow credentials
            .AllowAnyMethod()  // Allow any HTTP method
            .AllowAnyHeader();  // Allow any header
    });
});

// Enable CORS
app.UseCors("AllowAllOrigins");
</pre>

### 3. Запуск

Для запуска серверной части выполните скрипт через команду:

```bash
./run.sh
```

Это запустит первый клиент по адресу http://localhost:3209/messenger/.

## Установка и запуск клиентской части

### 1. Установка Ionic CLI

Перед началом работы необходимо установить Ionic CLI. Для этого выполните следующую команду:

```bash
npm install -g @ionic/cli
```

### 2. Клонирование репозитория

Клонируйте репозиторий с исходным кодом:

```bash
git clone https://github.com/Beisenbayev/real-time-chat.git
cd real-time-chat
```

### 3. Установка зависимостей

Установите все необходимые зависимости с помощью npm:

```bash
npm install
```

### 4. Запуск приложения

Для запуска приложения в режиме разработки, используйте команду:

```bash
ionic serve
```

Это запустит локальный сервер, и вы сможете открыть приложение в браузере по адресу http://localhost:8100.

## Страницы

-   `/auth` - Страница авторизации
-   `/chat` - Страница отправки сообщений

## Структура проекта

```bash
/src
  /api
    /services  # Сервисы для работы с API
    /interfaces  # Интерфейсы данных
  /components  # Компоненты интерфейса
  /shared
    /services  # Общие сервисы
  /views  # Страницы приложения
  App.vue  # Главный компонент приложения
  main.ts  # Точка входа для Vue приложения

```
