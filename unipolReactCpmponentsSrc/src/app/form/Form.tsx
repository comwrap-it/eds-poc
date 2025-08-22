import React, { useEffect, useRef, useState } from "react";
import { FormContainer, ServerSideContainer } from "./Form.style";
import {
  HealthFieldsEnum,
  HouseFieldsEnum,
  MobilityFieldsEnum,
  PetFieldsEnum,
  PrevidenzaFieldsEnum,
  PrivacyContent,
  TravelsFieldsEnum,
  UsIndirizzoEnum,
  VehicleFieldsEnum,
} from "./forms-costants";

import FormPreventivatorePrevidenza from "./previdenza-form/PrevidenzaForm";
import { AmbitoDiBisognoCode } from "../PreventivatoreSticky.data";
import FormPreventivatoreViaggio from "./viaggi-form/ViaggiForm";
import FormPreventivatoreSalute from "./salute-form/SaluteForm";
import FormPreventivatoreInfortuni from "./infortuni-form/InfortuniForm";
import FormPreventivatoreCasa from "./casa-form/CasaForm";
import FormPreventivatoreFamiglia from "./famiglia-form/FamigliaForm";
import FormPreventivatorePet from "./pet-form/PetForm";
import FormPreventivatoreMobilita from "./mobilita-form/MobilitaForm";
import FormPreventivatoreAuto from "./auto-form/AutoForm";

type TProps = {
  ADBSelected: any;
  config: any;
  isEditMode: boolean;
  ADBList: any[];
};

