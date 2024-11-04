import MainWrapper from "@components/common/MainWrapper";
import { Outlet } from "react-router-dom";
import LiveDataOverview from "./Overview";
import LiveDataClaims from "./Claims";

export default function LiveDataPage() {
  return (
    <MainWrapper title='Live Data'>
      <Outlet />
    </MainWrapper>
  )
}

export {
  LiveDataOverview,
  LiveDataClaims,
};