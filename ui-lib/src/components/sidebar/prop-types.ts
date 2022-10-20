import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

type MenuItem = {
  key: string;
  title: string;
  icon?:  IconDefinition;
  to: string;
  isExternal?: boolean;
  selected: boolean;
  isRoot?: boolean;
}

type SidebarItemProps = {
  item: MenuItem;
  onClick: (item: MenuItem) => void
}

type SidebarProps = {
  items: Array<MenuItem>,
  subTitle: string;
}

export type { MenuItem };
export type { SidebarItemProps };
export type { SidebarProps };