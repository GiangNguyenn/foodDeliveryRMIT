import firebase from 'firebase'

export const deleteDocument = async (collection, document) => {
    return await firebase
        .firestore()
        .collection(collection)
        .doc(document)
        .delete()
}
