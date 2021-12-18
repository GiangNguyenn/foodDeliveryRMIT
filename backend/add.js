import firebase from 'firebase'
export const addToCollection = (collection, properties) => {
    return firebase
        .firestore()
        .collection(collection)
        .add(properties)
        .catch((err) => console.log(err))
        .then((docRef) => {
            firebase
                .firestore()
                .collection(collection)
                .doc(docRef.id)
                .update({ ref: docRef.id })
        })
}
