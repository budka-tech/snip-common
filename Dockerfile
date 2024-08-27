# Используем официальный образ Bun
FROM oven/bun:latest

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем файлы проекта
COPY package.json bun.lockb ./

# Устанавливаем зависимости
RUN bun install

# Копируем исходный код
COPY . .

# Указываем команду для запуска приложения
CMD ["bun", "run", "start"]