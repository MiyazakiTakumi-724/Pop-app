let filterTags = [];

function renderFilterTags() {
    let area = document.getElementById("filterTagsArea")
    area.textContent = "";
    filterTags.forEach(function (tag) {
        let btn = document.createElement("button");
        btn.textContent = "#" + tag + " ×";

        btn.addEventListener("click", function () {
            filterTags = filterTags.filter(function (t) {
                return t !== tag
            });
            renderFilterTags()
        });
        area.appendChild(btn);
    })
}   