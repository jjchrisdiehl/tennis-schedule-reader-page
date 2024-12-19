import React, { ReactNode } from 'react';

interface DrawerItemProps {
    children: ReactNode;  // `children` prop to accept any React component or element
}

export const DrawerItem: React.FC<DrawerItemProps> = ({ children }) => {
    return <div className="Drawer__Item">{children}</div>;
};
