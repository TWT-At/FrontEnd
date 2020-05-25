const getters = {
    token: state => state.user.token,
    userInfo:state => state.user.userInfo,
    projDetailID: state => state.user.projDetailID,
    projInfo:state => state.user.projInfo,
    myWeek:state => state.user.myWeek,
    markDown:state => state.user.markDown
};

export default getters