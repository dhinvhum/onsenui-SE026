class Store {
    
    constructor() {
        this.firebaseCRUD = new FirestoreCRUD('store');
    }

    async getAll() {
        const responseData = await this.firebaseCRUD.getAll();
        return responseData;
    }

    async getByDocumentId(documentId) {
        const responseData = await this.firebaseCRUD.getById(documentId);
        return responseData;
    }

    async updateByDocumentId(documentId, editData) {
        const responseData = await this.firebaseCRUD.updateById(documentId, editData);
        return responseData;
    }
    
}

const store = new Store();