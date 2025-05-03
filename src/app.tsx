import { createRouter, RouterProvider } from '@tanstack/react-router';

import { routeTree } from './routeTree.gen';

const router = createRouter({ routeTree, defaultPreload: 'intent' });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const App = () => {
  return (
    <>
      <div className="fixed top-0 right-0 left-0 z-50 bg-blue-500 p-4 text-sm text-white">
        <p>
          GIST 메일로 로그인 서비스의 점검이 진행중입니다.
          <br />
          점검 중에는 로그인 및 인증 서비스의 사용이 제한될 수 있습니다.
          <br />
          (예상 점검 시간: 2025.05.04 00:00 ~ 04:00)
        </p>
      </div>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
