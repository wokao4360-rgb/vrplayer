import type { AppConfig, Museum } from '../types/config';

export type LandingContent = {
  brandTitle: string;
  heroTitle: string;
  heroSubtitle: string;
  projectNote: string;
};

export type MuseumMarketingContent = {
  hook: string;
  tags: string[];
};

const DEFAULT_LANDING: LandingContent = {
  brandTitle: '鼎虎清源',
  heroTitle: '三馆全景导览',
  heroSubtitle: '用一座馆的门廊、一封遗墨、一道回廊，把历史从课本里请回眼前。',
  projectNote:
    '这是一个服务研学的公益全景项目。我们用实地采集与轻量交互，把纪念馆里的历史现场重新组织成可抵达、可观看、可讲述的沉浸入口。',
};

const DEFAULT_MARKETING_BY_MUSEUM_ID: Record<string, MuseumMarketingContent> = {
  wangding: {
    hook: '一死醒天下：探寻晚清名臣尸谏救国的铮铮铁骨。',
    tags: ['VR沉浸', '24个历史场景', '独家全景'],
  },
  yanghucheng: {
    hook: '民族危亡的抉择：重返风云激荡的西安事变发生地。',
    tags: ['360°漫游', '将领故居', '历史现场'],
  },
  linzexu: {
    hook: '苟利国家生死以：穿梭百年，见证虎门销烟外的旷世长歌。',
    tags: ['12个高清实拍', '历史遗迹', '人文研学'],
  },
};

export function resolveLandingContent(config: AppConfig | null | undefined): LandingContent {
  const landing = config?.landing;
  return {
    brandTitle:
      typeof landing?.brandTitle === 'string' && landing.brandTitle.trim() !== ''
        ? landing.brandTitle
        : DEFAULT_LANDING.brandTitle,
    heroTitle:
      typeof landing?.heroTitle === 'string' && landing.heroTitle.trim() !== ''
        ? landing.heroTitle
        : DEFAULT_LANDING.heroTitle,
    heroSubtitle:
      typeof landing?.heroSubtitle === 'string' && landing.heroSubtitle.trim() !== ''
        ? landing.heroSubtitle
        : DEFAULT_LANDING.heroSubtitle,
    projectNote:
      typeof landing?.projectNote === 'string' && landing.projectNote.trim() !== ''
        ? landing.projectNote
        : DEFAULT_LANDING.projectNote,
  };
}

export function resolveMuseumMarketing(museum: Museum): MuseumMarketingContent {
  const fallback = DEFAULT_MARKETING_BY_MUSEUM_ID[museum.id] ?? {
    hook: museum.description?.trim() || `${museum.name} 沉浸式全景导览`,
    tags: ['沉浸导览', `${museum.scenes.length}个场景`],
  };

  const tags = Array.isArray(museum.marketing?.tags)
    ? museum.marketing.tags.filter((tag) => typeof tag === 'string' && tag.trim() !== '')
    : [];

  return {
    hook:
      typeof museum.marketing?.hook === 'string' && museum.marketing.hook.trim() !== ''
        ? museum.marketing.hook
        : fallback.hook,
    tags: tags.length > 0 ? tags : fallback.tags,
  };
}
