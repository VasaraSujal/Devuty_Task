'use client';

import * as React from 'react';

type ToastProps = {
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  variant?: 'default' | 'destructive';
};

let toastCounter = 0;

function generateId() {
  return `toast-${toastCounter++}`;
}

export function toast(props: ToastProps) {
  const { title, description, action, variant = 'default' } = props;
  const id = generateId();

  const toastNode = document.createElement('div');
  toastNode.id = id;

  const container = document.getElementById('toast-container') || (() => {
    const c = document.createElement('div');
    c.id = 'toast-container';
    c.className = 'fixed top-4 right-4 z-50 flex flex-col gap-2';
    document.body.appendChild(c);
    return c;
  })();

  const toastEl = document.createElement('div');
  toastEl.className = `rounded-md border bg-background p-4 shadow-lg animate-slide-in`;
  if (variant === 'destructive') {
    toastEl.classList.add('border-destructive', 'bg-destructive', 'text-destructive-foreground');
  } else {
    toastEl.classList.add('border-border');
  }

  let html = `
    <div class="flex flex-col gap-1">
      <div class="font-semibold">${title || ''}</div>
      ${description ? `<div class="text-sm text-muted-foreground">${description}</div>` : ''}
    </div>
  `;

  if (action) {
    html += `<div class="mt-2">${action}</div>`;
  }

  toastEl.innerHTML = html;
  container.appendChild(toastEl);

  setTimeout(() => {
    toastEl.classList.add('fade-out');
    setTimeout(() => {
      if (toastEl.parentNode) {
        toastEl.parentNode.removeChild(toastEl);
      }
    }, 300);
  }, 5000);

  return { id };
}

export function useToast() {
  return { toast };
}