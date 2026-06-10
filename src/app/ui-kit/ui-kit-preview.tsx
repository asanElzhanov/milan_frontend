'use client';

import { Heart, Search, ShoppingBag } from 'lucide-react';
import { useState } from 'react';

import {
  Alert,
  Badge,
  Breadcrumbs,
  Button,
  Checkbox,
  Container,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Drawer,
  DrawerContent,
  DrawerTrigger,
  EmptyState,
  Input,
  Modal,
  Pagination,
  Price,
  Radio,
  SectionTitle,
  Select,
  Skeleton,
  Tabs,
  Textarea,
} from '@/shared/ui';

const selectOptions = [
  { value: 'almaty', label: 'Almaty' },
  { value: 'astana', label: 'Astana' },
  { value: 'shymkent', label: 'Shymkent', disabled: true },
];

const radioOptions = [
  { value: 'pickup', label: 'Pickup', description: 'Collect from boutique.' },
  { value: 'courier', label: 'Courier', description: 'Delivery to address.' },
];

export function UiKitPreview() {
  const [checked, setChecked] = useState(false);
  const [page, setPage] = useState(2);
  const [radio, setRadio] = useState('pickup');
  const [select, setSelect] = useState('almaty');

  return (
    <main className="min-h-screen bg-sara-white py-12 text-sara-graphite">
      <Container className="space-y-12">
        <SectionTitle
          eyebrow="Shared UI"
          title="Sara Milan UI Kit"
          description="Technical preview of reusable primitives. This is not a production storefront page."
          action={<Button variant="outline">Action</Button>}
        />

        <section className="sara-card space-y-6 p-6">
          <SectionTitle title="Buttons and badges" align="left" />
          <div className="flex flex-wrap gap-3">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
            <Button loading>Loading</Button>
            <Button size="icon" aria-label="Wishlist">
              <Heart aria-hidden className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge>Default</Badge>
            <Badge variant="bronze">New</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="danger">Danger</Badge>
            <Badge variant="muted">Muted</Badge>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="sara-card space-y-5 p-6">
            <SectionTitle title="Form controls" />
            <Input
              hint="Standard input with icon support."
              label="Search"
              leftIcon={<Search aria-hidden className="h-4 w-4" />}
              placeholder="Search collection"
            />
            <Input
              error="Example validation message."
              label="Email"
              placeholder="name@example.com"
              required
            />
            <Textarea
              hint="Textarea supports resize options."
              label="Comment"
              placeholder="Write a note"
            />
            <Select
              hint="Radix Select primitive."
              label="City"
              onValueChange={setSelect}
              options={selectOptions}
              value={select}
            />
            <Checkbox
              checked={checked}
              description="Temporary UI state for preview only."
              label="Receive updates"
              onCheckedChange={setChecked}
            />
            <Radio
              hint="Future checkout can reuse this primitive."
              label="Delivery method"
              onValueChange={setRadio}
              options={radioOptions}
              value={radio}
            />
          </div>

          <div className="sara-card space-y-5 p-6">
            <SectionTitle title="Feedback and content" />
            <Alert title="Information">Reusable alert with accessible status role.</Alert>
            <Alert title="Success" variant="success">
              Operation completed.
            </Alert>
            <Alert title="Warning" variant="warning">
              Check details before continuing.
            </Alert>
            <Alert title="Danger" variant="danger">
              Destructive action preview.
            </Alert>
            <EmptyState
              action={<Button variant="outline">Explore</Button>}
              description="Used later for cart, catalog, orders, and account empty states."
              icon={<ShoppingBag aria-hidden className="h-8 w-8" />}
              title="Nothing here yet"
            />
          </div>
        </section>

        <section className="sara-card space-y-6 p-6">
          <SectionTitle title="Navigation and overlays" />
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'UI Kit', href: '/ui-kit' },
              { label: 'Preview' },
            ]}
          />
          <Tabs
            tabs={[
              {
                value: 'first',
                label: 'First',
                content: <p className="text-body">First tab content.</p>,
              },
              {
                value: 'second',
                label: 'Second',
                content: <p className="text-body">Second tab content.</p>,
              },
            ]}
          />
          <div className="flex flex-wrap gap-3">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Open dialog</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Dialog title</DialogTitle>
                  <DialogDescription>
                    Composable Radix dialog styled for Sara Milan.
                  </DialogDescription>
                </DialogHeader>
                <p className="mt-6 text-sm text-sara-graphite/70">Dialog content preview.</p>
                <DialogFooter>
                  <Button>Confirm</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Modal
              description="Simple modal wrapper around Dialog primitives."
              title="Modal title"
              trigger={<Button variant="secondary">Open modal</Button>}
            >
              <p className="text-sm text-sara-graphite/70">Modal body preview.</p>
            </Modal>

            <Drawer>
              <DrawerTrigger asChild>
                <Button variant="ghost">Open drawer</Button>
              </DrawerTrigger>
              <DrawerContent side="right">
                <div className="space-y-4 pr-8">
                  <h2 className="font-fashion text-3xl text-sara-black">Drawer</h2>
                  <p className="text-sm leading-6 text-sara-graphite/70">
                    Drawer primitive for future mobile filters, search, and cart menus.
                  </p>
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        </section>

        <section className="sara-card space-y-6 p-6">
          <SectionTitle title="Loading, price, pagination" />
          <div className="grid gap-4 sm:grid-cols-3">
            <Skeleton variant="card" />
            <div className="space-y-3">
              <Skeleton variant="text" />
              <Skeleton variant="text" className="w-3/4" />
              <Skeleton variant="circle" />
            </div>
            <div className="space-y-4">
              <Price oldValue={32900} size="lg" value={25900} />
              <Pagination onPageChange={setPage} page={page} totalPages={5} />
            </div>
          </div>
        </section>
      </Container>
    </main>
  );
}
