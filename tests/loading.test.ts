import test from 'node:test';
import assert from 'node:assert/strict';

class FakeClassList {
  private readonly classes = new Set<string>();

  add(...tokens: string[]): void {
    for (const token of tokens) {
      this.classes.add(token);
    }
  }

  remove(...tokens: string[]): void {
    for (const token of tokens) {
      this.classes.delete(token);
    }
  }

  contains(token: string): boolean {
    return this.classes.has(token);
  }
}

class FakeElement {
  className = '';
  innerHTML = '';
  textContent = '';
  removed = false;
  readonly classList = new FakeClassList();
  readonly children: FakeElement[] = [];

  appendChild(child: FakeElement): FakeElement {
    this.children.push(child);
    return child;
  }

  replaceChildren(): void {
    this.innerHTML = '';
    this.textContent = '';
    this.children.length = 0;
  }

  remove(): void {
    this.removed = true;
  }
}

const documentStub = {
  fullscreenElement: null,
  webkitFullscreenElement: null,
  head: new FakeElement(),
  createElement: (_tag: string) => new FakeElement(),
  addEventListener: (_type: string, _handler: EventListener) => {},
};

test('loading only injects the text while visible and clears it on hide', async () => {
  Object.assign(globalThis, { document: documentStub });

  const { Loading } = await import('../src/ui/Loading.ts');
  const loading = new Loading();
  const element = loading.getElement() as unknown as FakeElement;

  assert.equal(element.innerHTML, '');
  assert.equal(element.classList.contains('show'), false);

  loading.show();
  assert.equal(element.classList.contains('show'), true);
  assert.match(element.innerHTML, /\u52a0\u8f7d\u4e2d/);

  loading.hide();
  assert.equal(element.classList.contains('show'), false);
  assert.equal(element.innerHTML, '');
});
