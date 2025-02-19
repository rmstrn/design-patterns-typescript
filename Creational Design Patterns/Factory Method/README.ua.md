# Фабричний метод

[English](README.md) | [Русский](README.ru.md) | [Українська](README.ua.md)

Реальний приклад
> Уявіть собі кав'ярню, яка пропонує різні види кави: Еспресо та Капучино. Замість того, щоб готувати каву вручну, бариста використовує кавоварку, яка може заварювати різні види кави. Таким чином, кав'ярня делегує процес приготування кави кавоварці на основі замовлення клієнта.

Простими словами
> Фабричний метод дозволяє делегувати створення об'єктів дочірнім класам.

📌 Клієнтський код не знає точного класу, який буде створено.
📌 Замість використання new, ми викликаємо фабричний метод, який створює необхідний об'єкт.

Вікіпедія каже
> У об'єктно-орієнтованому програмуванні шаблон фабричного методу є породжувальним шаблоном, який використовує фабричні методи для вирішення проблеми створення об'єктів без необхідності вказувати точний клас об'єкта, який буде створено. Це робиться шляхом створення об'єктів шляхом виклику фабричного методу — або визначеного в інтерфейсі та реалізованого дочірніми класами, або реалізованого в базовому класі та за бажанням перевизначеного похідними класами — замість виклику конструктора.

**Програмний приклад**

1️⃣ Створіть інтерфейс Coffee та конкретні класи

```typescript
interface Coffee {
    milkPercentage: number
    coffeePercentage: number

    getDescription(): void
}

class Espresso implements Coffee {
    milkPercentage = 0
    coffeePercentage = 100

    getDescription(): void {
        console.log(`☕ Espresso: ${this.milkPercentage}% milk, ${this.coffeePercentage}% coffee.`)
    }
}

class Cappuccino implements Coffee {
    milkPercentage = 50
    coffeePercentage = 50

    getDescription(): void {
        console.log(`☕ Cappuccino: ${this.milkPercentage}% milk, ${this.coffeePercentage}% coffee.`)
    }
}
```

2️⃣ Створіть абстрактний клас CoffeeMaker
Цей клас визначає шаблон для кавоварки, але не створює конкретну каву:

```typescript
abstract class CoffeeMaker {
    abstract brew(): Coffee // Фабричний метод

    serve(): void {
        const coffee = this.brew()
        coffee.getDescription()
    }
}
```

3️⃣ Створіть конкретні кавоварки
Тепер кожен підклас реалізує фабричний метод brew() і повертає необхідний об'єкт:

```typescript
class EspressoMaker extends CoffeeMaker {
    brew(): Coffee {
        return new Espresso()
    }
}

class CappuccinoMaker extends CoffeeMaker {
    brew(): Coffee {
        return new Cappuccino()
    }
}
```

4️⃣ Використовуйте фабрику для створення кавоварки
Створіть фабричну функцію, яка динамічно створює необхідний об'єкт:

```typescript
enum CoffeeType {
    Espresso,
    Cappuccino
}

function order(coffeeType: CoffeeType): CoffeeMaker {
    switch (coffeeType) {
        case CoffeeType.Espresso:
            return new EspressoMaker()
        case CoffeeType.Cappuccino:
            return new CappuccinoMaker()
        default:
            throw new Error("❌ Помилка: цей тип кави не в меню!")
    }
}

// 📌 Використання
order(CoffeeType.Cappuccino).serve()
```

💡 Тепер, при замовленні order(CoffeeType.Cappuccino), автоматично створюється CappuccinoMaker, який заварює капучино.

📌 Коли використовувати?
✅ Якщо клієнтський код не повинен залежати від конкретних класів.
✅ Якщо потрібно надати уніфікований інтерфейс для створення об'єктів.
✅ Якщо об'єкт створюється динамічно на основі вхідних даних.

🎯 Приклади використання в реальних проєктах
🚀 Веб-розробка: Фабрика для створення різних типів HTTP-запитів (GET, POST, PUT).
📱 Мобільні додатки: Створення різних UI-компонентів залежно від платформи (iOS/Android).
🎮 Розробка ігор: Створення різних типів NPC (ботів, ворогів, союзників) залежно від рівня.

🎯 Висновок
Фабричний метод — це потужний шаблон, який робить код гнучким, розширюваним і легким у підтримці. Тепер, якщо потрібно додати новий тип кави (наприклад, Латте), не потрібно змінювати основний код, просто створіть новий підклас! 🚀
