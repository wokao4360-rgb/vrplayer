import { addComment, getLikeState, getUser, listComments, logout, toggleLike } from '../../community/store';
import type { Comment } from '../../community/types';
import { LoginModal } from './LoginModal';
import { showToast } from '../toast';

type CommunityPanelProps = {
  sceneId: string;
  sceneName?: string;
  onClose?: () => void;
};

type ToastReason = 'not_logged_in' | 'banned' | 'cooldown' | 'EMPTY';

export class CommunityPanel {
  private element: HTMLElement;
  private sceneId: string;
  private sceneName?: string;
  private onClose?: () => void;

  private subtitleEl: HTMLElement;
  private loginHintBtn: HTMLButtonElement;
  private userLineEl: HTMLElement;
  private userNameEl: HTMLElement;

  private likeBtn: HTMLButtonElement;
  private likeCountEl: HTMLElement;

  private commentsEl: HTMLElement;
  private inputEl: HTMLInputElement;
  private sendBtn: HTMLButtonElement;

  private loginModal: LoginModal;
  private highlightNextFirstComment = false;

  constructor(props: CommunityPanelProps) {
    this.sceneId = props.sceneId;
    this.sceneName = props.sceneName;
    this.onClose = props.onClose;

    this.element = document.createElement('div');
    this.element.className = 'vr-community';

    // header
    const header = document.createElement('div');
    header.className = 'vr-community-header';

    // 左侧：标题
    const title = document.createElement('div');
    title.className = 'vr-community-title';
    title.textContent = '社区';

    // 中间：场景名（可选）
    this.subtitleEl = document.createElement('div');
    this.subtitleEl.className = 'vr-community-subtitle';

    // 右侧：关闭按钮
    const closeBtn = document.createElement('button');
    closeBtn.className = 'vr-community-close';
    closeBtn.innerHTML = '×';
    closeBtn.setAttribute('aria-label', '关闭');
    closeBtn.style.pointerEvents = 'auto';
    closeBtn.style.zIndex = '10';
    closeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      // 1) 先真正关闭面板（DOM 移除/隐藏）
      this.onClose?.();
      // 2) 再熄灭 Dock 高亮
      window.dispatchEvent(
        new CustomEvent('vr:dock-tab-close', {
          detail: { tab: 'community' },
        }),
      );
    });

    header.appendChild(title);
    header.appendChild(this.subtitleEl);
    header.appendChild(closeBtn);

    // content
    const content = document.createElement('div');
    content.className = 'vr-community-content';

    // auth
    const authRow = document.createElement('div');
    authRow.className = 'vr-community-auth';

    this.loginHintBtn = document.createElement('button');
    this.loginHintBtn.className = 'vr-btn vr-community-login-hint';
    this.loginHintBtn.textContent = '登录后可参与互动';

    this.userLineEl = document.createElement('div');
    this.userLineEl.className = 'vr-community-userline';

    this.userNameEl = document.createElement('div');
    this.userNameEl.className = 'vr-community-username';

    const logoutBtn = document.createElement('button');
    logoutBtn.className = 'vr-btn vr-community-logout';
    logoutBtn.textContent = '退出登录';
    logoutBtn.addEventListener('click', () => {
      logout();
      this.refresh();
      this.toast('已退出登录');
    });

    this.userLineEl.appendChild(this.userNameEl);
    this.userLineEl.appendChild(logoutBtn);

    authRow.appendChild(this.loginHintBtn);
    authRow.appendChild(this.userLineEl);

    // likes
    const likeRow = document.createElement('div');
    likeRow.className = 'vr-community-like';

    this.likeBtn = document.createElement('button');
    this.likeBtn.className = 'vr-btn vr-community-likebtn';
    this.likeBtn.textContent = '点赞';

    this.likeCountEl = document.createElement('div');
    this.likeCountEl.className = 'vr-community-likecount';

    this.likeBtn.addEventListener('click', () => {
      const res = toggleLike(this.sceneId);
      if (!res.ok) {
        showToast('请先登录');
        this.loginModal.open();
        return;
      }
      this.renderLikes(res.count, res.action === 'liked');
      showToast(res.action === 'liked' ? '已点赞' : '已取消点赞');
    });

    likeRow.appendChild(this.likeBtn);
    likeRow.appendChild(this.likeCountEl);

    // comments
    this.commentsEl = document.createElement('div');
    this.commentsEl.className = 'vr-community-comments';

    // input
    const inputRow = document.createElement('div');
    inputRow.className = 'vr-community-inputrow';

    this.inputEl = document.createElement('input');
    this.inputEl.className = 'vr-community-input';
    this.inputEl.type = 'text';
    this.inputEl.placeholder = '写下你的想法…';
    this.inputEl.maxLength = 120;
    this.inputEl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') this.handleSend();
    });

    this.sendBtn = document.createElement('button');
    this.sendBtn.className = 'vr-btn vr-community-send';
    this.sendBtn.textContent = '发送';
    this.sendBtn.addEventListener('click', () => this.handleSend());

    inputRow.appendChild(this.inputEl);
    inputRow.appendChild(this.sendBtn);

    content.appendChild(authRow);
    content.appendChild(likeRow);
    content.appendChild(this.commentsEl);
    content.appendChild(inputRow);

    this.element.appendChild(header);
    this.element.appendChild(content);

    // modal
    this.loginModal = new LoginModal({
      onLogin: () => {
        this.refresh();
        this.toast('登录成功');
      },
      onLogout: () => {
        this.refresh();
      },
    });
    document.body.appendChild(this.loginModal.getElement());

    this.loginHintBtn.addEventListener('click', () => this.loginModal.open());

    this.setScene(props.sceneId, props.sceneName);
  }

  setScene(sceneId: string, sceneName?: string): void {
    this.sceneId = sceneId;
    this.sceneName = sceneName;
    this.subtitleEl.textContent = this.sceneName ? this.sceneName : sceneId;
    this.refresh();
  }

  private toastByReason(reason: ToastReason): void {
    if (reason === 'not_logged_in') showToast('请先登录');
    else if (reason === 'banned') showToast('内容包含敏感词，已拦截');
    else if (reason === 'cooldown') showToast('评论过于频繁，请稍后再试');
    else if (reason === 'EMPTY') showToast('内容不能为空');
  }

  private formatRelativeTime(ts: number): string {
    const diff = Date.now() - ts;
    if (diff < 60_000) return '刚刚';
    const mins = Math.floor(diff / 60_000);
    if (mins < 60) return `${mins} 分钟前`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours} 小时前`;
    const d = new Date(ts);
    return d.toLocaleDateString('zh-CN', {
      month: '2-digit',
      day: '2-digit',
    });
  }

  private renderLikes(count: number, liked: boolean): void {
    this.likeCountEl.textContent = String(count);
    this.likeBtn.classList.toggle('liked', liked);
  }

  private renderComments(list: Comment[]): void {
    this.commentsEl.innerHTML = '';

    const tip = document.createElement('div');
    tip.className = 'vr-community-tip';
    tip.textContent = '本场景最近 50 条留言';
    this.commentsEl.appendChild(tip);

    if (!list.length) {
      const empty = document.createElement('div');
      empty.className = 'vr-community-empty';
      empty.textContent = '此场景暂无留言';
      this.commentsEl.appendChild(empty);
      return;
    }

    let firstItem: HTMLElement | null = null;

    for (const c of list) {
      const item = document.createElement('div');
      item.className = 'vr-community-comment';

      const meta = document.createElement('div');
      meta.className = 'vr-community-comment-meta';
      meta.textContent = `${c.userName} · ${this.formatRelativeTime(c.ts)}`;

      const text = document.createElement('div');
      text.className = 'vr-community-comment-text';
      text.textContent = c.text;

      item.appendChild(meta);
      item.appendChild(text);
      this.commentsEl.appendChild(item);

      if (!firstItem) firstItem = item;
    }

    if (firstItem && this.highlightNextFirstComment) {
      firstItem.classList.add('vr-community-comment--flash');
      this.commentsEl.scrollTop = 0;
      window.setTimeout(() => {
        firstItem?.classList.remove('vr-community-comment--flash');
      }, 300);
    }

    this.highlightNextFirstComment = false;
  }

  private handleSend(): void {
    const raw = this.inputEl.value || '';
    const text = raw.trim();
    if (!text) {
      this.toastByReason('EMPTY');
      return;
    }
    const res = addComment(this.sceneId, text);
    if (!res.ok) {
      if (res.reason === 'not_logged_in') {
        this.toastByReason('not_logged_in');
        this.loginModal.open();
      } else {
        this.toastByReason(res.reason);
      }
      return;
    }
    this.inputEl.value = '';
    this.refresh();
    this.highlightNextFirstComment = true;
    showToast('评论已发布');
  }

  private refresh(): void {
    const user = getUser();

    // auth
    this.loginHintBtn.style.display = user ? 'none' : 'inline-flex';
    this.userLineEl.style.display = user ? 'flex' : 'none';
    this.userNameEl.textContent = user ? user.name : '';

    // likes
    const count = getLikeState(this.sceneId, user?.id || 'anon').count;
    const liked = user ? getLikeState(this.sceneId, user.id).liked : false;
    this.renderLikes(count, liked);

    // comments
    this.renderComments(listComments(this.sceneId));

    // input
    const disabled = !user;
    this.inputEl.disabled = disabled;
    this.sendBtn.classList.toggle('disabled', disabled);
  }

  getElement(): HTMLElement {
    return this.element;
  }

  remove(): void {
    this.loginModal.remove();
    this.element.remove();
  }
}


