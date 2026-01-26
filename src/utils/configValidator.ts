/**
 * 配置校验器
 * 对 config.json 进行运行时校验，检查字段缺失、类型错误、URL 为空、重复 ID 等问题
 */

/**
 * 错误代码枚举
 * 用于标识不同类型的校验错误
 */
export enum ErrorCode {
  // 根级别错误
  INVALID_ROOT = 'INVALID_ROOT',
  MISSING_APP_NAME = 'MISSING_APP_NAME',
  
  // 博物馆级别错误
  MUSEUMS_NOT_ARRAY = 'MUSEUMS_NOT_ARRAY',
  MUSEUMS_EMPTY = 'MUSEUMS_EMPTY',
  MISSING_MUSEUM_ID = 'MISSING_MUSEUM_ID',
  DUPLICATE_MUSEUM_ID = 'DUPLICATE_MUSEUM_ID',
  MISSING_MUSEUM_NAME = 'MISSING_MUSEUM_NAME',
  MISSING_MUSEUM_COVER = 'MISSING_MUSEUM_COVER',
  MISSING_MUSEUM_MAP = 'MISSING_MUSEUM_MAP',
  MISSING_MAP_IMAGE = 'MISSING_MAP_IMAGE',
  INVALID_MAP_WIDTH = 'INVALID_MAP_WIDTH',
  INVALID_MAP_HEIGHT = 'INVALID_MAP_HEIGHT',
  
  // 场景级别错误
  SCENES_NOT_ARRAY = 'SCENES_NOT_ARRAY',
  SCENES_EMPTY = 'SCENES_EMPTY',
  MISSING_SCENE_ID = 'MISSING_SCENE_ID',
  DUPLICATE_SCENE_ID = 'DUPLICATE_SCENE_ID',
  MISSING_SCENE_NAME = 'MISSING_SCENE_NAME',
  MISSING_PANO = 'MISSING_PANO',
  INVALID_PANO_URL = 'INVALID_PANO_URL',
  INVALID_PANOLOW_URL = 'INVALID_PANOLOW_URL',
  MISSING_THUMB = 'MISSING_THUMB',
  MISSING_INITIAL_VIEW = 'MISSING_INITIAL_VIEW',
  INVALID_YAW = 'INVALID_YAW',
  INVALID_PITCH = 'INVALID_PITCH',
  INVALID_FOV = 'INVALID_FOV',
  MISSING_MAP_POINT = 'MISSING_MAP_POINT',
  INVALID_MAP_POINT_X = 'INVALID_MAP_POINT_X',
  INVALID_MAP_POINT_Y = 'INVALID_MAP_POINT_Y',
  
  // 热点级别错误
  HOTSPOTS_NOT_ARRAY = 'HOTSPOTS_NOT_ARRAY',
  MISSING_HOTSPOT_ID = 'MISSING_HOTSPOT_ID',
  DUPLICATE_HOTSPOT_ID = 'DUPLICATE_HOTSPOT_ID',
  INVALID_HOTSPOT_TYPE = 'INVALID_HOTSPOT_TYPE',
  MISSING_HOTSPOT_LABEL = 'MISSING_HOTSPOT_LABEL',
  INVALID_HOTSPOT_YAW = 'INVALID_HOTSPOT_YAW',
  INVALID_HOTSPOT_PITCH = 'INVALID_HOTSPOT_PITCH',
  MISSING_HOTSPOT_TARGET = 'MISSING_HOTSPOT_TARGET',
  MISSING_TARGET_MUSEUM_ID = 'MISSING_TARGET_MUSEUM_ID',
  MISSING_TARGET_SCENE_ID = 'MISSING_TARGET_SCENE_ID',
  INVALID_TARGET_YAW = 'INVALID_TARGET_YAW',
  INVALID_TARGET_PITCH = 'INVALID_TARGET_PITCH',
  INVALID_TARGET_FOV = 'INVALID_TARGET_FOV',
  MISSING_TARGET_URL = 'MISSING_TARGET_URL',
}

export interface ValidationError {
  code: ErrorCode; // 错误代码
  path: string; // 错误路径，如 "museums[0].scenes[2].pano"
  message: string; // 错误信息（保留用于向后兼容）
  museumName?: string; // 博物馆名称（如果错误发生在博物馆级别）
  sceneName?: string; // 场景名称（如果错误发生在场景级别）
  fieldName?: string; // 字段名称（用于显示更友好的提示）
}

