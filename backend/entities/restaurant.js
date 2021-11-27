import firebase from 'firebase'
export class Restaurant {
    constructor(address, email, imageUrl, manager, meals, name, phone, moto) {
        this.address = address
        this.email = email
        this.imageUrl = imageUrl
        this.manager = manager
        this.meals = meals
        this.name = name
        this.phone = phone
        this.moto = moto
    }
}
export const restaurantConverter = {
    toFirestore(restaurant) {
        return {
            address: restaurant.address,
            email: restaurant.email,
            imageUrl: restaurant.imageUrl,
            manager: restaurant.manager,
            meals: restaurant.meals,
            name: restaurant.name,
            phone: restaurant.phone,
            moto: restaurant.moto,
        }
    },
    fromFirestore(snapshot) {
        const data = snapshot.data(options)
        return new Restaurant(
            data.address,
            data.email,
            data.imageUrl,
            data.manager,
            data.meals,
            data.name,
            data.phone,
            data.moto
        )
    },
}
