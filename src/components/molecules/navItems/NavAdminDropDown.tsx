import React from "react";
import { Dropdown, Avatar } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { Text1, Text4 } from "../../atoms/texts/Text";
import { IconMenuItem, StyledMenu } from "../../organisms/header/components";
import { Divider } from "../../atoms/display";
import LogOutIcon from "../../../assets/icons/LogOutIcon";
import { Gap } from "../../atoms/spaces";
import Loading from "../../atoms/display/Loading";

const MenuStyled = styled(StyledMenu)`
  box-shadow: ${({ theme }) => theme.colors.cardShadow};
`;

const MyAnchor = styled.a`
  display: flex;
  align-items: center;
  height: 4rem;
`;

const DownIcon = styled(CaretDownOutlined)`
  color: ${({ theme }) => theme.colors.black};
  padding: 0 5px;
`;

export const UserAvatar = styled(Avatar)`
  border: 1px solid ${({ theme }) => theme.colors.body};
`;

export const PrimaryUserAvatar = styled(UserAvatar)`
  border-color: ${({ theme }) => theme.colors.primary};
`;

const SmallLoading = styled(Loading)`
  padding: 0 7px 0 0;
  width: 20px;
`;

interface IProps {
  name?: string;
  image?: string;
  loading?: boolean;
  onLogout?: () => void;
}

const NavAdminDropdown: React.FC<IProps> = (props) => {
  const { name, image, loading, onLogout } = props;

  const handleClick = (e: any) => {
    if (e.key === "2") {
      if (onLogout) {
        onLogout();
      }
    }
  };

  const menu = (
    <MenuStyled onClick={handleClick}>
      <IconMenuItem key="1">
        <Text4>Welcome</Text4>
      </IconMenuItem>
      <Divider type="horizontal" />
      <IconMenuItem key="2" icon={loading ? <SmallLoading /> : <LogOutIcon />}>
        <Text1>Logout</Text1>
      </IconMenuItem>
    </MenuStyled>
  );

  return (
    <Dropdown overlay={menu} trigger={["hover"]} placement="bottomRight">
      <MyAnchor>
        <UserAvatar shape={"circle"} src={image} />
        <Gap width="0.5rem" />
        <Text1 level={1} color="textPrimary">
          {name}
        </Text1>
        <Gap width="0.5rem" />
        <DownIcon />
      </MyAnchor>
    </Dropdown>
  );
};

export default NavAdminDropdown;
