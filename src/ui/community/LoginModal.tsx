import { getUser, login, logout } from '../../community/store';
import type { User } from '../../community/types';
import { showToast } from '../toast';

type LoginModalOptions = {
  onLogin?: (user: User) => void;
  onLogout?: () => void;
};

export class LoginModal {
  private element: HTMLElement;
  private isOpen = false;
  private inputEl: HTMLInputElement;
  private options: LoginModalOptions;
  private handleKeyDownBound: (e: KeyboardEvent) => void;

  constructor(options: LoginModalOptions = {}) {
    this.options = options;
    this.handleKeyDownBound = (e: KeyboardEvent) => this.handleKeyDown(e);

    this.element = document.createElement('div');
    this.element.className = 'vr-modal vr-login-modal';

    const mask = document.createElement('div');
    mask.className = 'vr-modal-mask';

    const card = document.createElement('div');
    card.className = 'vr-modal-card vr-login-card';

    const titleRow = document.createElement('div');
    titleRow.className = 'vr-login-title-row';

    const title = document.createElement('div');
    title.className = 'vr-modal-title';
    title.textContent = '登录';

    const closeBtn = document.createElement('button');
    closeBtn.className = 'vr-btn vr-login-close';
    closeBtn.setAttribute('aria-label', '关闭');
    closeBtn.textContent = '×';
    closeBtn.addEventListener('click', () => this.close());

    titleRow.appendChild(title);
    titleRow.appendChild(closeBtn);

    const desc = document.createElement('div');
    desc.className = 'vr-modal-desc';
    desc.textContent = '输入用户名即可参与互动';

    const form = document.createElement('div');
    form.className = 'vr-login-form';

    this.inputEl = document.createElement('input');
    this.inputEl.className = 'vr-login-input';
    this.inputEl.type = 'text';
    this.inputEl.placeholder = '用户名（2-12字）';
    this.inputEl.maxLength = 12;
    this.inputEl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') this.handleConfirm();
    });

    const actions = document.createElement('div');
    actions.className = 'vr-modal-actions vr-login-actions';

    const cancelBtn = document.createElement('button');
    cancelBtn.className = 'vr-btn vr-login-btn';
    cancelBtn.textContent = '取消';
    cancelBtn.addEventListener('click', () => this.close());

    const logoutBtn = document.createElement('button');
    logoutBtn.className = 'vr-btn vr-login-btn danger';
    logoutBtn.textContent = '退出登录';
    logoutBtn.addEventListener('click', () => {
      logout();
      this.options.onLogout?.();
      this.close();
    });

    const okBtn = document.createElement('button');
    okBtn.className = 'vr-btn vr-login-btn primary';
    okBtn.textContent = '确认';
    okBtn.addEventListener('click', () => this.handleConfirm());

    actions.appendChild(cancelBtn);
    actions.appendChild(logoutBtn);
    actions.appendChild(okBtn);

    form.appendChild(this.inputEl);

    card.appendChild(titleRow);
    card.appendChild(desc);
    card.appendChild(form);
    card.appendChild(actions);

    mask.addEventListener('click', () => this.close());
    card.addEventListener('click', (e) => e.stopPropagation());

    this.element.appendChild(mask);
    this.element.appendChild(card);

    // 只在打开时同步 logoutBtn 可见性
    const syncLogoutVisible = () => {
      const u = getUser();
      logoutBtn.style.display = u ? 'inline-flex' : 'none';
    };

    const origOpen = this.open.bind(this);
    this.open = () => {
      syncLogoutVisible();
      origOpen();
    };
  }

  private handleKeyDown(e: KeyboardEvent): void {
    if (!this.isOpen) return;
    if (e.key === 'Escape') {
      this.close();
    }
  }

  private handleConfirm(): void {
    const name = (this.inputEl.value || '').trim();
    if (name.length < 2 || name.length > 12) {
      showToast('用户名需 2-12 字');
      return;
    }
    const user = login(name);
    this.options.onLogin?.(user);
    this.close();
  }

  open(): void {
    if (this.isOpen) return;
    this.isOpen = true;
    window.addEventListener('keydown', this.handleKeyDownBound);
    const u = getUser();
    this.inputEl.value = u?.name || '';
    this.element.classList.add('open');
    window.setTimeout(() => this.inputEl.focus(), 60);
  }

  close(): void {
    if (!this.isOpen) return;
    this.isOpen = false;
    window.removeEventListener('keydown', this.handleKeyDownBound);
    this.element.classList.remove('open');
  }

  getElement(): HTMLElement {
    return this.element;
  }

  remove(): void {
    window.removeEventListener('keydown', this.handleKeyDownBound);
    this.element.remove();
  }
}




