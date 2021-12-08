import firebase from 'firebase'

// get items based on collection
export const getAllDocuments = async (collection) => {
    const snapshot = await firebase
        .firestore()
        .collection(collection)
        .get()
        .catch((err) => console.log(err))
    return snapshot.docs.map((doc) => doc.data())
}

// get product of a restaurant
export const getProducts = async (collection, id) => {
    const snapshot = await firebase
        .firestore()
        .collection(collection + '/' + id + '/products')
        .get()
    return snapshot.docs.map((doc) => doc.data())
}

