const lastname = [
  "赵", "钱", "孙", "李", "周", "吴", "郑", "王", "冯", "陈",
  "褚", "卫", "蒋", "沈", "韩", "杨", "朱", "秦", "尤", "许",
  "何", "吕", "施", "张", "孔", "曹", "严", "华", "金", "魏",
  "陶", "姜", "戚", "谢", "邹", "喻", "柏", "水", "窦", "章",
  "云", "苏", "潘", "葛", "奚", "范", "彭", "郎", "鲁", "韦",
  "昌", "马", "苗", "凤", "花", "方", "俞", "任", "袁", "柳",
  "酆", "鲍", "史", "唐", "费", "廉", "岑", "薛", "雷", "贺",
  "倪", "汤", "滕", "殷", "罗", "毕", "郝", "邬", "安", "常",
  "乐", "于", "时", "傅", "皮", "卞", "齐", "康", "伍", "余",
  "元", "卜", "顾", "孟", "平", "黄", "和", "穆", "萧", "尹"
]

const firstname = [
  "子璇", "淼", "国栋", "夫子", "瑞堂", "甜", "敏", "尚", "国贤", "贺祥", "晨涛",
  "昊轩", "易轩", "益辰", "益帆", "益冉", "瑾春", "瑾昆", "春齐", "杨", "文昊",
  "东东", "雄霖", "浩晨", "熙涵", "溶溶", "冰枫", "欣欣", "宜豪", "欣慧", "建政",
  "美欣", "淑慧", "文轩", "文杰", "欣源", "忠林", "榕润", "欣汝", "慧嘉", "新建",
  "建林", "亦菲", "林", "冰洁", "佳欣", "涵涵", "禹辰", "淳美", "泽惠", "伟洋",
  "涵越", "润丽", "翔", "淑华", "晶莹", "凌晶", "苒溪", "雨涵", "嘉怡", "佳毅",
  "子辰", "佳琪", "紫轩", "瑞辰", "昕蕊", "萌", "明远", "欣宜", "泽远", "欣怡",
  "佳怡", "佳惠", "晨茜", "晨璐", "运昊", "汝鑫", "淑君", "晶滢", "润莎", "榕汕",
  "佳钰", "佳玉", "晓庆", "一鸣", "语晨", "添池", "添昊", "雨泽", "雅晗", "雅涵",
  "清妍", "诗悦", "嘉乐", "晨涵", "天赫", "玥傲", "佳昊", "天昊", "萌萌", "若萌"
]

