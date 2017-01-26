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

declare type beerState  = { requestState:string; data:beer|{}; id:number; error:Object|null };
declare type beersState = { requestState:string; data:beer[]; page:number; error:Object|null };

declare type action     = { type:string; [string]:any };
declare type dispatch   = ( action:action ) => void;