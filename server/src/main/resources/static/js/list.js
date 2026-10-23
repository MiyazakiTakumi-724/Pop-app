let filterTags = [];
let clearBtn = document.getElementById("clearTagBtn");
let tagInput = document.getElementById("filterTagInput");

clearBtn.addEventListener("click", function () {
    filterTags = [];
    renderFilterTags();
})

tagInput.addEventListener("keydown", function (event) {
    if (event.key !== "Enter") return;
    if (event.isComposing || event.keyCode === 229)
        return;
    let tag = normalizeTag(tagInput.value)
    if (tag === "") return;
    if (tag.length > 20) {
        alert("タグは20文字まで")
        return;
    }
    if (!filterTags.includes(tag)) {
        filterTags.push(tag);
    }
    tagInput.value = "";
    renderFilterTags();
})

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
    clearBtn.hidden = filterTags.length === 0;
}
renderFilterTags();