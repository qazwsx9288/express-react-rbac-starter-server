module.exports = {
  success(props = {}) {
    return {
      code: 0,
      data: props.data || null,
      msg: props.msg || '操作成功',
    };
  },
  error(props = {}) {
    return {
      code: props.code || 7,
      data: props.data || null,
      msg: props.msg || '操作失败',
    };
  },
};
