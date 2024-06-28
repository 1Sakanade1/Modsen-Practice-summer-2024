
import MapComp from "../components/MapComp"
import SidePanel from "../components/SidePanel"
import styled from 'styled-components';
import UserGeolocation from '../components/UserGeolocation';

const MainPageContainer = styled.div`
display: flex;
`;

const SidePanelContainer = styled.div`
height: 100vh; 
flex: 0 0 40px; 
`;

const MapContainer = styled.div`
flex: 1; 
`;

const MainPage = () => {
    return (
      <MainPageContainer>
        <SidePanelContainer>
          <SidePanel />
        </SidePanelContainer>
        <MapContainer>
          <MapComp />
        </MapContainer>
        <UserGeolocation></UserGeolocation>
      </MainPageContainer>
    );
  };
  

  
  export default MainPage;