/**
 * 复制文本到剪贴板工具函数
 */

/**
 * 复制文本到剪贴板（best-effort）
 * @param text 要复制的文本
 * @returns Promise<boolean> 是否成功
 */
export async function copyText(text: string): Promise<boolean> {
  // 优先使用 Clipboard API
  if (navigator.clipboard && navigator.clipboard.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      // Clipboard API 失败，使用 fallback
      console.debug('[copyText] Clipboard API failed, using fallback:', err);
    }
  }

  // Fallback: 使用 document.execCommand
  try {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.top = '-9999px';
    textarea.style.left = '-9999px';
    textarea.style.opacity = '0';
    textarea.setAttribute('readonly', 'readonly');
    document.body.appendChild(textarea);
    textarea.select();
    textarea.setSelectionRange(0, text.length);
    const success = document.execCommand('copy');
    document.body.removeChild(textarea);
    return success;
  } catch (err) {
    console.debug('[copyText] execCommand fallback failed:', err);
    return false;
  }
}

