import * as React from 'react';
import NextLink from 'next/link';
/* -------------------------------------------------------------------------------------------------
 * Menu
 * -----------------------------------------------------------------------------------------------*/

const DIV: React.ElementType = 'div';
type MenuElement = React.ElementRef<typeof DIV>;
type NativeMarkMenuProps = React.ComponentPropsWithoutRef<typeof DIV>;

interface MenuProps extends NativeMarkMenuProps {}

const Menu = React.forwardRef<MenuElement, MenuProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div ref={ref} className={className} {...props}>
        {children}
      </div>
    );
  }
);

/* -------------------------------------------------------------------------------------------------
 * Link
 * -----------------------------------------------------------------------------------------------*/
type LinkElement = React.ElementRef<typeof NextLink>;
type NativeMarkLinkProps = React.ComponentPropsWithoutRef<typeof NextLink>;

interface LinkComponentProps extends NativeMarkLinkProps {}

const LinkComponent = React.forwardRef<LinkElement, LinkComponentProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <NextLink ref={ref} className={className} tabIndex="-1" {...props}>
        {children}
      </NextLink>
    );
  }
);

const Root = Menu;
const Link = LinkComponent;

export { Root, Link, LinkComponent, Menu };
export type { MenuProps, LinkComponentProps };
