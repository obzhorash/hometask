/*
 Страница должна предварительно загрузить список городов из
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 и отсортировать в алфавитном порядке.

 При вводе в текстовое поле, под ним должен появляться список тех городов,
 в названии которых, хотя бы частично, есть введенное значение.
 Регистр символов учитываться не должен, то есть "Moscow" и "moscow" - одинаковые названия.

 Во время загрузки городов, на странице должна быть надпись "Загрузка..."
 После окончания загрузки городов, надпись исчезает и появляется текстовое поле.

 Разметку смотрите в файле towns-content.hbs

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер

 *** Часть со звездочкой ***
 Если загрузка городов не удалась (например, отключился интернет или сервер вернул ошибку),
 то необходимо показать надпись "Не удалось загрузить города" и кнопку "Повторить".
 При клике на кнопку, процесс загруки повторяется заново
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу,
 то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');

/*
 Функция должна вернуть Promise, который должен быть разрешен
 с массивом городов в качестве значения

 Массив городов пожно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 */
let url = 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json';

function loadTowns() {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();

        xhr.open('GET', url);
        xhr.responseType = 'json';

        xhr.addEventListener('load', () => {
            let city = xhr.response;

            if (xhr.status >= 400) {
                reject();
            } else {
                city.sort((a, b) => {
                    return a.name > b.name ? 1 : -1;
                });
                resolve(city);
            }

        });
        xhr.send();
        xhr.addEventListener('error', reject);
        xhr.addEventListener('abort', reject);
    });
}

/*
 Функция должна проверять встречается ли подстрока chunk в строке full
 Проверка должна происходить без учета регистра символов

 Пример:
   isMatching('Moscow', 'moscow') // true
   isMatching('Moscow', 'mosc') // true
   isMatching('Moscow', 'cow') // true
   isMatching('Moscow', 'SCO') // true
   isMatching('Moscow', 'Moscov') // false
 */
function isMatching(full, chunk) {
    return full.toLowerCase().includes(chunk.toLowerCase());
}

function renderResult(arr) {
    filterResult.innerHTML = '';

    arr.forEach(item => {
        let div = document.createElement('DIV');
        div.innerHTML = `${item}`;
        filterResult.appendChild(div);
    });

}

/* Блок с надписью "Загрузка" */
const loadingBlock = homeworkContainer.querySelector('#loading-block');
/* Блок с текстовым полем и результатом поиска */
const filterBlock = homeworkContainer.querySelector('#filter-block');
/* Текстовое поле для поиска по городам */
const filterInput = homeworkContainer.querySelector('#filter-input');
/* Блок с результатами поиска */
const filterResult = homeworkContainer.querySelector('#filter-result');

let cities;

function request() {
    loadTowns()
        .then((city) => {
            cities = city;
            loadingBlock.style.display = 'none';
            filterBlock.style.display = '';
        })
        .catch(() => {
            let pError = document.createElement('P');
            let buttonAgain = document.createElement('BUTTON');

            loadingBlock.style.display = 'none';
            pError.innerHTML = 'Не удалось загрузить города';
            buttonAgain.innerHTML = 'Повторить';
            homeworkContainer.appendChild(pError);
            homeworkContainer.appendChild(buttonAgain);

            buttonAgain.addEventListener('click', () => {
                loadingBlock.style.display = '';
                homeworkContainer.removeChild(pError);
                homeworkContainer.removeChild(buttonAgain);
                request();
            });
        });
}

request();

filterInput.addEventListener('keyup', function() {
    let textInput = filterInput.value;

    let res = textInput.length ? cities
        .filter(item => isMatching(item.name, textInput))
        .map(item => item.name) : [];

    !res.length ? filterResult.innerHTML = '' : renderResult(res);
});

export {
    loadTowns,
    isMatching
};
