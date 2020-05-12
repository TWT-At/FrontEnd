const getters = {
    token: state => state.user.token,
    userInfo:state => state.user.userInfo,
    projDetailID: state => state.user.projDetailID
};

export default getters