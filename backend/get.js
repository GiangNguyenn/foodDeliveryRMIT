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

export const getRealTimeDocChangeWithCondition = async (
    collection,
    condition,
    conditionValue
) => {
    const observer = db
        .collection(collection)
        .where(condition, '==', conditionValue)
        .onSnapshot((querySnapshot) => {
            querySnapshot.docChanges().forEach((change) => {
                return change.doc.data()
            })
        })
}

export const getDataWithMultipleConditions = async (
    collection,
    cond1,
    condval1,
    cond2,
    conval2
) => {
    const snapshot = await firebase
        .firestore()
        .collection(collection)
        .where(cond1, '==', condval1)
        .where(cond2, '==', conval2)
        .get()
        .catch((err) => console.log(err))
    return snapshot.docs.map((doc) => doc.data())
}
