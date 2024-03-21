const express = require('express');
const userService = require('@/service/user');
const { ResData } = require('@/utils');

const router = express.Router();

// @PermissionDes 添加用户
router.post('/', async (req, res, next) => {
  try {
    const result = await userService.createUser(req.body);
    res.json(ResData.success({ data: result }));
  } catch (error) {
    next(error);
  }
});

// @PermissionDes 查询用户列表
router.get('/list', async (req, res, next) => {
  try {
    const result = await userService.getAllUsers(req.query);
    res.json(ResData.success({ data: result }));
  } catch (error) {
    next(error);
  }
});

// @PermissionDes 删除用户
router.delete('/', async (req, res, next) => {
  try {
    const { id } = req.query;
    const result = await userService.deleteUser(id);
    res.json(ResData.success({ data: result }));
  } catch (error) {
    next(error);
  }
});

// @PermissionDes 查询用户 按id
router.get('/', async (req, res, next) => {
  try {
    const { id } = req.query;
    const result = await userService.getUser(id);
    res.json(ResData.success({ data: result }));
  } catch (error) {
    next(error);
  }
});

// @PermissionDes 更新用户信息
router.put('/', async (req, res, next) => {
  try {
    const { id } = req.query;
    const data = req.body;
    const result = await userService.updateUser(id, data);
    res.json(ResData.success({ data: result }));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
