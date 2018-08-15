/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующией cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если дабавляемая cookie не соответсвуте фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующией cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector("#homework-container");
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector("#filter-name-input");
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector("#add-name-input");
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector("#add-value-input");
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector("#add-button");
// таблица со списком cookie
const listTable = homeworkContainer.querySelector("#list-table tbody");

filterNameInput.addEventListener("keyup", filterCookie);

addButton.addEventListener("click", () => {
    let name = addNameInput.value.replace(/\s/g, "");
    let value = addValueInput.value.replace(/\s/g, "");

    if (name.length === 0 || value.length === 0) return;

    document.cookie = `${name}=${value}`;

    if (!chekCookie(name)) {
        renderCookie(name, addValueInput.value);
    } else {
        let trNew = document.querySelector(`[data-id ="${name}"]`);

        trNew.children[1].innerHTML = value;
    }
    filterCookie();
    addNameInput.value = "";
    addValueInput.value = "";
});

//  обработчик на кнопку удалить
listTable.addEventListener("click", e => {
    let target = e.target;

    if (target.tagName !== "BUTTON") return;

    let trList = document.querySelectorAll("tr");

    trList.forEach(trItem => {
        if (trItem.getAttribute("data-id") === target.getAttribute("data-id")) {
            removeCookie(trItem.firstChild.textContent);
            listTable.removeChild(trItem);
        }
    });
});

function renderCookiesAll() {
    let cookies = getCookies();
    if (cookies === "false") return;

    Object.keys(cookies).forEach(key => {
        renderCookie(key, cookies[key]);
    });
}

renderCookiesAll();

function renderCookie(name, value) {
    let thName = document.createElement("TH");
    let thValue = document.createElement("TH");
    let thBtton = document.createElement("TH");
    let buttonDel = document.createElement("BUTTON");
    let tr = document.createElement("TR");

    tr.setAttribute("data-id", name);
    buttonDel.setAttribute("data-id", name);

    thName.textContent = name;
    thValue.textContent = value;
    buttonDel.textContent = "Удалить";

    thBtton.appendChild(buttonDel);

    tr.appendChild(thName);
    tr.appendChild(thValue);
    tr.appendChild(thBtton);

    listTable.appendChild(tr);
}

function getCookies() {
    if (document.cookie == "") return false;

    return document.cookie.split("; ").reduce((prev, cur) => {
        const [name, value] = cur.split("=");

        prev[name] = value;

        return prev;
    }, {});
}

function removeCookie(cookieName) {
    let cookieDate = new Date();

    cookieDate.setTime(cookieDate.getTime() - 1);
    document.cookie = `${cookieName}= ; expires=${cookieDate.toGMTString()}`;
}

function chekCookie(name) {
    let trList = document.querySelectorAll("tr");
    let flag = false;

    trList.forEach(trItem => {
        flag = trItem.getAttribute("data-id") === name ? true : flag;
    });

    return flag;
}

function filterCookie() {
    let inputValue = filterNameInput.value;
    let trList = document.querySelectorAll("tr[data-id]");

    trList.forEach(trItem => {
        let name = trItem.getAttribute("data-id");

        trItem.hidden = true;

        if (
            `${name}`.includes(`${inputValue}`) ||
            `${trItem.children[1].innerHTML}`.includes(`${inputValue}`)
        ) {
            trItem.hidden = false;
        }
    });
}
