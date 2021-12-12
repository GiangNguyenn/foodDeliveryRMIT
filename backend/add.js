import firebase from 'firebase'
export const addToCollection = (collection, properties) => {
    return firebase
        .firestore()
        .collection(collection)
        .add(properties)
        .catch((err) => console.log(err))
}
