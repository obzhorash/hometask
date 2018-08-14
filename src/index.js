/* ДЗ 6 - Асинхронность и работа с сетью */

/*
 Задание 1:

 Функция должна возвращать Promise, который должен быть разрешен
 через указанное количество секунду

 Пример:
   delayPromise(3) // вернет promise, который будет
   разрешен через 3 секунды
 */
function delayPromise(seconds) {
    const ms = seconds*1000;
    const promise = new Promise((resolve) => {
        setTimeout(()=> {
            resolve();
        }, ms);
    });

    return promise;

}

/*
 Задание 2:

 2.1: Функция должна вернуть Promise, который должен быть
 разрешен с массивом городов в качестве значения

 Массив городов пожно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json

 2.2: Элементы полученного массива должны быть отсортированы по имени города

 Пример:
   loadAndSortTowns().then(towns => console.log(towns))
   // должна вывести в консоль отсортированный массив городов
 */
function loadAndSortTowns() {
    return new Promise((resolve) => {
        let xhr = new XMLHttpRequest();
        let url = 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json';

        xhr.open('GET', url);
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            let city = xhr.response;

            city.sort((a, b) => {
                return a.name > b.name ? 1 : -1;
            });
            resolve(city);
        });
        xhr.send();

    });

}

export {
    delayPromise,
    loadAndSortTowns
};
