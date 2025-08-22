import { MOCK_GET_ADB } from "../mock/ambitiDiBisogno";
import { MOCK_MRKT_CARD } from "../mock/marketingCard";

class PSC_URL_CONSTANTS {
  static GET_ADB_URL = "https://publish-p42403-e1312991.adobeaemcloud.com/bin/pub/mock.json?path=/content/dam/unipol/api/ambitiDiBisogno.json";
  static GET_MKT_CARD_URL = "https://publish-p42403-e1312991.adobeaemcloud.com/bin/pub/mock.json?path=/content/dam/unipol/api/Marketing_Card_Preventivatore.json"; // esempio
}

class PreventivatoreStickyContainerService {
  constructor() {}

  /**
   * Recupera gli ambiti di bisogno
   */
  public async getAdb(useMock: boolean): Promise<any> {
    if (!useMock) {
      return MOCK_GET_ADB;
    } else {

      try {
        const response = await fetch(PSC_URL_CONSTANTS.GET_ADB_URL, {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error(`GET ADB failed: ${response.status}`);
        }

        console.log("GET ADB status:", response.status);
        return await response.json();
      } catch (err) {
        console.error("Errore getAdb:", err);
        throw err;
      }
    }
  }

  /**
   * Recupera le marketing card
   */
  public async getMarketingCard(useMock: boolean): Promise<any> {
    if (!useMock) {
      return MOCK_MRKT_CARD;
    }

    try {
      const response = await fetch(PSC_URL_CONSTANTS.GET_MKT_CARD_URL, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`GET MarketingCard failed: ${response.status}`);
      }

      console.log("GET MarketingCard status:", response.status);
      return await response.json();
    } catch (err) {
      console.error("Errore getMarketingCard:", err);
      throw err;
    }
  }
}

export default new PreventivatoreStickyContainerService();
