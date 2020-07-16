const connection = require('../../database/connection');

const pageInfo = {
  endCursor: "CURSOR NÃO ARRUMADO",
  hasNextPage: true
}


const births = async (_, args) => {
  try {
	const current = "CURSOR NÃO ARRUMADO";
	const listBirths = await connection('birth');


	
	return {
	  pageInfo,
	  edges: listBirths.map(item => ({ node: item, cursor: current })),
	};
  } catch (e) {
	throw new Error(e.message);
  }
};

const birth = async (_, args) => {
  try {
	const data = await connection('birth')
	  .where('id', args.id)
	  .first();
	return data;
  } catch (e) {
	throw new Error(e.message);
  }
};

module.exports = {
  births,
  birth
};