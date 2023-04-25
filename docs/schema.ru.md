# Схема данных

Схема данных представлена на рисунке:

![Схема данных](../schema/schema.png)

Исходя из схемы данных можно составить список ограничений, которые необходимо реализовать в redux:

Icons:

-   обязан присутствовать id типа number
-   обязан присутствовать name

Statuses:

-   обязан присутствовать id типа number
-   обязан присутствовать ststus
-   обязан присутствовать color

Category:

-   обязан присутствовать id типа number
-   обязано присутствовать название категории
-   длина названия Category не должна превышать 20 символов
-   нельзя удалять Category если есть todo, у которого установлен category_id равный id, удаляемой категории

Todos:

-   обязан присутствовать id типа number
-   длина todo не должна превышать 150 символов
-   длина description не должна превышать 1000 символов
-   у нового Todo поле completed должно быть установлено в false
-   у нового Todo поле deleted должно быть установлено в false
-   обязан присутствовать status_id типа number

На базе схемы данных составим описание типов сех сущностей в `entities.d.ts`:

```ts
type Icon = {
    id: number;
    name: string;
};

type Category = {
    id: number;
    category: string;
    icon_id: number;
};

type Status = {
    id: number;
    status: string;
    color: string;
};

type Todo = {
    id: number;
    todo: string;
    description?: string;
    due_date?: string;
    category_id?: number;
    status_id: number;
    completed: boolean;
    deleted: boolean;
};
```