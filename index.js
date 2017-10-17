var filterList = ["All", "Done", "Not done", "Tomorrow", "Week"];
var taskList = [
    {done: false, text: "Сделать домашку машку", date: "27.05.17"},
    {done: true, text: "Сделать домашку", date: "07.08.17"},
    {done: false, text: "Сделать дом", date: ""},
    {done: false, text: "Сделать домашкуу", date: ""}
];
var showDate = true;

var main = document.getElementById('start-to-do-list');

function createEl(tagName, parent, className, innerHTML, attributes) {
    var newEl = document.createElement(tagName);
    newEl.className = className || "";
    newEl.innerHTML = innerHTML || "";
    for (var attr in attributes) {
        if (attributes.hasOwnProperty(attr)) {
            newEl.setAttribute(attr, attributes[attr]);
        }
    }
    parent && parent.appendChild(newEl);
    return newEl;
}

var article = createEl("article", main, "list");
createEl("h1", article, "list_h1", "My Lovely To Do List");
createEl("div", article, "list_img");
var inpCreateTask = createEl("input", article, "list_input list_el", null, {
    type: "text",
    placeholder: "Create a task",
    tabindex: "1",
    autofocus: "autofocus"
});

var line2 = createEl("div", article);
var inpCreateDate = createEl("input", line2, "list_input list_el", null, {
    type: "date",
    placeholder: "Due date",
    tabindex: "2"
});
var btnAddTask = createEl("button", line2, "list_button list_el violet", "Add Task");

var noWrap1 = createEl("span", article, "no-wrap");
createEl("label", noWrap1, null, "Filter: ", {for: "list-filter"});

var selFilter = createEl("select", noWrap1, "list_input list_el", null, {id: "list-filter"});
for (var i = 0; i < filterList.length; i++) {
    var option = createEl("option", selFilter, null, filterList[i]);
}

var noWrap2 = createEl("span", article, "no-wrap");
var chbShowDate = createEl("input", noWrap2, "list_check", null, {
    id: "list-check",
    type: "checkbox"
});
chbShowDate.checked = showDate;
createEl("label", noWrap2, "list_el list_label-check violet", null, {for: "list-check"});
createEl("label", noWrap2, null, " Show date field", {for: "list-check"});

var tableCont = createEl("div", article, "list_table-container");
var table = createEl("table", tableCont, "list_table");

for (var k = 0; k < taskList.length; k++) {
    var row = createEl("tr", table);
    row.onclick = function () {
        window.el = this;
        console.log(this.rowIndex);
    };
    var td1 = createEl("td", row, "list_table-checkbox");
    var check = taskList[k].done ? "checked" : null;
    createEl("input", td1, "list_check", null, {type: "checkbox", id: k}).checked = check;
    createEl("label", td1, "violet list_el list_label-check", null, {for: k});

    createEl("td", row, null, taskList[k].text);
    createEl("td", row, "list_table-date", taskList[k].date);

    var td4 = createEl("td", row);
    createEl("button", td4, "list_button--del list_el violet");
}