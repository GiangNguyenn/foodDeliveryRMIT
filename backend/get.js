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

export const fetchWithCondition = async (
    collection,
    condition,
    conditionValue
) => {
    const snapshot = await firebase
        .firestore()
        .collection(collection)
        .where(condition, '==', conditionValue)
        .get()
        .catch((err) => console.log(err))
    return snapshot.docs.map((doc) => doc.data())
}

export const getWithDocument = async (collection, document) => {
    const snapshot = await firebase
        .firestore()
        .collection(collection)
        .doc(document)
        .get()
        .catch((err) => console.log(err))
    return snapshot.data()
}

// export const getRealTimeDataWithCondition = (
//     collection,
//     condition,
//     conditionValue
// // ) => {
//     return
// // }
