const cardList = [
  {id: 1, gender: 'f', age: 1, idCard: 1, total: 12},
  {id: 2, gender: 'f', age: 2, idCard: 1, total: 22},
  {id: 3, gender: 'f', age: 3, idCard: 1, total: 11},
  {id: 4, gender: 'f', age: 4, idCard: 1, total: 14},
  {id: 5, gender: 'f', age: 2, idCard: 2, total: 2},
  {id: 6, gender: 'f', age: 1, idCard: 2, total: 22},
  {id: 7, gender: 'f', age: 3, idCard: 2, total: 23},
  {id: 8, gender: 'f', age: 4, idCard: 2, total: 44},
  {id: 9, gender: 'f', age: 6, idCard: 2, total: 11},
  {id: 10, gender: 'm', age: 7, idCard: 1, total: 1}
]

const CardType = {
  manual: 'manual',
  sale: 'sale',
  purchase: 'purchase',
  born: 'born',
  dead: 'dead'
};

const Card = {
  items: (obj, args) => {
    return cardList.filter(element => element.idCard === obj.id)
  }
}
module.exports = {
  Card,
  CardType

};