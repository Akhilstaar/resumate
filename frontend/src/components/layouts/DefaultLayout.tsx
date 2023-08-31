import React, { ReactNode } from "react";
import Footer from "@/components/modules/Footer";
import Header from "@/components/modules/Header";

interface DefaultLayoutProps {
  children: ReactNode;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow">{children}</div>
      <Footer />
    </div>
  );
};

export default DefaultLayout;
