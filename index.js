var filterList = ["All", "Done", "Not done", "Tomorrow", "Week"];

var main = document.getElementById('start-to-do-list');

function createEl(tagName, className, innerHTML, attributes) {
    var newEl = document.createElement(tagName);
    newEl.className = className || "";
    newEl.innerHTML = innerHTML || "";
    for (var attr in attributes) {
        if (attributes.hasOwnProperty(attr)) {
            newEl.setAttribute(attr, attributes[attr]);
        }
    }
    return newEl;
}

var article = createEl("article", "list");
main.appendChild(article);

var h1 = createEl("h1", "list_h1", "My Lovely To Do List");
var img = createEl("div", "list_img");
var inpCreateTask = createEl("input", "list_input list_el", "",
    {
        type: "text",
        placeholder: "Create a task",
        tabindex: "1",
        autofocus: "autofocus"
    });
var line2 = createEl("div");
article.appendChild(h1);
article.appendChild(img);
article.appendChild(inpCreateTask);
article.appendChild(line2);

var inpCreateDate = createEl("input", "list_input list_el", "",
    {
        type: "date",
        placeholder: "Due date",
        tabindex: "2"
    });
var btnAddTask = createEl("button", "list_button list_el violet", "Add Task");
line2.appendChild(inpCreateDate);
line2.appendChild(btnAddTask);

var noWrap = createEl("span", "no-wrap");
article.appendChild(noWrap);

var lblFilter = createEl("label", "", "Filter", {for: "list-filter"});
var selFilter = createEl("select", "list_input list_el", "", {id: "list-filter"});
noWrap.appendChild(lblFilter);
noWrap.appendChild(selFilter);

for (var i = 0; i < filterList.length; i++) {
    var option = createEl("option", "", filterList[i]);
    selFilter.appendChild(option);
}


