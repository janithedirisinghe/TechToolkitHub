'use client';

import { useEffect } from 'react';

interface Props {
  articleUrl: string;
  title?: string;
  excerpt?: string;
}

export default function ArticleEnhancements({ articleUrl, title = '', excerpt = '' }: Props) {
  useEffect(() => {
    const progressBar = document.getElementById('reading-progress');
    const shareBtn = document.getElementById('share-button');

    function updateProgress() {
      if (!progressBar) return;
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressBar.style.width = Math.min(Math.max(scrollPercent, 0), 100) + '%';
    }

    // Attach scroll handler after mount
    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();

    // Enhance content links, tables, images, headings
    const contentEl = document.getElementById('article-content');
    if (contentEl) {
      // Links
      contentEl.querySelectorAll('a[href]').forEach((a) => {
        a.setAttribute('target', '_blank');
        a.setAttribute('rel', 'noopener noreferrer nofollow');
      });
      // Tables responsive wrapper and styling
      contentEl.querySelectorAll('table').forEach((t) => {
        t.classList.add('w-full', 'border-collapse', 'my-6');
        if (!t.parentElement || !t.parentElement.classList.contains('overflow-x-auto')) {
          const wrapper = document.createElement('div');
          wrapper.className = 'overflow-x-auto -mx-2 px-2';
          t.parentNode?.insertBefore(wrapper, t);
          wrapper.appendChild(t);
        }
      });
      contentEl.querySelectorAll('th, td').forEach((cell) => {
        cell.classList.add('border', 'border-gray-200', 'p-3', 'align-top');
      });
      contentEl.querySelectorAll('thead').forEach((thead) => {
        thead.classList.add('bg-gray-50');
      });
      // Images responsive
      contentEl.querySelectorAll('img').forEach((img) => {
        img.classList.add('max-w-full', 'h-auto', 'rounded-lg', 'my-4');
      });
      // Heading scroll margin
      contentEl.querySelectorAll('h1,h2,h3,h4,h5,h6').forEach((h) => {
        h.classList.add('scroll-mt-24');
      });
    }

    // Share button
    async function onShareClick() {
      try {
        if (navigator.share) {
          await navigator.share({ title, text: excerpt, url: articleUrl });
        } else if (navigator.clipboard) {
          await navigator.clipboard.writeText(articleUrl);
          alert('Link copied to clipboard!');
        }
      } catch {
        // ignore
      }
    }
    shareBtn?.addEventListener('click', onShareClick);

    return () => {
      window.removeEventListener('scroll', updateProgress);
      shareBtn?.removeEventListener('click', onShareClick);
    };
  }, [articleUrl, title, excerpt]);

  return null;
}
