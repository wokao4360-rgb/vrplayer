/**
 * 错误代码到中文文案的映射
 * 用于将技术错误代码转换为用户友好的提示信息
 */

import { ErrorCode } from './configValidator';

/**
 * 错误标题映射（简短描述）
 */
export const ERROR_TITLES: Record<ErrorCode, string> = {
  // 根级别错误
  [ErrorCode.INVALID_ROOT]: '配置格式错误',
  [ErrorCode.MISSING_APP_NAME]: '缺少应用名称',
  
  // 博物馆级别错误
  [ErrorCode.MUSEUMS_NOT_ARRAY]: '博物馆列表格式错误',
  [ErrorCode.MUSEUMS_EMPTY]: '博物馆列表为空',
  [ErrorCode.MISSING_MUSEUM_ID]: '缺少博物馆 ID',
  [ErrorCode.DUPLICATE_MUSEUM_ID]: '博物馆 ID 重复',
  [ErrorCode.MISSING_MUSEUM_NAME]: '缺少博物馆名称',
  [ErrorCode.MISSING_MUSEUM_COVER]: '缺少封面图',
  [ErrorCode.MISSING_MUSEUM_MAP]: '缺少地图配置',
  [ErrorCode.MISSING_MAP_IMAGE]: '缺少地图图片',
  [ErrorCode.INVALID_MAP_WIDTH]: '地图宽度无效',
  [ErrorCode.INVALID_MAP_HEIGHT]: '地图高度无效',
  
  // 场景级别错误
  [ErrorCode.SCENES_NOT_ARRAY]: '场景列表格式错误',
  [ErrorCode.SCENES_EMPTY]: '场景列表为空',
  [ErrorCode.MISSING_SCENE_ID]: '缺少场景 ID',
  [ErrorCode.DUPLICATE_SCENE_ID]: '场景 ID 重复',
  [ErrorCode.MISSING_SCENE_NAME]: '缺少场景名称',
  [ErrorCode.MISSING_PANO]: '缺少全景图',
  [ErrorCode.INVALID_PANO_URL]: '高清全景图 URL 无效',
  [ErrorCode.INVALID_PANOLOW_URL]: '低清全景图 URL 无效',
  [ErrorCode.MISSING_THUMB]: '缺少缩略图',
  [ErrorCode.MISSING_INITIAL_VIEW]: '缺少初始视角配置',
  [ErrorCode.INVALID_YAW]: '水平角度无效',
  [ErrorCode.INVALID_PITCH]: '垂直角度无效',
  [ErrorCode.INVALID_FOV]: '视野角度无效',
  [ErrorCode.MISSING_MAP_POINT]: '缺少地图点位',
  [ErrorCode.INVALID_MAP_POINT_X]: '地图点位 X 坐标无效',
  [ErrorCode.INVALID_MAP_POINT_Y]: '地图点位 Y 坐标无效',
  
  // 热点级别错误
  [ErrorCode.HOTSPOTS_NOT_ARRAY]: '热点列表格式错误',
  [ErrorCode.MISSING_HOTSPOT_ID]: '缺少热点 ID',
  [ErrorCode.DUPLICATE_HOTSPOT_ID]: '热点 ID 重复',
  [ErrorCode.INVALID_HOTSPOT_TYPE]: '热点类型无效',
  [ErrorCode.MISSING_HOTSPOT_LABEL]: '缺少热点标签',
  [ErrorCode.INVALID_HOTSPOT_YAW]: '热点水平角度无效',
  [ErrorCode.INVALID_HOTSPOT_PITCH]: '热点垂直角度无效',
  [ErrorCode.MISSING_HOTSPOT_TARGET]: '缺少热点目标配置',
  [ErrorCode.MISSING_TARGET_MUSEUM_ID]: '缺少目标博物馆 ID',
  [ErrorCode.MISSING_TARGET_SCENE_ID]: '缺少目标场景 ID',
  [ErrorCode.INVALID_TARGET_YAW]: '目标水平角度无效',
  [ErrorCode.INVALID_TARGET_PITCH]: '目标垂直角度无效',
  [ErrorCode.INVALID_TARGET_FOV]: '目标视野角度无效',
  [ErrorCode.MISSING_TARGET_URL]: '缺少视频链接',
};

/**
 * 错误修复提示映射（告诉用户如何修复）
 */
