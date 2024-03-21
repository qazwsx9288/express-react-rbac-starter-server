const bcrypt = require('bcryptjs');

const { User } = require('@/models');
const { paginateModel, generateToken } = require('@/utils');

module.exports = {
  // 创建
  async createUser(data) {
    try {
      const hashedPassword = await bcrypt.hash(data.password, 10); // 10 is the number of rounds for salting
      const userData = { ...data, password: hashedPassword };
      return User.create(userData);
    } catch (error) {
      console.error('createUser错误:', error);
      throw error;
    }
  },

  // 删除
  async deleteUser(id) {
    return User.destroy({ where: { id } });
  },

  // 更新
  async updateUser(id, data) {
    return User.update(data, { where: { id } });
  },

  // 按id查询
  async getUser(id) {
    return User.findByPk(id);
  },

  // 查询所有
  async getAllUsers({ page = 1, pageSize = 10 }) {
    return paginateModel(User, { page, pageSize });
  },

  // 验证用户名密码
  async validateUser(username, password) {
    try {
      const user = await User.findOne({ where: { username } });
      if (!user) {
        return false; // User not found
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        return user;
      }

      return null;
    } catch (error) {
      console.error('validateUser错误:', error);
      throw error;
    }
  },

  // 登陆
  async login(username, password) {
    const user = await this.validateUser(username, password); // 根据实际情况实现validateUser
    if (!user) {
      throw new Error('Authentication failed');
    }
    // 生成JWT
    const token = generateToken(user);
    return token;
  },
};
