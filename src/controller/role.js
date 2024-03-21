const express = require('express');
const roleService = require('@/service/role');
const { ResData } = require('@/utils');

const router = express.Router();

// @PermissionDes 添加角色
router.post('/', async (req, res, next) => {
  try {
    const result = await roleService.createRole(req.body);
    res.json(ResData.success({ data: result }));
  } catch (error) {
    next(error);
  }
});

// @PermissionDes 删除角色
router.delete('/', async (req, res, next) => {
  try {
    const { id } = req.query;
    const result = await roleService.deleteRole(id);
    res.json(ResData.success({ data: result }));
  } catch (error) {
    next(error);
  }
});

// @PermissionDes 查询角色列表
router.get('/list', async (req, res, next) => {
  try {
    const result = await roleService.getAllRoles(req.query);
    res.json(ResData.success({ data: result }));
  } catch (error) {
    next(error);
  }
});

// @PermissionDes 查询角色 按id
router.get('/', async (req, res, next) => {
  try {
    const { id } = req.query;
    const result = await roleService.getRole(id);
    res.json(ResData.success({ data: result }));
  } catch (error) {
    next(error);
  }
});

// @PermissionDes 更新角色信息
router.put('/', async (req, res, next) => {
  try {
    const { id } = req.query;
    const data = req.body;
    const result = await roleService.updateRole(id, data);
    res.json(ResData.success({ data: result }));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