const Form = (props: TProps) => {
  const {
    isEditMode,
    ADBSelected: {
      domains,
      entityKey: { code },
    },
    config,
  } = props;

  const [disableMail, setDisableMail] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [googleApiKey, setGoogleApiKey] = useState<string>("");

  const storingData = useRef<any>({
    insertDate: new Date().getTime(),
    email: "",
    birthdate: "",
    plate: "",
    previdenza_settore: null,
    cf: "",
  });

  const preventivatoreFamigliaSelected = () =>
    code === AmbitoDiBisognoCode.FAMIGLIA;
  const preventivatoreCasaSelected = () => code === AmbitoDiBisognoCode.CASA;
  const preventivatorePrevidenzaSelected = () =>
    code === AmbitoDiBisognoCode.PREVIDENZA;
  const preventivatoreViaggioSelected = () =>
    code === AmbitoDiBisognoCode.VIAGGIO_TEMPORANEO;
  const preventivatoreSaluteSelected = () =>
    code === AmbitoDiBisognoCode.SALUTE;
  const preventivatoreInfortuniSelected = () =>
    code === AmbitoDiBisognoCode.INFORTUNI;
  const preventivatorePetSelected = () => code === AmbitoDiBisognoCode.ANIMALE;
  const preventivatoreMobilitaSelected = () =>
    code === AmbitoDiBisognoCode.MOBILITA;
  const preventivatoreAutoSelected = () =>
    code === AmbitoDiBisognoCode.AUTO ||
    code === AmbitoDiBisognoCode.VEICOLO ||
    code === AmbitoDiBisognoCode.AUTOCARRO ||
    code === AmbitoDiBisognoCode.MOTO;
  const previdenzaObject = config.Informativa_Previdenza?.value?.linkElement;

  const showInformativaPrivacy = (ambitoConsumo: any) => {
    if (ambitoConsumo === AmbitoDiBisognoCode.PREVIDENZA.toLowerCase())
      return true;
    else {
      const index = ambitoConsumo as keyof typeof PrivacyContent;
      return !!config[index]?.value?.value || false;
    }
  };

  const onPrivacyClick = (ambitoConsumo? : any) => {};

  const onRecuperaPreventivoClick = () => {};

  const getFormattedDate = (): string => {
    const date = new Date();

    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const min = date.getMinutes();
    const sec = date.getSeconds();

    const monthStr = (month < 10 ? "0" : "") + month;
    const dayStr = (day < 10 ? "0" : "") + day;
    const hourStr = (hour < 10 ? "0" : "") + hour;
    const minStr = (min < 10 ? "0" : "") + min;
    const secStr = (sec < 10 ? "0" : "") + sec;

    return (
      date.getFullYear() +
      "-" +
      monthStr +
      "-" +
      dayStr +
      " " +
      hourStr +
      ":" +
      minStr +
      ":" +
      secStr
    );
  };
  const inviaAnalitichePrimaInterazione = () => {};

  /**
   * Gestione di modali e loading custom per PU
   */
  const loadingPuRef = useRef<HTMLDivElement>(null);
  const modaleErroreRef = useRef<HTMLDivElement>(null);

  const generaDatiDisambiguazione = async (ambitoCode: any, formValue: any) => {
    let formData;
    switch (ambitoCode) {
      case AmbitoDiBisognoCode.VIAGGIO_TEMPORANEO: {
        formData = {
          email: formValue[TravelsFieldsEnum.EMAIL],
          number_people: formValue[TravelsFieldsEnum.N_PEOPLE],
        };
        break;
      }
      case AmbitoDiBisognoCode.SALUTE: {
        formData = {
          birthday: formValue[HealthFieldsEnum.BIRTHDAY],
          email: formValue[HealthFieldsEnum.EMAIL],
        };
        break;
      }
      case AmbitoDiBisognoCode.INFORTUNI: {
        formData = {
          birthday: formValue[HealthFieldsEnum.BIRTHDAY],
          cf: formValue[HealthFieldsEnum.CF],
          email: formValue[HealthFieldsEnum.EMAIL],
        };
        break;
      }
      case AmbitoDiBisognoCode.CASA: {
        formData = {
          domain: formValue[HouseFieldsEnum.DWELLING_TYPE]?.value,
          email: formValue[HouseFieldsEnum.EMAIL],
        };
        break;
      }
      case AmbitoDiBisognoCode.FAMIGLIA: {
        formData = {
          domain: formValue[HouseFieldsEnum.DWELLING_TYPE]?.value,
          email: formValue[HouseFieldsEnum.EMAIL],
        };
        break;
      }
      case AmbitoDiBisognoCode.ANIMALE: {
        formData = {
          domain: formValue[PetFieldsEnum.TYPE]?.value,
          email: formValue[PetFieldsEnum.EMAIL],
        };
        break;
      }
      case AmbitoDiBisognoCode.MOBILITA: {
        formData = {
          birthday: formValue[MobilityFieldsEnum.BIRTHDAY],
          email: formValue[MobilityFieldsEnum.EMAIL],
        };
        break;
      }
      case AmbitoDiBisognoCode.AUTO:
      case AmbitoDiBisognoCode.VEICOLO:
      case AmbitoDiBisognoCode.MOTO:
      case AmbitoDiBisognoCode.AUTOCARRO: {
        ambitoCode = AmbitoDiBisognoCode.VEICOLO;
        formData = {
          domain:
            formValue[VehicleFieldsEnum?.TYPE]?.value !== "4L"
              ? formValue[VehicleFieldsEnum?.TYPE]?.value
              : undefined,
          noPlate: formValue[VehicleFieldsEnum?.PLATE_AVAIABLE],
          plate: formValue[VehicleFieldsEnum?.PLATE].trim(),
          birthday: formValue[VehicleFieldsEnum?.BIRTHDAY],
          email: formValue[VehicleFieldsEnum?.EMAIL],
        };
        break;
      }
    }

    await sessionStorage.setItem(
      "tpd_disambiguazione_widget_data_props",
      JSON.stringify({
        ambitoDiBisogno: ambitoCode,
        formData,
      })
    );
  };

  const submitDisambiguazione = async (formValue?: any) => {
    await generaDatiDisambiguazione(code, formValue);
    setIsLoading(false);
  };

  const isLoginPg = async (): Promise<boolean> => {
    let esito = false;
    return esito;
  };

  const submit = async (formValue?: any) => {
    // let datiInterprete;
    // let puDataProps;
    let ambito = code.slice(2).toLowerCase();
    if (ambito == "veicolo") {
      ambito = "veicoli";
    }

    if (ambito == "veicoli" || ambito == "moto" || ambito == "auto") {
      //Rimappo il formValue prendendo il .value dalla UsSelect (di default viene presa solo la label, qui serve passare tutto l'oggetto)
      const vehicle_type_options = [
        {
          label: "Auto",
          value: "1",
        },
        {
          label: "Moto",
          value: "8",
        },
        {
          label: "Altri veicoli",
          value: "4L",
        },
      ];
      formValue["type"] = vehicle_type_options.find(
        (option) => option.value == formValue["type"]
      );
    }

    //Rimappo il formValue prendendo il .value dalla UsSelect (di default viene presa solo la label, qui serve passare tutto l'oggetto)
    if (ambito === "casa" || ambito === "famiglia") {
      const dwelling_type_options =
        domains.find(({ code } : any) => code === "TIPOABITAZ").dropDownItems || [];
      formValue["dwelling-type"] = dwelling_type_options.find(
        (option : any) => option.value == formValue["dwelling-type"]
      );
    } else if (ambito === "pet") {
      const pet_type_options =
        domains.find(({ code } : any) => code === "TIPORISC").dropDownItems || [];
      formValue["type"] = pet_type_options.find(
        (option : any) => option.value == formValue["type"]
      );
    }

    const prodotto =
      (formValue["dwelling-type"] || formValue["type"])?.label || ambito;
    let analyticsToSend = {};
    if (window.location.href.includes("homepage")) {
      analyticsToSend = {
        action_effect: `preventivo ${ambito} ${prodotto}`,
        action_detail: "sticky",
        action_name: `calcola preventivo con dati`,
      };
    } else {
      let detail = "";
      if (window.location.href.includes("veicoli-mobilita")) {
        detail = "veicoli e mobilita";
        ambito = "veicoli";
      }
      if (window.location.href.includes("casa-famiglia")) {
        detail = "casa e famiglia";
      }
      if (window.location.href.includes("persona")) {
        detail = "persona";
      }
      if(window.location.href.includes("assicurazione-moto-adv") ||
        window.location.href.includes("assicurazione-auto-adv") ||
        window.location.href.includes("assicurazione-autocarri-adv")) {
        ambito = 'veicoli';
      }
      analyticsToSend = {
        action_effect: `preventivo ${ambito} ${prodotto}`,
        action_detail: `landing ${detail}`,
        action_name: `calcola preventivo`,
      };
    }
    if (!(await isLoginPg())) {
      if (formValue) {
        setIsLoading(true);
        storingData.current.insertDate = new Date().getTime();
        if (code === AmbitoDiBisognoCode.PREVIDENZA) {
          storingData.current.email = formValue[PrevidenzaFieldsEnum.EMAIL];
          storingData.current.previdenza_settore =
            formValue[PrevidenzaFieldsEnum.WORKING_SECTOR];
          // Helpers.RouterHelper.goTo(selectorOptions[code].redirectTo);
        } else {
          setIsLoading(true);
          storingData.current.insertDate = new Date().getTime();
          if (code === AmbitoDiBisognoCode.PREVIDENZA) {
            storingData.current.email = formValue[PrevidenzaFieldsEnum.EMAIL];
            storingData.current.previdenza_settore =
              formValue[PrevidenzaFieldsEnum.WORKING_SECTOR];
            // Helpers.RouterHelper.goTo(selectorOptions[code].redirectTo);
          } else {
            setIsLoading(true);
            await submitDisambiguazione(formValue);
          }
          setIsLoading(false);
        }
      }
    }
  };

  const ToUsIndirizzoGooglePlaces = (place: any) => {
    const esito: any = {
      _stringaComparazione: [],
      _statoNormalizzato: false,
    };
    if (place) {
      let elment: any;
      let type: UsIndirizzoEnum;

      // ciclo per recuperare indici
      for (let i = 0; i < place.address_components.length; i++) {
        elment = place.address_components[i];
        for (let j = 0; j < elment.types.length; j++) {
          type = elment.types[j] as UsIndirizzoEnum;
          switch (type) {
            case UsIndirizzoEnum.INDIRIZZO:
              esito.indirizzo = elment?.long_name || "";
              esito._stringaComparazione.push(esito.indirizzo);
              break;
            case UsIndirizzoEnum.REGIONE:
              esito.regione = elment?.long_name || "";
              esito._stringaComparazione.push(esito.regione);
              break;
            case UsIndirizzoEnum.PROVINCIA:
              esito.provincia = elment?.short_name || "";
              esito._stringaComparazione.push(esito.provincia);
              break;
            case UsIndirizzoEnum.COMUNE:
              esito.comune = elment?.long_name || "";
              esito._stringaComparazione.push(esito.comune);
              break;
            case UsIndirizzoEnum.CIVICO:
              esito.civico = elment?.short_name || "";
              esito._stringaComparazione.push(esito.civico);
              break;
            case UsIndirizzoEnum.CAP:
              esito.cap = elment?.short_name || "";
              esito._stringaComparazione.push(esito.cap);
              break;
            case UsIndirizzoEnum.STATO:
              esito.stato =
                elment?.long_name === "Italy"
                  ? "Italia"
                  : elment?.long_name || "";
              esito._stringaComparazione.push(esito.stato);
              break;
          }
        }
      }
    }
    esito._stringaComparazione = esito._stringaComparazione.join("-");
    return esito;
  };

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return isLoaded ? (
    <>
      <div ref={loadingPuRef}></div>
      <div ref={modaleErroreRef}></div>
      <FormContainer>
        {preventivatorePrevidenzaSelected() && (
          <FormPreventivatorePrevidenza
            isLoading={isLoading}
            showInformativaPrivacy={() => showInformativaPrivacy("previdenza")}
            onPrivacyClick={() => onPrivacyClick("previdenza")}
            onRecuperaPreventivoClick={() => onRecuperaPreventivoClick()}
            privacyDisplayValue={previdenzaObject?.display?.value}
            onSubmit={(formValue) => submit(formValue)}
            disableMail={disableMail}
            initialValueEmail={storingData.current.email}
            optionSelect={domains}
            onFocus={() => inviaAnalitichePrimaInterazione()}
          />
        )}
        {preventivatoreViaggioSelected() && (
          <FormPreventivatoreViaggio
            isLoading={isLoading}
            showInformativaPrivacy={() => showInformativaPrivacy("viaggi")}
            onPrivacyClick={() => onPrivacyClick("viaggi")}
            onRecuperaPreventivoClick={() => onRecuperaPreventivoClick()}
            onSubmit={(formValue) => submit(formValue)}
            disableMail={disableMail}
            onFocus={() => inviaAnalitichePrimaInterazione()}
            optionSelect={domains}
            initialValueEmail={storingData.current.email}
          />
        )}
        {preventivatoreSaluteSelected() && (
          <FormPreventivatoreSalute
            isLoading={isLoading}
            showInformativaPrivacy={() => showInformativaPrivacy("salute")}
            onPrivacyClick={() => onPrivacyClick("salute")}
            onRecuperaPreventivoClick={() => onRecuperaPreventivoClick()}
            onSubmit={(formValue) => submit(formValue)}
            onFocus={() => inviaAnalitichePrimaInterazione()}
            initialValueBirthdate={storingData.current.birthdate}
            initialValueEmail={storingData.current.email}
          />
        )}
        {preventivatoreInfortuniSelected() && (
          <FormPreventivatoreInfortuni
            isLoading={isLoading}
            showInformativaPrivacy={() => showInformativaPrivacy("infortuni")}
            onPrivacyClick={() => onPrivacyClick("infortuni")}
            onRecuperaPreventivoClick={() => onRecuperaPreventivoClick()}
            onSubmit={(formValue) => submit(formValue)}
            onFocus={() => inviaAnalitichePrimaInterazione()}
            initialValueBirthdate={storingData.current.birthdate}
            initialValueEmail={storingData.current.email}
            initialValueCf={storingData.current.cf}
          />
        )}
        {preventivatoreCasaSelected() && (
          <FormPreventivatoreCasa
            isLoading={isLoading}
            isEditMode={isEditMode}
            googleApiKey={googleApiKey}
            initialValueEmail={storingData.current.email}
            showInformativaPrivacy={() => showInformativaPrivacy("casa")}
            onPrivacyClick={() => onPrivacyClick("casa")}
            onRecuperaPreventivoClick={() => onRecuperaPreventivoClick()}
            onSubmit={(formValue) => submit(formValue)}
            onFocus={() => inviaAnalitichePrimaInterazione()}
            optionSelect={domains}
            ToUsIndirizzoGooglePlaces={ToUsIndirizzoGooglePlaces}
          />
        )}
        {preventivatoreFamigliaSelected() && (
          <FormPreventivatoreFamiglia
            isEditMode={isEditMode}
            isLoading={isLoading}
            googleApiKey={googleApiKey}
            initialValueEmail={storingData.current.email}
            showInformativaPrivacy={() => showInformativaPrivacy("famiglia")}
            onPrivacyClick={() => onPrivacyClick("famiglia")}
            onRecuperaPreventivoClick={() => onRecuperaPreventivoClick()}
            onSubmit={(formValue) => submit(formValue)}
            onFocus={() => inviaAnalitichePrimaInterazione()}
            optionSelect={domains}
            ToUsIndirizzoGooglePlaces={ToUsIndirizzoGooglePlaces}
          />
        )}
        {preventivatorePetSelected() && (
          <FormPreventivatorePet
            isLoading={isLoading}
            showInformativaPrivacy={() => showInformativaPrivacy("pet")}
            initialValueEmail={storingData.current.email}
            onPrivacyClick={() => onPrivacyClick("pet")}
            onRecuperaPreventivoClick={() => onRecuperaPreventivoClick()}
            onSubmit={(formValue) => submit(formValue)}
            onFocus={() => inviaAnalitichePrimaInterazione()}
            optionSelect={domains}
          />
        )}
        {preventivatoreMobilitaSelected() && (
          <FormPreventivatoreMobilita
            isLoading={isLoading}
            googleApiKey={googleApiKey}
            initialValueEmail={storingData.current.email}
            initialValueBirthdate={storingData.current.birthdate}
            ToUsIndirizzoGooglePlaces={ToUsIndirizzoGooglePlaces}
            showInformativaPrivacy={() => showInformativaPrivacy("mobilita")}
            onPrivacyClick={() => onPrivacyClick("mobilita")}
            onRecuperaPreventivoClick={() => onRecuperaPreventivoClick()}
            onSubmit={(formValue) => submit(formValue)}
            onFocus={() => inviaAnalitichePrimaInterazione()}
            optionSelect={domains}
          />
        )}
        {preventivatoreAutoSelected() && (
          <FormPreventivatoreAuto
            googleApiKey={googleApiKey}
            isEditMode={isEditMode}
            initialValueEmail={storingData.current.email}
            initialValueBirthdate={storingData.current.birthdate}
            initialValuePlate={storingData.current.plate}
            ToUsIndirizzoGooglePlaces={ToUsIndirizzoGooglePlaces}
            optionSelect={domains}
            isLoading={isLoading}
            onSubmit={(formValue) => submit(formValue)}
            showInformativaPrivacy={() => showInformativaPrivacy("auto")}
            onPrivacyClick={() => onPrivacyClick("auto")}
            onRecuperaPreventivoClick={() => onRecuperaPreventivoClick()}
            onFocus={() => inviaAnalitichePrimaInterazione()}
          />
        )}
      </FormContainer>
    </>
  ) : (
    <ServerSideContainer id="server-side-container">
      <div className="server-side-container-box">
        <div className="tpd-preventivatore-sticky-loader col-xs-24 col-md-10 col-lg-13">
          <div className="tpd-preventivatore-sticky-loader-container">
            {/* <TpdLoading isLoading={true} inlayedSpinner={true}></TpdLoading> */}
          </div>
        </div>
      </div>
    </ServerSideContainer>
  );
};

export default Form;
