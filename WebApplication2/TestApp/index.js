require("bootstrap-loader/extractStyles");

function renderButtonToContainer(container) {
    $(container).append($("<button>", { "class": "btn btn-success" }).text("тестовая кнопка изменения")
        .click(function() { console.log("qwer"); }));
}

$(function() {
    renderButtonToContainer($("#container"));
})