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