export const ERROR_HINTS: Record<ErrorCode, string> = {
  // 根级别错误
  [ErrorCode.INVALID_ROOT]: '请确保 config.json 是一个有效的 JSON 对象',
  [ErrorCode.MISSING_APP_NAME]: '请在配置中添加 "appName" 字段，例如："appName": "我的 VR 展馆"',
  
  // 博物馆级别错误
  [ErrorCode.MUSEUMS_NOT_ARRAY]: '请确保 "museums" 是一个数组，例如："museums": []',
  [ErrorCode.MUSEUMS_EMPTY]: '请至少添加一个博物馆到 "museums" 数组中',
  [ErrorCode.MISSING_MUSEUM_ID]: '请为该博物馆添加 "id" 字段，例如："id": "museum1"',
  [ErrorCode.DUPLICATE_MUSEUM_ID]: '请确保每个博物馆的 "id" 都是唯一的，不能重复',
  [ErrorCode.MISSING_MUSEUM_NAME]: '请为该博物馆添加 "name" 字段，例如："name": "第一展馆"',
  [ErrorCode.MISSING_MUSEUM_COVER]: '请为该博物馆添加 "cover" 字段，填入封面图的 URL',
  [ErrorCode.MISSING_MUSEUM_MAP]: '请为该博物馆添加 "map" 对象配置',
  [ErrorCode.MISSING_MAP_IMAGE]: '请在地图配置中添加 "image" 字段，填入地图图片的 URL',
  [ErrorCode.INVALID_MAP_WIDTH]: '请确保 "map.width" 是一个大于 0 的数字',
  [ErrorCode.INVALID_MAP_HEIGHT]: '请确保 "map.height" 是一个大于 0 的数字',
  
  // 场景级别错误
  [ErrorCode.SCENES_NOT_ARRAY]: '请确保 "scenes" 是一个数组，例如："scenes": []',
  [ErrorCode.SCENES_EMPTY]: '请至少为该博物馆添加一个场景',
  [ErrorCode.MISSING_SCENE_ID]: '请为该场景添加 "id" 字段，例如："id": "scene1"',
  [ErrorCode.DUPLICATE_SCENE_ID]: '请确保同一博物馆内每个场景的 "id" 都是唯一的',
  [ErrorCode.MISSING_SCENE_NAME]: '请为该场景添加 "name" 字段，例如："name": "正门"',
  [ErrorCode.MISSING_PANO]: '请为该场景添加 "pano"、"panoLow" 或 "panoTiles" 字段，至少提供一种全景来源',
  [ErrorCode.INVALID_PANO_URL]: '请确保 "pano" 字段是一个有效的图片 URL 字符串',
  [ErrorCode.INVALID_PANOLOW_URL]: '请确保 "panoLow" 字段是一个有效的图片 URL 字符串',
  [ErrorCode.MISSING_THUMB]: '请为该场景添加 "thumb" 字段，填入缩略图的 URL',
  [ErrorCode.MISSING_INITIAL_VIEW]: '请为该场景添加 "initialView" 对象配置',
  [ErrorCode.INVALID_YAW]: '请确保 "initialView.yaw" 是一个数字（水平角度，范围 -180 到 180）',
  [ErrorCode.INVALID_PITCH]: '请确保 "initialView.pitch" 是一个数字（垂直角度，范围 -90 到 90）',
  [ErrorCode.INVALID_FOV]: '请确保 "initialView.fov" 是一个数字（视野角度，范围 30 到 120）',
  [ErrorCode.MISSING_MAP_POINT]: '请为该场景添加 "mapPoint" 对象配置',
  [ErrorCode.INVALID_MAP_POINT_X]: '请确保 "mapPoint.x" 是一个数字（地图上的 X 坐标）',
  [ErrorCode.INVALID_MAP_POINT_Y]: '请确保 "mapPoint.y" 是一个数字（地图上的 Y 坐标）',
  
  // 热点级别错误
  [ErrorCode.HOTSPOTS_NOT_ARRAY]: '请确保 "hotspots" 是一个数组，例如："hotspots": []',
  [ErrorCode.MISSING_HOTSPOT_ID]: '请为该热点添加 "id" 字段，例如："id": "hotspot1"',
  [ErrorCode.DUPLICATE_HOTSPOT_ID]: '请确保同一场景内每个热点的 "id" 都是唯一的',
  [ErrorCode.INVALID_HOTSPOT_TYPE]: '请确保 "type" 字段是 "scene" 或 "video" 之一',
  [ErrorCode.MISSING_HOTSPOT_LABEL]: '请为该热点添加 "label" 字段，例如："label": "进入展厅"',
  [ErrorCode.INVALID_HOTSPOT_YAW]: '请确保 "yaw" 是一个数字（热点在全景图中的水平位置）',
  [ErrorCode.INVALID_HOTSPOT_PITCH]: '请确保 "pitch" 是一个数字（热点在全景图中的垂直位置）',
  [ErrorCode.MISSING_HOTSPOT_TARGET]: '请为该热点添加 "target" 对象配置',
  [ErrorCode.MISSING_TARGET_MUSEUM_ID]: '场景跳转类型的热点必须包含 "target.museumId" 字段',
  [ErrorCode.MISSING_TARGET_SCENE_ID]: '场景跳转类型的热点必须包含 "target.sceneId" 字段',
  [ErrorCode.INVALID_TARGET_YAW]: '请确保 "target.yaw" 是一个数字（跳转后的水平角度）',
  [ErrorCode.INVALID_TARGET_PITCH]: '请确保 "target.pitch" 是一个数字（跳转后的垂直角度）',
  [ErrorCode.INVALID_TARGET_FOV]: '请确保 "target.fov" 是一个数字（跳转后的视野角度）',
  [ErrorCode.MISSING_TARGET_URL]: '视频类型的热点必须包含 "target.url" 字段，填入视频的 URL',
};





















