import { Role } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { useCallback, useMemo, useState, useTransition } from 'react';

const urlsAdmin = [
  { name: 'Usuários', href: '/users', key: 0 },
  { name: 'Clientes', href: '/customers', key: 1 },
  { name: 'Navios', href: '/ships', key: 2 },
  { name: 'Caminhões', href: '/vehicles', key: 3 },
  {
    name: 'Dashboard',
    href: '/dashboard',
    items: [
      { name: 'Grafícos', href: '/dashboard', key: 5 },
      { name: 'Relatórios', href: '/dashboard/reports', key: 6 }
    ],
    key: 4
  }
];
const urlsDriver = [{ name: 'Meu Turno', href: '/', key: 0 }];

const getNavigation = (role: Role) => {
  switch (role) {
    case Role.ADMIN:
      return urlsAdmin;
    case Role.DRIVER:
      return urlsDriver;
    default:
      return [];
  }
};
const useNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [_, startTransition] = useTransition();
  const toggleMenu = useCallback(
    () => startTransition(() => setIsMenuOpen(!isMenuOpen)),
    [isMenuOpen]
  );
  const session = useSession();

  const { navigation, userId, role } = useMemo(() => {
    const role = session?.data?.user?.type;
    const navigation = getNavigation(role);

    return {
      navigation,
      userId: session?.data?.user?.id,
      role
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
