import firebase from 'firebase'
export const getAllDocuments = async (collection) => {
    console.log('getting document from ', collection)
    const snapshot = await firebase
        .firestore()
        .collection(collection)
        .get()
        .catch((err) => console.log(err))
    return snapshot.docs.map((doc) => doc.data())
}
