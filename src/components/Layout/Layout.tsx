import { FC, PropsWithChildren } from "react";

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <main className="size-1/3 fixed bottom-[20%] left-[33%]">{children}</main>
  );
};

export default Layout;
