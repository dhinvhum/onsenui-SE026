$(document).ready(async function () {
    const STORE_STATUS = {
        OPEN: 'Open',
        CLOSE: 'Close'
    }

    class StoreListsElement {
        constructor() {
            this.storeElement = $('#store-lists');
        }

        async renderStore(props) {
            const { categoryName } = props;
            const stores = await store.getAll();
            const storesByCategory = stores.filter((store) => store.category === categoryName);
            storesByCategory.forEach((store, index) => {
                this.storeElement.append(this.renderStoreComponent(store, index));
                this.renderStar(Number(store.rate), index)
            });
        }

        renderStoreComponent(store, index) {

            const selectStatusClass = (storeStatus) => {
                if (storeStatus === STORE_STATUS.OPEN) {
                    return 'store__status--success';
                } else if (storeStatus === STORE_STATUS.CLOSE) {
                    return 'store__status--danger';
                }
            }


            const storeClassSelected = selectStatusClass(store.status);
            return `
            <div class="card" id="pad-2" onclick="detail();">
                <ons-row class="box" id="card-detail">
                    <div class="row">
                        <div class="col" id="col-30-center"><img id="pic-store" src="${store.img}"></div>
                        <div class="col" id="col-40-left">
                            <p id="name-store">${store['name-store']}</p>
                            <p id="detail-store">Min Delivery : ${store.delivery} min / <p class="store__status ${storeClassSelected}">${store.status}</p>
                            </p>
                        </div>
                        <div class="col" id="col-30-center">
                            <div id="render-star-${index}"></div>
                            <div>
                                <p id="detail-store">27 Reviews</p>
                            </div>
                        </div>
                    </div>
                </ons-row>
            </div>`
        }

        renderStar(rateNumber, index) {
            const renderStarSelecter = $(`#render-star-${index}`);
            for (let i = 0; i < 5; i++) {
                if (i < rateNumber) {
                    renderStarSelecter.append('<i class="fas fa-star" id="gold"></i>');
                } else {
                    renderStarSelecter.append('<i class="fas fa-star" id="gray"></i>');
                }
            }
        }
    }

    class MenuHandler {
        handleOpenDetail = async (documentId) => {
            const catgeryData = await category.getByDocumentId(documentId);
            const objectPass = {
                data: {
                    title: `<b>${catgeryData.name}</b>`,
                    category
                }
            }

            const props = {
                categoryName: catgeryData.name
            }

            document.querySelector('#myNavigator').pushPage('detail.html', objectPass).then(async () => {
                await callBackToRenderStore(props);
            });
        }
    }


    const callBackToRenderStore = async (props) => {
        const storeLists = new StoreListsElement();
        await storeLists.renderStore(props);
    }


    const menuHandler = new MenuHandler();
    window.menuHandler = menuHandler;

});
