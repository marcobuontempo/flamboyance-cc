import MainWrapper from "@components/common/MainWrapper";
import { Outlet } from "react-router-dom";
import LiveDataOverview from "./Overview";
import LiveDataClaims from "./Claims";

export default function LiveDataPage() {
  return (
    <MainWrapper
      title='Live Data'
      baseURL='live-data'
      redirectURL='overview'
    >
      <Outlet />
    </MainWrapper>
  )
}

export {
  LiveDataOverview,
  LiveDataClaims,
};