import { ReactElement } from 'react';

import Sidebar from 'components/sidebar/sidebar';

const MainLayout = ({ children }: { children: ReactElement }) => {
  return (
    <div className='sumadi'>
      <main>
        <Sidebar items={[]} subTitle='Version 2.2.1' />
        <section className='container--main'>{children}</section>
      </main>
    </div>
  )
};

export default MainLayout;