## 评论列表
**url:**  https://www.acfun.cn/rest/pc-direct/comment/listByFloor?sourceId=10836491&sourceType=3&page=1&pivotCommentId=0&newPivotCommentId=0&_ts=1567167799061  

**queryString:**
- sourceId:文章号
- sourceType:未知
- page:页数
- pivotCommentId:未知
- newPivotCommentId: 未知
- _ts: Date.now()

**header:**
```json
{
  "headers": {
    "content-type": "application/x-www-form-urlencoded"
  }
}
```

**method:** GET  

**ps:** [emot=ac,22/] = "//cdnfile.aixifan.com/static/umeditor/emotion/images/ac/22.gif"

**result:**
```json,
{
    "commentIds": [
        85867769,
        85854144,
        ...,
        85833211
    ],
    "commentsMap": {
        "c85833211": {
            "avatarFrame": 18,
            "avatarImage": "https: //tx-free-imgs.acfun.cn/o_1cvf2r0jv1jeilj01guc8kh5u10.png",/*挂件*/
            "cid": 85821822,
            "content": "虽然说游戏可以治疗抑郁症，但是你给人家玩黑魂是几个意思[emot=ac,09/] [img=图片]https://imgs.aixifan.com/content/2019_08_23/1.5665199072906725E9.jpg[/img]",
            "deviceModel": "网页端",
            "floor": 1,/*楼层*/
            "headUrl": [
                {
                    "cdn": "thirdwx.qlogo.cn",
                    "url": "https://tx-free-imgs.acfun.cn/style/image/defaultAvatar.jpg",/*头像*/
                    "urlPattern": ""
                }
            ],
            "imageUrl": "",
            "isDelete": false,
            "isSignedUpCollege": false,
            "isUp": false,
            "isUpDelete": false,
            "nameRed": 1,
            "postDate": "08-30 11: 24",
            "quoteId": 0, /*引用的评论ID*/
            "sourceId": 10836491, /*文章ID*/
            "sourceType": 3,
            "timestamp": 1567135494603,
            "userId": 277511,
            "userName": "腾讯老总马化腾",
            "verified": 0
        },
        "curPage": 1,
        "host-name": "hb2-acfun-kcs072.aliyun",
        "isUp": false,
        "pageSize": 50,
        "pivotCommentId": 0,
        "result": 0,
        "sourceType": 3,
        "totalCount": 19,
        "totalPage": 1
    }
}
```

## 添加评论
### url
/rest/pc-direct/comment/add

**method:** POST

```json
{ "sourceId": e, "sourceType": n, "content": r, "replyToCommentId": t
```

## 文章
#### url
https://webapi.acfun.cn/query/article/list?pageNo=1&size=10&realmIds=5%2C22%2C3%2C4&originalOnly=false&orderType=3&periodType=-1&filterTitleImage=true

##### params
- pageNo:页数
- size:数量
- originalOnly:（true|false)
  - true 原创
  - false 综合
- periodType: (-1|0|1|2|3)
  - -1 时间不限
  - 0 24小时
  - 1 三天
  - 2 一周
  - 3 一个月
- orderType:(1|2|3)
  - 3 最热文章
  - 2 最新发表(periodType:-1)
  - 1 最新动态(periodType:-1)
- filterTitleImage：true(未知)

##### map

tag|orderType|periodType
:---:|:---:|:---:
最热文章|3|(-1\|0\|1\|2\|3)
最新发表|2|-1
最新动态|1|-1

channel_id|channel_name
:---:|:---:
73|"生活情感"
164| "游戏"
110| "综合"
74|"动漫文化
184|"涂图话画"
75|"漫画文学"


reamId | name | channel_id
:---:|:---:|:---:
8 | 游戏|164
11 | 英雄联盟|164
25|"吐槽"|73
34|买买买！|73
7|情感|73
6|工作|73
17|摄影游记|73
1|美食|73
2|萌宠|73
5|杂谈|110
22|体育|110
3|影视|110
4|自媒体专栏|110
13|"动漫杂谈"|74
31|手办模玩|74
18|涂鸦|184
14|美图分享|184
39|大熊猫设计|184
15|漫画|75
23|国漫·条漫|75
16|文学|75

### method
GET

### result
```json
{
    "code": 200,
    "data": {
        "articleList": [
            {
                "allowed_add_tag": false,
                "attitudes": [
                    {
                        "count": 56,
                        "id": 1,
                        "name": "at01",
                        "sort": 1,
                        "url": "http://imgs.aixifan.com/cms/2017_11_07/1510048135861.png"
                    }
                ],
                "banana_count": 10,
                "big_cover_image": "",
                "channel_id": 110,
                "channel_name": "综合",
                "channel_path": "a",
                "comment_count": 267,
                "contribute_time": 1567138176000,
                "cover_image": "https://imgs.aixifan.com/FufpU3nbbNzgTnKyv122c5lj7Vuo",
                "description": "这就很可怕了",
                "essense": false,
                "favorite_count": 21,
                "id": 10837160,
                "isSignedUpCollege": false,
                "latest_active_time": 1567180913000,
                "latest_comment_time": 1567180913000,
                "like_count": 0,
                "link": "",
                "parent_channel_id": 63,
                "parent_channel_name": "文章",
                "parent_realm_id": 0,
                "realm_id": 5,
                "realm_name": "杂谈",
                "recommended": false,
                "status": 2,
                "tag_list": [
                    {
                        "id": 10023,
                        "index": 0,
                        "name": "综合",
                        "update_time": 1566281793000,
                        "user_id": "370283"
                    }，
                                        {
                        "id": 71688,
                        "index": 6,
                        "name": "爽文",
                        "update_time": 1566281793000,
                        "user_id": "726325"
                    }
                ],
                "title": "49岁中国移民不懂英文 怠慢美警察命令秒遭击毙",
                "top_level": false,
                "tudou_domain": false,
                "type_id": 1,
                "user_avatar": "https: //imgs.aixifan.com/style/image/201907/4UHWm50mCitgP2U0F6zBG7rAN08aUMLK.jpg",
                "user_id": 370283,
                "username": "亲切的人可信兄弟",
                "view_count": 23793,
                "view_only": false
            }
        ],
        "pageNo": 1,
        "size": 10,
        "totalPage": 1000
    },
    "message": "OK"
}
```


