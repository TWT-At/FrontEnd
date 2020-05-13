const getters = {
    token: state => state.user.token,
    userInfo:state => state.user.userInfo,
    projDetailID: state => state.user.projDetailID,
    projInfo:state => state.user.projInfo,
};

export default getters