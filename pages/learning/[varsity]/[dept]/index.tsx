import { LEARNING } from "../../../../shared/constants/routes";

export default function LearningHomePage() {
  return null;
}

export async function getServerSideProps() {
  return {
    redirect: {
      destination: LEARNING(),
      permanent: false,
    },
  };
}