/**
 * 校验配置对象
 * @param data 待校验的配置对象
 * @returns 错误列表，如果为空则表示校验通过
 */
export function validateConfig(data: any): ValidationError[] {
  const errors: ValidationError[] = [];

  // 检查根级别字段
  if (!data || typeof data !== 'object') {
    errors.push({ 
      code: ErrorCode.INVALID_ROOT,
      path: 'root', 
      message: '配置必须是对象',
      fieldName: '配置根对象'
    });
    return errors;
  }

  if (!data.appName || typeof data.appName !== 'string' || data.appName.trim() === '') {
    errors.push({ 
      code: ErrorCode.MISSING_APP_NAME,
      path: 'appName', 
      message: 'appName 必须是非空字符串',
      fieldName: '应用名称'
    });
  }

  if (!Array.isArray(data.museums)) {
    errors.push({ 
      code: ErrorCode.MUSEUMS_NOT_ARRAY,
      path: 'museums', 
      message: 'museums 必须是数组',
      fieldName: '博物馆列表'
    });
    return errors; // 如果 museums 不是数组，无法继续校验
  }

  if (data.museums.length === 0) {
    errors.push({ 
      code: ErrorCode.MUSEUMS_EMPTY,
      path: 'museums', 
      message: 'museums 数组不能为空',
      fieldName: '博物馆列表'
    });
  }

  // 检查博物馆 ID 是否重复
  const museumIds = new Set<string>();
  data.museums.forEach((museum: any, index: number) => {
    const basePath = `museums[${index}]`;
    
    // 尝试获取博物馆名称（用于友好提示）
    const museumName = (museum.name && typeof museum.name === 'string') ? museum.name : undefined;

    // 检查博物馆 ID
    if (!museum.id || typeof museum.id !== 'string' || museum.id.trim() === '') {
      errors.push({ 
        code: ErrorCode.MISSING_MUSEUM_ID,
        path: `${basePath}.id`, 
        message: 'id 必须是非空字符串',
        museumName,
        fieldName: '博物馆 ID'
      });
    } else {
      if (museumIds.has(museum.id)) {
        errors.push({ 
          code: ErrorCode.DUPLICATE_MUSEUM_ID,
          path: `${basePath}.id`, 
          message: `博物馆 ID "${museum.id}" 重复`,
          museumName,
          fieldName: '博物馆 ID'
        });
      }
      museumIds.add(museum.id);
    }

    // 检查博物馆名称
    if (!museum.name || typeof museum.name !== 'string' || museum.name.trim() === '') {
      errors.push({ 
        code: ErrorCode.MISSING_MUSEUM_NAME,
        path: `${basePath}.name`, 
        message: 'name 必须是非空字符串',
        museumName: undefined, // 名称本身缺失，无法使用
        fieldName: '博物馆名称'
      });
    }

    // 检查封面图 URL
    if (!museum.cover || typeof museum.cover !== 'string' || museum.cover.trim() === '') {
      errors.push({ 
        code: ErrorCode.MISSING_MUSEUM_COVER,
        path: `${basePath}.cover`, 
        message: 'cover 必须是有效的 URL 字符串',
        museumName,
        fieldName: '封面图'
      });
    }

    // 检查地图配置
    if (!museum.map || typeof museum.map !== 'object') {
      errors.push({ 
        code: ErrorCode.MISSING_MUSEUM_MAP,
        path: `${basePath}.map`, 
        message: 'map 必须是对象',
        museumName,
        fieldName: '地图配置'
      });
    } else {
      if (!museum.map.image || typeof museum.map.image !== 'string' || museum.map.image.trim() === '') {
        errors.push({ 
          code: ErrorCode.MISSING_MAP_IMAGE,
          path: `${basePath}.map.image`, 
          message: 'map.image 必须是有效的 URL 字符串',
          museumName,
          fieldName: '地图图片'
        });
      }
      if (typeof museum.map.width !== 'number' || museum.map.width <= 0) {
        errors.push({ 
          code: ErrorCode.INVALID_MAP_WIDTH,
          path: `${basePath}.map.width`, 
          message: 'map.width 必须是大于 0 的数字',
          museumName,
          fieldName: '地图宽度'
        });
      }
      if (typeof museum.map.height !== 'number' || museum.map.height <= 0) {
        errors.push({ 
          code: ErrorCode.INVALID_MAP_HEIGHT,
          path: `${basePath}.map.height`, 
          message: 'map.height 必须是大于 0 的数字',
          museumName,
          fieldName: '地图高度'
        });
      }
    }

    // 检查场景数组
    if (!Array.isArray(museum.scenes)) {
      errors.push({ 
        code: ErrorCode.SCENES_NOT_ARRAY,
        path: `${basePath}.scenes`, 
        message: 'scenes 必须是数组',
        museumName,
        fieldName: '场景列表'
      });
    } else {
      if (museum.scenes.length === 0) {
        errors.push({ 
          code: ErrorCode.SCENES_EMPTY,
          path: `${basePath}.scenes`, 
          message: 'scenes 数组不能为空',
          museumName,
          fieldName: '场景列表'
        });
      }

      // 检查场景 ID 是否重复
      const sceneIds = new Set<string>();
      museum.scenes.forEach((scene: any, sceneIndex: number) => {
        const scenePath = `${basePath}.scenes[${sceneIndex}]`;
        
        // 尝试获取场景名称（用于友好提示）
        const sceneName = (scene.name && typeof scene.name === 'string') ? scene.name : undefined;

        // 检查场景 ID
        if (!scene.id || typeof scene.id !== 'string' || scene.id.trim() === '') {
          errors.push({ 
            code: ErrorCode.MISSING_SCENE_ID,
            path: `${scenePath}.id`, 
            message: 'id 必须是非空字符串',
            museumName,
            sceneName,
            fieldName: '场景 ID'
          });
        } else {
          if (sceneIds.has(scene.id)) {
            errors.push({ 
              code: ErrorCode.DUPLICATE_SCENE_ID,
              path: `${scenePath}.id`, 
              message: `场景 ID "${scene.id}" 在博物馆内重复`,
              museumName,
              sceneName,
              fieldName: '场景 ID'
            });
          }
          sceneIds.add(scene.id);
        }

        // 检查场景名称
        if (!scene.name || typeof scene.name !== 'string' || scene.name.trim() === '') {
          errors.push({ 
            code: ErrorCode.MISSING_SCENE_NAME,
            path: `${scenePath}.name`, 
            message: 'name 必须是非空字符串',
            museumName,
            sceneName: undefined, // 名称本身缺失，无法使用
            fieldName: '场景名称'
          });
        }

        // 检查全景图 URL（pano / panoLow / panoTiles 至少有一个）
        const hasPano = !!scene.pano;
        const hasPanoLow = !!scene.panoLow;
        const hasTiles = !!scene.panoTiles?.manifest;

        if (!hasPano && !hasPanoLow && !hasTiles) {
          errors.push({ 
            code: ErrorCode.MISSING_PANO,
            path: `${scenePath}.pano`, 
            message: 'pano / panoLow / panoTiles 至少需要提供一个',
            museumName,
            sceneName,
            fieldName: '全景图'
          });
        } else {
          if (scene.pano && (typeof scene.pano !== 'string' || scene.pano.trim() === '')) {
            errors.push({ 
              code: ErrorCode.INVALID_PANO_URL,
              path: `${scenePath}.pano`, 
              message: 'pano 必须是有效的 URL 字符串',
              museumName,
              sceneName,
              fieldName: '高清全景图'
            });
          }
          if (scene.panoLow && (typeof scene.panoLow !== 'string' || scene.panoLow.trim() === '')) {
            errors.push({ 
              code: ErrorCode.INVALID_PANOLOW_URL,
              path: `${scenePath}.panoLow`, 
              message: 'panoLow 必须是有效的 URL 字符串',
              museumName,
              sceneName,
              fieldName: '低清全景图'
            });
          }
          if (scene.panoTiles) {
            if (typeof scene.panoTiles !== 'object') {
              errors.push({
                code: ErrorCode.INVALID_PANO_URL,
                path: `${scenePath}.panoTiles`,
                message: 'panoTiles 必须是对象，包含 manifest',
                museumName,
                sceneName,
                fieldName: '瓦片元数据'
              });
            } else if (!scene.panoTiles.manifest || typeof scene.panoTiles.manifest !== 'string' || scene.panoTiles.manifest.trim() === '') {
              errors.push({
                code: ErrorCode.INVALID_PANO_URL,
                path: `${scenePath}.panoTiles.manifest`,
                message: 'panoTiles.manifest 必须是有效的字符串',
                museumName,
                sceneName,
                fieldName: '瓦片 manifest'
              });
            }
          }
        }

        // 检查缩略图 URL
        if (!scene.thumb || typeof scene.thumb !== 'string' || scene.thumb.trim() === '') {
          errors.push({ 
            code: ErrorCode.MISSING_THUMB,
            path: `${scenePath}.thumb`, 
            message: 'thumb 必须是有效的 URL 字符串',
            museumName,
            sceneName,
            fieldName: '缩略图'
          });
        }

        // 检查初始视角
        if (!scene.initialView || typeof scene.initialView !== 'object') {
          errors.push({ 
            code: ErrorCode.MISSING_INITIAL_VIEW,
            path: `${scenePath}.initialView`, 
            message: 'initialView 必须是对象',
            museumName,
            sceneName,
            fieldName: '初始视角'
          });
        } else {
          if (typeof scene.initialView.yaw !== 'number') {
            errors.push({ 
              code: ErrorCode.INVALID_YAW,
              path: `${scenePath}.initialView.yaw`, 
              message: 'initialView.yaw 必须是数字',
              museumName,
              sceneName,
              fieldName: '水平角度'
            });
          }
          if (typeof scene.initialView.pitch !== 'number') {
            errors.push({ 
              code: ErrorCode.INVALID_PITCH,
              path: `${scenePath}.initialView.pitch`, 
              message: 'initialView.pitch 必须是数字',
              museumName,
              sceneName,
              fieldName: '垂直角度'
            });
          }
          if (scene.initialView.fov !== undefined && typeof scene.initialView.fov !== 'number') {
            errors.push({ 
              code: ErrorCode.INVALID_FOV,
              path: `${scenePath}.initialView.fov`, 
              message: 'initialView.fov 必须是数字',
              museumName,
              sceneName,
              fieldName: '视野角度'
            });
          }
        }

        // 检查地图点位
        if (!scene.mapPoint || typeof scene.mapPoint !== 'object') {
          errors.push({ 
            code: ErrorCode.MISSING_MAP_POINT,
            path: `${scenePath}.mapPoint`, 
            message: 'mapPoint 必须是对象',
            museumName,
            sceneName,
            fieldName: '地图点位'
          });
        } else {
          if (typeof scene.mapPoint.x !== 'number') {
            errors.push({ 
              code: ErrorCode.INVALID_MAP_POINT_X,
              path: `${scenePath}.mapPoint.x`, 
              message: 'mapPoint.x 必须是数字',
              museumName,
              sceneName,
              fieldName: '地图点位 X 坐标'
            });
          }
          if (typeof scene.mapPoint.y !== 'number') {
            errors.push({ 
              code: ErrorCode.INVALID_MAP_POINT_Y,
              path: `${scenePath}.mapPoint.y`, 
              message: 'mapPoint.y 必须是数字',
              museumName,
              sceneName,
              fieldName: '地图点位 Y 坐标'
            });
          }
        }

        // 检查热点数组
        if (!Array.isArray(scene.hotspots)) {
          errors.push({ 
            code: ErrorCode.HOTSPOTS_NOT_ARRAY,
            path: `${scenePath}.hotspots`, 
            message: 'hotspots 必须是数组',
            museumName,
            sceneName,
            fieldName: '热点列表'
          });
        } else {
          // 检查热点 ID 是否重复
          const hotspotIds = new Set<string>();
          scene.hotspots.forEach((hotspot: any, hotspotIndex: number) => {
            const hotspotPath = `${scenePath}.hotspots[${hotspotIndex}]`;

            // 检查热点 ID
            if (!hotspot.id || typeof hotspot.id !== 'string' || hotspot.id.trim() === '') {
              errors.push({ 
                code: ErrorCode.MISSING_HOTSPOT_ID,
                path: `${hotspotPath}.id`, 
                message: 'id 必须是非空字符串',
                museumName,
                sceneName,
                fieldName: '热点 ID'
              });
            } else {
              if (hotspotIds.has(hotspot.id)) {
                errors.push({ 
                  code: ErrorCode.DUPLICATE_HOTSPOT_ID,
                  path: `${hotspotPath}.id`, 
                  message: `热点 ID "${hotspot.id}" 在场景内重复`,
                  museumName,
                  sceneName,
                  fieldName: '热点 ID'
                });
              }
              hotspotIds.add(hotspot.id);
            }

            // 检查热点类型：支持 scene / video / image / info
            if (
              hotspot.type !== 'scene' &&
              hotspot.type !== 'video' &&
              hotspot.type !== 'image' &&
              hotspot.type !== 'info'
            ) {
              errors.push({ 
                code: ErrorCode.INVALID_HOTSPOT_TYPE,
                path: `${hotspotPath}.type`, 
                message: 'type 必须是 "scene"、"video"、"image" 或 "info"',
                museumName,
                sceneName,
                fieldName: '热点类型'
              });
            }

            // 检查热点标签
            if (!hotspot.label || typeof hotspot.label !== 'string' || hotspot.label.trim() === '') {
              errors.push({ 
                code: ErrorCode.MISSING_HOTSPOT_LABEL,
                path: `${hotspotPath}.label`, 
                message: 'label 必须是非空字符串',
                museumName,
                sceneName,
                fieldName: '热点标签'
              });
            }

            // 检查热点位置
            if (typeof hotspot.yaw !== 'number') {
              errors.push({ 
                code: ErrorCode.INVALID_HOTSPOT_YAW,
                path: `${hotspotPath}.yaw`, 
                message: 'yaw 必须是数字',
                museumName,
                sceneName,
                fieldName: '热点水平角度'
              });
            }
            if (typeof hotspot.pitch !== 'number') {
              errors.push({ 
                code: ErrorCode.INVALID_HOTSPOT_PITCH,
                path: `${hotspotPath}.pitch`, 
                message: 'pitch 必须是数字',
                museumName,
                sceneName,
                fieldName: '热点垂直角度'
              });
            }

            // 检查目标配置
            if (hotspot.type === 'scene') {
              if (!hotspot.target || typeof hotspot.target !== 'object') {
                errors.push({ 
                  code: ErrorCode.MISSING_HOTSPOT_TARGET,
                  path: `${hotspotPath}.target`, 
                  message: 'scene 类型热点必须提供 target 对象',
                  museumName,
                  sceneName,
                  fieldName: '热点目标配置'
                });
              } else {
                if (!hotspot.target.museumId || typeof hotspot.target.museumId !== 'string') {
                  errors.push({ 
                    code: ErrorCode.MISSING_TARGET_MUSEUM_ID,
                    path: `${hotspotPath}.target.museumId`, 
                    message: 'scene 类型热点的 target.museumId 必须是非空字符串',
                    museumName,
                    sceneName,
                    fieldName: '目标博物馆 ID'
                  });
                }
                if (typeof hotspot.target.sceneId !== 'string') {
                    errors.push({ 
                      code: ErrorCode.MISSING_TARGET_SCENE_ID,
                      path: `${hotspotPath}.target.sceneId`, 
                      message: 'scene 类型热点的 target.sceneId 必须是字符串（允许空字符串，用户后续补全）',
                    museumName,
                    sceneName,
                    fieldName: '目标场景 ID'
                  });
                }
                // yaw/pitch/fov 是可选的
                if (hotspot.target.yaw !== undefined && typeof hotspot.target.yaw !== 'number') {
                  errors.push({ 
                    code: ErrorCode.INVALID_TARGET_YAW,
                    path: `${hotspotPath}.target.yaw`, 
                    message: 'target.yaw 必须是数字',
                    museumName,
                    sceneName,
                    fieldName: '目标水平角度'
                  });
                }
                if (hotspot.target.pitch !== undefined && typeof hotspot.target.pitch !== 'number') {
                  errors.push({ 
                    code: ErrorCode.INVALID_TARGET_PITCH,
                    path: `${hotspotPath}.target.pitch`, 
                    message: 'target.pitch 必须是数字',
                    museumName,
                    sceneName,
                    fieldName: '目标垂直角度'
                  });
                }
                if (hotspot.target.fov !== undefined && typeof hotspot.target.fov !== 'number') {
                  errors.push({ 
                    code: ErrorCode.INVALID_TARGET_FOV,
                    path: `${hotspotPath}.target.fov`, 
                    message: 'target.fov 必须是数字',
                    museumName,
                    sceneName,
                    fieldName: '目标视野角度'
                  });
                }
              }
            } else if (hotspot.type === 'video') {
              // video 类型：不再强制要求 target.url，允许通过 src 字段或其他方式提供
              // 仅在提供 target 时，对其结构做轻量检查
              if (hotspot.target && typeof hotspot.target !== 'object') {
                errors.push({
                  code: ErrorCode.MISSING_HOTSPOT_TARGET,
                  path: `${hotspotPath}.target`,
                  message: 'video 类型热点的 target 必须是对象（如果提供）',
                  museumName,
                  sceneName,
                  fieldName: '热点目标配置'
                });
              }
            } else {
              // image / info：target 完全可选，不做强制校验
            }
          });
        }
      });
    }
  });

  return errors;
}


















