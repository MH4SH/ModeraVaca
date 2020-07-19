const connection = require('../../database/connection');

const { authorizationUserHasFarm } = require('../../auth/utils/verifyUserAuthenticate');
const { cursorEncoding, cursorDecoding } = require('../../utils/cursorEncodingAndDecoding');

const births = async (_, args, context) => {
	try {
		authorizationUserHasFarm(context);

		const idFarm = context._userAuthenticate.idFarm,
			age = args.filter.age ? args.filter.age(new Date()) : '',
			limitPage = args.limit || 10,
			cursor = cursorDecoding(args.cursor);
		
		let ageStart = args.filter.age ? ['dateBirth', '<=', age.start.getTime()] : ['dateBirth', '!=', ''],
			ageEnd = args.filter.age ? ['dateBirth', '>', age.end.getTime()] : ['dateBirth', '!=', ''];

		let pageInfo = {
			endCursor: null,
			hasNextPage: false
		};

		const { totalCount } = await connection('birth')
			.where({idFarm})
			.where(...ageStart)
			.where(...ageEnd)
			.count({totalCount: '*'})
			.first();

		const birthsList = await connection('birth')
			.where('id', '>', cursor)
			.where(...ageStart)
			.where(...ageEnd)
			.where({idFarm})
			.limit(limitPage + 1);

		let amountItens = birthsList.length;
		pageInfo.hasNextPage = amountItens > limitPage;

		const edges = birthsList.slice(0, limitPage).map(item => {
			let cursor = cursorEncoding(item.id);
			pageInfo.endCursor = cursor;

			return { node: item, cursor }
		});

		return {
			pageInfo,
			totalCount,
			edges
		};
	} catch (e) {
		throw new Error(e.message);
	}
};

const birth = async (_, args, context) => {
	try {
		authorizationUserHasFarm(context);

		const idFarm = context._userAuthenticate.idFarm,
			idBirth = args.id;

		const birthContent = await connection('birth')
			.where({id: idBirth, idFarm})
			.first();

		return birthContent;
	} catch (e) {
		throw new Error(e.message);
	}
};

module.exports = {
	births,
	birth
};