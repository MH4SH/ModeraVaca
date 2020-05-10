const connection = require('../../database/connection');

const CardType = {
  manual: 'manual',
  sale: 'sale',
  purchase: 'purchase',
  born: 'born',
  dead: 'dead'
};

const Card = {
  items: async (obj, args) => {

    return await connection('card_item')
    .where('idCard', obj.id);
  }
}
module.exports = {
  Card,
  CardType

};