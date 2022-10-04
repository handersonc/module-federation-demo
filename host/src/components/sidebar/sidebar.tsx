import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import useAuthentication from 'hooks/use-authentication';

import SumadiLogo from 'assets/images/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SidebarProps, { MenuItem, SidebarItemProps } from './prop-types';
import Button from 'components/button/button';
import useSidebar from './use-sidebar';

const ExamsSideBar = ({ items, subTitle }: SidebarProps) => {

  const { state: sidebarState, setSelectedItem } = useSidebar(items);

  const [selectedMenu, setSelectedMenu] = useState<string>('home');

  useEffect(() => {
    const path = location.pathname;

    if (path.includes('home')) {
      setSelectedMenu('home');
    }

    if (path.includes('users')) {
      setSelectedMenu('users');
    }

    if (path.includes('courses')) {
      setSelectedMenu('courses');
    }

    if (path.includes('sections')) {
      setSelectedMenu('sections');
    }

  }, [location])

  // const getInitials = (): string => {
  //   const initials = name.split(' ').reduce((response, word) => response += word.slice(0, 1), '');
  //   return initials;
  // }

  const getCurrentYear = (): number => {
    return new Date().getFullYear();
  }

  const SidebarItem = ({item}: SidebarItemProps) => {
    return (<li>
      item.isExternal ? <a className={item.selected ? 'nav--sidebar__item nav--sidebar__item--selected' : 'nav--sidebar__item'} href={item.to}>
        <FontAwesomeIcon icon={item.icon} />
        <span>{item.title}</span>
      </a> :

      <Link className={item.selected ? 'nav--sidebar__item nav--sidebar__item--selected' : 'nav--sidebar__item'} to={item.to}>
        <FontAwesomeIcon icon={item.icon} />
        <span>{item.title}</span>
      </Link>
    </li>
    );
  }

  const handleOnClick = (item: MenuItem) => {
    console.log('item', item);
  }

  return (
    <aside className='sidebar'>
      <div className='sidebar__header'>
        <Link to="/exams/home">
          <img className='sidebar__logo' src={SumadiLogo} alt='Sumadi Logo' />
        </Link>
        <span className='sidebar__version'>{subTitle}</span>
      </div>
      <ul className='nav--sidebar'>
        <span className='subtitle'>{subTitle}</span>
        {
          items.map(item => <SidebarItem item={item} onClick={handleOnClick} />)
        }

        
        {/* </li> */}
        {/* {
          <li>
            <a className={selectedMenu === 'admin' ? 'nav--sidebar__item nav--sidebar__item--selected' : 'nav--sidebar__item'} href={`${process.env.REACT_APP_FACULTY_FRONTEND_URL}/exams/home`}>
            <FontAwesomeIcon icon={faDashboard}/>
              <span>{t('SIDEBAR.COURSE_ADMIN')}</span>
            </a>
          </li>
        } */}
      </ul>
      <div className='sidebar__footer'>
        {/* <div className='avatar avatar--sidebar'>
          <div className='avatar__initials'>
            <span>{getInitials()}</span>
          </div>
          <span className='avatar__name'>{name}</span>
        </div>
        <Button icon={faSignOutAlt} title={t('SIDEBAR.EXIT')} onClick={() => logout(() => {navigate('/exams/login')})}></Button>
        <span className='sidebar__copyright'>
          © {getCurrentYear()} Sumadi Global BV
        </span>
        <a href='http://www.sumadi.net' target='_blank' rel="noreferrer">
          {t('SIDEBAR.ABOUT_SUMADI')}
        </a> */}
      </div>
    </aside>
  );
};

export default ExamsSideBar;