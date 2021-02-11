import Mock from 'mockjs'
const Random = Mock.Random;
Mock.mock('api/data', (req, res) => {
  let List = [];
  for (let i = 0; i < 20; i++) {
    let listObject = {
      id: Random.id(),
      check: false,
      title: Random.csentence(5, 10),//随机生成一段中文文本。
      isSelected: false,
      productPic: Mock.Random.image('100×100', '#894FC4', '#FFF', '产品'),
      productName: Mock.Random.cparagraph(1),
      productInfo: Mock.Random.cparagraph(1),
      price: parseInt((Mock.Random.float(10, 50) * 100).toFixed(2)),
      number: 1
    }
    List.push(listObject);
  }
  return {
    data: List
  }
})