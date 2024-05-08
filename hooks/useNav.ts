import { useSession } from 'next-auth/react';
import { useCallback, useMemo, useState, useTransition } from 'react';

const useNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [_, startTransition] = useTransition();
  const toggleMenu = useCallback(
    () => startTransition(() => setIsMenuOpen(!isMenuOpen)),
    [isMenuOpen]
  );
  const { data } = useSession();

  const navigation = useMemo(() => {
    const urlsAdmin = [
      { name: 'Usuários', href: '/users' },
      { name: 'Clientes', href: '/customers' },
      { name: 'Navios', href: '/ships' },
      { name: 'Caminhões', href: '/vehicles' },
      {
        name: 'Dashboard',
        href: '/dashboard',
        items: [
          { name: 'Grafícos', href: '/dashboard' },
          { name: 'Relatórios', href: '/dashboard/reports' }
        ]
      }
    ];
    const urlsDriver = [{ name: 'Meu Turno', href: '/' }];
    const navigation =
      data?.user?.type === 'ADMIN'
        ? urlsAdmin
        : data?.user?.type === 'DRIVER'
          ? urlsDriver
          : [];
    return navigation;
  }, [data?.user?.type]);

  return { navigation, isMenuOpen, toggleMenu };
};

export default useNav;
