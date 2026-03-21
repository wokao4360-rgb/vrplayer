import test from 'node:test';
import assert from 'node:assert/strict';

import { Loading } from '../src/ui/Loading.ts';

class FakeClassList {
  private readonly names = new Set<string>();

  add(...tokens: string[]): void {
    for (const token of tokens) {
      this.names.add(token);
    }
  }

  remove(...tokens: string[]): void {
    for (const token of tokens) {
      this.names.delete(token);
    }
  }

  contains(token: string): boolean {
    return this.names.has(token);
  }
}

class FakeElement {
  className = '';
  innerHTML = '';
  textContent = '';
  parentNode: FakeElement | null = null;
  isConnected = false;
  readonly classList = new FakeClassList();
  readonly style = {
    cssText: '',
  };
  private readonly attributes = new Map<string, string>();
  private readonly children: FakeElement[] = [];

  appendChild(child: FakeElement): FakeElement {
    this.children.push(child);
    child.parentNode = this;
    child.isConnected = true;
    return child;
  }

  remove(): void {
    if (!this.parentNode) {
      this.isConnected = false;
      return;
    }
    const siblings = this.parentNode.children;
    const index = siblings.indexOf(this);
    if (index >= 0) {
      siblings.splice(index, 1);
    }
    this.parentNode = null;
    this.isConnected = false;
  }

  setAttribute(name: string, value: string): void {
    this.attributes.set(name, value);
  }

  getAttribute(name: string): string | null {
    return this.attributes.get(name) ?? null;
  }

  removeAttribute(name: string): void {
    this.attributes.delete(name);
  }
}

class FakeDocument {
  fullscreenElement: FakeElement | null = null;
  webkitFullscreenElement: FakeElement | null = null;
  readonly head = new FakeElement();

  createElement(): FakeElement {
    return new FakeElement();
  }

  addEventListener(): void {
    // no-op for tests
  }
}

test('loading overlay keeps hidden state out of the DOM tree until explicitly shown', () => {
  const originalDocument = globalThis.document;

  try {
    const fakeDocument = new FakeDocument();
    (globalThis as typeof globalThis & { document: Document }).document = fakeDocument as unknown as Document;

    const loading = new Loading();
    const element = loading.getElement();

    assert.equal(element.innerHTML, '');
    assert.equal(element.classList.contains('show'), false);
    assert.equal(element.getAttribute('aria-hidden'), 'true');

    loading.show();
    assert.match(element.innerHTML, /加载中/);
    assert.equal(element.classList.contains('show'), true);
    assert.equal(element.getAttribute('aria-hidden'), 'false');

    loading.hide();
    assert.equal(element.innerHTML, '');
    assert.equal(element.classList.contains('show'), false);
    assert.equal(element.getAttribute('aria-hidden'), 'true');
  } finally {
    (globalThis as typeof globalThis & { document?: Document }).document = originalDocument;
  }
});
