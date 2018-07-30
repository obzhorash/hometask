/* ДЗ 2 - работа с массивами и объеектами */

/*
 Задание 1:

 Напишите аналог встроенного метода forEach для работы с массивами
 Посмотрите как работает forEach и повторите это поведение для массива,
 который будет передан в параметре array
 */
function forEach(array, fn) {
    for (var i = 0; i < array.length; i++) {
        fn(array[i], i, array);
    }
}

/*
 Задание 2:

 Напишите аналог встроенного метода map для работы с массивами
 Посмотрите как работает map и повторите это поведение для массива,
 который будет передан в параметре array
 */
function map(array, fn) {
    let newArray = [];

    for (let i = 0; i < array.length; i++) {
        newArray[i] = fn(array[i], i, array);
    }

    return newArray;
}

/*
 Задание 3:

 Напишите аналог встроенного метода reduce для работы с массивами
 Посмотрите как работает reduce и повторите это поведение для массива,
 который будет передан в параметре array
 */
function reduce(array, fn, initial) {
    var prev = initial;
    var to = 0;

    if (initial === undefined) {
        prev = array[0];
        to = 1;
    }

    for (var i = to ; i < array.length; i++) {
        prev = fn( prev, array[i], i, array);
    }

    return prev;
}

/*
 Задание 4:

 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива

 Пример:
   upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
 */
function upperProps(obj) {
    let key = Object.keys(obj);
    let keyUp = [];

    for (let i = 0; i < key.length; i++) {
        keyUp[i] = key[i].toUpperCase();
    }

    return keyUp;    
}

/*
 Задание 5 *:

 Напишите аналог встроенного метода slice для работы с массивами
 Посмотрите как работает slice и повторите это поведение для массива, который будет передан в параметре array
 */
function slice(array, from, to) {
    var copyArray = [];
    var j = 0;

    if (from < 0) {
        from = array.length + from;
        if (from < 0) {
            from = 0;
        }
    }
    if (from > array.length) {
        from = array.length ;
    }

    if (to < 0) {
        to = array.length + to;
        if (to < 0) {
            to = 0;
        }
    }  
    if (to > array.length) {
        to = array.length ;
    }

    to = (to == undefined) ? array.length :to;
    from = (from == undefined) ? 0 :from;

    for (var i = from; i < to; i++) {
        copyArray[j] = array[i];
        j++;    
    }

    return copyArray;
}

/*
 Задание 6 *:

 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и
 возводить это значение в квадрат
 */
function createProxy(obj) {
    let proxy = new Proxy(obj, {
        get(targrt, prop) {
            return targrt[prop]*targrt[prop];
        }
    })

    return proxy;
}

export {
    forEach,
    map,
    reduce,
    upperProps,
    slice,
    createProxy
};
