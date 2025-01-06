import { FC, PropsWithChildren } from "react";

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return <main className="mb-[200px]">{children}</main>;
};

export default Layout;
