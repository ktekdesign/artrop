import { User } from 'next-auth';
import { usePathname } from 'next/navigation';
import { useCallback, useMemo, useState } from 'react';

const useNav = ({ user }: { user?: User }) => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = useCallback(
    () => setIsMenuOpen(!isMenuOpen),
    [isMenuOpen]
  );

  const { navigation } = useMemo(() => {
    const urlsAdmin = [
      { name: 'Usuários', href: '/users' },
      { name: 'Clientes', href: '/customers' },
      { name: 'Navios', href: '/ships' },
      { name: 'Caminhões', href: '/vehicles' },
      { name: 'Dashboard', href: '/dashboard' }
    ];
    const urlsDriver = [{ name: 'Meu Turno', href: '/' }];
    const navigation =
      user?.type === 'ADMIN'
        ? urlsAdmin
        : user?.type === 'DRIVER'
          ? urlsDriver
          : [];
    return { navigation };
  }, [user?.type]);

  return { navigation, pathname, isMenuOpen, toggleMenu };
};

export default useNav;
