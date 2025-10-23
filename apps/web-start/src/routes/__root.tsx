/// <reference types="vite/client" />
import type { ReactNode } from 'react';
import {
  Link,
  Outlet,
  createRootRouteWithContext,
  HeadContent,
  Scripts,
} from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import { TanStackDevtools } from '@tanstack/react-devtools';
import TanStackQueryDevtools from '../integrations/devtools';
import appCss from '../styles.css?url';
import type { QueryClient } from '@tanstack/react-query';

export interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'TanStack Start Starter',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),

  component: RootComponent,
  shellComponent: RootDocument,
});

function RootComponent() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sticky Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-6 flex flex-col sticky top-0 h-screen">
        <h2 className="text-2xl font-bold mb-8">📚 Course Manager</h2>
        
        <nav className="flex flex-col gap-2">
          <Link
            to="/"
            className="px-4 py-3 rounded-lg hover:bg-gray-700 transition flex items-center gap-3"
            activeProps={{ className: 'bg-gray-700' }}
          >
            🏠 Home
          </Link>
          
          <Link
            to="/courses"
            className="px-4 py-3 rounded-lg hover:bg-gray-700 transition flex items-center gap-3"
            activeProps={{ className: 'bg-gray-700' }}
          >
            📘 Courses
          </Link>
          
          <Link
            to="/account"
            className="px-4 py-3 rounded-lg hover:bg-gray-700 transition flex items-center gap-3"
            activeProps={{ className: 'bg-gray-700' }}
          >
            👤 Users
          </Link>
        </nav>
      </aside>

      {/* Main Content - Scrollable */}
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
            TanStackQueryDevtools,
          ]}
        />
        <Scripts />
      </body>
    </html>
  );
}