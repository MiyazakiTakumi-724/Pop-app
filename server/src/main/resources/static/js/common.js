function normalizeTag(tag) {
    return tag.trim().replace(/^#+/, "").trim();
}

function formatTimeAgo(isoString) {

    // 投稿した日時
    let posted = new Date(isoString);

    // 今の日時
    let now = new Date();

    // 差（ミリ秒）
    let diffMs = now - posted;

    // 分に直す
    let minutes = Math.floor(diffMs / 1000 / 60);

    if (minutes < 1) return "たった今";
    if (minutes < 60) return minutes + "分前";

    let hours = Math.floor(minutes / 60)
    if (hours < 24) return hours + "時間前";

    let days = Math.floor(hours / 24)
    return days + "日前";
}