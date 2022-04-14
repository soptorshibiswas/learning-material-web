import React from "react";
import Link from "next/link";
import { TopHeaderBG, TopHeader, Logo } from "./components";

const HeaderTop: React.FC = () => (
  <TopHeaderBG>
    <TopHeader>
      <Link href="/">
        <a>
          <Logo src={"/images/logo.jpg"} alt="learning material" />
        </a>
      </Link>
    </TopHeader>
  </TopHeaderBG>
);

export default HeaderTop;
