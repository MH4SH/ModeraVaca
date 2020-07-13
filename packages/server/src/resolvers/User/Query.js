const connection = require('../../database/connection');
const verifyUserIsAdmin = require('../../utils/verifyUserIsAdmin');

const pageInfo = {
  endCursor: "CURSOR NÃO ARRUMADO",
  hasNextPage: true
}


const users = async (_, args, context) => {
  try {
    let TypeUserAuthenticate =  context._userAuthenticate.type;

    if(!verifyUserIsAdmin(TypeUserAuthenticate))
      throw new Error(`You don't have permission for this request`);

    const current = "CURSOR NÃO ARRUMADO";
    const usersList = await connection('user');
    return {
      pageInfo,
      edges: usersList.map(item => ({ node: item, cursor: current })),
    };
  } catch (e) {
    throw new Error(e.message);
  }
};

const user = async (_, args, context) => {
  try {
    let TypeUserAuthenticate =  context._userAuthenticate.type;
    let idUserAuthenticate =  context._userAuthenticate.id;
    
    let requestIdUser = args.id;
    
    if(!verifyUserIsAdmin(TypeUserAuthenticate) &&  idUserAuthenticate!=requestIdUser)
      throw new Error(`You don't have permission for this request`);

    const usserContent = await connection('user')
      .where('id', requestIdUser)
      .first();
    
    return usserContent;
  } catch (e) {
    throw new Error(e.message);
  }
};

module.exports = {
    users,
    user,
};