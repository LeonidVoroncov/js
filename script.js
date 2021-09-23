/**
 * Получить ссылку на элемент кнопки по его ID
 * @type {HTMLButtonElement}
 */
let buttonCreateWindow = document.querySelector("#ButtonCreateWindow");
// Проверить, что кнопку удалось получить (не null)
if (buttonCreateWindow) {
    // Для этой кнопки установить событие на клик мыши
    buttonCreateWindow.onclick = createWindow;
}
// Переменная-счетчик необходима для установки позиции по оси Z активного окна
// чтобы активное окно было всегда повех всех остальных
let zIndex = 1;

let index = 1;

/**
 * Создание нового окна
 * @param {MouseEvent} event
 */
function createWindow(event) {
    /**
     * Создание структуры HTML
     * <div class="window">
     *     <div class="head">
     *         <div>Текст заголовка окна</div>
     *         <div class="close"></div>
     *     </div>
     *     <div class="body"></div>
     * </div>
     */

    let rootWindow = document.createElement("div"),
        head = document.createElement("div"),
        body = document.createElement("div"),
        headerText = document.createElement("div"),
        turn = document.createElement("div"),
        close = document.createElement("div");

    rootWindow.append(head, body);
    head.append(headerText, turn, close);

    // События на заголовок для перемещения окна
    head.onmousedown = onMouseDown;
    head.onmousemove = onMouseMove;
    head.onmouseup = onMouseUp;

    headerText.textContent = "Это окно";
    rootWindow.className = "window";
    rootWindow.id = index;
    head.className = "head";
    body.className = "body";
    turn.className = "turn";
    close.className = "close";    
    // Событие на кнопку "Закрыть"
    close.onclick = closeWindow;

    // Событие на кнопку "Свернуть"
    turn.onclick = turnWindow;

    // Добавить созданное окно в конец тела страницы
    document.body.append(rootWindow);
    index += 1;
}
/**
 * @param {MouseEvent} event
 */
function closeWindow(event) {
    // Для закрытия окна получаем родительский элемент текущего
    // элемента (т.е. кнопки закрыть) с классом .window
    let thisWindow = this.closest(".window");
    if (thisWindow) {
        // И если его нашли - удаляем
        thisWindow.remove();
    }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * @param {MouseEvent} event
 */
 function turnWindow(event) {
    // Для закрытия окна получаем родительский элемент текущего
    // элемента (т.е. кнопки свернуть) с классом .window
    let thisWindow = this.closest(".window");
    if (thisWindow) {
        let footer = document.querySelector("footer");
        let item = document.createElement("div");
        item.style.visibility = history;
        footer.append(item);
        item.className = "footer-item";
        item.id = thisWindow.id;
        thisWindow.hidden = true;

        // Событие на иконку которая слева снизу
        item.onclick = openWindow;
    }
}

/**
 * @param {MouseEvent} event
 */
 function openWindow(event) {
    let icon = this.closest(".footer-item");
    let footerItems = document.querySelectorAll('body > .window')
    if (icon){
        for(let item of footerItems){
            if(item.id==icon.id)
            {
                item.hidden = false; 
            } 
        }                 
    }
    icon.remove();
 }


/**
 * @param {MouseEvent} event
 */
function onMouseDown(event) {
    // Установить флажок на текущее окно, говоря, что его можно перемещать
    // Событие onmousemove будет работать для этого элемента, если значение "true
    this.dataset.isMove = "true";
    // Сохранить текущую позицию мыши, чтобы потом найти разницу между предыдущей
    // и текущей позицией мыши
    this.dataset.x = "" + event.clientX;
    this.dataset.y = "" + event.clientY;
    // Установить на текущее окно позицию по оси Z выше, чем у кого-либо
    this.parentElement.style.zIndex = "" + (zIndex++);
}
/**
 * @param {MouseEvent} event
 */
function onMouseUp(event) {
    this.dataset.isMove = "false";
}
/**
 * @param {MouseEvent} event
 */
function onMouseMove(event) {
    if (this.dataset.isMove !== "true") return;

    // Разница позиции курсора текущего кадра с предыдущим
    let x = event.clientX - +this.dataset.x;
    let y = event.clientY - +this.dataset.y;

    let bound = this.parentElement.getBoundingClientRect();

    this.parentElement.style.left = `${bound.left + x}px`;
    this.parentElement.style.top = `${bound.top + y}px`;

    this.dataset.x = "" + event.clientX;
    this.dataset.y = "" + event.clientY;
}