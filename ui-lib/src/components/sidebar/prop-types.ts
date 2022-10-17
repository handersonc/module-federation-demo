import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

export type MenuItem = {
  key: string;
  title: string;
  icon?:  IconDefinition;
  to: string;
  isExternal?: boolean;
  selected: boolean;
  isRoot?: boolean;
}

export type SidebarItemProps = {
  item: MenuItem;
  onClick: (item: MenuItem) => void
}

type SidebarProps = {
  items: Array<MenuItem>,
  subTitle: string;
}

export default SidebarProps