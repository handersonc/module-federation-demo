import { ReactElement } from 'react';
import { faHomeAlt, faFileLines } from '@fortawesome/free-solid-svg-icons'


import Sidebar from 'components/sidebar/sidebar';
import { MenuItem } from 'components/sidebar/prop-types';


const MainLayout = ({ children }: { children: ReactElement }) => {

  const items: Array<MenuItem> = [{
    icon:  faHomeAlt,
    title: 'Home',
    key: 'home',
    selected: false,
    to: '/home'
  },{
    icon: faFileLines,
    title: 'Reports',
    key: 'reports',
    selected: false,
    to: '/reports/home'
  }];
  return (
    <div className='sumadi'>
      <main>
        <Sidebar items={items} subTitle='Version 2.2.1' />
        <section className='container--main'>{children}</section>
      </main>
    </div>
  )
};

export default MainLayout;