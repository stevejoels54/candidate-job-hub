import React from "react";
import { Layout, theme, Avatar } from "antd";
import { FaBriefcase } from "react-icons/fa";

const { Header, Content, Footer } = Layout;

// interface for layout component props
interface IAppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<IAppLayoutProps> = ({
  children,
}: IAppLayoutProps) => {
  const {
    token: { colorBgContainer, borderRadiusLG, colorPrimary },
  } = theme.useToken();

  return (
    <Layout>
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
          display: "flex",
          alignItems: "center",
          background: colorBgContainer,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            padding: "0 24px",
            height: "100%",
          }}
        >
          <Avatar
            size={55}
            icon={<FaBriefcase />}
            style={{ marginRight: 16, backgroundColor: colorPrimary }}
          />
          <h2 style={{ textAlign: "center" }}>Candidate Job Hub</h2>
        </div>
      </Header>
      <Content style={{ padding: "0 24px", paddingTop: "24px" }}>
        <div
          style={{
            padding: 24,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            minHeight: "80vh",
            overflow: "hidden",
          }}
        >
          {children}
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Candidate Job Hub ©{new Date().getFullYear()} Created by Joel Steven
        Ssekyewa
      </Footer>
    </Layout>
  );
};

export default AppLayout;
