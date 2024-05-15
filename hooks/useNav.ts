import { useSession } from 'next-auth/react';
import { useCallback, useMemo, useState, useTransition } from 'react';

const useNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [_, startTransition] = useTransition();
  const toggleMenu = useCallback(
    () => startTransition(() => setIsMenuOpen(!isMenuOpen)),
    [isMenuOpen]
  );
  const session = useSession();

  const { navigation, userId } = useMemo(() => {
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
      session?.data?.user?.type === 'ADMIN'
        ? urlsAdmin
        : session?.data?.user?.type === 'DRIVER'
          ? urlsDriver
          : [];
    return { navigation, userId: session?.data?.user?.id };
  }, [session]);

  return {
    navigation,
    isMenuOpen,
    toggleMenu,
    userId
  };
};

export default useNav;
