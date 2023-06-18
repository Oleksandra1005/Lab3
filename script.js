const products = [
    {
        title: 'Помідори',
        remained: 3,
        isBought: false
    },
    {
        title: 'Печиво',
        remained: 1,
        isBought: false
    },
    {
        title: 'Сир',
        remained: 2,
        isBought: true
    }
];

const buyList = document.getElementById('buy-list');
const remainedList = document.getElementById('remained-list');
const boughtList = document.getElementById('bought-list');

buyList.addEventListener('click', function (event) {
    if (event.target.classList.contains('del')) {
        const listItem = event.target.closest('.list-item');
        const index = Array.from(listItem.parentNode.children).indexOf(listItem);
        products.splice(index, 1);
        listItem.remove();
        initialListState();
    }
    if (event.target.classList.contains('plus')) {
        const listItem = event.target.closest('.list-item');
        const index = Array.from(listItem.parentNode.children).indexOf(listItem);
        products[index].remained++;
        initialListState();
    }
    if (event.target.classList.contains('minus')) {
        const listItem = event.target.closest('.list-item');
        const index = Array.from(listItem.parentNode.children).indexOf(listItem);
        products[index].remained--;
        initialListState();
    }
    if (event.target.classList.contains('buy-btn')) {
        const listItem = event.target.closest('.list-item');
        const index = Array.from(listItem.parentNode.children).indexOf(listItem);
        products[index].isBought = !products[index].isBought;
        initialListState();
    }
    if (event.target.classList.contains('title')) {
        const listItem = event.target.closest('.list-item');
        const index = Array.from(listItem.parentNode.children).indexOf(listItem);
        const titleElement = event.target;

        const inputElement = document.createElement('input');
        inputElement.className = 'editable';

        titleElement.addEventListener('click', () => {
            titleElement.style.display = 'none';
            inputElement.value = titleElement.textContent;
            titleElement.parentNode.insertBefore(inputElement, titleElement);
            inputElement.style.display = 'inline-block';
            inputElement.style.width = '100px';
            inputElement.focus();
        });

        inputElement.addEventListener('blur', () => {
            products[index].title = inputElement.value;
            titleElement.textContent = inputElement.value;
            inputElement.style.display = 'none';
            titleElement.style.display = 'inline-block'
            initialListState();
        })
    }

});

const buyListItem = (title, remained = 1, isBought = false) => {
    let boughtBtn = isBought ? 'Не куплено' : 'Куплено';
    let boughtDel = isBought ? 'disabled' : '';
    return `
        <div class="list-item">
                <span class="title ${isBought ? 'crossed-out' : ''}">${title}</span>
                <div class="counter">
                    <button class="minus ${remained <= 1 ? 'disabled' : ''} tooltip  ${boughtDel}" ${boughtDel} ${remained <= 1 ? 'disabled' : ''} data-tooltip="Зменшити">-</button>
                    <span class="amount">${remained}</span>
                    <button class="plus tooltip  ${boughtDel}" ${boughtDel} data-tooltip="Збільшити">+</button>
                </div>
                <div class="right">
                    <button class="buy-btn btn tooltip" data-tooltip="${boughtBtn}">${boughtBtn}</button>
                    <button class="del btn tooltip ${boughtDel}" ${boughtDel} data-tooltip="Видалити">x</button>
                </div>
        </div>
    `;
};

const remainedListItem = (title, remained) => {
    return `<span class="remained-item"><span>${title}</span><span class="item-count">${remained}</span></span>`
}

const boughtListItem = (title, remained) => {
    return `<span class="bought-item"><span>${title}</span><span class="item-count">${remained}</span></span>`
}

const initialListState = () => {
    buyList.innerText = '';
    remainedList.innerHTML = '';
    boughtList.innerHTML = '';
    for (const product of products) {
        buyList.innerHTML += buyListItem(product.title, product.remained, product.isBought);
    }
    for (const product of products.filter(p => !p.isBought)) {
        remainedList.innerHTML += remainedListItem(product.title, product.remained)
    }
    for (const product of products.filter(p => p.isBought)) {
        boughtList.innerHTML += boughtListItem(product.title, product.remained)
    }


}

initialListState();

const addToListBtn = document.getElementById('add-to-list-btn');

addToListBtn.addEventListener('click', () => {
    const newItem = document.getElementById('add-to-list-input');
    if (!newItem.value) return;

    products.push({title: newItem.value, remained: 1, isBought: false});
    initialListState();
    newItem.value = '';
    newItem.focus();

})