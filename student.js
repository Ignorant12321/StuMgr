// 变量
var students = [{ name: "洛天依", id: "20260001", class: "硕自262班" }, { name: "八云红", id: "20260002", class: "赛马娘" }, { name: "伊雷娜", id: "20260003", class: "魔女之旅" },];
var target_index = 0;

// 背景遮罩
let back = document.querySelector(".back");
// 标题
let stuMgr_title = document.getElementById("stuMgr_title");

// 按钮
let add_student_button = document.getElementById("add_student_button");

// 新增学生
let stu_table_tbody = document.getElementById("stu_table_tbody");
let name_input = document.getElementById("name_input");
let id_input = document.getElementById("id_input");
let class_input = document.getElementById("class_input");

// 修改学生
let name_modify = document.getElementById("name_modify");
let id_modify = document.getElementById("id_modify");
let class_modify = document.getElementById("class_modify");

// 查询学生
let student_list_query_button = document.getElementById("student_list_query_button");
let student_list_query_input = document.getElementById("student_list_query_input");

// 修改对话框
let modify_dialog = document.getElementById("modify_dialog");
let modify_dialog_cancel = document.getElementById("modify_dialog_cancel")
let modify_dialog_confirm = document.getElementById("modify_dialog_confirm")

// 删除对话框
let delete_dialog = document.getElementById("delete_dialog");
let delete_dialog_cancel = document.getElementById("delete_dialog_cancel")
let delete_dialog_confirm = document.getElementById("delete_dialog_confirm")

// 学生统计
let student_list_Subtitle = document.getElementById("student_list_Subtitle");
student_list_Subtitle.textContent = "共" + students.length + "名学生"

// 加入学生
function add_student_stu() {
    if (name_input.value != '' && id_input.value != '' && class_input.value != '') {
        let stu = { name: name_input.value, id: id_input.value, class: class_input.value }
        students.push(stu);
        add_student_table(stu);
    } else {
        alert("警告：存在空元素！");
    }
}
function add_student_table(stu) {
    let index = target_index + 1;
    target_index++;

    let tr = document.createElement("tr");
    tr.id = "tr_" + index;
    stu_table_tbody.appendChild(tr);

    let td_index = document.createElement("td");
    td_index.id = "td_" + index + "_id";
    td_index.textContent = index;
    tr.appendChild(td_index);

    let td_name = document.createElement("td");
    td_name.id = "td_" + index + "_name";
    td_name.textContent = stu.name;
    tr.appendChild(td_name);

    let td_id = document.createElement("td");
    td_id.id = "td_" + index + "_num";
    td_id.textContent = stu.id;
    tr.appendChild(td_id);


    let td_class = document.createElement("td");
    td_class.id = "td_" + index + "_class";
    td_class.textContent = stu.class;
    tr.appendChild(td_class);

    let td_buttons = document.createElement("td");
    td_buttons.id = "td_" + index + "_buttons";
    td_buttons.innerHTML = '<span id="td_' + index
        + '_editor" class="editor_span">编辑</span>&nbsp;&nbsp;&nbsp;<span class="delete_span" id="td_' + index
        + '_delete">删除</span>';
    tr.appendChild(td_buttons);

    let editor_span = document.querySelector("#td_" + index + "_editor");
    editor_span.addEventListener("click", () => {
        modify_dialog_show(index)
    });

    let delete_span = document.querySelector("#td_" + index + "_delete");
    delete_span.addEventListener("click", () => {
        delete_dialog_show(index)
    });

    student_list_Subtitle.textContent = "共" + students.length + "名学生";

}

function students_update() {
    target_index = 0;
    stu_table_tbody.innerHTML = '';

    students.forEach(stu => {
        add_student_table(stu);
    })
    student_list_Subtitle.textContent = "共" + students.length + "名学生";
    query_student();
}

// 修改对话框
function modify_dialog_show(index) {
    modify_dialog.style.display = "block";
    back_toggle();
    target_index = index;

    let stu = students[target_index - 1];
    name_modify.value = stu.name;
    id_modify.value = stu.id;
    class_modify.value = stu.class;
}
function modify_dialog_unshow() {
    modify_dialog.style.display = "none";
    back_toggle();
}
function modify_student() {
    if (name_modify.value != '' && id_modify.value != '' && class_modify.value != '') {
        let stu = { name: name_modify.value, id: id_modify.value, class: class_modify.value }
        students[target_index - 1] = stu;
    } else {
        alert("警告：存在空元素！");
    }
}

// 删除对话框
function delete_dialog_show(index) {
    delete_dialog.style.display = "block";
    target_index = index;
    back_toggle();
}
function delete_dialog_unshow() {
    delete_dialog.style.display = "none";
    back_toggle();
}
function delete_student() {
    students.splice(target_index - 1, 1);
}

// 查询学生
function query_student() {
    let text_query = student_list_query_input.value;
    students.forEach(stu => {

        let tr_id = "tr_" + (students.indexOf(stu) + 1);
        let tr_ele = document.getElementById(tr_id);
        if (stu.name.includes(text_query)) {
            tr_ele.style.display = "table-row";
        } else if (stu.id.includes(text_query)) {
            tr_ele.style.display = "table-row";
        } else if (stu.class.includes(text_query)) {
            tr_ele.style.display = "table-row";
        } else {
            tr_ele.style.display = "none";
        }
    });
}

// 背景遮罩
function back_toggle() {
    back.classList.toggle("back_show");
}
// 图片背景
let fields = [...document.querySelectorAll(".field")]
function pic_toggle() {
    fields.forEach(item => {
        item.classList.toggle("pic_hide")
    })
}

// 主函数
function main() {
    add_student_button.addEventListener("click", add_student_stu)

    // 监听事件
    stuMgr_title.addEventListener("click", pic_toggle);
    modify_dialog_cancel.addEventListener("click", (e) => {
        modify_dialog_unshow();
    });
    modify_dialog_confirm.addEventListener("click", (e) => {
        modify_dialog_unshow();
        modify_student();
        students_update();
    });
    modify_dialog_delete.addEventListener("click", (e) => {
        modify_dialog_unshow();
        delete_student();
        students_update();
    });
    delete_dialog_cancel.addEventListener("click", (e) => {
        delete_dialog_unshow();
    });
    delete_dialog_confirm.addEventListener("click", (e) => {
        delete_dialog_unshow();
        delete_student();
        students_update();
    });
    student_list_query_button.addEventListener("click", (e) => {
        query_student();
    });
    student_list_query_input.addEventListener("input", query_student)
    students_update()
}

main();
