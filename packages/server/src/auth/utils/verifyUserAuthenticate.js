exports.authorizationUserIsAdmin = (contextRequest) => {
	if(!verifyUserIsAdmin(contextRequest))
		throw new Error(`You don't have permission for this request`);

	return true;
};

const verifyUserIsAdmin = (contextRequest) => {
	let TypeUserAuthenticate =  contextRequest._userAuthenticate.type;
	return TypeUserAuthenticate=='1';
};


exports.authorizationUserIsAdminOrIsOwn = (contextRequest, requestIdUser) => {
	if(!verifyUserIsAdminOrIsOwn(contextRequest, requestIdUser))
		throw new Error(`You don't have permission for this request`);

	return true;
}

const verifyUserIsAdminOrIsOwn = (contextRequest, requestIdUser) => {
	let idUserAuthenticate =  contextRequest._userAuthenticate.id;
	return verifyUserIsAdmin(contextRequest) || idUserAuthenticate==requestIdUser;
}

exports.authorizationUserHasFarm = (contextRequest) => {
	if(!verifyUserHasFarm(contextRequest))
		throw new Error(`You need use token for farm. See more in https://github.com/marconwillian/ModeraVaca_backend`);

	return true;
}

const verifyUserHasFarm = (contextRequest) => {
	let idFarmAuthenticate =  contextRequest._userAuthenticate.idFarm;
	return idFarmAuthenticate ? true : false ;
}