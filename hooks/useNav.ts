import { Role } from '@prisma/client';
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

  const { navigation, userId, role } = useMemo(() => {
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
      session?.data?.user?.type === Role.ADMIN
        ? urlsAdmin
        : session?.data?.user?.type === Role.DRIVER
          ? urlsDriver
          : [];
    return {
      navigation,
      userId: session?.data?.user?.id,
      role: session?.data?.user?.type
    };
  }, [session]);

  return {
    navigation,
    isMenuOpen,
    toggleMenu,
    userId,
    role
  };
};

export default useNav;
