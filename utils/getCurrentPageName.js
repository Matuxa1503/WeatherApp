import { useRouter } from 'next/router';

export const getCurrentPageName = () => {
  const router = useRouter();
  const currentRoute = router.pathname;
  const page = currentRoute === '/' ? 'rootPage' : 'moreInfoPage';
  return page;
};
