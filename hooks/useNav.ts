import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

const useNav = () => {
  const { data: session } = useSession({ required: true });
  const pathname = usePathname();
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

  return { navigation, pathname };
};

export default useNav;
