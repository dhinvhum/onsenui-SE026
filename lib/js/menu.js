$(document).ready(async function () {

    class MenuListsElement {
        constructor() {
            this.categortlist = $('#category-lists');
            this.menulist = $('#menulist-lists');
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

            categories2D.forEach( (elements, index) => {
                const elSelecter = `list-${index}`
                this.categortlist.append(this.renderRowsLayoutCategory(elSelecter));
                const rowsSelecter = $(`#${elSelecter}`);
                elements.forEach((element, index) => {
                    rowsSelecter.append(this.renderCardComponentCategory(element));
                })
            })

            stores.forEach( (store, index) => {
                const elSelecter = `list-${index}`
                this.menulist.append(this.renderRowsLayoutMenu(elSelecter));
                const rowsSelecter = $(`#${elSelecter}`);
                // elements.forEach((X, index) => {
                //     rowsSelecter.append(this.renderCardCommponentMenu(X));
                // })
            })


            // categories.forEach(categories => {
            //     this.menuLists.append('<h1>Header</h1>')
            // });
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

        renderRowsLayoutMenu(elSelecter) {
            return (`<div class="card" id="pad-2"></div>`)
        }

        renderCardCommponentMenu(props) {
            return (`<ons-row class="box" id="card-detail">
            <div class="row">
                <div class="col" id="col-30-center"><img id="pic-store" src="${props.img}"></div>
                <div class="col" id="col-40-left">
                    <p id="name-store">${props.name}</p>
                    <p id="detail-store">Min Delivery :${props.delivery} min/ <p id="status-store">${props.status}</p>
                    </p>
                </div>
                <div class="col" id="col-30-center">
                    <i class="fas fa-star" id="gold"></i>
                    <i class="fas fa-star" id="gold"></i>
                    <i class="fas fa-star" id="gold"></i>
                    <i class="fas fa-star" id="gold"></i>
                    <i class="fas fa-star" id="gray"></i>
                    <div>
                        <p id="detail-store">27 Reviews</p>
                    </div>
                </div>
            </div>
        </ons-row>`);
        }
    }

    class MenuHandler {
        handleOpenDetail = async (documentId) => {
            const catgery = await category.getByDocumentId(documentId);
            console.log('Category-Name', catgery.name)
            const objectPass = {
                data: {
                    title: `<b>${catgery.name}</b>`,
                    category
                }
            }
            document.querySelector('#myNavigator').pushPage('detail.html', objectPass);
        }
    }

    const menuLists = new MenuListsElement();
    await menuLists.renderCategory();
    const menuHandler = new MenuHandler();
    window.menuHandler = menuHandler;

});
