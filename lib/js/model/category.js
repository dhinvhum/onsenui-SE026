
class Category {
    
    constructor() {
        this.firebaseCRUD = new FirestoreCRUD('category');
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

const category = new Category();