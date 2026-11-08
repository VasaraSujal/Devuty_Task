/**
 * Social sharing component for article pages
 */

import * as React from 'react';
import { cn } from '@/lib/utils';

interface SocialShareProps {
  url: string;
  title: string;
  className?: string;
}

export function SocialShare({ url, title, className }: SocialShareProps) {
  const shareData = {
    title,
    text: `Check out this article: ${title}`,
    url,
  };

  const handleShare = async (platform: 'twitter' | 'linkedin' | 'facebook' | 'email' | 'clipboard') => {
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);

    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`, '_blank', 'width=500,height=500');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`, '_blank', 'width=500,height=500');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, '_blank', 'width=500,height=500');
        break;
      case 'email':
        window.open(`mailto:?subject=${encodedTitle}&body=${encodedTitle}%0A%0A${encodedUrl}`, '_blank');
        break;
      case 'clipboard':
        navigator.clipboard.writeText(url);
        break;
    }
  };

  const socialPlatforms = [
    { icon: '🐦', label: 'Twitter', onClick: () => handleShare('twitter') },
    { icon: '👔', label: 'LinkedIn', onClick: () => handleShare('linkedin') },
    { icon: '📘', label: 'Facebook', onClick: () => handleShare('facebook') },
    { icon: '📧', label: 'Email', onClick: () => handleShare('email') },
    { icon: '📋', label: 'Copy Link', onClick: () => handleShare('clipboard') },
  ];

  return (
    <div className={cn('flex gap-2 flex-wrap', className)}>
      {socialPlatforms.map((platform) => (
        <button
          key={platform.label}
          onClick={platform.onClick}
          className="flex items-center gap-2 px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-all"
          aria-label={`Share on ${platform.label}`}
        >
          <span aria-hidden="true">{platform.icon}</span>
          <span>{platform.label}</span>
        </button>
      ))}
    </div>
  );
}