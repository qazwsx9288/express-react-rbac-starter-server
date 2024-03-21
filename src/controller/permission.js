const express = require('express');
const permissionService = require('@/service/permission');
const { ResData } = require('@/utils');

const router = express.Router();

// @PermissionDes 添加权限
router.post('/', async (req, res, next) => {
  try {
    const result = await permissionService.createPermission(req.body);
    res.json(ResData.success({ data: result }));
  } catch (error) {
    next(error);
  }
});

// @PermissionDes 删除权限
router.delete('/', async (req, res, next) => {
  try {
    const result = await permissionService.deletePermission(req.body.id);
    res.json(ResData.success({ data: result }));
  } catch (error) {
    next(error);
  }
});

// @PermissionDes 查询权限列表
router.get('/list', async (req, res, next) => {
  try {
    const result = await permissionService.getAllPermissions(req.query);
    res.json(ResData.success({ data: result }));
  } catch (error) {
    next(error);
  }
});

// @PermissionDes 查询权限 按id
router.get('/', async (req, res, next) => {
  try {
    const { id } = req.query;
    const result = await permissionService.getPermission(id);
    res.json(ResData.success({ data: result }));
  } catch (error) {
    next(error);
  }
});

// @PermissionDes 更新权限
router.put('/', async (req, res, next) => {
  try {
    const { id } = req.query;
    const data = req.body;
    const result = await permissionService.updatePermission(id, data);
    res.json(ResData.success({ data: result }));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
