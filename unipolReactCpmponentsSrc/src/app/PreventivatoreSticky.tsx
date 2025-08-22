import Box from "./box/Box";
import Form from "./form/Form";
import React, { useEffect, useState, useRef } from "react";
import PreventivatoreStickyContainerService from "./services/preventivatore-sticky-container.service";
import { PROPS_MOCK } from "./PreventivatoreSticky.mock";
import {
  Body,
  BoxWrapper,
  ContainerDiv,
  NavBar,
  WrapperCard,
  WrapperForm,
  NavBarContainer, ContentDiv, ContainerWrapper, TabButton,
  LoadingSticky, MarketingCardPreventivatore, ImageWrapper, TitleWrapper, IconWrapper, LabelTitle, DiscountWrapper,
  LeftDivDiscount, RightDivDiscount, ContentWrapper
} from "./PreventivatoreSticky.style";
import {
  PREVIDENZA,
  AmbitoDiBisognoCode,
  AmbitoDiBisongnoCmsData,
  AmbitoDiBisognoCodePreselect, PERCENTAGE_DISCOUNT_DIV
} from "./PreventivatoreSticky.data";
import { PATH_UNICA } from "./path/path";
import {filterADBFromCMSData, TContainer} from "./ambiti/mapping";
// React libs
import { TpdLoading } from "./libs/react/components";
import {AMBITI_DI_BISOGNO, IconMappingAmbitiPU} from "./libs/common/restyling-pu.utils";

