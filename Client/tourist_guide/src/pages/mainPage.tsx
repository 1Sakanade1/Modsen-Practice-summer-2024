import React from 'react';
import MapComp from "../components/MapComp"
import SidePanel from "../components/SidePanel"
import styled from 'styled-components';

const MainPage = () => {
    return (
      <MainPageContainer>
        <SidePanelContainer>
          <SidePanel />
        </SidePanelContainer>
        <MapContainer>
          <MapComp />
        </MapContainer>
      </MainPageContainer>
    );
  };
  
  const MainPageContainer = styled.div`
    display: flex;
  `;
  
  const SidePanelContainer = styled.div`
  height: 100vh; 
  flex: 0 0 40px; 
`;
  
  const MapContainer = styled.div`
    flex: 1; // Остальное пространство для карты
  `;
  
  export default MainPage;