'use strict';

import CurrentLocation from '../components/get-location';
import SignIn from '../components/Signin'; // NOTE THIS SHOULD BE MOVED TO CONTAINERS - RY
import Home from '../components/Home';
import MapStart from '../components/create-trip-start';
import MapEnd from '../components/create-trip-end';
import Map from '../components/Map';
import Settings from '../components/Settings';
import Guardian from '../components/Guardian';


export const signin = { name: 'signin', component: SignIn, sceneConfig: 'FloatFromRight', next: 'startLocation' };
// export const home = { name: 'home', component: Home, sceneConfig: 'FloatFromBottom' };
export const getLocation = { name: 'getLocation', component: CurrentLocation, sceneConfig: 'FloatFromLeft' };
export const startLocation = { name: 'startLocation', component: MapStart, sceneConfig: 'FloatFromLeft', next: 'settings'};
export const endLocation = { name: 'endLocation', component: MapEnd, sceneConfig: 'FloatFromLeft', next: 'settings' };
export const map = {name:  'map', component: Map, sceneConfig: 'FloatFromLeft'};
export const home = { name: 'home',  component: MapStart, sceneConfig: 'FloatFromLeft' };
// export const home = { name: 'home', component: Settings, sceneConfig: 'FloatFromLeft' };
export const settings = { name: 'settings', component: Settings, sceneConfig: 'FloatFromLeft'};
export const guardian = { name: 'guardian', component: Guardian, sceneConfig: 'FloatFromBottom'};

