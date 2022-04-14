import React from "react";
import styled from "styled-components";
import { theme } from "../../styles/theme";

const Svg = styled.svg`
  cursor: pointer;
`;

interface IProps {
  children?: React.ReactNode;
  size?: string;
  onClick?: () => void;
  color?: "primary" | "white";
  saved?: boolean;
}

const SaveIcon: React.FC<IProps> = (props) => {
  return (
    <Svg
      width={props.size || "40"}
      height={props.size || "40"}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={props.onClick}
    >
      {props.saved ? (
        <>
          <circle
            cx="20"
            cy="20"
            r="19.5"
            fill="#0E5A49"
            fillOpacity="0.1"
            stroke="#0E5A49"
          />
          <path
            d="M12.0656 29.2717L12.065 29.272C11.5273 29.5726 11.1479 29.5355 10.9322 29.408C10.7154 29.2798 10.499 28.9632 10.499 28.3484V16.9884C10.499 15.5546 11.6752 14.3784 13.109 14.3784H20.889C22.3229 14.3784 23.499 15.5546 23.499 16.9884V28.3484C23.499 28.9627 23.2832 29.2761 23.0661 29.4033C22.848 29.5312 22.4645 29.5676 21.9206 29.2706L17.9936 27.0823C17.9934 27.0822 17.9931 27.0821 17.9929 27.0819C17.6939 26.9144 17.3315 26.8459 16.9978 26.8459C16.6632 26.8459 16.3004 26.9148 15.9989 27.0799L15.9989 27.0799L15.9956 27.0817L12.0656 29.2717Z"
            fill="#0E5A49"
            stroke="#0E5A49"
          />
          <path
            d="M16.8139 11.8777C17.2557 11.057 18.1228 10.4985 19.1089 10.4985H26.8889C28.3227 10.4985 29.4989 11.6747 29.4989 13.1085V24.4685C29.4989 25.0829 29.2829 25.3966 29.0667 25.5238C28.85 25.6512 28.4696 25.6875 27.9315 25.3914C27.9311 25.3911 27.9307 25.3909 27.9302 25.3906L26.004 24.3127C26.004 24.3127 26.0039 24.3127 26.0039 24.3127C26.0024 24.3119 26.0007 24.3103 25.9995 24.3082C25.9992 24.3077 25.999 24.3073 25.9989 24.307V16.9885C25.9989 14.1724 23.705 11.8785 20.8889 11.8785H16.8189C16.8166 11.8785 16.8152 11.8783 16.8139 11.8777Z"
            fill="#0E5A49"
            stroke="#0E5A49"
          />
        </>
      ) : (
        <>
          <circle
            cx="20"
            cy="20"
            r="19.5"
            fill={props.color === "primary" ? theme.colors.primary : "white"}
            fillOpacity={props.color === "primary" ? "0" : "0.3"}
            stroke={props.color === "primary" ? theme.colors.primary : "white"}
          />
          <path
            d="M24.0005 16.9884V28.3484C24.0005 29.7984 22.9605 30.4084 21.6905 29.7084L17.7605 27.5184C17.3405 27.2884 16.6605 27.2884 16.2405 27.5184L12.3105 29.7084C11.0405 30.4084 10.0005 29.7984 10.0005 28.3484V16.9884C10.0005 15.2784 11.4005 13.8784 13.1105 13.8784H20.8905C22.6005 13.8784 24.0005 15.2784 24.0005 16.9884Z"
            stroke={props.color === "primary" ? theme.colors.primary : "white"}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M30.0005 13.1085V24.4685C30.0005 25.9185 28.9605 26.5285 27.6905 25.8285L24.0005 23.7685V16.9885C24.0005 15.2785 22.6005 13.8785 20.8905 13.8785H16.0005V13.1085C16.0005 11.3985 17.4005 9.99854 19.1105 9.99854H26.8905C28.6005 9.99854 30.0005 11.3985 30.0005 13.1085Z"
            stroke={props.color === "primary" ? theme.colors.primary : "white"}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      )}
    </Svg>
  );
};

export default SaveIcon;
