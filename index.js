var MODULE = (function () {

    var cont = null;
    var style = null;

    return {
        destroy: function(){
            main.parentElement.removeChild(main);
            style.parentElement.removeChild(style);
        },
        init: function (main) {
            cont = main;
            var filterList = ["All", "Done", "Not done", "Tomorrow", "Week"];
            // var taskList = [];
            var taskList = [
                {done: true, text: "Написать крутой ToDoList", date: "18.10.2017"},
                {done: false, text: "Узнать рекомендации по работе", date: ""}
            ];
            var showDate = true;

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

            function clickAddEl(event) {
                event.keyCode === 13 && btnAddTaskClick();
            }

            function switchFilter(elem, value) {
                value = value || selFilter.value;
                elem = elem || taskList;
                switch (value) {
                    case filterList[1]:
                        return elem.filter(function (obj) {
                            return obj.done;
                        });
                        break;
                    case filterList[2]:
                        return elem.filter(function (obj) {
                            return !obj.done;
                        });
                        break;
                    case filterList[3]:
                        var date = new Date();
                        date.setDate(date.getDate() + 1);
                        date = getDateString(date);
                        return elem.filter(function (obj) {
                            return obj.date === date;
                        });
                        break;
                    case filterList[4]:
                        var week = new Date();
                        week.setDate(week.getDate() + 7);
                        toDay = getDateString();
                        week = getDateString(week);
                        return elem.filter(function (obj) {
                            return obj.date >= toDay && obj.date < week;
                        });
                        break;
                }
            }

            function getDateString(date) {
                date = date || new Date();
                return date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear();
            }

            var article = createEl("article", main, "list");
            var container = createEl("div", article);
            createEl("h1", container, "list_h1", "My Lovely To Do List");
            var img = createEl("div", container, "list_img");

            var inpCreateTask = createEl("input", container, "list_input list_el", null, {
                type: "text",
                placeholder: "Create a task",
                tabindex: "1",
                autofocus: "autofocus"
            });
            inpCreateTask.onkeypress = clickAddEl;


            var line2 = createEl("div", container);
            var inpCreateDate = createEl("input", line2, "list_input list_el", "18.10.2017", {
                type: "date",
                placeholder: "Due date",
                tabindex: "2"
            });
            var flag;
            if (inpCreateDate.valueAsDate === undefined) {
                flag = true;
                inpCreateDate.value = getDateString();
            }
            inpCreateDate.valueAsDate = new Date();

            var btnAddTaskClick = createEl("button", line2, "list_button list_el violet", "Add Task").onclick = function () {
                inpCreateTask.focus();
                if (inpCreateTask.value === "") {
                    img.classList.add('error--img');
                    inpCreateTask.classList.add('error--input');
                    return;
                }
                img.classList.remove('error--img');
                inpCreateTask.classList.remove('error--input');
                var duedate = flag ? inpCreateDate.value : inpCreateDate.valueAsDate ? getDateString(inpCreateDate.valueAsDate) : "";
                taskList.push({done: false, text: inpCreateTask.value, date: duedate});

                addRow(taskList.length - 1);
                if (selFilter.value !== filterList[0])
                    selFilter.onchange();
                inpCreateTask.value = "";
                tableCont.scrollTop = tableCont.scrollHeight;
            };

            var noWrap1 = createEl("span", container, "no-wrap");
            createEl("label", noWrap1, null, "Filter: ", {for: "list-filter"});

            var selFilter = createEl("select", noWrap1, "list_input list_el", null, {id: "list-filter"});
            for (var i = 0; i < filterList.length; i++) {
                var option = createEl("option", selFilter, null, filterList[i]);
            }
            selFilter.onchange = function () {
                tableCont.removeChild(table);
                var filter = switchFilter(taskList, this.value) || taskList;
                table = createEl("table", tableCont, "list_table");
                for (var i = 0; i < filter.length; i++) {
                    addRow(i, filter);
                }
            };

            //noWrap1.outerHTML = noWrap1.outerHTML + " ";

            var noWrap2 = createEl("span", container, "no-wrap");
            var chbShowDate = createEl("input", noWrap2, "list_check", null, {
                id: "list-check",
                type: "checkbox"
            });
            chbShowDate.checked = showDate;
            chbShowDate.onchange = function () {
                for (var l = 0; l < table.rows.length; l++) {
                    table.rows[l].cells[2].style.display = this.checked ? "" : "none";
                }
                showDate = !showDate;
            };
            createEl("label", noWrap2, "list_el list_label-check violet", null, {for: "list-check"});
            createEl("label", noWrap2, null, " Show date field", {for: "list-check"});

            var tableCont = createEl("div", article, "list_table-container");
            var table = createEl("table", tableCont, "list_table");

            for (var m = 0; m < taskList.length; m++) {
                addRow(m);
            }

            function addRow(k, list) {
                list = list || taskList;
                var row = createEl("tr", table, list[k].done && "line-through");
                var td1 = createEl("td", row, "list_table-checkbox");
                var chb = createEl("input", td1, "list_check", null, {type: "checkbox", id: k});
                chb.checked = list[k].done;
                chb.onchange = function () {
                    var index = this.parentElement.parentNode.rowIndex;
                    table.rows[index].classList.toggle('line-through');
                    list[index].done = !list[index].done;
                    if (selFilter.value === filterList[1] || selFilter.value === filterList[2])
                        selFilter.onchange();
                };
                createEl("label", td1, "violet list_el list_label-check", null, {for: k});

                createEl("td", row, "wrap-word", list[k].text);
                var strDate = list[k].date.slice(0, 6) + list[k].date.slice(8);
                createEl("td", row, "list_table-date", strDate).style.display = showDate ? "" : "none";
                createEl("button", createEl("td", row), "list_button--del list_el violet").onclick = function () {
                    var index = this.parentElement.parentNode.rowIndex;
                    table.removeChild(table.rows[index]);
                    var delI = taskList.indexOf(list[index]);
                    taskList.splice(delI, 1);
                };
            }
        }
    }
})();

var main = document.getElementById("start-to-do-list");
MODULE.init(main);

// setTimeout(MODULE.destroy, 5000);
