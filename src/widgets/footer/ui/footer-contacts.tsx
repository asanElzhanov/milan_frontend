'use client';

import { useStaticPageQuery } from '@/entities/static-page';
import type { AppLocale } from '@/shared/config';

type FooterContactsProps = {
  fallbackTitle: string;
  locale: AppLocale;
};

const getContactHref = (title: string, content: string): string | null => {
  const normalizedTitle = title.toLocaleLowerCase();
  const value = content.trim();

  if (normalizedTitle.includes('whatsapp')) {
    const digits = value.replace(/\D/g, '');

    return digits ? `https://wa.me/${digits}` : null;
  }

  if (normalizedTitle.includes('телефон') || normalizedTitle.includes('phone')) {
    const digits = value.replace(/\D/g, '');

    return digits ? `tel:+${digits}` : null;
  }

  if (normalizedTitle.includes('email') || normalizedTitle.includes('e-mail')) {
    return value ? `mailto:${value}` : null;
  }

  return null;
};

export function FooterContacts({ fallbackTitle, locale }: FooterContactsProps) {
  const { data: page } = useStaticPageQuery('contacts', locale);

  return (
    <div>
      <h2 className="text-overline mb-5 text-sara-beige">{page?.title || fallbackTitle}</h2>
      {page?.blocks.length ? (
        <div className="space-y-3 text-sm text-sara-beige/75">
          {page.blocks.map((block) => {
            const href = getContactHref(block.title, block.content);
            const content = (
              <>
                {block.title}: <span className="whitespace-pre-line">{block.content}</span>
              </>
            );

            return href ? (
              <p key={block.id}>
                <a className="hover:text-sara-white" href={href}>
                  {content}
                </a>
              </p>
            ) : (
              <p key={block.id}>{content}</p>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
