import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCameraRetro } from "@fortawesome/free-solid-svg-icons";

const HeaderContainer = styled.header`
  position: fixed;
  z-index: 1;
  width: 100%;
  top: 0px;
  display: flex;
  align-items: center;
  background-color: #f8f9fa;
  padding: 10px 20px;
  border-bottom: 1px solid #e0e0e0;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  margin-right: 20px;
`;

const LogoIcon = styled(FontAwesomeIcon)`
  font-size: 24px;
  color: #007bff;
  margin-right: 10px;
`;

const Title = styled.h1`
  font-size: 18px;
  margin: 0;
  color: #343a40;
`;

const Breadcrumb = styled.div`
  display: flex;
  cursor: pointer;
  align-items: center;
  font-size: 16px;
  color: #495057;
`;

const BreadcrumbItem = styled.span`
  margin-right: 10px;
`;

const Divider = styled.span`
  margin: 0 5px;
  color: #adb5bd;
`;

function Header() {
  const location = useLocation();
  const pathParts = location.pathname.split("/").filter((part) => part);
  const navigate = useNavigate();
  const albumId = pathParts[1];
  const photoId = pathParts[2];

  return (
    <HeaderContainer>
      <Logo>
        <LogoIcon icon={faCameraRetro} />
        <Title>Photo Gallery</Title>
      </Logo>
      <Breadcrumb>
        <BreadcrumbItem onClick={() => navigate(`/albums`)}>
          Albums
        </BreadcrumbItem>
        <Divider>/</Divider>
        {albumId && (
          <>
            <BreadcrumbItem onClick={() => navigate(`/albums/${albumId}`)}>
              {albumId ? `Album ${albumId}` : "Album"}
            </BreadcrumbItem>
            <Divider>/</Divider>
          </>
        )}
        {photoId && (
          <BreadcrumbItem>
            {photoId ? `Photo ${photoId}` : "Photo"}
          </BreadcrumbItem>
        )}
      </Breadcrumb>
    </HeaderContainer>
  );
}

export default Header;
