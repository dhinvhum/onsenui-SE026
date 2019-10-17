const db = firebase.firestore();

class FirestoreCRUD {
    constructor(collection) {
        this.collection = collection;
    }

    async getLastKey() {
        const querySnapshot = await db
          .collection(this.collection)
          .orderBy("id", "desc")
          .limit(1)
          .get();
        let key = 0;
        querySnapshot.forEach(doc => {
          key = doc.data().id;
        });
        return key;
    }

    async create(data) {
        try {
          data.id = (await this.getLastKey()) + 1;
          const response = await db.collection(this.collection).add(data);
          return response.id;
        } catch (error) {
          throw Promise.reject(error);
        }
    }

    async getAll() {
        try {
          const querySnapshot = await db.collection(this.collection).get();
          let data = [];
          querySnapshot.forEach(doc => {
            let Objectdata = {
              documentId: doc.id
            };
            Objectdata = Object.assign(Objectdata, doc.data());
            data.push(Objectdata);
          });
    
          return data;
        } catch (error) {
          throw Promise.reject(error);
        }
      }

      async getById(documentId) {
        try {
          const docRef = await db.collection(this.collection).doc(documentId);
          const doc = await docRef.get();
          let objectData = {
            documentId: doc.id
          };
    
    
          objectData = Object.assign(objectData, doc.data());
          return objectData;
        } catch (error) {
          throw Promise.reject(error);
        }
      }

      async updateById(documentId, editData) {
        try {    
          await db
            .collection(this.collection)
            .doc(documentId)
            .update(editData);
          return true;
        } catch (error) {
          console.log("Error");
          throw Promise.reject(error);
        }
      }
}