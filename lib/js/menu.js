$(document).ready(async function(){
    class MenuListsElement {

        constructor() {
            this.menuLists = $('#menu-lists');
        }


        async render() {
            const categories = await category.getAll();
            const categories2D = utilsHelper.changeFormatto2DArray(categories);
            console.log('categories2D', categories2D);
            const TestData = [
                [
                    {id: 'test1', name: 'FastFood1'},
                    {id: 'test2', name: 'FastFood2'}
                ],
                [
                    {id: 'test3', name: 'FastFood1'},
                    {id: 'test4', name: 'FastFood2'}
                ],
                [
                    {id: 'test5', name: 'FastFood1'},
                    {id: 'test6', name: 'FastFood2'}
                ]
            ]

            categories2D.forEach((elements, index) => {
                const elSelecter = `list-${index}`
                this.menuLists.append(this.renderRowsLayout(elSelecter));
                const rowsSelecter = $(`#${elSelecter}`);
                elements.forEach((element, index) => {
                    rowsSelecter.append(this.renderCardComponent(element));
                })
                
            })


            // categories.forEach(categories => {
            //     this.menuLists.append('<h1>Header</h1>')
            // });
        }
        renderRowsLayout(elSelecter) {
            return (`
                <ons-row id='${elSelecter}'></ons-row>
            `)
        }

        renderCardComponent(props) {
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

    class MenuHandler {
        handleOpenDetail = async (documentId) => {
            const catgery = await category.getByDocumentId(documentId);
            console.log('documentId', catgery)
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
    await menuLists.render();
    const menuHandler = new MenuHandler();
    window.menuHandler = menuHandler;

});
