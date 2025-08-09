import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { isAuthenticated } from '@/lib/authenticate';
import { useAtom } from 'jotai';
import { favouritesAtom, searchHistoryAtom } from '@/store';
import { getFavourites, getHistory } from '@/lib/userData';

const PUBLIC_PATHS = ['/login', '/register'];

export default function RouteGuard({ children }) {
  const router = useRouter();
  const [, setFavouritesList] = useAtom(favouritesAtom);
  const [, setSearchHistory] = useAtom(searchHistoryAtom);

  useEffect(() => {
    const hydrate = async () => {
      const isPublic = PUBLIC_PATHS.includes(router.pathname);
      if (!isPublic && !isAuthenticated()) {
        router.push('/login');
        return;
      }
      if (isAuthenticated()) {
        setFavouritesList(await getFavourites());
        setSearchHistory(await getHistory());
      } else {
        setFavouritesList(undefined);
        setSearchHistory(undefined);
      }
    };
    hydrate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.pathname]);

  return children;
}
