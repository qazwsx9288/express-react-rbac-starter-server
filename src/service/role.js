const { Role } = require('@/models');
const { paginateModel } = require('@/utils');

module.exports = {
  // 创建角色
  async createRole(data) {
    // 返回null或角色实例
    return Role.create(data);
  },

  // 删除角色
  async deleteRole(id) {
    // 返回被删除的行数
    return Role.destroy({ where: { id } });
  },

  // 更新角色信息
  async updateRole(id, data) {
    // 返回一个数组，包含了受影响的行数
    return Role.update(data, { where: { id } });
  },

  // 查询角色
  async getRole(id) {
    // 返回null或角色实例
    return Role.findByPk(id);
  },

  // 查询所有角色
  async getAllRoles({ page = 1, pageSize = 10 }) {
    return paginateModel(Role, { page, pageSize });
  },
};