const avaters = [
  'http://imgsrc.baidu.com/forum/w%3D580/sign=d0023974805494ee87220f111df7e0e1/e824c895d143ad4bf2cffe0b8e025aafa50f062a.jpg',
  'http://imgsrc.baidu.com/forum/w%3D580/sign=c243fec67ccf3bc7e800cde4e101babd/b6c1277f9e2f07088d7228cbe524b899a801f299.jpg',
  'http://imgsrc.baidu.com/forum/w%3D580/sign=61f60a62a5014c08193b28ad3a79025b/faf876094b36acafa60f113770d98d1000e99c21.jpg',
  'http://imgsrc.baidu.com/forum/w%3D580/sign=eef7bb0c9c529822053339cbe7c87b3b/bd4394eef01f3a29852152059525bc315d607c23.jpg',
  'http://imgsrc.baidu.com/forum/w%3D580/sign=d0c793c4b40e7bec23da03e91f2cb9fa/3fe31bd5ad6eddc4b81c333035dbb6fd5366331d.jpg',
  'http://imgsrc.baidu.com/forum/w%3D580/sign=2f283070aa1ea8d38a22740ca70830cf/98603912b31bb051e4cb34e33a7adab44bede021.jpg',
  'http://imgsrc.baidu.com/forum/w%3D580/sign=82edb7e5de1b0ef46ce89856edc551a1/98fb8a13632762d0d12c5b74acec08fa503dc686.jpg',
  'http://imgsrc.baidu.com/forum/w%3D580/sign=b46d9f00befb43161a1f7a7210a54642/96f8ce1b9d16fdfa26513925b88f8c5495ee7bd7.jpg',
  'http://imgsrc.baidu.com/forum/w%3D580/sign=2f283070aa1ea8d38a22740ca70830cf/98603912b31bb051e4cb34e33a7adab44bede021.jpg',
  'https://imgsa.baidu.com/forum/w%3D580/sign=7638d6595c0fd9f9a0175561152cd42b/484a4f82b2b7d0a29134fdb8c6ef76094a369a91.jpg',
  'https://imgsa.baidu.com/forum/w%3D580/sign=83886b0ba5d3fd1f3609a232004e25ce/9860c41b0ef41bd5ac6d10d15cda81cb39db3d53.jpg',
  'https://imgsa.baidu.com/forum/w%3D580/sign=09fc5430b1315c6043956be7bdb1cbe6/42f8df177f3e6709203fbdda36c79f3df8dc5553.jpg',
  'https://imgsa.baidu.com/forum/w%3D580/sign=d3e347066e2762d0803ea4b790ec0849/0e860c4c510fd9f9ad25ad4c282dd42a2834a460.jpg',
  'https://imgsa.baidu.com/forum/w%3D580/sign=283ad7c0a06eddc426e7b4f309dab6a2/9d8ee136afc379312c9b7f0ce6c4b74542a911a6.jpg',
  'https://imgsa.baidu.com/forum/w%3D580/sign=8d2d35c9dc00baa1ba2c47b37710b9b1/03b36d899e510fb31d348fb2d433c895d1430c60.jpg',
  'https://imgsa.baidu.com/forum/w%3D580/sign=6825256586d4b31cf03c94b3b7d7276f/b443309759ee3d6d7733b9ed4e166d224e4ade99.jpg',
  'https://imgsa.baidu.com/forum/w%3D580/sign=01c7182e1230e924cfa49c397c096e66/c5da502309f790529eed421801f3d7ca7acbd5a0.jpg',
  'https://imgsa.baidu.com/forum/w%3D580/sign=c5d46490c4177f3e1034fc0540cf3bb9/53834466d0160924bf04543dd90735fae6cd3475.jpg',
  'https://imgsa.baidu.com/forum/w%3D580/sign=2fc56bed4e166d223877159c76230945/2c9403ce36d3d539cc3ee3e53787e950352ab010.jpg',
  'https://imgsa.baidu.com/forum/w%3D580/sign=9eeede5975f0f736d8fe4c093a54b382/c201882f070828382aba3432b599a9014d08f1e4.jpg',
  'https://imgsa.baidu.com/forum/w%3D580/sign=e60b8b162c3fb80e0cd161df06d02ffb/bba19bb1cb134954eec16f435b4e9258d0094abd.jpg',
  'https://imgsa.baidu.com/forum/w%3D580/sign=fb3edee2edfe9925cb0c695804a85ee4/70b4c7c8a786c917be29941ec43d70cf3bc7576a.jpg',
  'https://imgsa.baidu.com/forum/w%3D580/sign=02b791360a082838680ddc1c8898a964/885c594a20a446232c3f9f4b9522720e0df3d7a4.jpg',
  'https://imgsa.baidu.com/forum/w%3D580/sign=325d05620f087bf47dec57e1c2d2575e/9eb51c46f21fbe0944abf93d66600c338644ada4.jpg',
  'https://imgsa.baidu.com/forum/w%3D580/sign=4afc3b820e3b5bb5bed720f606d2d523/ae48baaf2edda3cc1e1182090ce93901203f92a4.jpg',
  'https://imgsa.baidu.com/forum/w%3D580/sign=89ba477afb246b607b0eb27cdbf91a35/2ffe73380cd79123a06e8d5da0345982b3b7808f.jpg',
  'https://imgsa.baidu.com/forum/w%3D580/sign=eb898baac61349547e1ee86c664e92dd/95b12dc79f3df8dc6456bcbac011728b47102834.jpg',
  'https://imgsa.baidu.com/forum/w%3D580/sign=ac0aa7908ad6277fe912323018381f63/b085a4fb43166d22644126bf4b2309f79052d261.jpg',
  'https://imgsa.baidu.com/forum/w%3D580/sign=d784a6f705fa513d51aa6cd60d6d554c/8527332dd42a28347290052056b5c9ea15cebf61.jpg',
  'https://imgsa.baidu.com/forum/w%3D580/sign=ad55c202e6c4b7453494b71efffc1e78/5de7bf014c086e06ba957b600f087bf40ad1cb5f.jpg',
  'http://imgsrc.baidu.com/forum/w%3D580/sign=4291088f87d4b31cf03c94b3b7d7276f/fb9765380cd791239fa187b8a1345982b3b7804b.jpg',
  'http://imgsrc.baidu.com/forum/w%3D580/sign=0b0a9acd506034a829e2b889fb1249d9/95184bfbfbedab6491605e0cfb36afc378311e86.jpg',
  'http://imgsrc.baidu.com/forum/w%3D580/sign=71441eff7f8da9774e2f86238053f872/0be43a87e950352afd88f8c45f43fbf2b3118b2c.jpg',
  'http://imgsrc.baidu.com/forum/w%3D580/sign=0dd05b229082d158bb8259b9b00819d5/865243a98226cffcc2ce627eb5014a90f703ea2a.jpg',
  'http://imgsrc.baidu.com/forum/w%3D580/sign=83954a3070d98d1076d40c39113eb807/e5288794a4c27d1e7f53e70817d5ad6edcc43898.jpg',
  'http://imgsrc.baidu.com/forum/w%3D580/sign=945ec2c3923df8dca63d8f99fd1072bf/af38070828381f300db5419da4014c086e06f06a.jpg',
  'http://imgsrc.baidu.com/forum/w%3D580/sign=4ce9fb0c76f40ad115e4c7eb672d1151/4dce8d1001e9390167ad410a76ec54e736d1966a.jpg',
  'http://imgsrc.baidu.com/forum/w%3D580/sign=00f10f2066600c33f079dec02a4d5134/bca6cb1349540923b6c6af4a9f58d109b3de496a.jpg',
  'http://imgsrc.baidu.com/forum/w%3D580/sign=454c4d8b815494ee87220f111df4e0e1/e824c895d143ad4b67818af48f025aafa40f066a.jpg',
  'http://imgsrc.baidu.com/forum/w%3D580/sign=03ab95170ce9390156028d364bec54f9/95d57d1ed21b0ef464a7b569d0c451da81cb3e54.jpg',
  'http://imgsrc.baidu.com/forum/w%3D580/sign=4b7f2ed4d839b6004dce0fbfd9513526/b39ca61ea8d3fd1f1f858f0d3d4e251f95ca5f0b.jpg',
  'http://imgsrc.baidu.com/forum/w%3D580/sign=31f0c95fc1bf6c81f7372ce08c3eb1d7/b331cffc1e178a8214735297fb03738da977e855.jpg',
  'http://imgsrc.baidu.com/forum/w%3D580/sign=fdb5873af5dcd100cd9cf829428b47be/361f28381f30e9247eebb10641086e061d95f755.jpg',
  'http://imgsrc.baidu.com/forum/w%3D580/sign=0b6916f316d5ad6eaaf964e2b1cb39a3/523062d0f703918f799e10fd5c3d269759eec455.jpg',
  'http://imgsrc.baidu.com/forum/w%3D580/sign=58d643b2c4ea15ce41eee00186013a25/8d29b13533fa828bfdf3b0d4f01f4134960a5acf.jpg',
]

const mockMessage = [];

function perfect(str) {
  return str.length > 1 ? str : '0' + str;
}

for (let i = 0; i < 500; i += 1) {
  const _lastname = lastname[Math.floor(Math.random() * lastname.length)];
  const _firstname = firstname[Math.floor(Math.random() * firstname.length)];
  const _hour = perfect(Math.floor(Math.random() * 24 + 1).toString());
  const _minute = perfect(Math.floor(Math.random() * 60 + 1).toString());
  const _time = `${_hour}:${_minute}`;
  const avater = avaters[Math.floor(Math.random() * avaters.length)]
  mockMessage.push({
    avater,
    name: _lastname + _firstname,
    time: _time,
  })
}

export default mockMessage;