import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { useCallback, useMemo, useState } from 'react';

const useNav = () => {
  const { data: session } = useSession({ required: true });
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = useCallback(
    () => setIsMenuOpen(!isMenuOpen),
    [isMenuOpen]
  );

  const navigation = useMemo(() => {
    const urlsAdmin = [
      { name: 'Usuários', href: '/users' },
      { name: 'Clientes', href: '/customers' },
      { name: 'Navios', href: '/ships' },
      { name: 'Caminhões', href: '/vehicles' },
      { name: 'Dashboard', href: '/dashboard' }
    ];
    const urlsDriver = [{ name: 'Meu Turno', href: '/' }];
    switch (session?.user?.type) {
      case 'ADMIN':
        return urlsAdmin;
      case 'DRIVER':
        return urlsDriver;
      default:
        return [];
    }
  }, [session?.user?.type]);
  const response = useMemo(
    () => ({ navigation, pathname, isMenuOpen }),
    [isMenuOpen, navigation, pathname]
  );
  return { ...response, toggleMenu };
};

export default useNav;
