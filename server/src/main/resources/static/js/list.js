let filterTags = [];

function renderFilterTags() {
    let area = document.getElementById("filterTagsArea")
    area.textContent = "";
    filterTags.forEach(function (tag) {
        let btn = document.createElement("button");
        btn.textContent = "#" + tag + " ×";
        area.appendChild(btn);
    })
}   