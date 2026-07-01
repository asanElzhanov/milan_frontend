import Link from 'next/link';

import { DEFAULT_LOCALE, localizedRoutes } from '@/shared/config';
import { Button, Container } from '@/shared/ui';

export default function GlobalNotFound() {
  return (
    <main className="bg-sara-beige/30">
      <Container className="flex min-h-screen items-center justify-center py-16">
        <section className="max-w-2xl space-y-6 text-center">
          <p className="text-overline text-sara-bronze">404</p>
          <h1 className="font-serif text-4xl text-sara-graphite md:text-6xl">
            Страница не найдена
          </h1>
          <p className="text-body text-sara-graphite/70">
            Возможно, ссылка устарела или страница была перемещена.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild>
              <Link href={localizedRoutes.home(DEFAULT_LOCALE)}>На главную</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href={localizedRoutes.catalog(DEFAULT_LOCALE)}>В каталог</Link>
            </Button>
          </div>
        </section>
      </Container>
    </main>
  );
}
