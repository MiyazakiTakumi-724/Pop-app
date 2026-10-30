let MOCK_POPS = [
    { id: 6, title: "セブンの新作カヌレ、想像の3倍うまい", thumbnailUrl: "", imageCount: 3, tags: ["食べ物", "スイーツ", "コンビニ", "セブン"], createdAt: "2026-10-24T09:48:00Z" },
    { id: 5, title: "代々木公園のイチョウ並木が見頃", thumbnailUrl: "", imageCount: 2, tags: ["場所", "公園", "紅葉"], createdAt: "2026-10-24T09:00:00Z" },
    { id: 4, title: "無印の「人をダメにするソファ」2年使った感想", thumbnailUrl: "", imageCount: 2, tags: ["商品", "家具", "無印良品"], createdAt: "2026-10-24T07:00:00Z" },
    { id: 3, title: "駅裏にできた家系ラーメンの新店", thumbnailUrl: "", imageCount: 3, tags: ["食べ物", "ラーメン", "新店"], createdAt: "2026-10-24T03:00:00Z" },
    { id: 2, title: "コンビニのいちごミルク3種を飲み比べた", thumbnailUrl: "", imageCount: 4, tags: ["食べ物", "コンビニ", "飲み物"], createdAt: "2026-10-23T10:00:00Z" },
    { id: 1, title: "地元の秋祭りに行ってきた", thumbnailUrl: "", imageCount: 1, tags: [], createdAt: "2026-10-22T10:00:00Z" }
];

function getPops() {
    return {
        items: MOCK_POPS,
        page: 0,
        size: 20,
        hasNext: false
    }
}