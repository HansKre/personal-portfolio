import React from 'react';
import { CSSTransition } from 'react-transition-group';

import TopBar from './components/TopBar';
import FooterMenu from './components/FooterMenu';
import Content from './components/Content';
import Sidebar from './components/Sidebar';

import './css/responsive-animations.css';

const App = () => {

  const [windowDimensions, setWindowDimensions] = React.useState({
    windowWidth: 0,
    windowHeight: 0
  });

  const updateDimensions = () => {
    let windowWidth = typeof window !== 'undefined' ? window.innerWidth : 0;
    let windowHeight = typeof window !== 'undefined' ? window.innerHeight : 0;
    setWindowDimensions({ windowWidth, windowHeight });
  }

  React.useEffect(() => {
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return function cleanup() {
      window.removeEventListener('resize');
    }
  }, []);

  const sidebarCollapsed = windowDimensions.windowWidth < 1100;
  const styles = {
    white: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    black: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    topBarHeight: 40,
    footerMenuHeight: 50,
    showFooterMenuText: windowDimensions.windowWidth > 500,
    showSidebar: windowDimensions.windowWidth > 768,
    sidebarCollapsed,
    sidebarWidth: sidebarCollapsed ? 50 : 150,
  };

  const menuItems = [
    { icon: `😀`, text: 'Item 1' },
    { icon: `😉`, text: 'Item 2' },
    { icon: `😎`, text: 'Item 3' },
    { icon: `🤔`, text: 'Item 4' },
    { icon: `😛`, text: 'Item 5' }
  ];

  /* we don't have to remove these items from the
  menuItems array because the menuItems array gets
  re-initialized every time the App-function is called,
  which is when the component is mounted, i.e. useEffect
  is executed and later, when state is updated. */
  if (styles.showSidebar) {
    menuItems.push({ icon: `😺️`, text: "Profile" });
    menuItems.push({ icon: `⚙`, text: "Settings" });
  }

  /* It turns out that we cannot work with react-reveal and
  position: fixed;
  The reason is that the animation component from react-reaveal,
  like <Reveal>...</Reveal> are wrapping the content to animate in
  an own div. This causes the position:fixed; to break as in:
  they disappear out of the screen on scrolling.
  Hence, we are using react-transition-group with the position:fixed;
  components, and the lot more convenient react-reveal for the rest.
  */
  return (
    <div
      style={{
        backgroundColor: styles.black(0.05),
        minHeight: '100vh',
        position: 'relative'
      }}
    >
      {/* CSSTransition's 'in=' property will take care of
      the decision whether or not to display the component at all.
      But with the 'appear' property, the component is rendered
      on first load and then removed immediately. That's not nice.*/}
      {styles.showSidebar &&
        <CSSTransition
          in={styles.showSidebar}
          timeout={300}
          classNames="responsive"
          unmountOnExit
          appear
        >
          <Sidebar menuItems={menuItems} styles={styles} />
        </CSSTransition>}
      {!styles.showSidebar &&
        <CSSTransition
          in={!styles.showSidebar}
          timeout={300}
          classNames="responsive"
          unmountOnExit
          appear
        >
          <TopBar styles={styles} />
        </CSSTransition>}
      <CSSTransition
        in={true}
        timeout={300}
        classNames="responsive"
        unmountOnExit
        appear
      >
        <Content styles={styles} />
      </CSSTransition>
      {!styles.showSidebar &&
        <CSSTransition
          in={!styles.showSidebar}
          timeout={300}
          classNames="responsive"
          unmountOnExit
          appear
        >
          <FooterMenu key='footerMenu' menuItems={menuItems} styles={styles} />
        </CSSTransition>}
    </div>
  );
};

export default App;