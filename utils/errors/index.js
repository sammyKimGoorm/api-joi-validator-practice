exports.makeResJson = (data, errCode, errMsg) => {
    let err;
    if (!!errCode && !!errMsg) {
        err = {
            // TODO: err.err 삭제
            err: {
                code: errCode,
                msg: errMsg,
            },
            code: errCode,
            msg: errMsg,
        };
    }

    const responseJson = {
        data,
        err,
    };

    return responseJson;
};
