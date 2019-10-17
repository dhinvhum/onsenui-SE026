
class Recommend {
    
    constructor() {
        this.firebaseCRUD = new FirestoreCRUD('recommend');
    }

    async getAll() {
        const responseData = await this.firebaseCRUD.getAll();
        return responseData;
    }
}

const recommend = new Recommend();