// SERVICES
import SDKServices from '../../../../../shared/services/sdk';

export default {
	getJourneyData
}

async function getJourneyData(token: string, page?: string): Promise<{ result: any }> {
  try {
    const sdkService = new SDKServices(token);

    // Concatenate the 'page' parameter to the URL if it's provided
    const apiUrl = `https://${process.env.SFMC_TENANT_ID}.rest.marketingcloudapis.com/interaction/v1/interactions` +
                   (page ? `?$page=${page}` : '');

    const result = await sdkService.rest.get(apiUrl);

    return result;
  } catch (e) {
    throw e;
  }
}
