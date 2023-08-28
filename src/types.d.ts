export type TUser = {
  email: string;
  password: string;
  name: string;
  phoneNumber: number;
};
export type TUserLogin = {
  email: string;
  password: string;
};
export type TCookieUser = {
  email: string;
  name: string;
  phoneNumber: number;
  verified: boolean;
};
export interface INewUser extends TUser {
  rePassword: string;
}
export type TProduct = {
  id: number;
  name: string;
  price: number;
  description: string;
  cant: number;
  category: "chocolats" | "icecreams";
  image: string;
};

export type TProductItem = {
  productId: number;
  cant: number;
};
export type TValidateCookieParams = { cookie: string; name: "cart" | "user" };
export type TCartItem = {
  id: number;
  name: string;
  price: number;
  cant: number;
  image: string;
};
export type TMercadopagoResponseStatus =
  | "approved"
  | "rejected"
  | "pendig"
  | "in_process"
  | "authorized"
  | "in_mediation"
  | "cancelled"
  | "refunded"
  | "charged_back"
  | "partially_refunded";

export type TMercadopagoApiResponse = {
  message: string;
  code: number;
  status: TMercadopagoResponseStatus;
};

type AddressComponent = {
  long_name: string;
  short_name: string;
  types: string[];
};

type Location = {
  lat: number;
  lng: number;
};

type Bounds = {
  northeast: Location;
  southwest: Location;
};

type Geometry = {
  bounds: Bounds;
  location: Location;
  location_type: string;
  viewport: Bounds;
};

type Result = {
  address_components: AddressComponent[];
  formatted_address: string;
  geometry: Geometry;
  partial_match: boolean;
  place_id: string;
  types: string[];
};

export type ResponseGoogleMapsApi = {
  results: Result[];
  status: "OK";
};
export type TError = {
  [key: string]: {
    message: string;
  };
};

export type TPayHistory = {
  cart: TCartItem[];
  type: string;
  method: string;
  status: string;
  amount: number;
  id: string;
  date: string;
  delivery_status: string;
};

export type TCarrousellProps = {
  image: StaticImageData;
  title: string;
  text: string;
};
export type TAddress = {
  street: string;
  deliveryLocation: string;
  numeration: number;
};
