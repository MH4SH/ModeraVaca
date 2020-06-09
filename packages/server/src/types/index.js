const fs = require('fs'),
    path = require('path'),
    dirName = path.join(__dirname);
    
const UserTypes = fs.readFileSync(`${dirName}/User/types.graphql`, 'utf8');
const FarmTypes = fs.readFileSync(`${dirName}/Farm/types.graphql`, 'utf8');
const DataTypes = fs.readFileSync(`${dirName}/Data/types.graphql`, 'utf8');
const AnimalTypes = fs.readFileSync(`${dirName}/Animal/types.graphql`, 'utf8');
const PurchaseTypes = fs.readFileSync(`${dirName}/Purchase/types.graphql`, 'utf8');
const SaleTypes = fs.readFileSync(`${dirName}/Sale/types.graphql`, 'utf8');
const BornTypes = fs.readFileSync(`${dirName}/Born/types.graphql`, 'utf8');
const DeadTypes = fs.readFileSync(`${dirName}/Dead/types.graphql`, 'utf8');
const PageInfoTypes = fs.readFileSync(`${dirName}/PageInfo/types.graphql`, 'utf8');
const QueryTypes = fs.readFileSync(`${dirName}/Query/types.graphql`, 'utf8');
const MutationTypes = fs.readFileSync(`${dirName}/Mutation/types.graphql`, 'utf8');

module.exports = () => `
    ${UserTypes}
    ${FarmTypes}
    ${DataTypes}
    ${AnimalTypes}
    ${PurchaseTypes}
    ${SaleTypes}
    ${BornTypes}
    ${DeadTypes}
    ${PageInfoTypes}
    ${QueryTypes}
    ${MutationTypes}
`;