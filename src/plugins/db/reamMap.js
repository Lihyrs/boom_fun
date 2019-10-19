const reamMap = new Map([
  [8, '游戏'],
  [11, '英雄联盟'],
  [25, '吐槽'],
  [34, '买买买'],
  [7, '情感'],
  [6, '工作'],
  [17, '摄影游记'],
  [1, '美食'],
  [2, '萌宠'],
  [5, '杂谈'],
  [22, '体育'],
  [3, '影视'],
  [4, '自媒体专栏'],
  [13, '动漫杂谈'],
  [31, '手办模玩'],
  [18, '涂鸦'],
  [14, '美图分享'],
  [39, '大熊猫设计'],
  [15, '漫画'],
  [23, '国漫·条漫'],
  [16, '文学'],
]);

const getReamNameById = function (id) {
  return reamMap.get(id);
};
const getReamIdByName = function (name) {
  let ret;
  for (let [key, val] of reamMap.entries()) {
    if (val === name) {
      ret = key;
      break;
    }
  }
  return ret;
};
export {
  getReamIdByName,
  getReamNameById,
};
