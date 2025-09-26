'use client';

import { useEffect } from 'react';

interface EnhancedArticleUXProps {
  content: string;
}

export default function EnhancedArticleUX({ content }: EnhancedArticleUXProps) {
  useEffect(() => {
    // Calculate reading time (not displayed but used for analytics)
    const wordCount = content.split(' ').length;
    const estimatedReadTime = Math.ceil(wordCount / 200);
    console.log('Estimated read time:', estimatedReadTime, 'minutes');

    // Reading progress tracking
    const handleScroll = () => {
      const article = document.getElementById('article-content');
      if (!article) return;

      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = scrollTop / docHeight;

      // Update reading progress indicator
      const progressBar = document.getElementById('reading-progress');
      if (progressBar) {
        progressBar.style.width = `${scrollPercent * 100}%`;
      }

      // Detect current section for progress dots
      const headings = article.querySelectorAll('h1, h2, h3');
      let currentIndex = 0;
      
      headings.forEach((heading, index) => {
        const rect = heading.getBoundingClientRect();
        if (rect.top <= 100) {
          currentIndex = index;
        }
      });

      // Update progress dots
      const dots = document.querySelectorAll('.reading-progress-dot .dot');
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === Math.floor(currentIndex / Math.ceil(headings.length / 3)));
      });

      // Track reading state for analytics
      const isReading = scrollPercent > 0.1 && scrollPercent < 0.9;
      if (isReading) {
        // Could send analytics events here
      }
    };

    // Smooth scroll to headings on dot click
    const handleDotClick = (event: Event) => {
      const target = event.target as HTMLElement;
      if (target.classList.contains('dot')) {
        const section = target.getAttribute('data-section');
        const article = document.getElementById('article-content');
        if (!article) return;

        let scrollTarget: Element | null = null;
        
        switch (section) {
          case 'intro':
            scrollTarget = article.querySelector('p');
            break;
          case 'content':
            scrollTarget = article.querySelector('h2') || article.querySelector('h3');
            break;
          case 'conclusion':
            const headings = article.querySelectorAll('h2, h3');
            scrollTarget = headings[Math.floor(headings.length * 0.7)] || headings[headings.length - 1];
            break;
        }

        if (scrollTarget) {
          scrollTarget.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    };

    // Add event listeners
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('click', handleDotClick);

    // Enhance links with external indicators
    const links = document.querySelectorAll('.article-content a[href^="http"]');
    links.forEach(link => {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    });

    // Add copy code functionality
    const codeBlocks = document.querySelectorAll('.article-content pre');
    codeBlocks.forEach((block) => {
      const htmlBlock = block as HTMLElement;
      const button = document.createElement('button');
      button.innerHTML = '📋';
      button.className = 'copy-code-btn';
      button.style.cssText = `
        position: absolute;
        top: 1rem;
        right: 1rem;
        background: rgba(255, 255, 255, 0.1);
        border: none;
        color: white;
        padding: 0.5rem;
        border-radius: 6px;
        cursor: pointer;
        font-size: 0.875rem;
        opacity: 0;
        transition: opacity 0.3s ease;
      `;

      button.addEventListener('click', () => {
        const code = block.querySelector('code');
        if (code) {
          navigator.clipboard.writeText(code.textContent || '');
          button.innerHTML = '✅';
          setTimeout(() => {
            button.innerHTML = '📋';
          }, 2000);
        }
      });

      htmlBlock.style.position = 'relative';
      htmlBlock.appendChild(button);

      htmlBlock.addEventListener('mouseenter', () => {
        button.style.opacity = '1';
      });

      htmlBlock.addEventListener('mouseleave', () => {
        button.style.opacity = '0';
      });
    });

    // Add image zoom functionality
    const images = document.querySelectorAll('.article-content img');
    images.forEach((img) => {
      img.addEventListener('click', () => {
        const overlay = document.createElement('div');
        overlay.style.cssText = `
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          cursor: pointer;
        `;

        const zoomedImg = img.cloneNode() as HTMLImageElement;
        zoomedImg.style.cssText = `
          max-width: 90%;
          max-height: 90%;
          object-fit: contain;
          border-radius: 12px;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
        `;

        overlay.appendChild(zoomedImg);
        document.body.appendChild(overlay);

        overlay.addEventListener('click', () => {
          document.body.removeChild(overlay);
        });
      });
    });

    // Table of Contents generation
    const generateTableOfContents = () => {
      const article = document.getElementById('article-content');
      if (!article) return;

      const headings = article.querySelectorAll('h1, h2, h3, h4');
      if (headings.length === 0) return;

      const toc = document.createElement('div');
      toc.id = 'table-of-contents';
      toc.style.cssText = `
        position: fixed;
        left: 2rem;
        top: 50%;
        transform: translateY(-50%);
        background: white;
        border-radius: 12px;
        padding: 1.5rem;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        max-width: 250px;
        max-height: 400px;
        overflow-y: auto;
        z-index: 30;
        opacity: 0;
        pointer-events: none;
        transition: all 0.3s ease;
      `;

      const tocTitle = document.createElement('h4');
      tocTitle.textContent = 'Table of Contents';
      tocTitle.style.cssText = `
        margin: 0 0 1rem 0;
        font-size: 1rem;
        font-weight: 600;
        color: #1f2937;
      `;
      toc.appendChild(tocTitle);

      const tocList = document.createElement('ul');
      tocList.style.cssText = `
        list-style: none;
        padding: 0;
        margin: 0;
      `;

      headings.forEach((heading, index) => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.textContent = heading.textContent;
        a.href = `#heading-${index}`;
        heading.id = `heading-${index}`;

        const level = parseInt(heading.tagName.replace('H', ''));
        a.style.cssText = `
          display: block;
          padding: 0.5rem 0;
          color: #6b7280;
          text-decoration: none;
          font-size: ${level === 1 ? '0.875rem' : level === 2 ? '0.8rem' : '0.75rem'};
          padding-left: ${(level - 1) * 1}rem;
          border-left: 2px solid transparent;
          transition: all 0.2s ease;
        `;

        a.addEventListener('click', (e) => {
          e.preventDefault();
          heading.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });

        a.addEventListener('mouseenter', () => {
          a.style.color = '#4f46e5';
          a.style.borderLeftColor = '#4f46e5';
          a.style.paddingLeft = `${(level - 1) * 1 + 0.5}rem`;
        });

        a.addEventListener('mouseleave', () => {
          a.style.color = '#6b7280';
          a.style.borderLeftColor = 'transparent';
          a.style.paddingLeft = `${(level - 1) * 1}rem`;
        });

        li.appendChild(a);
        tocList.appendChild(li);
      });

      toc.appendChild(tocList);
      document.body.appendChild(toc);

      // Show TOC on scroll
      const showTOC = () => {
        if (window.scrollY > 500 && window.innerWidth > 1024) {
          toc.style.opacity = '1';
          toc.style.pointerEvents = 'auto';
        } else {
          toc.style.opacity = '0';
          toc.style.pointerEvents = 'none';
        }
      };

      window.addEventListener('scroll', showTOC, { passive: true });
    };

    generateTableOfContents();

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleDotClick);
    };
  }, [content]);

  return null; // This component only adds functionality, no visual elements
}