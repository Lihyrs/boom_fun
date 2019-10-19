const CHANNELS = [
  {
    id: 73,
    name: '生活情感',
    reamIds: [25, 34, 7, 6, 17, 1, 2],
  },

  {
    id: 110,
    name: '综合',
    reamIds: [5, 22, 3, 4],
  },
  {
    id: 164,
    name: '游戏',
    reamIds: [8, 11],
  },
  {
    id: 74,
    name: '动漫文化',
    reamIds: [13, 31],
  },
  {
    id: 184,
    name: '涂图话画',
    reamIds: [18, 14, 39],
  },
  {
    id: 75,
    name: '漫画文学',
    reamIds: [15, 23, 16],
  },
];

const map = (function () {
  let ret = new Map();
  for (let item of CHANNELS) {
    ret.set(item.id, item);
  }
  return ret;
}());


const getChannelById = function (id) {
  return map.get(id);
};
const getChannelReamIdsById = function (id) {
  let ret = map.get(id);

  if (ret) {
    ret = ret.reamIds;
  }

  return ret;
};

const getChannelIdByReamIds = function (ids) {
  if (!ids) return undefined;
  let arg = Array.isArray(ids) ? ids : [ids];
  let ret;
  arg = new Set(arg);
  for (let item of map.values()) {
    const reamIds = new Set(item.reamIds);
    // 交集
    const intersect = arg.filter(x => reamIds.has(x));
    if (intersect.size) {
      ret = item.id;
      break;
    }
  }
  return ret;
};

const getChannelIdByName = function (name) {
  let ret;
  for (let item of map.values()) {
    if (item.name === name) {
      ret = item.id;
      break;
    }
  }

  return ret;
};
const getChannels = function () {
  return [...map.values()];
};

export {
  getChannelById,
  getChannelIdByName,
  getChannelIdByReamIds,
  getChannelReamIdsById,
  getChannels,
};
