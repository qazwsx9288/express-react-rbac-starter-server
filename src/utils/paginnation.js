async function paginateModel(model, { page = 1, pageSize = 10, ...options }) {
  // 确保page和pageSize是数字类型
  const pageNum = Number(page);
  const pageSizeNum = Number(pageSize);

  const { count, rows } = await model.findAndCountAll({
    ...options,
    limit: pageSizeNum,
    offset: (pageNum - 1) * pageSizeNum,
  });

  return {
    list: rows,
    total: count,
    totalPages: Math.ceil(count / pageSizeNum),
    currentPage: pageNum,
    pageSizeNum,
  };
}

module.exports = {
  paginateModel,
};
