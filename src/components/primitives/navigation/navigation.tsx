import * as React from 'react';

/* -------------------------------------------------------------------------------------------------
 * Navigation
 * -----------------------------------------------------------------------------------------------*/

const NAVIGATION_NAME = 'Navigation';

const NAV: React.ElementType = 'nav';
type NavElement = React.ElementRef<typeof NAV>;
type NativenNavProps = React.ComponentPropsWithoutRef<typeof NAV>;

interface NavProps extends NativenNavProps {}

const Nav = React.forwardRef<NavElement, NavProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <nav className={className} ref={ref} {...props}>
        {children}
      </nav>
    );
  },
);

Nav.displayName = NAVIGATION_NAME;

/* -------------------------------------------------------------------------------------------------
 * Group
 * -----------------------------------------------------------------------------------------------*/

const GroupElement: React.ElementType = 'div';
type NavGroupElement = React.ElementRef<typeof GroupElement>;
type NativeNavGroupProps = React.ComponentPropsWithoutRef<typeof GroupElement>;

interface NavGroupProps extends NativeNavGroupProps {}

const GroupComponent = React.forwardRef<NavGroupElement, NavGroupProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div ref={ref} className={className} {...props}>
        {children}
      </div>
    );
  },
);

const Root = Nav;
const Group = GroupComponent;
export { Root, Nav, Group, GroupComponent };
export type { NavProps };
