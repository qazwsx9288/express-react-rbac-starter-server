const { Permission } = require('@/models');
const { paginateModel } = require('@/utils');

module.exports = {
  // 创建
  async createPermission(data) {
    return Permission.create(data);
  },

  // 删除
  async deletePermission(id) {
    return Permission.destroy({ where: { id } });
  },

  // 更新
  async updatePermission(id, data) {
    return Permission.update(data, { where: { id } });
  },

  // 按id查询
  async getPermission(id) {
    return Permission.findByPk(id);
  },

  // 查询所有
  async getAllPermissions({ page = 1, pageSize = 10 }) {
    return paginateModel(Permission, { page, pageSize });
  },
};
