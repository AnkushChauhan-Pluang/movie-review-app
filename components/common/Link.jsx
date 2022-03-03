import React from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import cn from 'classnames';
import { useAuthContext } from 'contexts/AuthContext';

const Link = ({
  activeClassName = '',
  className,
  children,
  href,
  ...props
}) => {
  const { pathname } = useRouter();
  const { loginState } = useAuthContext();
  const username = loginState.user && loginState.user.username;

  let p = pathname.includes('[username]')
    ? pathname.replace('[username]', `${username}`)
    : pathname;
  const isActive = p === href && activeClassName;
  const linkClasses = cn(className, { [activeClassName]: isActive });

  return (
    <NextLink href={href}>
      <a className={linkClasses} {...props}>
        {children}
      </a>
    </NextLink>
  );
};

export default Link;
