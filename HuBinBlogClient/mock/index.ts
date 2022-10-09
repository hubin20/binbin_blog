import Mock from "mockjs";
//留言note
export const note = Mock.mock({
  "data|20": [
    {
      //创建时间
      moment: new Date(),
      "id|+1": 1,
      "userId|+1": 10,
      "message|24-96": "@cword",
      "label|0-10": 0,
      name: "@cname",
      "like|0-500": 0,
      "comment|0-50": 0,
      //背景色
      "imgurl|0-4": 0,
      //是否撤销
      "revoke|0-20": 0,
      //是否举报
      "report|0-20": 0,
      type: 0,
    },
  ],
});
//评论
export const comment = Mock.mock({
  "data|20": [
    {
      //创建时间
      moment: new Date(),
      "id|+1": 1,
      "userId|+1": 10,
      "message|24-96": "@cword",
      name: "@cname",
      //背景色
      "imgurl|0-13": 0,
    },
  ],
});
