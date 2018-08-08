/* Задание со звездочкой */

/*
 Создайте страницу с кнопкой.
 При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией на экране
 Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
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
 Функция должна создавать и возвращать новый div с классом draggable-div и случайными размерами/цветом/позицией
 Функция должна только создавать элемент и задвать ему случайные размер/позицию/цвет
 Функция НЕ должна добавлять элемент на страницу. На страницу элемент добавляется отдельно

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
 */
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function getRandomColor() {
    let sub = '';

    for (let i = 0; i < 3; i++) {
        let rgb = Math.floor(getRandomArbitrary(0, 256)).toString(16);

        sub += (rgb.length == 1 ? '0' + rgb : rgb);
    }

    return `#${sub}`;
}

function createDiv() {
    let div = document.createElement('div'),
        divWidth = `${getRandomArbitrary(50, 300)}px`,
        divHeight = `${getRandomArbitrary(50, 300)}px`,
        divBackgroundColod = `${getRandomColor()}`;

    let windowWidth = window.innerWidth,
        windowHeight = window.innerHeight;

    let top = Math.floor( windowHeight - parseInt(divHeight)),
        left = Math.floor( windowWidth - parseInt(divWidth));

    div.style.width = divWidth;
    div.style.height = divHeight;
    div.style.background = divBackgroundColod;
    div.style.position = 'absolute';

    div.style.top = `${getRandomArbitrary(0, top)}px`;
    div.style.left = `${getRandomArbitrary(0, left)}px`;
    div.classList.add('draggable-div');

    return div;
}

/*
 Функция должна добавлять обработчики событий для перетаскивания элемента при помощи drag and drop

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
   addListeners(newDiv);
 */

function addListeners(e) {
    let target = e.target;   
    let coords = getCoords(target);
    let shiftX = e.pageX - coords.left;
    let shiftY = e.pageY - coords.top;

    function moveAt(e) {
        target.style.left = e.pageX - shiftX + 'px';
        target.style.top = e.pageY - shiftY + 'px';
    }

    document.onmousemove = function(e) {
        moveAt(e);
    }

    target.onmouseup = function() {
        document.onmousemove = null;
        target.onmouseup = null;
    }

    function getCoords(elem) { 
        let box = elem.getBoundingClientRect();

        return {
            top: box.top,
            left: box.left
        };
    }
}

let addDivButton = homeworkContainer.querySelector('#addDiv');

homeworkContainer.addEventListener('mousedown', addListeners);

addDivButton.addEventListener('click', function() {
    // создать новый div
    const div = createDiv();

    // добавить на страницу
    homeworkContainer.appendChild(div);
    // назначить обработчики событий мыши для реализации D&D
    // можно не назначать обработчики событий каждому div в отдельности, а использовать делегирование
    // или использовать HTML5 D&D - https://www.html5rocks.com/ru/tutorials/dnd/basics/
});

export {
    createDiv
};
