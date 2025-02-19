enum CoffeeType {
    Espresso,
    Cappuccino
}

interface Coffee {
    milkPercentage: number
    coffeePercentage: number

    getDescription(): void
}

class Espresso implements Coffee {
    milkPercentage = 0
    coffeePercentage = 100

    getDescription(): void {
        console.log(`Espresso contains ${this.milkPercentage}% milk and ${this.coffeePercentage}% coffee.`)
    }
}

class Cappuccino implements Coffee {
    milkPercentage = 50
    coffeePercentage = 50

    getDescription(): void {
        console.log(`Cappuccino contains ${this.milkPercentage}% milk and ${this.coffeePercentage}% coffee.`)
    }
}

abstract class CoffeeMaker {
    abstract brew(): Coffee

    serve(): void {
        const coffee = this.brew()
        coffee.getDescription()
    }
}

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

function order(coffeeType: CoffeeType): CoffeeMaker {
    switch (coffeeType) {
        case CoffeeType.Espresso:
            return new EspressoMaker()
        case CoffeeType.Cappuccino:
            return new CappuccinoMaker()
        default:
            throw new Error("Invalid coffee type selected.")
    }
}

order(CoffeeType.Cappuccino).serve()
