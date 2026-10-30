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
    renderCards();
}
renderFilterTags();

function renderCards() {
    let timeline = document.getElementById("timeline");
    timeline.textContent = "";

    let result = getPops({ tags: filterTags });

    // 1件もなければ、メッセージを出して終わる
    if (result.items.length === 0) {
        timeline.textContent = "条件に合うポップはありません";
        return;
    }

    result.items.forEach(function (pop) {

        // ポップをいれるdiv
        let card = document.createElement("div");
        card.className = "card";

        // 画像（まだいれない）
        let thumb = document.createElement("div");
        thumb.textContent = "画像1 / " + pop.imageCount;

        // タイトル
        let title = document.createElement("h2");
        title.textContent = pop.title;

        // タグ
        let tags = document.createElement("p");
        tags.className = "text-sub";
        let shown = pop.tags.slice(0, 3).map(function (t) {
            return "#" + t;
        }).join(" ");
        if (pop.tags.length > 3) {
            shown = shown + " +" + (pop.tags.length - 3);
        }
        tags.textContent = shown;

        // 投稿日時
        let date = document.createElement("p");
        date.className = "text-sub";
        date.textContent = formatTimeAgo(pop.createdAt);

        // divに挿入
        card.appendChild(thumb);
        card.appendChild(title);
        card.appendChild(tags);
        card.appendChild(date);

        // 画面に挿入
        timeline.appendChild(card);
    });
}
