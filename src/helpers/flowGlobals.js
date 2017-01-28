// @flow

declare type beer = {
  id:number;
  name:string;
  tagline:string;
  first_brewed:string;
  description:string;
  food_pairing:Object[];
  brewers_tips:string;
  ingredients:{ hops:Object[] };
  image_url:string
};

declare type beerState  = { requestState:string; data:beer|{}; id:number; error:Error|null };
declare type beersState = { requestState:string; data:beer[]; page:number; error:Error|null };

declare type action     = { type:string };
declare type dispatch   = ( action:action ) => void;

export { beer, beerState, beersState, action, dispatch };