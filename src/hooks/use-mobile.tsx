import { useScreenContext } from '../contexts/screen-context';

export function useIsMobile() {
  const { isMobile } = useScreenContext();
  return isMobile;
}
