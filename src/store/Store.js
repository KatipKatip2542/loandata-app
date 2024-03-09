import { atom } from "recoil";

export const locationStore = atom({
    key:'keyLocation',
    default: [],
})

export const collapsedStore = atom({
    key:'keycollapsed',
    default: false,
})

export const customerStore = atom({
    key:'keyCustomer',
    default: [],
})
export const activeMenuStore = atom({
    key:'keyActiveMenu',
    default: "menu2",
})
export const dataLocationStore = atom({
    key:'keyDataLocation',
    default: [],
})

export const customerIdStore = atom({
    key:'keycustomerId',
    default: '',
})

export const processStore = atom({
    key:'keyProcessStore',
    default: [],
})
