import firebase from 'firebase'
export const updateDocument = async (collection, document, value) => {
    return await firebase
        .firestore()
        .collection(collection)
        .doc(document)
        .update(value)
}
