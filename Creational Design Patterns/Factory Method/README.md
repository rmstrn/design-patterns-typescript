🏭 Factory Method
--------------

[English](README.md) | [Русский](README.ru.md) | [Українська](README.ua.md)

Real world example
> Imagine a coffee shop that offers different types of coffee: Espresso and Cappuccino. Instead of making the coffee manually, the barista uses a coffee machine that can brew different types of coffee. Thus, the coffee shop delegates the coffee-making process to the coffee machine based on the customer's order.

In plain words
> The Factory Method allows you to delegate the creation of objects to child classes.

📌 The client code does not know the exact class that will be created.
📌 Instead of using new, we call a factory method that creates the required object.

Wikipedia says
> In object-oriented programming, the factory method pattern is a creational pattern that uses factory methods to deal with the problem of creating objects without having to specify the exact class of the object that will be created. This is done by creating objects by calling a factory method—either specified in an interface and implemented by child classes, or implemented in a base class and optionally overridden by derived classes—rather than by calling a constructor.

**Programmatic Example**

1️⃣ Create the Coffee interface and concrete classes

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

2️⃣ Create an abstract class CoffeeMaker
This class defines the template for a coffee maker but does not create specific coffee:

```typescript
abstract class CoffeeMaker {
    abstract brew(): Coffee // Factory method

    serve(): void {
        const coffee = this.brew()
        coffee.getDescription()
    }
}
```

3️⃣ Create concrete coffee makers
Now each subclass implements the factory method brew() and returns the required object:

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

4️⃣ Use the factory to create a coffee maker
Create a factory function that dynamically creates the required object:

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
            throw new Error("❌ Error: this type of coffee is not on the menu!")
    }
}

// 📌 Usage
order(CoffeeType.Cappuccino).serve()
```

💡 Now, when ordering order(CoffeeType.Cappuccino), a CappuccinoMaker is automatically created, which brews a cappuccino.

📌 When to use?
✅ If the client code should not depend on specific classes.
✅ If you need to provide a unified interface for creating objects.
✅ If the object is created dynamically based on input data.

🎯 Examples of use in real projects
🚀 Web development: Factory for creating different types of HTTP requests (GET, POST, PUT).
📱 Mobile applications: Creating different UI components depending on the platform (iOS/Android).
🎮 Game development: Creating different types of NPCs (bots, enemies, allies) depending on the level.

🎯 Conclusion
The Factory Method is a powerful pattern that makes code flexible, extensible, and easy to maintain. Now, if you need to add a new type of coffee (e.g., Latte), you don't need to change the main code, just create a new subclass! 🚀