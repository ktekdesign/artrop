export const API_USER_URL = '/api/users/';
export const API_CUSTOMER_URL = '/api/customers/';
export const API_SHIP_URL = '/api/ships/';
export const API_VEHICLE_URL = '/api/vehicles/';
export const API_TURN_URL = '/api/turns/';
export const API_OPERATION_URL = '/api/operations/';
export const API_TRAVEL_URL = '/api/travels/';
export const API_VEHICLESTURN_URL = '/api/vehiclesturn/';
export const API_DASHBOARD_URL = '/api/dashboard/turns/';
export const API_DASHBOARD_OPERATION_URL = '/api/dashboard/operations/';
export const renderButtonLabel = (operation?: string) =>
  operation === 'update'
    ? 'Atualize'
    : operation === 'delete'
      ? 'Remove'
      : 'Cadastre';
export const operations = ['Caçamba', 'Prancha', 'Container', 'Entre Armazéns'];
