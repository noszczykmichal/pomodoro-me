import { FC, PropsWithChildren } from "react";

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <main className="size-1/2 fixed bottom-[10%] left-[25%]">{children}</main>
  );
};

export default Layout;
