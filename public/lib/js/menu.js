$(document).ready(async function () {
    const STORE_STATUS = {
        OPEN: 'Open',
        CLOSE: 'Close'
    }

    class CategoryListsElement {
        constructor() {
            this.categortlist = $('#category-lists');
        }

        async renderCategory() {
            const categories = await category.getAll();
            const categories2D = utilsHelper.changeFormatto2DArray(categories);

            const stores = await store.getAll();
            // console.log('categories2D', categories2D);
            // const CategoryDataTest = [
            //     [
            //         { id: 'category1', name: '' },
            //         { id: 'category2', name: '' }
            //     ],
            //     [
            //         { id: 'category3', name: '' },
            //         { id: 'category4', name: '' }
            //     ],
            //     [
            //         { id: 'category5', name: '' },
            //         { id: 'category6', name: '' }
            //     ]
            // ]

            categories2D.forEach((elements, index) => {
                const elSelecter = `list-${index}`
                this.categortlist.append(this.renderRowsLayoutCategory(elSelecter));
                const rowsSelecter = $(`#${elSelecter}`);
                elements.forEach((element, index) => {
                    rowsSelecter.append(this.renderCardComponentCategory(element));
                })
            })
        }

        renderRowsLayoutCategory(elSelecter) {
            return (`
                <ons-row id='${elSelecter}'></ons-row>
            `)
        }

        renderCardComponentCategory(props) {
            return (`
            <ons-col class="card" id="card-box" onclick="menuHandler.handleOpenDetail('${props.documentId}')">
                <div id="center-card-box">
                    <img id="menu-pic" src="${props.img}">
                    <p id="menu-name">${props.name}</p>
                </div>
            </ons-col>
            `);
        }
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
            </div>
            `
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

    const menuLists = new CategoryListsElement();
    await menuLists.renderCategory();


    const callBackToRenderStore = async (props) => {
        const storeLists = new StoreListsElement();
        await storeLists.renderStore(props);
    }


    const menuHandler = new MenuHandler();
    window.menuHandler = menuHandler;

});