const PrevenivatoreSticky = (props: any) => {
  const [ADBList, setADBList] = useState<any[]>([]);
  const [ADBSelected, setADBSelected] = useState<any>();
  const [configCard, setConfigCard] = useState<any>({});
  const [loadingForm, setLoadingForm] = useState(false);
  const [loadingSticky, setLoadingSticky] = useState(true);
  const isHCLAuthoringPage = false;

  const adbRefs = useRef<(HTMLDivElement | null)[]>([]);
  const selectedADBIndexRef = useRef<number | null>(null);

  const useMock = true;
  const remoteProps = useMock ? PROPS_MOCK : props;
  const {
    isEditMode,
    config: defaultConfig,
  } = remoteProps;

  const tpdPreventivatoreStickyWidgetConfig = defaultConfig?.tpdPreventivatoreStickyWidget?.config ?? defaultConfig;
  const { Preselect, Ambito_Di_Bisogno } = tpdPreventivatoreStickyWidgetConfig;

  const getSelectedValue = (config: any) => {
    return config?.find((element: any) => element?.selected === "true")?.value || "";
  }

  const AmbitoCmsProxy: string = Ambito_Di_Bisogno ? getSelectedValue(Ambito_Di_Bisogno?.value || []) : AmbitoDiBisongnoCmsData.GENERALE;

  const visibilitaMarketingCard = (() => {
    const values = tpdPreventivatoreStickyWidgetConfig?.visibilitaMarketingCard?.value || [];
    const hasSelected = values.some((el: any) => el.selected === true || el.selected === 'true');
    if (!hasSelected) return true;
    return Boolean(
      values.find((el: any) => (el.selected === true || el.selected === 'true') && el.value === 'Si')
    );
  })();



  const getValueOf = (core: any) =>
    core && getSelectedValue(core.value);

  const addPrevidenzaToAdbList = (response: any) => {
    const { entities } = response;
    const ADBListcontainsPrevidenza = entities?.find(
      ({ entityKey } : any) => entityKey?.code === AmbitoDiBisognoCode.PREVIDENZA
    );
    if (!ADBListcontainsPrevidenza) {
      response.entities.push(PREVIDENZA);
    }
  };
  const setStatesAndSetSelectedItems = (response : any) => {
    let preselectValue = getValueOf(Preselect);
    preselectValue = AmbitoDiBisognoCodePreselect[preselectValue?.toUpperCase() as keyof typeof AmbitoDiBisognoCodePreselect];

    const listaFiltrata = filterADBListForPath(response?.entities);

    const resultResearch = listaFiltrata?.find(
      ({ entityKey } : any) => entityKey?.code === preselectValue?.toUpperCase()
    );
    const preselectedAdb = resultResearch ?? listaFiltrata[0];
    const reorderedADBList = [
      preselectedAdb,
      ...listaFiltrata.filter((item: any) => item !== preselectedAdb),
    ];

    //Remapping veicoli
    const adbVeicoli = reorderedADBList.findIndex((item => item?.entityKey?.code === 'PUAUTO'));
    if(adbVeicoli !== -1){
      switch (AmbitoCmsProxy){
        case AmbitoDiBisongnoCmsData.GENERALE:
        case AmbitoDiBisongnoCmsData.UNICA:
        case AmbitoDiBisongnoCmsData.VEICOLI:
        case AmbitoDiBisongnoCmsData.VEICOLI_MOBILITA:
          reorderedADBList[adbVeicoli].entityKey.code = AmbitoDiBisognoCode.VEICOLO;
          break;
        case AmbitoDiBisongnoCmsData.AUTO:
          reorderedADBList[adbVeicoli].entityKey.code = AmbitoDiBisognoCode.AUTO;
          break;
        case AmbitoDiBisongnoCmsData.MOTO:
          reorderedADBList[adbVeicoli].entityKey.code = AmbitoDiBisognoCode.MOTO;
          break;
        case AmbitoDiBisongnoCmsData.AUTOCARRO:
          reorderedADBList[adbVeicoli].entityKey.code = AmbitoDiBisognoCode.AUTOCARRO;
          break;
      }
    }

    setADBList(reorderedADBList);
    setADBSelected(preselectedAdb);
    //getCardConfig(preselectedAdb?.entityKey?.code);
  };

  const filterADBListForPath = (adbList: any) => {
    return adbList.filter(filterADBFromCMSData(AmbitoCmsProxy as AmbitoDiBisongnoCmsData));
  }

  const normalizzaResponseAdb = (response : any) => {
    if(response){
      try{
        const targetVeicolo = (response?.entities as any[]).find(element => element?.entityKey?.code === 'PUVEICOLO');
        if(targetVeicolo){
          targetVeicolo.entityKey.code = "PUAUTO"; 
          targetVeicolo.entityKey.description = "Veicoli";
        }
      }catch(e){
        console.error("Non é stato possibile nomalizzare la response dell'ADB", e);
      }
    }
  }


  const getAdbList = async () => {
    try {
      setLoadingSticky(true);

      const responseFull = await PreventivatoreStickyContainerService.getAdb(useMock);

      normalizzaResponseAdb(responseFull);
      if (!PATH_UNICA.some(path => window.location.href.includes(path))) {
        addPrevidenzaToAdbList(responseFull);
      }
      setStatesAndSetSelectedItems(responseFull);
    } catch (error) {
      console.log("getAdbList Error", error);
    } finally {
      setLoadingSticky(false);
    }
  };

  const getMarketingCardContent = async () => {
    try {
      setLoadingForm(true);

      const responseFull = await PreventivatoreStickyContainerService.getMarketingCard(useMock);
      console.log("getMarketingCardContent responseFull", responseFull);

      // 🔥 Mappo i dati qui
      const data = responseFull.content.data || [];

      // mapping dinamico
      const mapped = {
        immagine: data.find((d: any) => d.name === "Immagine_PU")?.value,
        icona: data.find((d: any) => d.name === "Icona_PU")?.value || [],
        titoloTop: data.find((d: any) => d.name === "Titolo_Top_PU")?.value,
        titoloTopMobile: data.find((d: any) => d.name === "Titolo_Top_Mobile_PU")?.value,
        boxScontoSinistra: data.find((d: any) => d.name === "Box_Sconto_Sinistra")?.value,
        boxScontoDestra: data.find((d: any) => d.name === "Box_Sconto_Destra")?.value,
        descrizionePU: data.find((d: any) => d.name === "Descrizione_PU")?.value,
      };

      setConfigCard(mapped);
    } catch (error) {
      console.log("getMarketingCardContent Error", error);
    } finally {
      setLoadingForm(false);

      const event = new CustomEvent('preventivatoreComponentReady', {
        detail: { timestamp: Date.now() }
      });
      window.dispatchEvent(event);

      console.log('event: preventivatoreComponentReady', event);
    }
  };

  const didFetch = useRef(false);

  useEffect(() => {
    if (didFetch.current) return; // evita doppio trigger in StrictMode
    didFetch.current = true;

    setLoadingForm(true);
    getAdbList();
    getMarketingCardContent();
  }, []);

  /**
   * Gestione sticky
   */
  const [sticky, setSticky] = useState<boolean>(false);
  const stickyContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.addEventListener('resize', renderCorrectContent);
    window.addEventListener('scroll', renderCorrectContent);
    //on destroy
    return () => {
      window.removeEventListener('resize', renderCorrectContent);
      window.removeEventListener('scroll', renderCorrectContent);
    }
  }, []);

  const renderCorrectContent = () => {
    const isStickNavbar = calculateIsStickNavbar()
    isStickNavbar ? setSticky(true) : setSticky(false);
  };

  const calculateIsStickNavbar = () => {
    if (window !== undefined) {
      if (stickyContainerRef.current) {
        const boundingClientRect = stickyContainerRef.current.getBoundingClientRect();
        let smallestActivationY = -500;
        if(boundingClientRect.width > 0 && boundingClientRect.width <= 768 ) {
          smallestActivationY = -500;
        } else if(boundingClientRect.width >= 769 && boundingClientRect.width <= 1279) {
          smallestActivationY = -255;
        }

        if (stickyContainerRef.current.getBoundingClientRect().y < smallestActivationY) {
          return true;
        } else {
          return false;
        }
      }
    }
  }

  /**
   * Gestisce l'apertura e la chiusura del preventivatore in versione sticky
   */
  const [selectorCollapsed, setSelectorCollapsed] = useState<boolean>(true);
  const onSelectorClick = () => {
    setSelectorCollapsed(!selectorCollapsed);
  }

  const moreThanOneItems = ():boolean => ADBList.length > 1;

  useEffect(() => {
    if (ADBSelected) {
      const index = ADBList.findIndex(
        (item) => item.entityKey.code === ADBSelected.entityKey.code
      );

      if (index !== -1) {
        setTimeout(() => {
          adbRefs.current[index]?.scrollIntoView({
            behavior: 'smooth',
            inline: index === ADBList.length - 1 ? 'end' : 'center',
            block: 'nearest',
          });
        }, 100);
      }
    }
  }, [ADBSelected]);


  const getBgColor = (container: TContainer) => {
    //if (Ambito_PU) {
      //const ambito = getValueOf(Ambito_PU);
      const ambito = "Veicoli e Mobilita"; // Forzato per test
      switch (container) {
        case "body":
          return AMBITI_DI_BISOGNO[ambito].BG_BODY;
        case "title":
          return AMBITI_DI_BISOGNO[ambito].BG_HEADER;
        case "discount":
          return AMBITI_DI_BISOGNO[ambito].BG_DISCOUNT;
      }
    //}
  };

  const getPercentageDivDiscount = () => {
      return PERCENTAGE_DISCOUNT_DIV.SIXTY_FOURTY.CONFIG;
  };


  return loadingSticky ? (
      <LoadingSticky>
        <TpdLoading isLoading={true}></TpdLoading>
      </LoadingSticky>
  ) : (
    <ContainerDiv ref={stickyContainerRef} className={`${ADBList?.length <= 1 ? 'only-one-adb' : ''} `}>
      {sticky && !isHCLAuthoringPage && (
          <div className={`sticky-placeholder ${ADBList?.length <= 1 ? 'only-one-adb' : ''} `}/>
      )}
      <ContainerWrapper adbItems = {moreThanOneItems()}  className={`${isHCLAuthoringPage ? '' : selectorCollapsed ? 'close' : 'open'} ${sticky && !isHCLAuthoringPage ? "sticky" : ""}`}>

        {sticky && !isHCLAuthoringPage && (
          <TabButton onClick={onSelectorClick} className={`${selectorCollapsed ? '' : 'upsidedown'}`}>
            <span>Fai un preventivo</span>
            <i className={`${selectorCollapsed ? 'icon-Freccia-up' : 'icon-Freccia-down'}`}></i>
          </TabButton>
        )}

        <ContentDiv>
        {ADBList?.length > 1 && <NavBarContainer>
            <NavBar>
              {ADBList.map((adb, index) => (
                  <BoxWrapper
                    key={adb?.entityKey?.code}
                    ref={(el : any) => adbRefs.current[index] = el}
                    numItems={ADBList.length}>
                    <Box
                        adb={adb}
                        useMock={useMock}
                        selected={adb?.entityKey?.code === ADBSelected?.entityKey?.code}
                        setADBSelected={(entity: any) => {
                          setADBSelected(entity);
                          selectedADBIndexRef.current = index;

                          if(sticky && selectorCollapsed){
                            setSelectorCollapsed(false);
                          }

                          // Scroll fino al'ADB selezionato
                          adbRefs.current[index]?.scrollIntoView({
                            behavior: 'smooth',
                            inline: 'center',
                            block: 'nearest'
                          });
                        }}
                    />
                  </BoxWrapper>
              ))}
            </NavBar>
          </NavBarContainer>}
          {loadingForm ?
          <LoadingSticky>
            <TpdLoading isLoading={true}></TpdLoading>
          </LoadingSticky> :
          <Body className={`body-container ${(!configCard || JSON.stringify(configCard) === "{}") && !isHCLAuthoringPage ? "no-card" : ""}`}>

            {ADBList.length >= 2 && visibilitaMarketingCard &&
              <WrapperCard className={`wrapper-card ${(!configCard || JSON.stringify(configCard) === "{}") && !isHCLAuthoringPage ? "no-card" : ""}`} >
                  <MarketingCardPreventivatore>
                      {configCard.immagine && (
                        <ImageWrapper className={"desktop"}>
                          <img
                            src={'https://unipol.it/'+configCard.immagine.image.resourceUri.value}
                            alt={configCard.immagine.image.altText || "Immagine card"}
                          />
                        </ImageWrapper>
                      )}

                      <TitleWrapper bgColor={getBgColor("title")}>
                          <IconWrapper>
                              <img alt={'icon'} src={IconMappingAmbitiPU.negative["Veicoli e Mobilita"]}></img>
                          </IconWrapper>
                          <LabelTitle className="desktop">
                            {configCard.titoloTop.value}
                          </LabelTitle>
                          <LabelTitle className="mobile">
                            {configCard.titoloTopMobile.value}
                          </LabelTitle>
                      </TitleWrapper>

                      <DiscountWrapper className="desktop" bgColor={getBgColor("discount")}>
                          <LeftDivDiscount widthDiscount={getPercentageDivDiscount()}>
                              <div
                                  dangerouslySetInnerHTML={{ __html: configCard.boxScontoSinistra.value || "" }}
                              />
                          </LeftDivDiscount>
                          <RightDivDiscount widthDiscount={getPercentageDivDiscount()}>
                              <div
                                  dangerouslySetInnerHTML={{ __html: configCard.boxScontoDestra.value || "" }}
                              />
                          </RightDivDiscount>
                      </DiscountWrapper>

                      <ContentWrapper
                          bgColor={getBgColor("body")}
                          className={"desktop"}
                      >
                          <div
                              dangerouslySetInnerHTML={{ __html: configCard.descrizionePU.value || "" }}
                          />
                      </ContentWrapper>

                  </MarketingCardPreventivatore>
            </WrapperCard>}
           
            <WrapperForm className={`${ADBList?.length >= 2 ? 'multiple-adb' : 'single-adb'}`}>
              {ADBSelected && (
                  <Form
                      isEditMode = {isEditMode}
                      config={tpdPreventivatoreStickyWidgetConfig}
                      ADBSelected={ADBSelected}
                      ADBList={ADBList}
                  />
              )}
            </WrapperForm>

            {ADBList.length <= 1 && visibilitaMarketingCard &&
              <WrapperCard className={`wrapper-card ${(!configCard || JSON.stringify(configCard) === "{}") && !isHCLAuthoringPage ? "no-card" : ""}`}>
              </WrapperCard>
            }
          </Body>}
        </ContentDiv>
      </ContainerWrapper>
    </ContainerDiv>
  );
};

export default PrevenivatoreSticky;
