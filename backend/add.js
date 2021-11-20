import firebase from 'firebase'
export const addToCollection = (collection, properties) => {
    return firebase
        .firestore()
        .collection(collection)
        .add(properties)
        .then(data => console.log(data))
        .catch(err => console.log(err))
}
