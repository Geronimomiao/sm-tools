// 持续学习 1H 可以获得一次抽奖资格

const suprisedList = [
  "Lake 10mins",
  "Lake 10mins",
  "Watching 40mins",
  "Reading 40mins",
  "Relaxing 40mins",
  "Relaxing 10mins",
  "Sporting 20mins",
  "50 rmb",
];

function Random(min, max) {
  return Math.round(Math.random() * (max - min)) + min;
}

const key = Random(0, suprisedList.length - 1);

const getSupires = suprisedList[key];

console.log('  抽奖 ing 请耐心等待');
setTimeout(() => {
  console.log(`
    恭喜 经过你的努力 获得 ${getSupires} 作为奖励
`);
}, 800);
