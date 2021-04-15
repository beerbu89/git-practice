'use strict';

//searchBtn
const searchBtn = document.querySelector('.searchIcon > i');
const searchText = document.querySelector('.searchText');


searchBtn.addEventListener('click', () => {
    searchText.classList.toggle('active');
});


//마우스 hover & out subTitle
const subMenuCoffee = document.querySelector('.coffee');
const coffeeArea = document.getElementById('coffeeID');

subMenuCoffee.addEventListener('mouseover', () => {
    coffeeArea.style.display = 'block';
});

subMenuCoffee.addEventListener('mouseout', () => {
    coffeeArea.style.display = 'none';
});

//lineNotice
const noticeDownBtn = document.querySelector('.lineNotice_down > #down');
const noticeInfoBtn = document.querySelector('.noticeInfo');

noticeDownBtn.addEventListener('click', () => {
    let state = noticeDownBtn.classList.toggle('active');

    if (state === true) {
        noticeInfoBtn.style.display = 'block';
        displayItems(noticeListCopy);
    } else { noticeInfoBtn.style.display = 'none' };

});

//load json

let noticeListCopy = {};

loadItems()
    .then(items => {
        initialFile(items);
        displayItems(items);
        setEventListeners(items);
    })
    .catch(console.log);

//json파일읽기
function loadItems() {
    return fetch('data/data.json')
        .then(response => response.json())
        .then(json => json.items);
}
//초기 파일
function initialFile(items) {
    noticeListCopy = items;
}

//update html
function displayItems(items) {
    const container = document.querySelector('.lineNoticeMenuList');
    container.innerHTML = items.map(item => createHTMLString(item)).join('');
}

//json data를 html로 만들기 
function createHTMLString(item) {
    return `
      <li>
        <img src=${item.image} alt="noticeList">
      </li>
    `;
}

//notice menu btn left & right
function setEventListeners(items) {
    const leftBtn = document.querySelector('#lineNoticeMenuLeftBtn');
    const rigthBtn = document.querySelector('#lineNoticeMenuRightBtn');

    leftBtn.addEventListener('click', event => onButtonClick(event, items));
    rigthBtn.addEventListener('click', event => onButtonClick(event, items));
}

let noticeListCount = 0;

function onButtonClick(event, items) {
    const dataset = event.target.dataset;
    const key = dataset.key;
    const target = event.target.id;

    if (key === null) { return; }

    noticeListCopy = items;

    if (target === 'lineNoticeMenuLeftBtn') {
        --noticeListCount;

        if (noticeListCount < 0) { noticeListCount = items.length - 1; }
    }

    if (target === 'lineNoticeMenuRightBtn') {
        ++noticeListCount;

        if (noticeListCount >= items.length) { noticeListCount = 0; }
    }

    let strCount = noticeListCount.toString();

    const filter = items.filter(item => item[key] === strCount);

    //console.log(filter);    

    displayItems(filter);
}

//메인배너버튼 
const mainBeanBtn = document.querySelector('.bean_btn');

mainBeanBtn.addEventListener('mouseover', () => {
    let mainBeanBtnA = document.querySelector('.bean_btn > a');

    btnOver(mainBeanBtnA);
    //mainBeanBtnA.style.color = 'white';
    //mainBeanBtnA.style.textDecoration = 'underline';
})

function btnOver(btn) {
    btn.style.color = 'white';
    btn.style.textDecoration = 'underline';
}

const reserveBtn = document.querySelector('.reserve_btn');

reserveBtn.addEventListener('mouseover', () => {
    let reserveBtnA = document.querySelector('.reserve_btn > a');

    btnOver(reserveBtnA);
})