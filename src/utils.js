import VueCookie from "vue-cookie";

export function getCookie(key) {
  const value = VueCookie.get(key);
  return value;
}

export function setCookie(cname, cvalue, exdays) {
  let params = [cname, cvalue];

  if (exdays)
    params.push({
      expires: exdays,
    });

  VueCookie.set.apply(void 0, params);
}

export function removeCookie(key) {
    return VueCookie.remove(key);
}